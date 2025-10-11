package com.hung.service;

import com.hung.dto.request.ShippingFeeRequest;
import com.hung.dto.response.ShippingFeeResponse;
import com.hung.entity.ShopAddress;
import com.hung.entity.UserAddress;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.repository.ShopRepository;
import com.hung.repository.UserAddressRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipService {

    UserAddressRepository userAddressRepository;
    ShopRepository shopRepository;

    // Hàm tính khoảng cách giữa 2 toạ độ (Haversine Formula)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Bán kính Trái Đất (km)
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    // Hàm tính phí gốc theo khoảng cách
    public double calculateBaseFee(double storeLat, double storeLng, double userLat, double userLng) {
        double distanceKm = calculateDistance(storeLat, storeLng, userLat, userLng);

        double baseFee = 8000;   // phí mở đơn
        double perKmFee = 2500;  // phí mỗi km
        double fee = baseFee + distanceKm * perKmFee;
        if (fee < 10000) fee = 10000;
        if (fee > 40000) fee = 40000;

        return Math.ceil(fee / 1000) * 1000;
    }

    // Hàm tính phí cuối cùng (đã áp dụng ưu đãi)
    public ShippingFeeResponse calculateFinalFee(ShippingFeeRequest request) {
        UserAddress userAddress = userAddressRepository.findById(request.getUserAddressId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_ADDRESS_NOT_EXISTED));

        var shop = shopRepository.findById(request.getShopId())
                .orElseThrow(() -> new AppException(ErrorCode.SHOP_NOT_EXISTED));
        ShopAddress shopAddress = shop.getShopAddress();

        double storeLat = shopAddress.getLatitude().doubleValue();
        double storeLng = shopAddress.getLongitude().doubleValue();
        double userLat = userAddress.getLatitude().doubleValue();
        double userLng = userAddress.getLongitude().doubleValue();

        double baseFee = calculateBaseFee(storeLat, storeLng, userLat, userLng);
        double distanceKm = calculateDistance(storeLat, storeLng, userLat, userLng);

        double discount =calculateDiscount(distanceKm, baseFee);


        double finalFee = baseFee - discount;
        if (finalFee < 0) finalFee = 0;

        return ShippingFeeResponse.builder()
                .baseFee(baseFee)
                .discount(discount)
                .distanceKm(distanceKm)
                .finalFee(Math.ceil(finalFee / 1000) * 1000)
                .build();
    }

    private double calculateDiscount(double distanceKm, double baseFee) {
        double discount = 0;

        if (distanceKm <= 2.0) {
            discount = baseFee;
        }


        java.time.LocalTime now = java.time.LocalTime.now();
        if (now.isAfter(java.time.LocalTime.of(11, 0)) && now.isBefore(java.time.LocalTime.of(13, 0))) {
            discount += baseFee * 0.2;
        }

        if (discount > baseFee * 0.8) {
            discount = baseFee * 0.8;
        }

        return discount;
    }


}
