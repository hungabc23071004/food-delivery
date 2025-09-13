package com.hung.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ShopDecorationRequest {
    MultipartFile logo;
    MultipartFile banner;
}
