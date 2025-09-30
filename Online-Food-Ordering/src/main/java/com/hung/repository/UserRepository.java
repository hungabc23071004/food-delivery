package com.hung.repository;

import com.hung.entity.User;
import com.hung.enums.AuthProvider;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    Optional<User> findByUsernameAndActive(String username, Boolean active);

    @EntityGraph(attributePaths = {"roles", "roles.permissions"})
    Optional<User> findByProviderAndProviderId(AuthProvider provider, String id);

}
