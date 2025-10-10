package com.hung.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ShipService {
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

    public double calculateBaseFee(double storeLat, double storeLng, double userLat, double userLng) {
        double distanceKm = calculateDistance(storeLat, storeLng, userLat, userLng);

        double baseFee = 8000;   // phí mở đơn
        double perKmFee = 2500;  // phí mỗi km
        double fee = baseFee + distanceKm * perKmFee;

        if (fee < 10000) fee = 10000;
        if (fee > 40000) fee = 40000;

        return Math.ceil(fee / 1000) * 1000;
    }

    public double calculateFinalFee(double storeLat, double storeLng,
                                    double userLat, double userLng,
                                    double totalFoodPrice) {
        double baseFee = calculateBaseFee(storeLat, storeLng, userLat, userLng);
        double distanceKm = calculateDistance(storeLat, storeLng, userLat, userLng);
        double discount = 0;

        // 1️⃣ Free ship nếu dưới 2km
        if (distanceKm <= 2.0) {
            discount = baseFee;
        }
        // 2️⃣ Giảm 50% nếu đơn trên 100k
        else if (totalFoodPrice >= 100000) {
            discount = baseFee * 0.5;
            if (discount > 10000) discount = 10000; // giới hạn giảm tối đa
        }

        double finalFee = baseFee - discount;
        return Math.ceil(finalFee / 1000) * 1000;
    }
}


