package se.alpsten.internshipcompanion.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import se.alpsten.internshipcompanion.backend.domain.User;
import se.alpsten.internshipcompanion.backend.domain.UserProgress;
import se.alpsten.internshipcompanion.backend.repository.UserProgressRepository;

@Service
public class ProgressService {

  private static final TypeReference<List<String>> STRING_LIST = new TypeReference<>() {
  };

  private final UserProgressRepository userProgressRepository;
  private final ObjectMapper objectMapper;

  public ProgressService(UserProgressRepository userProgressRepository, ObjectMapper objectMapper) {
    this.userProgressRepository = userProgressRepository;
    this.objectMapper = objectMapper;
  }

  public ProgressView getProgress(User user) {
    UserProgress progress = userProgressRepository.findByUserId(user.getId())
        .orElseGet(() -> userProgressRepository.save(new UserProgress(user, "[]")));

    return new ProgressView(parseCompletedTaskIds(progress.getCompletedTaskIdsJson()));
  }

  public ProgressView updateProgress(User user, List<String> completedTaskIds) {
    List<String> normalizedTaskIds = normalizeTaskIds(completedTaskIds);

    UserProgress progress = userProgressRepository.findByUserId(user.getId())
        .orElseGet(() -> new UserProgress(user, "[]"));

    progress.setCompletedTaskIdsJson(writeCompletedTaskIds(normalizedTaskIds));

    UserProgress saved = userProgressRepository.save(progress);
    return new ProgressView(parseCompletedTaskIds(saved.getCompletedTaskIdsJson()));
  }

  private List<String> normalizeTaskIds(List<String> completedTaskIds) {
    if (completedTaskIds == null) {
      return List.of();
    }

    Set<String> uniqueTaskIds = new LinkedHashSet<>();
    for (String taskId : completedTaskIds) {
      if (taskId == null) {
        continue;
      }

      String cleanedTaskId = taskId.trim();
      if (!cleanedTaskId.isEmpty()) {
        uniqueTaskIds.add(cleanedTaskId);
      }
    }

    return new ArrayList<>(uniqueTaskIds);
  }

  private List<String> parseCompletedTaskIds(String json) {
    try {
      return objectMapper.readValue(json, STRING_LIST);
    } catch (JsonProcessingException exception) {
      throw new ValidationException("Stored progress could not be parsed.");
    }
  }

  private String writeCompletedTaskIds(List<String> completedTaskIds) {
    try {
      return objectMapper.writeValueAsString(completedTaskIds);
    } catch (JsonProcessingException exception) {
      throw new ValidationException("Progress payload could not be stored.");
    }
  }

  public record ProgressView(List<String> completedTaskIds) {
  }
}
