package com.hung.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    UNCATEGOEIZED_EXCEPTION(9999, "Uncategized error", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001, "User already exists", HttpStatus.BAD_REQUEST),
    USER_NAME_WRONG(1002, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_WRONG(1003, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1004, "Invalid message key", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User does not exist", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthicated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permision", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1009,"Email is already used with another account", HttpStatus.BAD_REQUEST),
    RESTAURANT_NOT_EXISTED(1010, "Restaurant does not exist", HttpStatus.NOT_FOUND),
    INGREDIENT_CATEGORY_NOT_EXISTED(1011, "Ingredient category does not exist", HttpStatus.NOT_FOUND),
    INGREDIENT_NOT_EXISTED(1012, "Ingredient does not exist", HttpStatus.NOT_FOUND),
    FOOD_NOT_EXISTED(1013, "Food does not exist", HttpStatus.NOT_FOUND),
    CART_ITEM_NOT_EXISTED(1015,"Cart item does not exist", HttpStatus.NOT_FOUND),
    ORSER_NOT_EXISTED(1016,"Series does not exist", HttpStatus.NOT_FOUND),
    CART_EMPTY(1017,"Cart is empty", HttpStatus.BAD_REQUEST ),
    VERIFICATION_TOKEN_IS_EXPRIRED(1018,"Verification token is expired", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_MATCH(1020,"Password does not match", HttpStatus.BAD_REQUEST),
    WRONG_PASSWORD(1021,"Wrong password", HttpStatus.BAD_REQUEST),
    USER_ADDRESS_NOT_EXISTED(1022,"User address does not exist", HttpStatus.NOT_FOUND),
    DO_NOT_DELETE_USER_ADDRESS(1021, "The default address cannot be deleted", HttpStatus.BAD_REQUEST),
    SHOP_CATEGORY_NOT_EXISTED(1022,"Shop category does not exist", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_EXISTED(1023,"Shop doesn't have this category",HttpStatus.NOT_FOUND);
    private Integer code;
    private String message;
    private HttpStatus httpStatus;

    private ErrorCode(Integer code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
