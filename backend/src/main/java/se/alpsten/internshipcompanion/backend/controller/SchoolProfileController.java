package se.alpsten.internshipcompanion.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.alpsten.internshipcompanion.backend.domain.User;
import se.alpsten.internshipcompanion.backend.service.AuthService;
import se.alpsten.internshipcompanion.backend.service.SchoolProfileService;

@RestController
@RequestMapping("/api")
public class SchoolProfileController {

  private final AuthService authService;
  private final SchoolProfileService schoolProfileService;

  public SchoolProfileController(AuthService authService, SchoolProfileService schoolProfileService) {
    this.authService = authService;
    this.schoolProfileService = schoolProfileService;
  }

  @GetMapping("/school-profile")
  public SchoolProfileResponse schoolProfile(
      @RequestHeader(value = "Authorization", required = false) String authorizationHeader
  ) {
    User user = authService.getAuthenticatedUser(authorizationHeader);
    return SchoolProfileResponse.from(schoolProfileService.profileFor(user));
  }
}

record SchoolProfileResponse(
    String slug,
    String name,
    String domain,
    String theme,
    String welcomeMessage,
    List<String> highlights
) {

  static SchoolProfileResponse from(SchoolProfileService.SchoolProfile profile) {
    return new SchoolProfileResponse(
        profile.slug(),
        profile.name(),
        profile.domain(),
        profile.theme(),
        profile.welcomeMessage(),
        profile.highlights()
    );
  }
}
