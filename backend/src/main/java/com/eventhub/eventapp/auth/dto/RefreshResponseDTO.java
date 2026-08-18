package com.eventhub.eventapp.auth.dto;

public record RefreshResponseDTO(
        String email,
        String username,
        String name,
        String surname,
        String imgUrl,
        String accessToken
) {}
