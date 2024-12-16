package com.example.chat.Service;

import com.example.chat.Controller.ChatController;
import com.example.chat.Mapper.ChatMapper;
import com.example.chat.Model.Chat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImp implements ChatService {

    private final ChatMapper chatMapper;

    @Autowired
    public ChatServiceImp(ChatMapper chatMapper) {
        this.chatMapper = chatMapper;
    }

    @Override
    public Integer createChat(Integer userId, String chatName) {
        Chat chat = new Chat(userId,chatName);
        Logger logger = LoggerFactory.getLogger(ChatServiceImp.class);
        logger.info(chatName);
        chatMapper.createChat(chat);
        return  chat.getChatId();
    }

    @Override
    public Integer deleteChat(Integer chatId) {
        return chatMapper.deleteChat(chatId);
    }

    @Override
    public Integer updateChatName(Integer chatId, String newChatName) {
        return chatMapper.updateChatName(chatId, newChatName);
    }
}

