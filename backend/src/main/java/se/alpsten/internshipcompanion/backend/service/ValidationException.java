package se.alpsten.internshipcompanion.backend.service;

public class ValidationException extends RuntimeException {

  public ValidationException(String message) {
    super(message);
  }
}
