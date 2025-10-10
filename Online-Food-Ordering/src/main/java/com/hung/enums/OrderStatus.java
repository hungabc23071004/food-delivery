package com.hung.enums;

public enum OrderStatus {
    PENDING,        // Đang chờ nhà hàng xác nhận
    ACCEPTED,       // Nhà hàng đã nhận đơn
    PREPARING,      // Đang chế biến
    SHIPPING,       // Đang giao
    DELIVERED,      // Đã giao hàng
    PAID,           // Đã thanh toán (với COD thì sau DELIVERED)
    CANCELED,       // Đơn bị hủy
    FAILED,         // Giao không thành công
    COMPLETED
}
