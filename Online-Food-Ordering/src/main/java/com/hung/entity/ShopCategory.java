package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class ShopCategory {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        String id;

        @Column(nullable = false, length = 100)
        String name;

        @Column(length = 500)
        String description;

        // 🔹 Logo (dùng cho danh mục cha)
        String logoUrl;

        // 🔹 Ảnh hiển thị (dùng cho danh mục con)
        String imageUrl;

        // 🔹 Self-reference: Danh mục cha
        @ManyToOne
        @JoinColumn(name = "parent_id")
        ShopCategory parent;

        // 🔹 Self-reference: Danh mục con
        @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
        List<ShopCategory> children = new ArrayList<>();

        // 🔹 Many-to-Many với Shop
        @Builder.Default
        @ManyToMany(mappedBy = "categories")
        List<Shop> shops = new ArrayList<>();
}
