package com.hung.controller;

import com.hung.dto.response.ApiResponse;
import com.hung.service.FileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level= AccessLevel.PRIVATE , makeFinal = true)
public class FileController {
    FileService fileService;

    @PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<String > uploadFile(@RequestParam("file") MultipartFile file) {
        return ApiResponse.<String >builder()
                .result(fileService.uploadFile(file))
                .build();
    }
}
