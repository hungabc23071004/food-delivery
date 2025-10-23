package com.hung.config;


import io.minio.MinioClient;
import io.minio.SetBucketPolicyArgs;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MinioConfig {

    @Value("${minio.url}")
    private String url;

    @Value("${minio.access-key}")
    private String accessKey;

    @Value("${minio.secret-key}")
    private String secretKey;

    @Value("${minio.bucket}")
    private String bucketName;

    @Bean
    public MinioClient minioClient() {
        try {
            // ✅ 1. Khởi tạo MinioClient
            MinioClient minioClient = MinioClient.builder()
                    .endpoint(url)
                    .credentials(accessKey, secretKey)
                    .build();


            String policyJson = """
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {"AWS": ["*"]},
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": ["arn:aws:s3:::%s"]
    },
    {
      "Effect": "Allow",
      "Principal": {"AWS": ["*"]},
      "Action": [
        "s3:GetObject",
        "s3:ListMultipartUploadParts"
      ],
      "Resource": ["arn:aws:s3:::%s/*"]
    }
  ]
}
""".formatted(bucketName, bucketName);


            minioClient.setBucketPolicy(
                    SetBucketPolicyArgs.builder()
                            .bucket(bucketName)
                            .config(policyJson)
                            .build()
            );

            System.out.println("🌍 Bucket '" + bucketName + "' đã được set quyền public!");
            return minioClient;

        } catch (Exception e) {
            throw new RuntimeException("❌ Lỗi khi cấu hình MinIO: " + e.getMessage(), e);
        }
    }
}

