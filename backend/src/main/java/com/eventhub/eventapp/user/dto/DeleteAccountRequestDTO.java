package com.eventhub.eventapp.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DeleteAccountRequestDTO(@NotBlank
                                      @Size(min = 8, max = 255)
                                      String password) {
}
