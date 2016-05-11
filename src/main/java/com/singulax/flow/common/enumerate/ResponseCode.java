package com.singulax.flow.common.enumerate;

/**
 * @author: hp.long
 * @date : 2015-03-30 14:57
 */
public enum ResponseCode {

    ERROR(-1, "系统繁忙"),
    FAIL(0, "失败"),
    SUCCESS(1, "成功"),
    MOBILE_ISNULL(10, "请输入手机号"),
    MOBILE_ERROR(11, "手机号输入错误"),
    MOBILE_NOT_RECHARGE(12, "手机无法充值"),
    TICKET_IS_NULL(21, "请输入优惠券"),
    TICKET_NOT_EXIST(22,"优惠券不存在"),
    TICKET_NOT_MATCH(23,"优惠券与当前号码运营商不匹配"),
    TICKET_NOT_AVAILABLE(24,"优惠券不可用"),
    TICKET_CONSUMED(25,"优惠券已被消费"),
    TICKET_NOT_START(26,"优惠券未到使用时间"),
    TICKET_OVERDUE(27,"优惠券过期"),
    TICKET_STATE_ERROR(28,"正在尝试修改成不存在的优惠券状态"),
    TICKET_VALUE_IS_NULL(29,"券面值为空或为0"),
    TICKET_TYPE_IS_NULL_OR_ERROR(30,"券类型为空或非法类型"),
    PRODUCT_ISNULL(30, "请选择商品"),
    PRODUCT_NOT_EXIST(31, "所选商品不存在"),
    PRODUCT_MOBILE_NOT_MATCH(32, "手机号与所选商品不匹配"),
    PRODUCT_UNAVAILABLE(33, "商品不可用"),
    PRAMS_IS_NULL(40, "参数缺失"),
    ORDER_PAYMENT_ERROR(50,"订单金额异常"),
    ORDER_NOT_EXIST(51,"订单不存在"),
    ORDER_STATE_ERROR(52,"订单状态异常"),
    ORDER_OVERTIME(53,"订单已经失效"),
    ORDER_CANT_CLOSE(54,"非未支付状态的订单无法关闭"),
    PRE_PAY_ID_ERROR(100,"向微信申请prepayId异常"),
    PRE_PAY_ID_EMPTY(101,"向微信申请prepayId失败,返回空"),
    TOKEN_ERROR(110, "授权错误或已过期"),
    
    USER_NOT_EXIST(120, "用户不存在"),

    HAVE_RECEIVED_ACTIVITY(130, "已参与该活动"),

    /** 管理平台码 **/
    PF_LOGIN_FAIL(200, "用户名或密码错误"),
    PF_ORDER_NOT_EXIST(210, "订单不存在"),
    PF_ORDER_STATE_CAN_CHANGE(211, "订单状态为充值中才可修改"),
    PF_ORDER_STATE_CAN_REFUND(212, "订单状态为充值失败才可退款"),
    PF_CHANNEL_NO_EXIST(220, "渠道编号已存在"),
    PF_LOGIN_TIMEOUT(300, "登陆超时"),
    PF_MSG_TYPE_EXIST(400, "已存在该类型的消息！\n 请停用该类型的消息后在执行此操作"),
    PF_MSG_KEYWORD_EXIST(410, "已存在该关键字的消息！\n 请停用该关键字的消息后在执行此操作"),
    PF_MSG_NAME_EXIST(420, "已存在该名称的消息！"),
    PR_BATCH_NOT_EXIST(430,"优惠券批次不存在"),
    NO_VALID_COUPON(431,"该批次下没有可兑换的卡券"),

    /** 系统配置码**/
    UPDATE_SYSTEM_PROP_FAILED(900,"更新内存系统配置为数据库最新失败"),
    SYSTEM_PROP_EMPTY(901,"该项系统配置为空"), 
    
    ;


    private ResponseCode(Integer code, String msg){
        this.code = code;
        this.msg = msg;
    }

    private Integer code;
    private String msg;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
