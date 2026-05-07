package se.alpsten.internshipcompanion.backend.controller;

import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import se.alpsten.internshipcompanion.backend.service.ConflictException;
import se.alpsten.internshipcompanion.backend.service.DomainValidationException;
import se.alpsten.internshipcompanion.backend.service.UnauthorizedException;
import se.alpsten.internshipcompanion.backend.service.ValidationException;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException exception) {
    String message = exception.getBindingResult().getFieldErrors().stream()
        .findFirst()
        .map(error -> error.getField() + ": " + error.getDefaultMessage())
        .orElse("Request validation failed.");

    return errorResponse(HttpStatus.BAD_REQUEST, message);
  }

  @ExceptionHandler({ValidationException.class, DomainValidationException.class})
  public ResponseEntity<ErrorResponse> handleBadRequest(RuntimeException exception) {
    return errorResponse(HttpStatus.BAD_REQUEST, exception.getMessage());
  }

  @ExceptionHandler(ConflictException.class)
  public ResponseEntity<ErrorResponse> handleConflict(ConflictException exception) {
    return errorResponse(HttpStatus.CONFLICT, exception.getMessage());
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedException exception) {
    return errorResponse(HttpStatus.UNAUTHORIZED, exception.getMessage());
  }

  private ResponseEntity<ErrorResponse> errorResponse(HttpStatus status, String message) {
    return ResponseEntity.status(status).body(new ErrorResponse(status.value(), message, Instant.now().toString()));
  }

  record ErrorResponse(int status, String message, String timestamp) {
  }
}
