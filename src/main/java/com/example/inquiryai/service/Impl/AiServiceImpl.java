package com.example.inquiryai.service.Impl;

import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.utils.JsonUtils;
import com.example.inquiryai.Config.AiConfig;
import com.example.inquiryai.mapper.AiMapper;
import com.example.inquiryai.model.Chat;
import com.example.inquiryai.model.Message;
import com.example.inquiryai.service.AiService;
import com.example.inquiryai.utils.R;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @className: AiServiceImpl
 * @author: Zhang Qiping
 * @date: 2024/12/12 10:42
 * @Version: 1.0
 * @description:
 */

@Service
public class AiServiceImpl implements AiService {

    @Resource
    private AiConfig aiConfig;

    @Resource
    private AiMapper aiMapper;
    public R AiChat(Chat chat){
        // 调用大模型获取生成结果
        try {
            aiMapper.insertHistory(chat);
            GenerationResult result = aiConfig.callWithMessage(chat);
            ObjectMapper objectMapper = new ObjectMapper();
            String message = JsonUtils.toJson(result);
            JsonNode root = objectMapper.readTree(message);
            String content = root.path("output").path("choices").get(0).path("message").path("content").asText();
            chat.setMsg(content);
            aiMapper.insertMsg(chat);
            List<Message> messages = aiMapper.getMessage(chat);
            return R.success(messages);
        }catch (Exception e){
            e.printStackTrace();
            return R.fail("请求失败");
        }
    }
}
