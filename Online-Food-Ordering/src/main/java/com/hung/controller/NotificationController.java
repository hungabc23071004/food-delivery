package com.hung.controller;

import com.hung.dto.request.NotificationRequest;
import com.hung.dto.response.ApiResponse;
import com.hung.dto.response.NotificationResponse;
import com.hung.entity.Notification;
import com.hung.mapper.NotificationMapper;
import com.hung.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NotificationController {

    NotificationService notificationService;

    @GetMapping("/shop")
    public ApiResponse<List<NotificationResponse>> getShopNotifications(@RequestParam String receiverId) {
        return ApiResponse.<List<NotificationResponse>>builder()
                .result(notificationService.getShopNotifications(receiverId))
                .build();
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
    }

    // Endpoint test gửi notification thủ công
    @PostMapping("/test-send")
    public void  testSendNotification(@RequestBody NotificationRequest request) {
         notificationService.sendNotification(request);
    }
}
