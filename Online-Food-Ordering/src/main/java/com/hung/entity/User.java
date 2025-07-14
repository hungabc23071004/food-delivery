package com.hung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hung.dto.RestaurantDto;
import com.hung.enums.USER_ROLE;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String fullName;
    String email;


    String password;
    @Enumerated(EnumType.STRING)
    USER_ROLE role;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    List<Orders> orders = new ArrayList<>();

    @ElementCollection
    private List<RestaurantDto> favorites = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses  = new ArrayList<>();

    @OneToOne(mappedBy = "owner")
    Restaurant restaurant;
}
