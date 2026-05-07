package se.alpsten.internshipcompanion.backend.security;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class TokenStore {

  private final Map<String, String> tokenToUserId = new ConcurrentHashMap<>();

  public String issueToken(String userId) {
    String token = UUID.randomUUID().toString();
    tokenToUserId.put(token, userId);
    return token;
  }

  public Optional<String> findUserId(String token) {
    return Optional.ofNullable(tokenToUserId.get(token));
  }

  public void invalidate(String token) {
    tokenToUserId.remove(token);
  }
}
