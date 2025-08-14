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
public class ReviewImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String urlImage;

    @ManyToOne
    @JoinColumn(name = "review_id")
    ShopReview review;
}
