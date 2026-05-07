package se.alpsten.internshipcompanion.backend.config;

import java.util.Arrays;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(String allowedDomain, String allowedDomains, String frontendOrigin) {

  public List<String> verifiedSchoolDomains() {
    String configuredDomains = hasText(allowedDomains) ? allowedDomains : allowedDomain;

    if (!hasText(configuredDomains)) {
      return List.of();
    }

    return Arrays.stream(configuredDomains.split(","))
        .map(String::trim)
        .map(String::toLowerCase)
        .filter(domain -> !domain.isBlank())
        .distinct()
        .toList();
  }

  public boolean isVerifiedSchoolDomain(String domain) {
    return verifiedSchoolDomains().contains(cleanDomain(domain));
  }

  public String verifiedSchoolDomainsLabel() {
    return verifiedSchoolDomains().stream()
        .map(domain -> "@" + domain)
        .reduce((left, right) -> left + ", " + right)
        .orElse("no configured school domains");
  }

  private String cleanDomain(String domain) {
    return domain == null ? "" : domain.trim().toLowerCase();
  }

  private boolean hasText(String value) {
    return value != null && !value.isBlank();
  }
}
