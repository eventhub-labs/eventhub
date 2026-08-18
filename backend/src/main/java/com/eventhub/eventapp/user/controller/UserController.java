package com.eventhub.eventapp.user.controller;

import com.eventhub.eventapp.user.dto.FullProfileInfoResponseDTO;
import com.eventhub.eventapp.user.dto.PublicUserProfileResponseDTO;
import com.eventhub.eventapp.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<PublicUserProfileResponseDTO> getUserProfileById(@PathVariable UUID id){
        return ResponseEntity.ok().body(this.userService.getPublicProfileInfo(id));
    }

    @GetMapping("/me")
    public ResponseEntity<FullProfileInfoResponseDTO> getCurrentUserProfile(@AuthenticationPrincipal Jwt jwt){
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok().body(this.userService.getFullProfileInfo(userId));
    }
}
