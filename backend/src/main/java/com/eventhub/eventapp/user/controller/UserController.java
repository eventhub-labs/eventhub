package com.eventhub.eventapp.user.controller;

import com.eventhub.eventapp.user.dto.DeleteAccountRequestDTO;
import com.eventhub.eventapp.user.dto.ModifyPasswordRequestDTO;
import com.eventhub.eventapp.user.dto.FullProfileInfoResponseDTO;
import com.eventhub.eventapp.user.dto.ModifyProfileRequestDTO;
import com.eventhub.eventapp.user.dto.PublicUserProfileResponseDTO;
import com.eventhub.eventapp.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/me")
    public ResponseEntity<FullProfileInfoResponseDTO> modifyCurrentUserProfile(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody ModifyProfileRequestDTO modifyProfileRequestDTO){
        UUID userId = UUID.fromString(jwt.getSubject());
        return ResponseEntity.ok().body(this.userService.modifyProfileInfo(userId, modifyProfileRequestDTO));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> modifyCurrentUserPassword(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody ModifyPasswordRequestDTO requestDTO){
        UUID userId = UUID.fromString(jwt.getSubject());

        this.userService.modifyPassword(userId, requestDTO);

        return ResponseEntity.noContent().build();
    }

//    @DeleteMapping("/me")
//    public ResponseEntity<Void> deleteProfile(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody DeleteAccountRequestDTO requestDTO){
//        UUID userId = UUID.fromString(jwt.getSubject());
//
//        this.userService.deleteProfile(userId, requestDTO);
//
//        return ResponseEntity.noContent().build();
//    }
}
