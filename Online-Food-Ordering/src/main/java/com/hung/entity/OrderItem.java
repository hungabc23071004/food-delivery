package com.hung.entity;

import com.hung.until.StringListConverter;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    Food food;

    Long quantity;

    Long totalPrice;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    List<String> ingredients=new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;
}
