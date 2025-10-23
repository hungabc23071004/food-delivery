package com.hung.service;

import io.minio.*;
import io.minio.http.Method;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FileService {

    MinioClient minioClient;

    @NonFinal
    @Value("${minio.bucket}")
    String bucketName; // KHÔNG final -> để Spring inject giá trị này

    public String uploadFile(MultipartFile file) {
        try {
            boolean found = minioClient.bucketExists(
                    BucketExistsArgs.builder().bucket(bucketName).build()
            );
            if (!found) {
                minioClient.makeBucket(
                        MakeBucketArgs.builder().bucket(bucketName).build()
                );
            }
            String fileStorageName = UUID.randomUUID() + file.getOriginalFilename();
            try (InputStream inputStream = file.getInputStream()) {
                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(bucketName)
                                .object(fileStorageName)
                                .stream(inputStream, file.getSize(), -1)
                                .contentType(file.getContentType())
                                .build()
                );
            }

            return fileStorageName;

        } catch (Exception e) {
            throw new RuntimeException("Upload file thất bại: " + e.getMessage(), e);
        }
    }

    public String getFileUrl(String fileName) {
        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(bucketName)
                            .object(fileName)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Không thể lấy URL file: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String fileName) {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Xóa file thất bại: " + e.getMessage(), e);
        }
    }
}
