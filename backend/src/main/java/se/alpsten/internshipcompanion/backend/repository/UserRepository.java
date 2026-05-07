package se.alpsten.internshipcompanion.backend.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import se.alpsten.internshipcompanion.backend.domain.User;

public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmail(String email);
}
