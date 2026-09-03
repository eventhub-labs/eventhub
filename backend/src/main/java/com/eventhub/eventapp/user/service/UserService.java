package com.eventhub.eventapp.user.service;

import com.eventhub.eventapp.user.dto.DeleteAccountRequestDTO;
import com.eventhub.eventapp.user.dto.ModifyPasswordRequestDTO;
import com.eventhub.eventapp.auth.exception.InvalidCredentialsException;
import com.eventhub.eventapp.auth.exception.UserAlreadyExistsException;
import com.eventhub.eventapp.user.domain.User;
import com.eventhub.eventapp.user.dto.FullProfileInfoResponseDTO;
import com.eventhub.eventapp.user.dto.ModifyProfileRequestDTO;
import com.eventhub.eventapp.user.dto.PublicUserProfileResponseDTO;
import com.eventhub.eventapp.user.exception.UserNotFoundException;
import com.eventhub.eventapp.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository uRep, PasswordEncoder pEncoder){
        this.userRepository = uRep;
        this.passwordEncoder = pEncoder;
    }

    public PublicUserProfileResponseDTO getPublicProfileInfo(UUID id){
        User u = this.userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("User does not exist" ) );
        return new PublicUserProfileResponseDTO(u.getUsername(), u.getName(), u.getSurname(), u.getUserImg());
    }

    public FullProfileInfoResponseDTO getFullProfileInfo(UUID id){
        User u = this.userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("User does not exist" ) );
        return new FullProfileInfoResponseDTO(u.getUsername(), u.getName(), u.getSurname(), u.getUserImg(), u.getPhone(), u.getEmail());
    }

    @Transactional
    public FullProfileInfoResponseDTO modifyProfileInfo(UUID id, ModifyProfileRequestDTO modifyProfileRequestDTO){
        User u = this.userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("User does not exist" ) );

        String email = modifyProfileRequestDTO.email() == null
                ? null
                : modifyProfileRequestDTO.email().trim().toLowerCase();

        if (email != null &&
                !email.equals(u.getEmail()) &&
                userRepository.existsByEmail(email)) {
            throw new UserAlreadyExistsException("Email already taken");
        }

        if (modifyProfileRequestDTO.username() != null &&
                !modifyProfileRequestDTO.username().equals(u.getUsername()) &&
                userRepository.existsByUsername(modifyProfileRequestDTO.username())) {
            throw new UserAlreadyExistsException("Username already taken");
        }

        if(email!=null)
            u.setEmail(email);

        if(modifyProfileRequestDTO.imgUrl()!=null)
            u.setUserImg(modifyProfileRequestDTO.imgUrl());

        if(modifyProfileRequestDTO.name()!=null)
            u.setName(modifyProfileRequestDTO.name());

        if(modifyProfileRequestDTO.surname()!=null)
            u.setSurname(modifyProfileRequestDTO.surname());

        if(modifyProfileRequestDTO.phone()!=null)
            u.setPhone(modifyProfileRequestDTO.phone());

        if(modifyProfileRequestDTO.username()!=null)
            u.setUsername(modifyProfileRequestDTO.username());

        return new FullProfileInfoResponseDTO(u.getUsername(), u.getName(), u.getSurname(), u.getUserImg(), u.getPhone(), u.getEmail());
    }

    @Transactional
    public void modifyPassword(UUID id, ModifyPasswordRequestDTO requestDTO){
        User u = this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User does not exist" ));

        if (!passwordEncoder.matches(requestDTO.currentPassword(), u.getPassword())) {
            throw new InvalidCredentialsException("Current password is incorrect");
        }

        u.setPassword(passwordEncoder.encode(requestDTO.newPassword()));
    }

    @Transactional
    public void deleteProfile(UUID id, DeleteAccountRequestDTO requestDTO){
        User u = this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User does not exist" ));

        if (!passwordEncoder.matches(requestDTO.password(), u.getPassword())) {
            throw new InvalidCredentialsException("Password is incorrect");
        }

        this.userRepository.delete(u);
    }
}