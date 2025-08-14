package com.hung.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class OrderItermOption {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String  id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    OrderItem orderItem;

    String optionName;

    // Giá trị của tùy chọn (Lớn, Trân châu, 50%, Không đá, Cấp độ 3...)
    String optionValue;

    // Phụ phí thêm cho tùy chọn này (nếu có)
    @Builder.Default
    BigDecimal extraPrice = BigDecimal.ZERO;
}
