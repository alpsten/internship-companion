package se.alpsten.internshipcompanion.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "user_progress")
public class UserProgress {

  @Id
  @GeneratedValue
  private UUID id;

  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  @Column(name = "completed_task_ids_json", nullable = false, columnDefinition = "text")
  private String completedTaskIdsJson;

  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  protected UserProgress() {
  }

  public UserProgress(User user, String completedTaskIdsJson) {
    this.user = user;
    this.completedTaskIdsJson = completedTaskIdsJson;
  }

  @PrePersist
  @PreUpdate
  void touch() {
    updatedAt = Instant.now();
  }

  public UUID getId() {
    return id;
  }

  public User getUser() {
    return user;
  }

  public String getCompletedTaskIdsJson() {
    return completedTaskIdsJson;
  }

  public void setCompletedTaskIdsJson(String completedTaskIdsJson) {
    this.completedTaskIdsJson = completedTaskIdsJson;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }
}
