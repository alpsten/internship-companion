package se.alpsten.internshipcompanion.backend.service;

public class DomainValidationException extends RuntimeException {

  public DomainValidationException(String message) {
    super(message);
  }
}
