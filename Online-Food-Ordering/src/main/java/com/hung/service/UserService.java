package com.hung.service;

import com.hung.constant.PredefinedRole;
import com.hung.dto.request.UserAvatarRequest;
import com.hung.dto.request.UserCreationRequest;
import com.hung.dto.request.UserUpdateRequest;
import com.hung.dto.response.UserResponse;
import com.hung.entity.Role;
import com.hung.entity.User;
import com.hung.entity.VerificationToken;
import com.hung.exception.AppException;
import com.hung.exception.ErrorCode;
import com.hung.mapper.UserMapper;
import com.hung.repository.RoleRepository;
import com.hung.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    EmailService emailService;

    @NonFinal
    @Value("${spring.mail.expiryTime}")
    int expiryTime;

    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    public UserResponse createUser(UserCreationRequest request) throws Exception {
        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(false);

        List<Role> roles = new ArrayList<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);
        VerificationToken vt = VerificationToken.builder()
                .user(user)
                .expiryDate(LocalDateTime.now().plusSeconds(expiryTime))
                .token(UUID.randomUUID().toString())
                .build();
        user.getVerificationTokens().add(vt);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        emailService.sendVerificationEmail(user.getEmail(), vt.getToken(),user.getUsername());
        return userMapper.toUserResponse(user);
    }


    public void activeUser(String username,String token) {
        User user = userRepository.findByUsernameAndActive(username,false)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<VerificationToken> verificationTokens = user.getVerificationTokens();
        for (VerificationToken verificationToken : verificationTokens) {
            if (verificationToken.getToken().equals(token)) {
                if(verificationToken.getExpiryDate().isAfter(LocalDateTime.now())) {
                    user.setActive(true);
                    userRepository.save(user);
                    return;
                }
                else{
                    throw new AppException(ErrorCode.VERIFICATION_TOKEN_IS_EXPRIRED);
                }
            }
        }
        throw new AppException(ErrorCode.VERIFICATION_TOKEN_IS_EXPRIRED);

    }

    public UserResponse updateUser( UserUpdateRequest request) {

        User user = userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(),true)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);
        if(request.getPassword()!=null && !request.getPassword().equals(request.getRepeatPassword())){
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        if(request.getPassword()!=null){
            if (passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            } else {
                throw new AppException(ErrorCode.WRONG_PASSWORD);
            }
        }

        if(request.getRoles()!=null){
            var roles = roleRepository.findAllById(request.getRoles());
            user.setRoles(new ArrayList<>(roles));
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsernameAndActive(name,true).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }


    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public List<UserResponse> getUsers() {
        log.info("In method get Users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).collect(Collectors.toList());
    }

    public UserResponse getUser(String id) {
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    public  String changeAvatar ( UserAvatarRequest request) throws IOException {
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        if(!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))){
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }
        User user = userRepository.findByUsernameAndActive(SecurityContextHolder.getContext().getAuthentication().getName(),true).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if(user.getAvatarUrl()!=null){
            Path oldAvatarUrl = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(user.getAvatarUrl());
            Files.deleteIfExists(oldAvatarUrl);
        }

        Path file = CURRENT_FOLDER.resolve(staticPath).resolve(imagePath).resolve(request.getAvatarUrl().getOriginalFilename());
        try(OutputStream os =Files.newOutputStream(file)){
            os.write(request.getAvatarUrl().getBytes());
        }
        user.setAvatarUrl(request.getAvatarUrl().getOriginalFilename().toString());
        userRepository.save(user);
        return file.toString();
    }

}
