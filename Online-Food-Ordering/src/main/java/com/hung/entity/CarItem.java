package com.hung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hung.until.StringListConverter;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JsonIgnore
    Cart cart;

    @ManyToOne
    Food food;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    List<String> ingredients = new ArrayList<>();

    Long quantity;

     Long totalPrice;
}
