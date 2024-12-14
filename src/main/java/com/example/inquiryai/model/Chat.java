package com.example.inquiryai.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Chat {

    private  Integer ChatId;

    private String msg;

    public Integer getChatId() {
        return ChatId;
    }

    public void setChatId(Integer chatId) {
        ChatId = chatId;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}