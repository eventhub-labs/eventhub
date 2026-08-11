package com.eventhub.eventapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventhubApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventhubApplication.class, args);
        System.out.println("HELLO WORLD");
    }

}
