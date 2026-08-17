package com.eventhub.eventapp.common.exception.dto;

import java.util.Map;

public record ValidationErrorResponseDTO(Map<String, String> errors) {
}
