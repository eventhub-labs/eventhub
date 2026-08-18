package com.eventhub.eventapp.user.dto;

public record PublicUserProfileResponseDTO(
        String username,
        String name,
        String surname,
        String imgUrl
) {}
