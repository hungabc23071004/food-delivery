package com.hung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredientCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    @JsonIgnore
    @ManyToOne
    Restaurant restaurant;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    List<IngredientsItem> ingredients = new ArrayList<>();
}
