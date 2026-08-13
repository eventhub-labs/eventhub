package com.eventhub.eventapp.user.repository;

import com.eventhub.eventapp.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
