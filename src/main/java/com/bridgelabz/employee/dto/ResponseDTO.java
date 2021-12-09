package com.bridgelabz.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ResponseDTO {
    private Long statusCode;
    private String message;
    private Object data;
    private String token;

    public ResponseDTO(long statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public ResponseDTO(long statusCode, String message, Object data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
