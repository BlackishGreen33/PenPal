package com.example.inquiryai.utils;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.NullSerializer;
import lombok.Data;

import java.time.LocalDate;

@Data
@JsonSerialize(keyUsing = NullSerializer.class)
public class R <T>{

    private LocalDate date;

    private T message;

    private Integer status;

    public R(T msg, Integer status) {
        this.message = msg;
        this.status = status;
        this.date = LocalDate.now();
    }

    public static <T> R<T> success(T msg){
        return new R<>(msg, 200);
    }

    public static <T> R<T> fail(T msg){
        return new R<>(msg, 403);
    }

    public static R fail(String msg){
        return new R(msg, 403);
    }

    public static R success(String msg){
        return new R(msg, 200);
    }
}