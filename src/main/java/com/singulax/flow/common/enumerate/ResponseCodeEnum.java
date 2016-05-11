package com.singulax.flow.common.enumerate;

/**
 * 响应内容枚举
 * <p/>
 * 用于匹配api平台响应码, 需要与api中的代码保持同步, 8流量系统不可以添加内容, 8流量自定义的响应码可以添加到{@link ControllerResultEnum}
 *
 * @author: hp.long
 * @date : 2014-09-23 15:43
 */
public enum ResponseCodeEnum {

    REQUEST_SUCCESS(0, "请求成功"),
    RECHARGE_SUCCESS(1, "充值成功"),
    RECHARGE_ING(2, "充值中"),
    RECHARGE_FAIL(3, "充值失败"),

    // 参数
    REQUEST_PARAM_ERROR(1001, "缺少请求参数"),
    REQUEST_ENCRYPT_ERROR(1002, "签名错误"),
    REQUEST_REPEAT(1003, "重复请求"),
    REQUEST_PARAM_DECRYPT_ERROR(1004, "解析业务参数失败"),
    REQUEST_BUS_PARAM_ERROR(1005, "缺少业务参数"),
    REQUEST_RECHARGE_TYPE_ERROR(1006, "参数非法，充值账号与商品不匹配"),
    REQUEST_IP_ERROR(1007, "IP错误"),
    ARRAY_MORE_THAN_MAX_SIZE(1008, "请求数组超出规定值"),
    VERSION_NO_ERROR(1009, "版本号不存在"),

    // 客户
    DIS_ISNULL(1100, "客户不存在"),
    DIS_FAILURE(1101, "客户失效"),

    // 客户业务
    DIS_ACTIVITY_ISNULL(1300, "客户业务不存在"),
    DIS_ACTIVITY_FAILURE(1301, "客户业务失效"),
    DIS_ACTIVITY_DATE_ERROR(1302, "客户业务时间错误"),
    DIS_ACTIVITY_ACCOUNT_ERROR(1303, "客户业务余额不足"),

    // 分销商商品
    DIS_PRODUCT_ISNULL(1400, "授权商品不存在"),
    DIS_PRODUCT_DISABLE(1401, "授权商品已禁用"),
    DIS_PRO_DATE_ERROR(1402, "该商品不在合作时间内"),
    DIS_PRO_TOTAL_ERROR(1403, "商品库存不足"),

    // 平台商品
    PRO_ISNULL(2000, "商品不合法"),
    // 商品源
    PRODUCT_SOURCE_ISNULL(2100, "该商品缺货"),
    // 订单
    ORDER_IS_NULL(2200, "订单不存在"),

    // 批次
    BATCH_IS_NULL(1600, "批次不存在"),
    BATCH_VALID_MOBILE_ISNULL(1601, "批量充值没有合法的手机号"),
    BATCH_MOBILES_PARSE_ERROR(1602, "批量充值解析手机号集合失败"),
    BATCH_RECHARGE_TIME_PARSE_ERROR(1603, "批量充值开始时间格式错误"),
    BATCH_ITEMS_OVERLOAD(1604, "批次手机号个数超过限制"),
    BATCH_PER_NO_EXIST(1605, "该预订单号已存在"),
    
    // 供货商
    SUP_ISNULL(2000, "供应商不存在"),
    SUP_PARAMS_ERROR(2010, "供应商参数装载异常"),
    SUP_HTTP_ERROR(2020, "请求供应商链接异常"),
    SUP_ANALYZE_ERROR(2030, "解析供应商响应内容异常"),
    SUP_RESPONSE_ISNULL(2031, "供应商响应内容为空"),
    SUP_HTTP_TIMEOUT(2040, "请求供应商超时"),

    DOES_NOT_SUPPORT_THE_AREA(2002, "暂不支持该地区"),

    // 供货商返回异常检测
    RECHARGE_ACCOUNT_MOBILE_ILLEGAL(3100, "手机号不存在或不合法"),
    RECHARGE_ACCOUNT_MOBILE_STOP(3101, "手机号停机或已欠费"),
    RECHARGE_ACCOUNT_MOBILE_NONSUPPORT(3102, "手机号不支持该业务"),
    RECHARGE_ACCOUNT_MOBILE_ERROR(3103, "充值手机号异常"),
    RECHARGE_ACCOUNT_RESPONSE_ERROR(3104, "响应异常"),
    RECHARGE_ACCOUNT_NOT_ENOUGH(3105, "商品库存或余额不足"),
    //2015-03-09 新增
    RECHARGE_ACCOUNT_NOT_REPEAT(3106, "商品不允许重复订购"),
    RECHARGE_ACCOUNT_PROVINCE_ERROR(3107, "商品所属省份系统异常"),
    RECHARGE_ACCOUNT_NET_ERROR(3108, "用户网别异常"),
    RECHARGE_ACCOUNT_PRODUCT_ENOUGH(3109, "订购数已达上限"),
    
    UNKNOWN_ERROR(3199, "未知错误"),
    /*
    HTTP_ERROR(3000, "网络错误"),
    ORDER_ROLLBACK_FAIL(3100, "订单扣款事务回滚失败"),
*/

    TICKET_IS_NULL(4000,"券编号为空"),

    SERVER_IS_BUSY(9000, "系统繁忙"),

    // 服务器
    SYS_ERROR(9999, "服务器异常"),
    ;

    private Integer code;
    private String message;

    private ResponseCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * 根据响应码获取响应信息
     *
     * @param code 响应码
     * @return
     */
    public static ResponseCodeEnum getResponseCodeEnumByCode(Integer code) {
        for (ResponseCodeEnum codeEnum : values()) {
            if (codeEnum.getCode().equals(code))
                return codeEnum;
        }
        return null;
    }
}
