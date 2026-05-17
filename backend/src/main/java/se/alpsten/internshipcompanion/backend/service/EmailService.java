package se.alpsten.internshipcompanion.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private final JavaMailSender mailSender;
  private final String fromAddress;

  public EmailService(JavaMailSender mailSender, @Value("${spring.mail.username}") String fromAddress) {
    this.mailSender = mailSender;
    this.fromAddress = fromAddress;
  }

  public void sendVerificationEmail(String toEmail, String code) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(fromAddress);
    message.setTo(toEmail);
    message.setSubject("Your Internship Companion verification code");
    message.setText(
        "Hi!\n\n" +
        "Your verification code is: " + code + "\n\n" +
        "This code expires in 15 minutes.\n\n" +
        "If you did not register for Internship Companion, you can ignore this email.\n\n" +
        "— The Internship Companion team"
    );
    mailSender.send(message);
  }
}
