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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String name;
    String description;
    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Food> foods= new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "shop_id")
    Shop shop;


}
