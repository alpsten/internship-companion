package se.alpsten.internshipcompanion.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  private final AppProperties appProperties;

  public WebConfig(AppProperties appProperties) {
    this.appProperties = appProperties;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOriginPatterns(
            appProperties.frontendOrigin(),
            "http://localhost:*",
            "http://127.0.0.1:*"
        )
        .allowedMethods("GET", "POST", "PUT", "OPTIONS")
        .allowedHeaders("*")
        .maxAge(3600);

    registry.addMapping("/health")
        .allowedOriginPatterns(
            appProperties.frontendOrigin(),
            "http://localhost:*",
            "http://127.0.0.1:*"
        )
        .allowedMethods("GET", "OPTIONS")
        .allowedHeaders("*")
        .maxAge(3600);
  }
}
