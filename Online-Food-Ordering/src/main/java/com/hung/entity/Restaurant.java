package com.hung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    @OneToOne(fetch =FetchType.LAZY)
    User owner;

    String name;
    String description;
    String cuisineType;

    @OneToOne
    Address address;

    @Embedded
    ContactInformation contactInformation;

    String openingHours;

    @OneToMany(mappedBy ="restaurant", cascade = CascadeType.ALL,orphanRemoval = true)
    List<Orders> orders = new ArrayList<>();

    @ElementCollection
    @Column(length = 1000)
    List<String> images;

    LocalDateTime registrationDate;

    boolean open;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL,orphanRemoval = true)
    List<Food> foods=new ArrayList<>();
}
