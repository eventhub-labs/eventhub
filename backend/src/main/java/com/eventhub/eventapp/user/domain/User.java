package com.eventhub.eventapp.user.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Getter
    @Column(nullable = false, unique = true)
    private String email;

    @Getter
    @Column(nullable = false, unique = true)
    private String username;

    @Getter
    private String name;

    @Getter
    private String surname;

    @Getter
    @Column(name = "user_img")
    private String userImg;

    @Getter
    private String phone;

    @Getter
    @Setter
    @Column(nullable = false)
    private String password;

    @Getter
    @Setter
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    protected User(){
    }

    public User(String email, String username, String name, String surname, String phone){
        this.email = email;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
    }
}
