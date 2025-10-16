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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ApiResponse<Page<NotificationResponse>> getShopNotifications(@RequestParam String receiverId,
                                                                        @RequestParam(defaultValue = "1") int page,
                                                                        @RequestParam(defaultValue = "5") int size

    ) {
        Pageable pageable = PageRequest.of(page-1, size);
        return ApiResponse.<Page<NotificationResponse>>builder()
                .result(notificationService.getShopNotifications(receiverId,pageable))
                .build();
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
    }

    // Endpoint test gửi notification thủ công
    @PostMapping("")
    public void  testSendNotification(@RequestBody NotificationRequest request) {
         notificationService.sendNotification(request);
    }
}
