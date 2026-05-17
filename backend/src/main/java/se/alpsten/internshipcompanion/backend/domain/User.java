package se.alpsten.internshipcompanion.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "app_users")
public class User {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @Column(name = "email_verified", nullable = false)
  private boolean emailVerified = false;

  @Column(name = "verification_code")
  private String verificationCode;

  @Column(name = "verification_expires_at")
  private Instant verificationExpiresAt;

  protected User() {
  }

  public User(String name, String email, String passwordHash) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  @PrePersist
  void prePersist() {
    if (createdAt == null) {
      createdAt = Instant.now();
    }
  }

  public UUID getId() { return id; }
  public String getName() { return name; }
  public String getEmail() { return email; }
  public String getPasswordHash() { return passwordHash; }
  public Instant getCreatedAt() { return createdAt; }
  public boolean isEmailVerified() { return emailVerified; }
  public String getVerificationCode() { return verificationCode; }
  public Instant getVerificationExpiresAt() { return verificationExpiresAt; }

  public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
  public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }
  public void setVerificationExpiresAt(Instant verificationExpiresAt) { this.verificationExpiresAt = verificationExpiresAt; }
}
