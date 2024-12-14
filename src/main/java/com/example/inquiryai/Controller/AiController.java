package com.example.inquiryai.Controller;

import com.example.inquiryai.model.Chat;
import com.example.inquiryai.model.Message;
import com.example.inquiryai.service.AiService;
import com.example.inquiryai.utils.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @className: AiController
 * @author: Zhang Qiping
 * @date: 2024/12/12 10:38
 * @Version: 1.0
 * @description:
 */

@RestController
@RequestMapping
public class AiController {

    @Resource
    private AiService aiService;

    @PostMapping("/ai")
    public R aiChat(@RequestBody Chat chat){
        return aiService.AiChat(chat);
    }
}
