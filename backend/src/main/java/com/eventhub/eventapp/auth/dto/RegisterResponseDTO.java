package com.eventhub.eventapp.auth.dto;

import java.util.UUID;

public record RegisterResponseDTO (
    UUID id,
    String email,
    String username,
    String name,
    String surname
){}
