package com.singulax.flow.web.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.singulax.flow.common.util.VerifyCodeUtils;
import com.singulax.flow.web.constant.SessionConstant;

/**
 * @author: hp.long
 * @date : 2014-09-12 16:29
 */
@Controller
@RequestMapping("/validateCode")
public class ValidateCodeController extends BaseController{


    /**
     * 验证码字符数量
     */
    private static int CODE_SIZE = 4;

    /**
     * 验证码高度
     */
    private static int width = 200;

    /**
     * 验证码宽度
     */
    private static int heigh = 80;


    @RequestMapping("")
    public String createCode( HttpServletRequest request, HttpServletResponse response ){
        // 设置响应的类型格式为图片格式
        response.setContentType("image/jpeg");
        //禁止图像缓存。
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        HttpSession session = request.getSession();

        VerifyCodeUtils instance = new VerifyCodeUtils();
        String verifyCode = instance.generateVerifyCode(CODE_SIZE);
        session.setAttribute(SessionConstant.VAILDATE_CODE, verifyCode);
        try {
            VerifyCodeUtils.outputImage(width, heigh, response.getOutputStream(), verifyCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
