package com.eventhub.eventapp.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ModifyProfileRequestDTO(
        @Email
        @Size(max = 255)
                String email,

        @Size(min = 3, max = 100)
        String username,

        @Size(max = 100)
        String name,

        @Size(max = 100)
        String surname,

        @Pattern(regexp = "^\\+[1-9]\\d{7,14}$")
        @Size(max = 30)
        String phone,

        @Size(max = 512)
        String imgUrl
) {
}
