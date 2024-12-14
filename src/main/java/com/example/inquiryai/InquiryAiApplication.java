package com.example.inquiryai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;
@SpringBootApplication
@MapperScan("com.example.inquiryai.mapper")
public class InquiryAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(InquiryAiApplication.class, args);
    }

}
