package se.alpsten.internshipcompanion.backend.service;

import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import se.alpsten.internshipcompanion.backend.config.AppProperties;
import se.alpsten.internshipcompanion.backend.domain.User;

@Service
public class SchoolProfileService {

  private final AppProperties appProperties;
  private final Map<String, SchoolProfile> profilesByDomain = Map.of(
      "yh.nackademin.se",
      new SchoolProfile(
          "nackademin",
          "Nackademin",
          "yh.nackademin.se",
          "Professional LIA focus",
          "Planera din LIA med fokus på nätverk, portfolio och strukturerad uppföljning.",
          List.of(
              "Rekommenderade uppgifter för svenska YH-studenter",
              "Fokus på LinkedIn, GitHub och kontakt med företag",
              "Checklistor som passar Nackademins LIA-process"
          )
      ),
      "hogwarts.wiz",
      new SchoolProfile(
          "hogwarts",
          "Hogwarts",
          "hogwarts.wiz",
          "Magical internship mode",
          "Din LIA-plan kompletteras med magiska moment, spell practice och owl-based outreach.",
          List.of(
              "Spell checklist: Reparo your portfolio before applying",
              "Owl mail reminders for follow-ups",
              "House-specific preparation for interviews at magical organisations"
          )
      ),
      "starfleet.academy",
      new SchoolProfile(
          "starfleet",
          "Starfleet Academy",
          "starfleet.academy",
          "Mission-ready internship planning",
          "Planera praktik som ett uppdrag med tydliga mål, loggbok och debrief efter varje kontakt.",
          List.of(
              "Mission log for every company contact",
              "Crew review before interviews",
              "Exploration goals for new organisations"
          )
      )
  );

  public SchoolProfileService(AppProperties appProperties) {
    this.appProperties = appProperties;
  }

  public SchoolProfile profileFor(User user) {
    String domain = emailDomain(user.getEmail());

    if (!appProperties.isVerifiedSchoolDomain(domain)) {
      throw new DomainValidationException("No verified school profile exists for @" + domain + ".");
    }

    return profilesByDomain.getOrDefault(
        domain,
        new SchoolProfile(
            "verified-school",
            "Verified school",
            domain,
            "School-specific configuration",
            "This account belongs to a verified school domain configured for this prototype.",
            List.of("Domain-based registration", "Account-backed progress", "Shared core application")
        )
    );
  }

  private String emailDomain(String email) {
    return email.substring(email.lastIndexOf("@") + 1).toLowerCase();
  }

  public record SchoolProfile(
      String slug,
      String name,
      String domain,
      String theme,
      String welcomeMessage,
      List<String> highlights
  ) {
  }
}
