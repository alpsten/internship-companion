package se.alpsten.internshipcompanion.backend.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class EmailService {

  private final RestClient restClient;
  private final String apiKey;

  public EmailService(@Value("${resend.api-key}") String apiKey) {
    this.apiKey = apiKey;
    this.restClient = RestClient.create();
  }

  public void sendVerificationEmail(String toEmail, String code) {
    Map<String, Object> body = Map.of(
        "from", "Internship Companion <onboarding@resend.dev>",
        "to", List.of(toEmail),
        "subject", "Your verification code",
        "text",
        "Hi!\n\nYour verification code is: " + code
            + "\n\nThis code expires in 15 minutes.\n\n— The Internship Companion team"
    );

    restClient.post()
        .uri("https://api.resend.com/emails")
        .header("Authorization", "Bearer " + apiKey)
        .contentType(MediaType.APPLICATION_JSON)
        .body(body)
        .retrieve()
        .toBodilessEntity();
  }
}
