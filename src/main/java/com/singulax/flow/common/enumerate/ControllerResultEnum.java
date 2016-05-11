package com.singulax.flow.common.enumerate;

/**
 * 8流量平台Controller层接口返回码及说明
 */
public enum ControllerResultEnum {
    PROCESS_SUCCESS(0, "处理成功"),
    PROCESS_FAIL(1, "处理失败"),
    REQUEST_SUCCESS(2, "请求成功"),
    REQUEST_FAIL(3, "请求失败"),
    PROCESS_FINSH(4, "处理完成"),

    // 1xxx 参数相关
    LACK_REQUIRED_PARAM(1001, "缺少必要参数"),
    INVALID_REQUEST_PARAM(1002, "传递参数不合法"),
    EMAIL_REQUIRED_PARAM(1003, "缺少邮件参数配置"),
    CODE_TIMEOUT(1004, "验证码已过期"),

    REPORT_DATE_PARAM_ERROR(1100, "查询日期间隔不能超过30天"),

    // 登陆
    LOGIN_SESSION_TIMEOUT(1201, "登陆超时"),
    LOGIN_FAIL(1202, "登陆失败"),
    CAPTCHA_CODE_ERROR(1203, "验证码错误"),
    LOGIN_PWD_ERROR(1204, "用户名或密码错误"),

    // 2xxx 公用提示
    HAS_DISABLE(2001, "已停用"),
    HAS_EXPIRED(2002, "已过期"),
    UPDATE_FAIL(2003, "不可修改"),
    ILLEGAL_ACCESS(2004, "非法权限"),

    // api充值相关
    RECHARGE_SUCCESS(3100, "充值成功"),
    RECHARGE_ING(3101, "充值中"),
    RECHARGE_FAIL(3102, "充值失败"),

    //兑换券相关
    TICKET_NOT_EXIST(3200, "流量卡不存在"),
    TICKET_NOT_IN_VALID_DATE(3201, "流量卡不在有效期"),
    TICKET_IS_USED(3202, "该流量卡已使用"),
    TICKET_NOT_BELONG_TO_USER(3203, "该流量卡不属于此用户"),
    TICKET_PASS_FAIL(3204, "流量卡密码错误"),
    TICKET_IS_SHORT(3205, "流量卡数量不足"),
    TICKET_NOT_USABLE(3206, "流量卡不可用"),
    TICKET_DATA_ERROR(3207, "流量卡数据错误"),


    // 4xxx 服务器内部相关
    SERVER_ERROR(4001, "服务器内部错误"),
    SERVER_EXCEPTION(4002, "服务器异常"),

    // 41xx 服务相关
    SERVICE_SMS_UNUSABLE(4100, "短信服务不可用"),

    // 45xx 商品相关
    SERVER_PRO_NOT_EXIST(4501, "商品不存在"),
    SERVER_PRO_TYPE_NOT_SUPPORT(4502, "商品类型不支持"),
    SERVER_PRO_NOT_FIT_RECEIVER(4503, "商品类型不支持该充值账号"),
    SERVER_PRO_IS_SHORT(4504, "商品数量不足"),
    SAME_PRODUCT_ONLY_ONE(4505,"商品选择错误，请在三个运营商中，各选择一种包型"),
    
    // 46xx 短信相关
    SMS_LAST_NOT_EXPIRE(4600, "距离上次发送时间较短"),
    SMS_VERIFY_IS_EXPIRED(4601, "该验证码已超时"),
    SMS_VERIFY_INCORRECT(4602, "验证码错误"),

    // 47xx 邮件相关
    MAIL_ALREADY_EXPIRED(4701, "邮件已失效"),
    MAIL_VERIFY_ERROR(4702, "邮件验证失败"),
    MAIL_URL_ERROR(4703, "链接无效"),

    // 49xx  user用户
    SERVER_USER_NAME_EXIST(4900, "用户名已存在"),
    SERVER_USER_NOT_EXIST(4901, "用户不存在"),
    SERVER_REGISTER_SUCCESS(4902, "注册成功"),
    SERVER_REGISTER_FAIL(4903, "注册失败"),
    SERVER_USER_PWD_FAIL(4904, "用户密码错误"),
    SERVER_EMAIL_FAIL(4905, "邮箱验证失败"),
    SERVER_EMAIL_EXIST(4906, "该邮箱已存在"),
    SERVER_PAYPASS_NOT_EXIST(4907, "未设置支付密码"),
    SERVER_PAYPASS_FAIL(4908, "支付密码错误"),
    SERVER_EMAIL_NOT_BIND(4909, "未绑定邮箱"),
    SERVER_PAYPASS_EXIST(4910, "已设置支付密码"),
    SERVER_USER_DISABLE(4911, "该账号已停用"),
    SERVER_USER_LINK_FAIL(4912, "链接已失效"),
    SERVER_USER_STATUS_INVALID(4913, "用户状态错误"),
    SERVER_USER_TEL_USED(4914, "手机号已存在"),
    SERVER_USER_ALREADY_EXIST(4915, "用户已存在"),
    SERVER_USER_TYPE_INVALID(4916, "用户类型错误"),


    // 50xx order订单相关
    ORDER_ACCOUNT_TYPE_FAIL(5001, "帐号类型错误"),
    ORDER_NOT_EXIST(5002, "商品订单不存在"),
    ORDER_STATUS_ERROR(5003, "商品订单状态错误"),       // 一次支付时商品订单状态不是未支付状态
    ORDER_STATUS_UPDATE_FAILED(5004, "商品订单更新状态失败"),
    ORDER_NOT_BELONG_USER(5005, "订单不属于该用户"),

    // 51xx batch批次相关
    BATCH_LANDING_FAILED(5110, "批次数据落地商品订单失败"),
    BATCH_NOT_EXIST(5111, "批次不存在"),
    BATCH_STATUS_ERROR(5112, "批次状态不正确"),
    BATCH_STATUS_UPDATE_FAILED(5113, "批次状态更新失败"),
    BATCH_DATA_ERROR(5114, "批次数据错误"),

    // 52xx payment支付订单相关
    PAYMENT_NOT_EXIST(5200, "支付订单不存在"),
    PAYMENT_STATUS_UPDATE_FAILED(5201, "支付订单状态更新失败"),
    PAYMENT_STATUS_ERROR(5203, "支付订单状态错误"),
    PAYMENT_MULTI_OUTER(5204, "不支持多个第三方支付"),
    PAYMENT_TYPE_NOT_EXIST(5205, "支付订单类型不存在"),
    PAYMENT_TOTAL_AMOUNT_ERROR(6041, "支付总金额错误"),   //批量支付时总金额不等于商品订单总金额

    // 53xx assetFlow流水相关
    FLOW_SAVE_FAILED(5300, "流水保存失败"),
    FLOW_SUCCEED_ITEM_NOT_EXIST(5301, "没有成功的支付流水"),
    FLOW_DATA_ERROR(5302, "流水数据错误"),    // 数据库数据不对, 比如退款总流水大于支付订单金额

    // 54xx userAsset用户资产相关
    USER_ASSET_UPDATE_FAILED(5400, "用户资产更新失败"),
    USER_BALANCE_PAY_SUCCESS(5410, "用户余额支付成功"),
    USER_BALANCE_PAY_FAILED(5411, "用户余额支付失败"),
    USER_POOR_BALANCE(5412, "用户余额不足"),
    USER_POINTS_PAY_SUCCESS(5420, "用户积分支付成功"),
    USER_POINTS_PAY_FAILED(5421, "用户积分支付失败"),
    USER_POOR_POINTS(5422, "用户积分不足"),

    // 55xx couponBatch 流量卡相关
    COUPON_BATCH_ORDER_NOT_EXIST(5501, "流量卡批次下没有商品订单"),
    COUPON_BATCH_NOT_EXIST(5502, "流量卡批次下没有商品订单"),
    COUPON_BATCH_STATUS_ERROR(5503, "流量卡批次下没有商品订单"),


    // 60xx 支付相关
    PAY_SUCCESS(6000, "支付成功"),
    PAY_FAILED(6001, "支付失败"),
    PAY_ASSET_TYPE_NOT_SUPPORT(6002, "不支持该支付类型"),
    USER_PAY_STATUS_FAIL(6003, "用户付款记录状态修改异常"),
    PAY_REQUEST_SUCCESS(6030, "请求第三方支付成功"),  //使用第三方支付时, 该状态表示成功请求, 等待第三方回调
    PAY_REQUEST_FAILED(6031, "请求第三方支付失败"),   //使用第三方支付时, 该状态表示成功失败
    PAY_ERROR_COUNT_REACHED(6032, "支付密码输入错误次数达到限制"),


    // 61xx 退款相关
    REFUND_SUCCESS(6100, "退款成功"),
    REFUND_FAILED(6101, "退款失败"),
    REFUND_REQUEST_SUCCESS(6102, "请求第三方退款成功"),  //使用第三方支付时, 该状态表示成功请求, 等待第三方回调
    REFUND_REQUEST_FAILED(6103, "请求第三方退款失败"),   //使用第三方支付时, 该状态表示成功失败
    REFUND_ORDER_SIZE_OVER_LIMIT(6104, "退款订单数查过限制"),
    
    //接口相关
    API_TIMEOUT(7001,"api请求超时"),
    API_SIGN_ERROR(7002,"api签名错误"),
    API_OPENID_EXIST(7003,"该openId的用户已经关注"),
    API_OPENID_NOT_EXIST(7004,"该openId的关注用户不存在"),

    UNKNOWN_ERROR(9999, "未知错误"),
    ;
    private Integer status;     // 状态值
    private String description;// 描述

    private ControllerResultEnum(Integer status, String description) {
        this.status = status;
        this.description = description;
    }

    public static ControllerResultEnum getEnumByCode(Integer status) {
        if (status == null) {
            return null;
        }
        for (ControllerResultEnum result : values()) {
            if (result.getStatus().equals(status)) {
                return result;
            }
        }
        return null;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
