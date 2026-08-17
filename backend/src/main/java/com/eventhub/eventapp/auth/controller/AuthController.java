package com.eventhub.eventapp.auth.controller;

import com.eventhub.eventapp.auth.dto.*;
import com.eventhub.eventapp.auth.exception.InvalidRefreshTokenException;
import com.eventhub.eventapp.auth.service.AuthService;
import com.eventhub.eventapp.auth.service.model.LoginResult;
import com.eventhub.eventapp.auth.service.model.RegisterResult;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${app.jwt.refresh-ttl}")
    private int refreshTTL;

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request){
        RegisterResult registerResult = authService.register(request);

        ResponseCookie refreshCookie = ResponseCookie.from(
                        "refreshToken",
                        registerResult.refreshToken()
                )
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/auth/refresh")
                .maxAge(refreshTTL)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).header(HttpHeaders.SET_COOKIE, refreshCookie.toString()).body(registerResult.response());
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request){

        LoginResult loginResult = authService.login(request);

        ResponseCookie refreshCookie = ResponseCookie.from(
                        "refreshToken",
                        loginResult.refreshToken()
                )
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/auth/refresh")
                .maxAge(refreshTTL)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, refreshCookie.toString()).body(loginResult.response());
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponseDTO> refresh( @CookieValue(name = "refreshToken", required = false) String refreshToken){
        if(refreshToken==null){
            throw new InvalidRefreshTokenException("Invalid refresh token");
        }

       return ResponseEntity.ok(this.authService.refresh(refreshToken));


    }
}
