package com.singulax.flow.common.util;

import org.apache.commons.collections.CollectionUtils;

import java.util.*;

/**
 * 手机号工具类
 */
public abstract class MobileUtil {
    /** 移动号段 */
    private static final Integer[] CMCC_SEGMENT = {139, 138, 137, 136, 135, 134, 147, 150, 151, 152, 157, 158, 159, 178, 182, 183, 184, 187, 188};

    /** 联通号段 */
    private static final Integer[] CUCC_SEGMENT = {130, 131, 132, 155, 156, 185, 186, 145, 176};

    /** 电信号段 */
    private static final Integer[] CTCC_SEGMENT = {133, 153, 177, 180, 181, 189};

    public static final String CARRIER_CMCC = "cmcc";
    public static final Integer CARRIER_CMCC_TYPE = 1;
    public static final String CARRIER_CUCC = "cucc";
    public static final Integer CARRIER_CUCC_TYPE = 2;
    public static final String CARRIER_CTCC = "ctcc";
    public static final Integer CARRIER_CTCC_TYPE = 3;

    /**
     * 检查是否是以1开头的11位数字
     *
     * @param mobile 待检测手机号
     * @return 10000000000:true 01234567890:false 13412341234:true null:false "":false 12345678913456789:false 1234567891a:false
     */
    public static boolean isMobileNumber(String mobile) {
        if (mobile == null || mobile.length() == 0 || mobile.length() != 11) {
            return false;
        }

        return mobile.matches("^\\d{11}$");
    }

    /**
     * 检查是否在可用的手机号段(移动,联通,电信)
     *
     * @param mobile 待检测的手机号
     * @return boolean
     * @see #CMCC_SEGMENT
     * @see #CUCC_SEGMENT
     * @see #CTCC_SEGMENT
     */
    public static boolean isValidMobileNumber(String mobile) {
        return isCMCCMobileNumber(mobile) || isCUCCMobileNumber(mobile) || isCTCCMobileNumber(mobile);
    }

    /**
     * 检查是否在可用的手机号段(移动,联通,电信)
     *
     * @param mobile         待检测的手机号
     * @param carrierMobiles 保存到对应的运营商下
     * @return boolean
     * @see #CMCC_SEGMENT
     * @see #CUCC_SEGMENT
     * @see #CTCC_SEGMENT
     */
    public static boolean isValidMobileNumber(String mobile, Map<String, List<String>> carrierMobiles) {
        if (isCMCCMobileNumber(mobile)) {
            carrierMobiles.get(CARRIER_CMCC).add(mobile);
        }
        else if (isCUCCMobileNumber(mobile)) {
            carrierMobiles.get(CARRIER_CUCC).add(mobile);
        }
        else if (isCTCCMobileNumber(mobile)) {
            carrierMobiles.get(CARRIER_CTCC).add(mobile);
        }
        else {
            return false;
        }

        return true;
    }

    /**
     * 检查是否在可用的移动手机号段
     *
     * @param mobile 待检测的手机号
     * @return boolean
     * @see #CMCC_SEGMENT
     */
    public static boolean isCMCCMobileNumber(String mobile) {
        if (isMobileNumber(mobile)) {
            for (Integer segment : CMCC_SEGMENT) {
                if (mobile.matches("^" + segment + "\\d{8}")) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 检查是否在可用的联通手机号段
     *
     * @param mobile 待检测的手机号
     * @return boolean
     * @see #CUCC_SEGMENT
     */
    public static boolean isCUCCMobileNumber(String mobile) {
        if (isMobileNumber(mobile)) {
            for (Integer segment : CUCC_SEGMENT) {
                if (mobile.matches("^" + segment + "\\d{8}")) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 检查是否在可用的电信手机号段
     *
     * @param mobile 待检测的手机号
     * @return boolean
     * @see #CTCC_SEGMENT
     */
    public static boolean isCTCCMobileNumber(String mobile) {
        if (isMobileNumber(mobile)) {
            for (Integer segment : CTCC_SEGMENT) {
                if (mobile.matches("^" + segment + "\\d{8}")) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 检查并统计合法的手机号
     *
     * @param mobiles 待检测
     * @return map类型, {total: 传入的总条数, validCount: 合法的总条数, validSet: 合法号码的数组,
     * inValidCount: 不合法的总条数, inValidSet: 不合法的号码数组, carrierMobiles: 保存手机号到对应的运营商下}
     */
    public static Map<String, Object> parseMobile(Collection<String> mobiles) {
        Map<String, Object> result = new HashMap<>();
        List<String> invalidMobiles = new ArrayList<>();
        int inValidCount = 0;
        int total = 0;

        if (mobiles != null && mobiles.size() > 0) {
            total = mobiles.size();
            Map<String, List<String>> carrierMobiles = new HashMap<String, List<String>>();     // 按运营商保存手机号
            carrierMobiles.put(CARRIER_CMCC, new ArrayList<String>());
            carrierMobiles.put(CARRIER_CUCC, new ArrayList<String>());
            carrierMobiles.put(CARRIER_CTCC, new ArrayList<String>());

            for (String mobile : mobiles) {
                if (!isValidMobileNumber(mobile, carrierMobiles)) {
                    inValidCount++;
                    invalidMobiles.add(mobile);
                }
            }
            result.put("carrierMobiles", carrierMobiles);
        }
        result.put("total", total);
        result.put("inValidCount", inValidCount);
        result.put("validCount", total - inValidCount);
        result.put("invalidSet", invalidMobiles);
        return result;
    }

    /**
     * 检查并统计合法的手机号
     *
     * @param mobiles 待检测的字符串列表
     * @param isTrimSpace 是否去除前后的空白字符
     * @return 如果mobiles为null则返回null; size为0或没有可用的号码时返回的实例的total属性为0
     */
    public static MobileParseResult parseMobileNumber(Collection<String> mobiles, boolean isTrimSpace) {
        if (CollectionUtils.isNotEmpty(mobiles)) {
            MobileParseResult parseResult = new MobileParseResult();

            List<String> cmccNos = new ArrayList<>();
            List<String> ctccNos = new ArrayList<>();
            List<String> cuccNos = new ArrayList<>();
            List<String> validNos = new ArrayList<>();
            List<String> invalidNos = new ArrayList<>();

            for (String mobile : mobiles) {
                if (isTrimSpace) {
                    mobile = mobile.trim();
                }

                if (isCMCCMobileNumber(mobile)) {
                    cmccNos.add(mobile);
                    validNos.add(mobile);
                }
                else if (isCUCCMobileNumber(mobile)) {
                    validNos.add(mobile);
                    cuccNos.add(mobile);
                }
                else if (isCTCCMobileNumber(mobile)) {
                    ctccNos.add(mobile);
                    validNos.add(mobile);
                }
                else {
                    invalidNos.add(mobile);
                }
            }

            parseResult.setTotal(mobiles.size());
            parseResult.setValidTotal(validNos.size());
            parseResult.setValidNumbers(validNos);
            parseResult.setInvalidTotal(invalidNos.size());
            parseResult.setInvalidNumbers(invalidNos);
            parseResult.setValidCMCCNumbers(cmccNos);
            parseResult.setValidCUCCNumbers(cuccNos);
            parseResult.setValidCTCCNumbers(ctccNos);
            return parseResult;
        }

        return null;
    }
}
