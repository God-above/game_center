package com.singulax.flow.common.util;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * sha1签名工具类
 */
public class SHA1Util {

    /**
     * sha1加密
     * @param inputStr 待加密文字
     * @return 加密后的十六进制字符串
     */
    public static String SHA1(String inputStr) {
        return encrypt(inputStr, "sha-1");
    }

    /**
     * md5或者sha-1加密
     *
     * @param inputText
     *            要加密的内容
     * @param algorithmName
     *            加密算法名称：md5或者sha-1，不区分大小写
     * @return
     */
    private static String encrypt(String inputText, String algorithmName) {
        String encryptText = null;

        if (inputText == null || "".equals(inputText.trim())) {
            return encryptText;
        }
        if (algorithmName == null || "".equals(algorithmName.trim())) {
            algorithmName = "sha-1";
        }

        try {
            MessageDigest m = MessageDigest.getInstance(algorithmName);
            m.update(inputText.getBytes());
            byte s[] = m.digest();
            return hex(s);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return encryptText;
    }

    // 返回十六进制字符串
    private static String hex(byte[] arr) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < arr.length; ++i) {
            sb.append(Integer.toHexString((arr[i] & 0xFF) | 0x100).substring(1,
                    3));
        }
        return sb.toString();
    }
    
    /**
     * HmacSHA1签名摘要算法
     * @param secretCode
     * @param src
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     * @throws InvalidKeyException
     */
    public static String getHmacSHA1(String src,String secretCode)  
            throws NoSuchAlgorithmException, UnsupportedEncodingException,  
            InvalidKeyException {  
        Mac mac = Mac.getInstance("HmacSHA1");  
        SecretKeySpec secret = new SecretKeySpec(  
        		secretCode.getBytes("UTF-8"), mac.getAlgorithm());  
        mac.init(secret);  
        return hex(mac.doFinal(src.getBytes("UTF-8")));
    } 

    
    public static void main(String[] args) {
        //pass000001actionorderPkgappKeyapp000001phoneNo18600000001pkgNopkg000001pass000001
        //==> 7ADB1C26ECE172AE50B006FA0D765BDDCF6EDDAD

//        System.out.println(encrypt("pass000001actionorderPkgappKeyapp000001phoneNo18600000001pkgNopkg000001pass000001", "sha-1"));
    	String encryptCode="DXY1TJ";
        
        try {
//        	6ab97ba270783282de3e9ee84cb352ae1c40396c
			System.out.println(getHmacSHA1("456","123"));
//			3a2277a49157901a991db5fd69fdd81254b3195e
			System.out.println(getHmacSHA1("20141114_E5Y3VK20141121_6B2DFF18651813050test_1416553107788", encryptCode));
			System.out.println(getHmacSHA1("20141114_E5Y3VK", encryptCode));
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    }
    
}
