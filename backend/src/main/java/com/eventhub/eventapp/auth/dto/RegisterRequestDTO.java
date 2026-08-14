package com.eventhub.eventapp.auth.dto;

public record RegisterRequestDTO(
        String email,
        String username,
        String name,
        String surname,
        String phone,
        String password
) {}
