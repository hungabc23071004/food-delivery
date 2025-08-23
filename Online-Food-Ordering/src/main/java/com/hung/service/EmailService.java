package com.hung.service;

import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String token, String username) throws Exception {
        String subject = "Xác minh tài khoản";
        String verificationUrl = "http://localhost:5173/verification?token=" + token + "&username=" + username;
        String content = "<b>Chúc mừng bạn đã đăng kí tài khoản thành công trên FOOD DELIVERY!</b><br><br>"
                + "Nhấn vào <a href=\"" + verificationUrl + "\">đây</a> để xác minh tài khoản.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true); // true để gửi HTML

        mailSender.send(message);
    }
}
