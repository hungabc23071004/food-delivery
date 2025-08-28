package com.hung.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    // config thu muc chua anh
    // không lưu ảnh trong resource vì khi buil file jar/war thư mục bị gói trong đó và không thể lưu ảnh và path đó
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/images/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/uploads/images/");
    }
}