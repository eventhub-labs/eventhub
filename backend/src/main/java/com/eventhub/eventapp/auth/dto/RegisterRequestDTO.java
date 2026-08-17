package com.eventhub.eventapp.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(

        @NotBlank
        @Email
        @Size(max = 255)
        String email,

        @NotBlank
        @Size(min = 3, max = 100)
        String username,

        @Size(max = 100)
        String name,

        @Size(max = 100)
        String surname,

        @Pattern(regexp = "^\\+[1-9]\\d{7,14}$")
        @Size(max = 30)
        String phone,

        @NotBlank
        @Size(min = 8, max = 255)
        String password
) {}
