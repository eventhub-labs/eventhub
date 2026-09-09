package com.eventhub.eventapp.event.domain;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID creator_user_id;

    private String name;

    private String description;

    private boolean is_date_approved;

    private Timestamp date;



    protected Event(){
    }

    public Event(UUID creatorUserId, String name, String description, boolean isDateApproved, Timestamp date){
        this.creator_user_id = creatorUserId;
        this.name = name;
        this.description = description;
        this.is_date_approved = isDateApproved;
        this.date = date;
    }
}
