package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShopReview {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    int rating;
    String comment;

    @CreationTimestamp
    @Column(updatable = false)
    LocalDateTime createdAt;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    Order order; // Đơn hàng đã mua

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    User user; // Người viết review

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shop_id", nullable = false)
    Shop shop; // Quán được review



    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ReviewImage> images; // Ảnh review

    @ManyToMany
    @JoinTable(
            name = "review_tags",
            joinColumns = @JoinColumn(name = "review_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    List<ReviewTag> tags; // Tag như ShopeeFood


}

