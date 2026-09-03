package com.eventhub.eventapp.auth.dto;

import java.util.UUID;

public record RegisterResponseDTO (
    String email,
    String username,
    String name,
    String surname,
    String phone,
    String accessToken
){}
