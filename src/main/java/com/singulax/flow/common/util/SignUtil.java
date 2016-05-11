package com.singulax.flow.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author: hp.long
 * @date : 2015-05-15 13:19
 */
public class SignUtil {

    private static Logger logger = LoggerFactory.getLogger(SignUtil.class);

    /**
     * 签名验证
     *
     * @param signStr
     *            需要签名的参数字符串
     * @param secret
     *            签名密钥
     * @return
     */
    public static String getSign(String signStr, String secret) {
        String sysSign = null;
        try {
            Map<String, Object> map = JSON.parseObject(signStr);
            TreeMap<String, Object> params = new TreeMap<>(map);
            StringBuilder sb = new StringBuilder("");
            for (Map.Entry entry : params.entrySet()) {
                String key = entry.getKey().toString();
                if (!key.equals("sign") && entry.getValue() != null) {
                    sb.append(entry.getKey()).append(entry.getValue());
                }
            }
            logger.debug("[签名字符串]，字符串：【{}】", sb.toString());
            sysSign = SHA1Util.getHmacSHA1(sb.toString(), secret);// 系统签名
        } catch (Exception e) {
            logger.error("[签名异常]，签名字符串：【{}】，渠道密钥：【{}】，异常信息：【{}】",
                    signStr, secret, e.getMessage());
        }
        return sysSign;
    }
}
