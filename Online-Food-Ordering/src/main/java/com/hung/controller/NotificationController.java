package com.hung.controller;

import com.hung.entity.Notification;
import com.hung.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{receiverId}")
    public List<Notification> getUserNotifications(@PathVariable String receiverId) {
        return notificationService.getNotifications(receiverId);
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
    }
}
