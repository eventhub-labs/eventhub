package com.eventhub.eventapp.common.exception;

import com.eventhub.eventapp.auth.exception.InvalidRefreshTokenException;
import com.eventhub.eventapp.auth.exception.UserAlreadyExistsException;
import com.eventhub.eventapp.auth.exception.InvalidCredentialsException;
import com.eventhub.eventapp.common.exception.dto.ErrorResponseDTO;
import com.eventhub.eventapp.common.exception.dto.ValidationErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleUserAlreadyExists(UserAlreadyExistsException ex){
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponseDTO> handleMethodArgumentNotValid(MethodArgumentNotValidException ex){
        Map<String, String> errors = new HashMap<>();

        for( FieldError fieldError : ex.getBindingResult().getFieldErrors() )
           errors.put(fieldError.getField(), fieldError.getDefaultMessage());

        return new ResponseEntity<>(new ValidationErrorResponseDTO(errors), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidCredentials(InvalidCredentialsException ex){
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<ErrorResponseDTO> handleInvalidRefreshToken(InvalidRefreshTokenException ex){
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

}
