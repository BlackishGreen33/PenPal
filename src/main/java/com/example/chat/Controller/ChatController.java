package com.example.chat.Controller;

import com.example.chat.Service.ChatServiceImp;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatServiceImp chatServiceImp;

    @Autowired
    public ChatController(ChatServiceImp chatServiceImp) {
        this.chatServiceImp = chatServiceImp;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createChat(@RequestBody Map<String, Object> requestBody) {
        Integer userId = (Integer) requestBody.get("userId");
        String chatName = "New Chat";
        Integer chatId = chatServiceImp.createChat(userId, chatName);

        // 构建响应数据
        Map<String, Object> response = new HashMap<>();
        response.put("chatId", chatId);
        response.put("chatName", chatName);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    // 删除对话接口
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteChat(@RequestBody Map<String, Integer> requestBody) {
        Integer chatId = requestBody.get("chatId");

        if (chatServiceImp.deleteChat(chatId) != null) {
            return new ResponseEntity<>("Chat deleted successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Chat not found!", HttpStatus.NOT_FOUND);
        }
    }

    // 更新对话名称接口
    @PostMapping("/update")
    public ResponseEntity<String> updateChatName(@RequestBody Map<String, Object> requestBody) {
        Integer chatId = (Integer) requestBody.get("chatId");
        String newChatName = (String) requestBody.get("newChatName");

        if (chatServiceImp.updateChatName(chatId, newChatName) > 0) {
            return new ResponseEntity<>("Chat name updated successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Chat not found or update failed!", HttpStatus.NOT_FOUND);
        }
    }



}
