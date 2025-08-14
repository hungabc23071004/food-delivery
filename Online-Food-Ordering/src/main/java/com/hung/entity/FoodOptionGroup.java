package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodOptionGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String  id;
    String name ;
    // "Size", "Topping"
    @ManyToOne
    @JoinColumn(name = "food_id")
     Food food;

    @Builder.Default
    @OneToMany(mappedBy = "optionGroup", cascade = CascadeType.ALL, orphanRemoval = true)
     List<FoodOption> options = new ArrayList<>();
}

