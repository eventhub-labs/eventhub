package com.eventhub.eventapp.auth.service.model;

import com.eventhub.eventapp.auth.dto.LoginResponseDTO;

public record LoginResult(
        LoginResponseDTO response,
        String refreshToken
) {}