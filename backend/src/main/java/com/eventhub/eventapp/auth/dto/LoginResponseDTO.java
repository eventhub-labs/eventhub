package com.eventhub.eventapp.auth.dto;

import java.util.UUID;

public record LoginResponseDTO(
        String email,
        String username,
        String name,
        String surname,
        String imgUrl,
        String accessToken
) {
}
