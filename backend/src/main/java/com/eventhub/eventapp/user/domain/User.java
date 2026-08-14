package com.eventhub.eventapp.user.domain;


import jakarta.persistence.*;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String username;

    @Column()
    private String name;

    @Column()
    private String surname;

    @Column()
    private String userImg;

    private String phone;

    @Setter
    @Column(nullable = false)
    private String password;

    @Setter
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    public User(){
    }

    public User(String email, String username, String name, String surname, String userImg, String phone){
        this.email = email;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.userImg = userImg;
        this.phone = phone;
    }
}
