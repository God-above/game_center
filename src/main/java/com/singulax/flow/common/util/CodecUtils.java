package com.singulax.flow.common.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.net.URLCodec;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class CodecUtils {

	private static final String ENCODING = "UTF-8";

	private static final String AES = "AES";

	private static final String HMACSHA1 = "HmacSHA1";

	private static URLCodec urlCodec = new URLCodec(ENCODING);

	/**
	 * 使用 HMAC-SHA1 签名方法对对src进行签名，然后转换为url可传输的base64形式
	 * 
	 * @param src
	 *            被签名的字符串
	 * @param secret
	 *            密钥
	 * @return
	 * @throws Exception
	 */
	public static String verifyByHmacSHA1Base64URLSafe(String src, String secret)
			throws Exception {
		byte[] data = secret.getBytes(ENCODING);
		// 根据给定的字节数组构造一个密钥,第二参数指定一个密钥算法的名称
		SecretKey secretKey = new SecretKeySpec(data, HMACSHA1);
		// 生成一个指定 Mac 算法 的 Mac 对象
		Mac mac = Mac.getInstance(HMACSHA1);
		// 用给定密钥初始化 Mac 对象
		mac.init(secretKey);

		byte[] text = src.getBytes(ENCODING);
		// 完成 Mac 操作
		byte[] hmacsha1 = mac.doFinal(text);
		// URL Safed Base64 encode
		return Base64.encodeBase64URLSafeString(hmacsha1);
	}

	/**
	 * URLEncoding 编码
	 * 
	 * @param src
	 * @return 编码结果
	 * @throws Exception
	 */
	public static String urlEncode(String src) throws Exception {
		return urlCodec.encode(src);
	}

	/**
	 * URLEncoding解码
	 * 
	 * @param src
	 * @return 解码结果
	 * @throws Exception
	 */
	public static String urlDecode(String src) throws Exception {
		return urlCodec.decode(src);
	}

	/**
	 * 获取密钥
	 *
	 * @param password
	 *            加密密码
	 * @return
	 * @throws java.security.NoSuchAlgorithmException
	 */
	private static SecretKeySpec getKey(String password)
			throws NoSuchAlgorithmException {
		// 密钥加密器生成器
		KeyGenerator kgen = KeyGenerator.getInstance(AES);
		SecureRandom random = SecureRandom.getInstance("SHA1PRNG");// 需要自己手动设置
		random.setSeed(password.getBytes());
		kgen.init(128, random);

		// 创建加密器
		SecretKey secretKey = kgen.generateKey();
		byte[] enCodeFormat = secretKey.getEncoded();

		SecretKeySpec key = new SecretKeySpec(enCodeFormat, AES);

		return key;
	}

	public static String AESEncode2Base64URLSafeString(String data,
			String password) throws NoSuchPaddingException, NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {
		Cipher cipher = Cipher.getInstance(AES);
		byte[] byteContent = data.getBytes(ENCODING);

		cipher.init(Cipher.ENCRYPT_MODE, getKey(password));
		byte[] result = cipher.doFinal(byteContent);

		return Base64.encodeBase64URLSafeString(result);
	}

	public static String AESDecodeByBase64URLSafeString(String data,
			String password) throws Exception {
		byte[] content = Base64.decodeBase64(data);

		Cipher cipher = Cipher.getInstance(AES);
		cipher.init(Cipher.DECRYPT_MODE, getKey(password));

		byte[] result = cipher.doFinal(content);
		return new String(result, ENCODING);
	}

    public static void main(String[] args) {
        String msg = "[{\"cOrderId\":\"test_1421739049935\",\"cProductId\":\"20141223P8DTZ3\",\"ext\":\"\",\"receiver\":\"13100000000\"},{\"cOrderId\":\"test_1421739049935\",\"cProductId\":\"20141223P8DTZ3\",\"ext\":\"\",\"receiver\":\"13100000000\"}]";
        try {
            String encode = CodecUtils.AESEncode2Base64URLSafeString(msg, "OLR57RCH");
            System.out.println("加密：" + encode);
            System.out.println("解密：" + CodecUtils.AESDecodeByBase64URLSafeString(encode,"OLR57RCH"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
