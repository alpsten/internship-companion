package se.alpsten.internshipcompanion.backend.service;

public class ConflictException extends RuntimeException {

  public ConflictException(String message) {
    super(message);
  }
}
