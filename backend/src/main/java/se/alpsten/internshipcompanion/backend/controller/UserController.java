package se.alpsten.internshipcompanion.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.alpsten.internshipcompanion.backend.domain.User;
import se.alpsten.internshipcompanion.backend.service.AuthService;

@RestController
@RequestMapping("/api")
public class UserController {

  private final AuthService authService;

  public UserController(AuthService authService) {
    this.authService = authService;
  }

  @GetMapping("/me")
  public UserResponse me(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
    User user = authService.getAuthenticatedUser(authorizationHeader);
    return UserResponse.from(user);
  }
}
