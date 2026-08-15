package com.eventhub.eventapp.auth.service;


import com.eventhub.eventapp.auth.dto.RegisterRequestDTO;
import com.eventhub.eventapp.auth.dto.RegisterResponseDTO;
import com.eventhub.eventapp.auth.exception.UserAlreadyExistsException;
import com.eventhub.eventapp.user.domain.Role;
import com.eventhub.eventapp.user.domain.User;
import com.eventhub.eventapp.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository uRepository, PasswordEncoder pEncoder) {
        this.passwordEncoder = pEncoder;
        this.userRepository = uRepository;
    }

    public RegisterResponseDTO register(RegisterRequestDTO registerRequest) {
        if (this.userRepository.existsByEmail(registerRequest.email()) )
            throw new UserAlreadyExistsException("Email already taken");

        if(this.userRepository.existsByUsername(registerRequest.username()))
            throw new UserAlreadyExistsException("Username already taken");

        User createdUser = this.createUser(registerRequest);

        return new RegisterResponseDTO(createdUser.getId(), createdUser.getEmail(), createdUser.getUsername(), createdUser.getName(), createdUser.getSurname());
    }

    private User createUser(RegisterRequestDTO registerRequest){
        User u = new User(registerRequest.email(), registerRequest.username(), registerRequest.name(), registerRequest.surname(), registerRequest.phone());
        u.setPassword(this.passwordEncoder.encode(registerRequest.password()));
        u.setRole(Role.USER);

       return this.userRepository.save(u);
    }
}
