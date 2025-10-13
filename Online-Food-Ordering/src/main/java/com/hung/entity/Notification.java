package com.hung.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String title;
    String message;

    String receiverId; // ID của user/shop/shipper
    String type;       // "USER", "SHOP", "SHIPPER"

    Boolean readed = false;

    @CreationTimestamp
    LocalDateTime createdAt;
}

