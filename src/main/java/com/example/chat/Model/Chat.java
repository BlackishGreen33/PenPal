package com.example.chat.Model;

public class Chat {
    // Getter 和 Setter 方法
    private int chatId;       // 对话ID
    private String chatName;  // 对话名称
    private int userId;       // 用户ID

    // 无参构造函数
    public Chat() {
    }

    // 全参构造函数
    public Chat(int userId, String chatName) {
        this.userId = userId;
        this.chatName = chatName;

    }

    public int getChatId() {
        return chatId;
    }

    public String getChatName() {
        return chatName;
    }

    public int getUserId() {
        return userId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    // toString 方法，用于调试
    @Override
    public String toString() {
        return "Chat{" +
                "chatId=" + chatId +
                ", chatName='" + chatName + '\'' +
                ", userId=" + userId +
                '}';
    }
}
