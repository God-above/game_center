package com.singulax.flow.web.controller.interceptor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.fastjson.JSONObject;
import com.singulax.flow.web.constant.SessionConstant;

/**
 * 请求参数拦截器
 */
public class RequestParamsInterceptor extends HandlerInterceptorAdapter {

    public static final Logger logger = LoggerFactory.getLogger(RequestParamsInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String queryStr = request.getQueryString();
        String requestMethod = request.getMethod();
        String requestURL = request.getRequestURL().toString();
        if (!StringUtils.endsWithAny(requestURL, ".js", ".css", ".html", ".png", ".jpg", ".jpeg", ".woff2")) {
            logger.debug("拦截[{}]请求, 地址[ {} ]", requestMethod, requestURL + (StringUtils.isBlank(queryStr) ? "" : "?" + queryStr));
        }
        String content = null;
        if (StringUtils.equalsIgnoreCase(requestMethod, "post")) {
            Map<String, Object> params;
            try {
                content = getRequestBody(request);
                //保存请求体到request属性, 防止后面的逻辑需要原始的请求体内容
                request.setAttribute(SessionConstant.REQUEST_BODY, content);
                params = JSONObject.parseObject(content, Map.class);
                logger.info("就收到的参数为[{}]", params);
            }
            catch (Exception e) {
                logger.info("按JSON解析post请求体到Map发生异常, 尝试使用request.getParameter()方法构造, 请求地址:[ {} ], 请求内容:[ {} ]", request.getRequestURI(), content);
                params = new HashMap<>();
                Enumeration<String> reqParamNames = request.getParameterNames();
                while (reqParamNames.hasMoreElements()) {
                    String reqParamName = reqParamNames.nextElement();
                    params.put(reqParamName, request.getParameter(reqParamName));
                }
            }
            request.setAttribute(SessionConstant.PARAM_MAP, params);
        }
        return true;
    }

    /**
     * 从request获取请求内容
     * @param request
     * @return
     */
    private String getRequestBody(HttpServletRequest request) {
        String content = null;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream(), "utf-8"))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            content = sb.toString();
        }
        catch (IOException e) {
            logger.warn("读取请求体内容异常, 请求地址:[ {} ]", request.getRequestURI());
        }

        return content;
    }
}
