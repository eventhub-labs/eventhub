package com.eventhub.eventapp.user.dto;

public record FullProfileInfoResponseDTO(
    String username,
    String name,
    String surname,
    String imgUrl,
    String phone,
    String email
) {
}
