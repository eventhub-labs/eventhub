package com.eventhub.eventapp.auth.service;

import com.eventhub.eventapp.auth.dto.*;
import com.eventhub.eventapp.auth.exception.InvalidRefreshTokenException;
import com.eventhub.eventapp.auth.exception.UserAlreadyExistsException;
import com.eventhub.eventapp.auth.exception.InvalidCredentialsException;
import com.eventhub.eventapp.auth.service.model.LoginResult;
import com.eventhub.eventapp.auth.service.model.RegisterResult;
import com.eventhub.eventapp.user.domain.Role;
import com.eventhub.eventapp.user.domain.User;
import com.eventhub.eventapp.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository uRepository, PasswordEncoder pEncoder, JwtService jwtServ) {
        this.passwordEncoder = pEncoder;
        this.userRepository = uRepository;
        this.jwtService = jwtServ;
    }

    public RegisterResult register(RegisterRequestDTO registerRequest) {
        if (this.userRepository.existsByEmail(registerRequest.email()) )
            throw new UserAlreadyExistsException("Email already taken");

        if(this.userRepository.existsByUsername(registerRequest.username()))
            throw new UserAlreadyExistsException("Username already taken");

        User createdUser = this.createUser(registerRequest);

        return new RegisterResult(new RegisterResponseDTO(createdUser.getEmail(), createdUser.getUsername(), createdUser.getName(), createdUser.getSurname(), createdUser.getPhone(), this.jwtService.generateAccessToken(createdUser)),  this.jwtService.generateRefreshToken(createdUser));
    }

    public LoginResult login(LoginRequestDTO loginRequestDTO){
        User u = this.userRepository.findByEmail(loginRequestDTO.email())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!this.passwordEncoder.matches(loginRequestDTO.password(), u.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return new LoginResult(new LoginResponseDTO(u.getEmail(), u.getUsername(), u.getName(), u.getSurname(), u.getUserImg(), this.jwtService.generateAccessToken(u)), this.jwtService.generateRefreshToken(u));
    }

    public RefreshResponseDTO refresh(String refreshToken){
        Jwt token = this.jwtService.decodeRefreshToken(refreshToken);

        String subject = token.getSubject();

        if(subject == null){
            throw new InvalidRefreshTokenException("Invalid refresh token");
        }

        UUID userId;

        try {
            userId = UUID.fromString(subject);
        } catch (IllegalArgumentException e) {
            throw new InvalidRefreshTokenException("Invalid refresh token");
        }

        User u = this.userRepository.findById(userId).orElseThrow(() -> new InvalidRefreshTokenException("Invalid refresh token"));

        String accessToken = jwtService.generateAccessToken(u);

        return new RefreshResponseDTO(u.getEmail(), u.getUsername(), u.getName(), u.getSurname(), u.getUserImg(), accessToken);
    }




    private User createUser(RegisterRequestDTO registerRequest){
        User u = new User(registerRequest.email(), registerRequest.username(), registerRequest.name(), registerRequest.surname(), registerRequest.phone());
        u.setPassword(this.passwordEncoder.encode(registerRequest.password()));
        u.setRole(Role.USER);

       return this.userRepository.save(u);
    }
}
