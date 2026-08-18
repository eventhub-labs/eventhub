package com.eventhub.eventapp.user.service;


import com.eventhub.eventapp.user.domain.User;
import com.eventhub.eventapp.user.dto.FullProfileInfoResponseDTO;
import com.eventhub.eventapp.user.dto.PublicUserProfileResponseDTO;
import com.eventhub.eventapp.user.exception.UserNotFoundException;
import com.eventhub.eventapp.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository uRep){
        this.userRepository = uRep;
    }

    public PublicUserProfileResponseDTO getPublicProfileInfo(UUID id){
        User u = this.userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("User does not exist" ) );
        return new PublicUserProfileResponseDTO(u.getUsername(), u.getName(), u.getSurname(), u.getUserImg());
    }

    public FullProfileInfoResponseDTO getFullProfileInfo(UUID id){
        User u = this.userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("User does not exist" ) );
        return new FullProfileInfoResponseDTO(u.getUsername(), u.getName(), u.getSurname(), u.getUserImg(), u.getPhone(), u.getEmail());
    }

}
