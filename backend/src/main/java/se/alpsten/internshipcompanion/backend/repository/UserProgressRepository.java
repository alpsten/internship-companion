package se.alpsten.internshipcompanion.backend.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import se.alpsten.internshipcompanion.backend.domain.UserProgress;

public interface UserProgressRepository extends JpaRepository<UserProgress, UUID> {

  Optional<UserProgress> findByUserId(UUID userId);
}
