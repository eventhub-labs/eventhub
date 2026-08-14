package com.eventhub.eventapp.auth.dto;

public record RegisterRequest(
        String email,
        String username,
        String name,
        String surname,
        String phone,
        String password
) {}
