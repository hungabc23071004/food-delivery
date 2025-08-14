package com.hung.entity;

import lombok.Getter;

@Getter
public enum Payment {
    COD("Thanh toán khi nhận hàng"),
    BANKING("Chuyển khoản");
    Payment(String description) {
        this.description = description;
    }

    private final String description;
}
