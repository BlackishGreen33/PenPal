package com.example.inquiryai.mapper;

import com.example.inquiryai.model.Chat;
import com.example.inquiryai.model.Message;

import java.util.List;

public interface AiMapper {

    void insertMsg(Chat chat);

    void insertHistory(Chat chat);

    List<Message> getMessage(Chat chat);
}
