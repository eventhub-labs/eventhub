package com.eventhub.eventapp.auth.controller;

import com.eventhub.eventapp.auth.dto.RegisterRequestDTO;
import com.eventhub.eventapp.auth.dto.RegisterResponseDTO;
import com.eventhub.eventapp.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request){
        return new ResponseEntity<>(authService.register(request), HttpStatus.CREATED);
    }
}
