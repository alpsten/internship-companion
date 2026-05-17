package se.alpsten.internshipcompanion.backend.service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import se.alpsten.internshipcompanion.backend.config.AppProperties;
import se.alpsten.internshipcompanion.backend.domain.User;
import se.alpsten.internshipcompanion.backend.repository.UserRepository;
import se.alpsten.internshipcompanion.backend.security.TokenStore;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenStore tokenStore;
  private final AppProperties appProperties;
  private final EmailService emailService;
  private final SecureRandom secureRandom = new SecureRandom();

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      TokenStore tokenStore,
      AppProperties appProperties,
      EmailService emailService
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.tokenStore = tokenStore;
    this.appProperties = appProperties;
    this.emailService = emailService;
  }

  public void register(String name, String email, String password) {
    String normalizedEmail = normalizeEmail(email);
    String normalizedName = clean(name);
    String emailDomain = emailDomain(normalizedEmail);

    if (!appProperties.isVerifiedSchoolDomain(emailDomain)) {
      throw new DomainValidationException(
          "Only verified school domains can register. Allowed domains: "
              + appProperties.verifiedSchoolDomainsLabel()
              + "."
      );
    }

    if (userRepository.findByEmail(normalizedEmail).isPresent()) {
      throw new ConflictException("An account with this email already exists.");
    }

    if (password == null || password.length() < 8) {
      throw new ValidationException("Password must be at least 8 characters long.");
    }

    if (normalizedName.isBlank()) {
      throw new ValidationException("Name is required.");
    }

    User user = new User(normalizedName, normalizedEmail, passwordEncoder.encode(password));
    String code = generateCode();
    user.setVerificationCode(code);
    user.setVerificationExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));
    userRepository.save(user);

    emailService.sendVerificationEmail(normalizedEmail, code);
  }

  public AuthResult verifyEmail(String email, String code) {
    String normalizedEmail = normalizeEmail(email);

    User user = userRepository.findByEmail(normalizedEmail)
        .orElseThrow(() -> new ValidationException("Invalid verification code."));

    if (user.isEmailVerified()) {
      String token = tokenStore.issueToken(user.getId().toString());
      return new AuthResult(user, token);
    }

    if (user.getVerificationCode() == null
        || user.getVerificationExpiresAt() == null
        || Instant.now().isAfter(user.getVerificationExpiresAt())) {
      throw new ValidationException("Verification code has expired. Request a new one.");
    }

    if (!user.getVerificationCode().equals(code)) {
      throw new ValidationException("Invalid verification code.");
    }

    user.setEmailVerified(true);
    user.setVerificationCode(null);
    user.setVerificationExpiresAt(null);
    userRepository.save(user);

    String token = tokenStore.issueToken(user.getId().toString());
    return new AuthResult(user, token);
  }

  public void resendVerification(String email) {
    String normalizedEmail = normalizeEmail(email);

    User user = userRepository.findByEmail(normalizedEmail)
        .orElseThrow(() -> new ValidationException("No account found with that email."));

    if (user.isEmailVerified()) {
      throw new ValidationException("This account is already verified.");
    }

    String code = generateCode();
    user.setVerificationCode(code);
    user.setVerificationExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));
    userRepository.save(user);

    emailService.sendVerificationEmail(normalizedEmail, code);
  }

  public AuthResult login(String email, String password) {
    String normalizedEmail = normalizeEmail(email);

    User user = userRepository.findByEmail(normalizedEmail)
        .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    if (!user.isEmailVerified()) {
      throw new UnverifiedEmailException("Please verify your email before logging in.");
    }

    String token = tokenStore.issueToken(user.getId().toString());
    return new AuthResult(user, token);
  }

  public User getAuthenticatedUser(String authorizationHeader) {
    String token = extractBearerToken(authorizationHeader);
    String userId = tokenStore.findUserId(token)
        .orElseThrow(() -> new UnauthorizedException("Invalid or expired token."));

    return userRepository.findById(java.util.UUID.fromString(userId))
        .orElseThrow(() -> new UnauthorizedException("User not found for token."));
  }

  public void logout(String authorizationHeader) {
    String token = extractBearerToken(authorizationHeader);
    tokenStore.invalidate(token);
  }

  private String extractBearerToken(String authorizationHeader) {
    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing Bearer token.");
    }
    return authorizationHeader.substring("Bearer ".length()).trim();
  }

  private String generateCode() {
    return String.format("%06d", secureRandom.nextInt(1_000_000));
  }

  private String normalizeEmail(String email) {
    String cleanedEmail = clean(email).toLowerCase();
    if (cleanedEmail.isBlank() || !cleanedEmail.contains("@")) {
      throw new ValidationException("A valid email address is required.");
    }
    return cleanedEmail;
  }

  private String emailDomain(String email) {
    return email.substring(email.lastIndexOf("@") + 1);
  }

  private String clean(String value) {
    return value == null ? "" : value.trim();
  }

  public record AuthResult(User user, String token) {
  }
}
