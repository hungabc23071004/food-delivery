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
public class ReviewTag {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name; // Ví dụ: "Đồ ăn ngon", "Giao hàng nhanh"
}
