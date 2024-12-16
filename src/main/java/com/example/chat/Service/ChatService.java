package com.example.chat.Service;
public interface ChatService {

    Integer createChat(Integer userId, String chatName);

    Integer deleteChat(Integer chatId);


    Integer updateChatName(Integer chatId, String newChatName);
}
