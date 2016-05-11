package com.singulax.flow.common.util;

import java.security.MessageDigest;

public class MD5Util {
	public final static String MD5(String s) {
        char hexDigits[]={'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};       

        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
//    	distributorNo=ZX-001&productNo=YD-P-001&count=3&rechargeAccount=3123&rechargeType=1&encrypt=2D2A307AC552465D905991F2052FADF7
//        System.out.println(MD5Util.MD5("ZX-001YD-P-001331231reqnoDAFSAE"));
        System.out.println(MD5Util.MD5("123456"));
    }
}
