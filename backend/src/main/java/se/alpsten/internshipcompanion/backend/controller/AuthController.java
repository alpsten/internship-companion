package se.alpsten.internshipcompanion.backend.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import se.alpsten.internshipcompanion.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
    AuthService.AuthResult result = authService.register(request.name(), request.email(), request.password());
    return AuthResponse.from(result);
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest request) {
    AuthService.AuthResult result = authService.login(request.email(), request.password());
    return AuthResponse.from(result);
  }

  @PostMapping("/logout")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void logout(
      @RequestHeader(value = "Authorization", required = false) String authorizationHeader
  ) {
    authService.logout(authorizationHeader);
  }
}

record RegisterRequest(
    @NotBlank(message = "name is required") String name,
    @Email(message = "email must be valid") @NotBlank(message = "email is required") String email,
    @NotBlank(message = "password is required") String password
) {
}

record LoginRequest(
    @Email(message = "email must be valid") @NotBlank(message = "email is required") String email,
    @NotBlank(message = "password is required") String password
) {
}

record AuthResponse(String token, UserResponse user) {

  static AuthResponse from(AuthService.AuthResult result) {
    return new AuthResponse(result.token(), UserResponse.from(result.user()));
  }
}

record UserResponse(String id, String name, String email) {

  static UserResponse from(se.alpsten.internshipcompanion.backend.domain.User user) {
    return new UserResponse(user.getId().toString(), user.getName(), user.getEmail());
  }
}
