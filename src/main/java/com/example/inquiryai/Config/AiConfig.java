package com.example.inquiryai.Config;

import com.example.inquiryai.model.Chat;
import com.alibaba.dashscope.aigc.generation.Generation;
import com.alibaba.dashscope.aigc.generation.GenerationParam;
import com.alibaba.dashscope.aigc.generation.GenerationResult;
import com.alibaba.dashscope.common.Message;
import com.alibaba.dashscope.common.Role;
import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class AiConfig {
    public static GenerationResult callWithMessage(Chat chat) throws ApiException, NoApiKeyException, InputRequiredException {
        Generation gen = new Generation();
        Message systemMsg = Message.builder()
                .role(Role.SYSTEM.getValue())
                .content("你是华中师范大学的阿文，一个文本编辑助手。我可以帮助你进行文本编辑、语法检查、风格优化和内容建议。请告诉我你需要编辑的文本内容，我会尽力提供帮助。")
                .build();
        Message userMsg = Message.builder()
                .role(Role.USER.getValue())
                .content(chat.getMsg())
                .build();
        GenerationParam param = GenerationParam.builder()
                // 若没有配置环境变量，请用百炼API Key将下行替换为：.apiKey("sk-xxx")
                .apiKey("sk-1ee501c666c247b19c45011fd777d200")
                .model("qwen-turbo")
                .messages(Arrays.asList(systemMsg, userMsg))
                .resultFormat(GenerationParam.ResultFormat.MESSAGE)
                .build();
        return gen.call(param);
    }
}