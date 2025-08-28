package com.hung.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserAddressRequest {
    @NotBlank
    private String fullAddress;

    private String detailAddress;

    @NotBlank
    private String receiverName;

    @NotBlank
    private String phoneNumber;

    private String note;

    private boolean defaultAddress;

    @NotNull
    private BigDecimal latitude;

    @NotNull
    private BigDecimal longitude;

    private String ward;
    private String wardCode;
    private String district;
    private String districtId;
    private String province;
    private String provinceId;

    private String addressType; // HOME / OFFICE / OTHER
}
