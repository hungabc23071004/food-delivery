package com.hung.service;

import com.hung.entity.ShopAddress;
import com.hung.entity.UserAddress;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AhamoveService {

    private static final String API_URL = "https://apis.ahamove.com/v1/order/estimate";
    private static final String API_KEY = "YOUR_STAGING_API_KEY"; // TODO: thay bằng key Ahamove gửi

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> estimateShipping(
            UserAddress userAddress, ShopAddress shopAddress
            ) {

        // Body request
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("service_id", "bike"); // mặc định Siêu tốc (Bike)

        List<Map<String, Object>> requests = new ArrayList<>();

        Map<String, Object> shop = new HashMap<>();
        shop.put("lat", shopAddress.getLatitude());
        shop.put("lng", shopAddress.getLongitude());
        shop.put("address", shopAddress.getFullAddress());

        Map<String, Object> customer = new HashMap<>();
        customer.put("lat", userAddress.getLatitude());
        customer.put("lng", userAddress.getLongitude());
        customer.put("address",userAddress.getFullAddress() );

        requests.add(shop);
        requests.add(customer);

        requestBody.put("requests", requests);

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Call API
        ResponseEntity<Map> response = restTemplate.exchange(
                API_URL, HttpMethod.POST, entity, Map.class
        );

        return response.getBody();
    }

}
