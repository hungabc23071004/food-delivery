package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String imageUrl;
    Boolean isPrimary;

    @ManyToOne
    @JoinColumn(name = "food_id")
    Food food;
}
