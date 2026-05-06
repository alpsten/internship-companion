package se.alpsten.internshipcompanion.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class InternshipCompanionBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(InternshipCompanionBackendApplication.class, args);
  }
}
