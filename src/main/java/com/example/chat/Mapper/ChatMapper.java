package com.example.chat.Mapper;

import com.example.chat.Model.Chat;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface ChatMapper {
    // 创建对话
    void createChat(Chat chat);

    // 删除对话
    Integer deleteChat(@Param("chatId") int chatId);

    // 更新对话名称
    Integer updateChatName(@Param("chatId") int chatId, @Param("newChatName") String newChatName);
}


