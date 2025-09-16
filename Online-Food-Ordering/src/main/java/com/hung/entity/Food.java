package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    String description;
    Double price;
    Boolean available;

    @CreationTimestamp
    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "shop_id")
    Shop shop;

    @ManyToOne
    @JoinColumn(name = "category_id")
    Category category;

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    List<FoodOptionGroup> optionGroup=new ArrayList<>();

    @Builder.Default
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    List<FoodImage> images = new ArrayList<>();

    public void addImage(FoodImage image) {
        this.images.add(image);
        image.setFood(this); // luôn gán ngược lại
    }

    public void addOptionGroup(FoodOptionGroup option) {
        this.optionGroup.add(option);
        option.setFood(this);
    }

}
