package com.eventhub.eventapp.event.repository;

import com.eventhub.eventapp.event.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
}
