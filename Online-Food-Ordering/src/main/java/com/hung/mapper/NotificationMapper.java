package com.hung.mapper;

import com.hung.dto.request.NotificationRequest;
import com.hung.dto.response.NotificationResponse;
import com.hung.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse toResponse(Notification notification);

    @Mapping(target = "receiverId", ignore = true)
    Notification toNotification(NotificationRequest request);

    List<NotificationResponse> toResponseList(List<Notification> notifications);
}
