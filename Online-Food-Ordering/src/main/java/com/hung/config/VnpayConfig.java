package com.hung.config;

import com.hung.util.VnpayUtil;
import lombok.Getter;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;


@Configuration

    public class VnpayConfig {
        @Getter
        private String vnp_Payurl="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        private  String vnp_ReturnUrl="http://localhost:8080/food/payment/vn-pay-callback";
        private  String vnp_TmnCode="J29SJO2W";
        @Getter
        public  String secretKey="8NX0ZBUMFUNX3UBZ4S4NB2UKGIBC0RY3";
        public  String vnp_Version="2.1.0";
        public  String  vnp_Command="pay";
        public  String orderType="other";

        public Map<String, String> getVNPayConfig() {
            Map<String, String> vnpParamsMap = new HashMap<>();
            vnpParamsMap.put("vnp_Version", vnp_Version);
            vnpParamsMap.put("vnp_Command", vnp_Command);
            vnpParamsMap.put("vnp_TmnCode", vnp_TmnCode);
            vnpParamsMap.put("vnp_CurrCode", "VND");
            vnpParamsMap.put("vnp_TxnRef", VnpayUtil.getRandomNumber(8));
            vnpParamsMap.put("vnp_OrderInfo", "Thanh toan don hang " +  VnpayUtil.getRandomNumber(8));
            vnpParamsMap.put("vnp_OrderType", orderType);
            vnpParamsMap.put("vnp_Locale", "vn");
            vnpParamsMap.put("vnp_ReturnUrl", vnp_ReturnUrl);
            Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnpCreateDate = formatter.format(calendar.getTime());
            vnpParamsMap.put("vnp_CreateDate", vnpCreateDate);
            calendar.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(calendar.getTime());
            vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);
            return vnpParamsMap;
        }


    }

