package se.alpsten.internshipcompanion.backend.service;

public class UnverifiedEmailException extends RuntimeException {
  public UnverifiedEmailException(String message) {
    super(message);
  }
}
