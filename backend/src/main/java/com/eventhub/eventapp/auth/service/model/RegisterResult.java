package com.eventhub.eventapp.auth.service.model;

import com.eventhub.eventapp.auth.dto.RegisterResponseDTO;

public record RegisterResult(
        RegisterResponseDTO response,
        String refreshToken
) {}
