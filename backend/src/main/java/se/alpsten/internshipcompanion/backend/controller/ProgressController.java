package se.alpsten.internshipcompanion.backend.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.alpsten.internshipcompanion.backend.domain.User;
import se.alpsten.internshipcompanion.backend.service.AuthService;
import se.alpsten.internshipcompanion.backend.service.ProgressService;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

  private final AuthService authService;
  private final ProgressService progressService;

  public ProgressController(AuthService authService, ProgressService progressService) {
    this.authService = authService;
    this.progressService = progressService;
  }

  @GetMapping
  public ProgressResponse getProgress(
      @RequestHeader(value = "Authorization", required = false) String authorizationHeader
  ) {
    User user = authService.getAuthenticatedUser(authorizationHeader);
    return ProgressResponse.from(progressService.getProgress(user));
  }

  @PutMapping
  public ProgressResponse updateProgress(
      @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
      @Valid @RequestBody UpdateProgressRequest request
  ) {
    User user = authService.getAuthenticatedUser(authorizationHeader);
    return ProgressResponse.from(progressService.updateProgress(user, request.completedTaskIds()));
  }
}

record UpdateProgressRequest(@NotNull(message = "completedTaskIds is required") List<String> completedTaskIds) {
}

record ProgressResponse(List<String> completedTaskIds) {

  static ProgressResponse from(ProgressService.ProgressView progressView) {
    return new ProgressResponse(progressView.completedTaskIds());
  }
}
