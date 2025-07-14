package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    String description;

    Long price;

    @ManyToOne
    Category foodCategory;

    @Column(length = 1000)
    @ElementCollection
    Set<String> images;

    boolean available;

    @ManyToOne
    Restaurant restaurant;

    boolean isVegetarian;
    boolean isSeasonal;

    @ManyToMany
    private List<IngredientsItem> ingredients= new ArrayList<>();

    Date creationDate;

}
