package com.singulax.flow.common.util;

import java.util.*;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;


public class CodeUtil {
	public static final String numberAndLetter = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    public static final String numberAndUpperLetter = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /**
	 * 返回8位随机加密短码
	 * @return
	 */
	public static String encryptCode(){
		return RandomStringUtils.random(8, numberAndUpperLetter);
	}
	
	/**
	 * 获取精确到秒的序号作为编号
	 * @param prefix 前缀
	 * @return
	 */
	public static String activityNo(String prefix){
		return prefix+DateUtil.getTimeStampString()+RandomStringUtils.random(6, numberAndUpperLetter);
	}
	
	/**
	 * 生成指定长度的随机码
	 * @return [a-zA-Z0-9]
	 */
	public static String batchSmsVerifyCode(int length) {
		return RandomStringUtils.random(length, numberAndLetter);
	}
	
	/**
	 * 生成单订单编号(32位), D + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 * @return
	 */
	public static String ordSequenceNo() {
		return generateSequenceNo("D");
	}

	/**
	 * 生成批次子订单编号(32位), E + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 *
	 * @return
	 */
	public static String bthOrderSequenceNo() {
		return generateSequenceNo("E");
	}
	
	/**
	 * 生成退卡订单编号(32位), BC + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 *
	 * @return
	 */
	public static String backCardOrderSequenceNo() {
		return generateSequenceNo("BC");
	}

	/**
	 * 生成订单编号
	 * @return
	 */
	private static String generateSequenceNo(String prefix) {
		return prefix + DateUtil.getTimeStampString().substring(2, 14) + RandomStringUtils.random(3, numberAndUpperLetter) + getNanoTime();
	}
	
	/**
	 * 生成编号
	 * @return
	 */
	public static String sequenceNo(String prefix) {
		return prefix + DateUtil.getTimeStampString().substring(0, 10) + RandomStringUtils.random(3, numberAndUpperLetter) + getNanoTime();
	}
	
	/**
	 * 生成订单流水号
	 * @return
	 */
	public static String ordSerialNo() {
		return DateUtil.getCodeTimeByDate(new Date()) + DateUtil.getMillisecondFromByDate().substring(8, 10) +
				RandomStringUtils.random(8, numberAndUpperLetter) + getNanoTime();
	}

	/**
	 * 生成用户编号(32位), U + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 * @return
	 */
	public static String genUserCode() {
		return generateSequenceNo("U");
	}

    /**
     * 生成临时批次号, 以"tmpBth"开头
     * @return
     */
    public static String genTempBatchNo() {
        return "tmpBth" + DateUtil.getTimeStampString() + RandomStringUtils.random(8, numberAndLetter) + getNanoTime();
    }

    /**
     * 生成批次号(32位), B + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
     * @return
     */
    public static String genBatchNo() {
		return generateSequenceNo("B");
	}

	/**
	 * 生成支付主订单编号(32位), P + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 * @return
	 */
	public static String genPaymentNo() {
		return generateSequenceNo("P");
	}

	/**
	 * 生成消费记录编号(32位), R + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 * @return
	 */
	public static String genConsumeRecordNo() {
		return generateSequenceNo("R");
	}

	/**
	 * 生成资金流水号(32位), F + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 * @return
	 */
	public static String genAssetFlowNo() {
		return generateSequenceNo("F");
	}
	
	/**
	 * 生成兑换卡密 记录 编号 EX
	 * @return
	 */
	public static String genExchangeBatchNo() {
		return generateSequenceNo("EX");
	}
	
	/**
	 * 生成用户资产号(32位), A + 12位时间(yyMMddHHmmss) + 3位随机字符 + 16位纳秒时间
	 * @return
	 */
	public static String genUserAssetNo() {
		return generateSequenceNo("A");
	}

	/**
	 * 获取System.nanoTime()的后16位
	 * System.nanoTime()的结果不具备通用性
	 * @return
	 */
	private static String getNanoTime() {
		return StringUtils.right(String.valueOf(System.nanoTime()), 16);
	}

    public static void main(String[] args) {
		System.out.println(CodeUtil.sequenceNo("").length());
		System.out.println(ordSerialNo());
		System.out.println(activityNo("AC"));
		System.out.println(ordSequenceNo().length());
		System.out.println(ordSequenceNo());
		
	}
	
	/**
	 * 使用给定的字符拼接集合, 调用集合中的元素的toString()方法
	 * @param collection 待拼接集合
	 * @param separator 分隔符
	 * @return 当collection为null或size=0时返回"", 否则返回格式 "1123123,kjkjkj,123kjkj" 的字符串
	 */
	public static String join(Collection collection, String separator) {
		StringBuilder sb = new StringBuilder();
		if (collection == null || collection.size() == 0) {
			return "";
		}

		for (Object o : collection) {
			sb.append(o.toString());
			sb.append(separator);
		}
		return sb.toString().substring(0, sb.toString().length() - 1);
	}

	/**
	 * 调用参数的toString()方法并且判断其内容是否为空
	 * @param obj 待检测对象
	 * @return 当obj为null, obj.toString().trim().length == 0 时返回true
	 */
	public static boolean isObjectBlank(Object obj) {
		return obj == null || obj.toString().trim().length() == 0;
	}

}
