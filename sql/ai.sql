CREATE TABLE Message (
                         msgId INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each message
                         chatId INT NOT NULL,                  -- ID to associate with a chat session
                         msg TEXT NOT NULL,                    -- Message content
                         CONSTRAINT fk_chatId FOREIGN KEY (chatId) REFERENCES InquiryAI(chatId) -- Foreign key constraint
);