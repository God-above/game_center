package com.singulax.flow.web.constant;

/**
 * 常量类
 * @author: hp.long
 * @date : 2014-09-22 14:47
 */
public class Constant {
    /**
     * 当前页面
     */
    public final static String CURRENT_PAGE_KEY = "currentPage";

    /**
     * 当前页面系统默认值
     */
    public final static Integer CURRENT_PAGE_VALUE = 1;

    /**
     * 每页显示条数
     */
    public final static String PAGE_SIZE_KEY = "pageSize";

    /**
     * 每页显示条数默认值
     */
    public final static Integer PAGE_SIZE_VALUE = 10;

    /**
     * 分页from参数key
     */
    public final static String FROM_KEY = "from";

    /**
     * 每批次能保存的最多的商品个数
     */
    public static final int MAX_PRODUCT_COUNT_PER_BATCH = 10;

    /**
     * 每批次订单最大的数据条数
     */
    public final static Integer TOTAL_ITEMS_PER_BATCH = 2000000;

    /**
     * 批量充值任务每次处理的数据条数
     */
    public final static Integer TOTAL_ITEMS_PER_RECHARGE_JOB = 100;

    /**
     * 批次定时充值提前量, 单位为秒
     */
    public final static Integer BATCH_RECHARGE_AHEAD_TIME_OF_SEC = 60 * 60;

    /**
     * 给需要发短信的预订单发送短信失败后的重试次数
     */
    public static final Integer SMS_FAILED_RETRY_TIMES = 3;

    /**
     * 发送的短信内容最大长度
     */
    public static final Integer SMS_CONTENT_LENGTH = 140;

    /**
     * 短信充值的超时时间, 单位秒
     */
    public static final Integer SMS_RECHARGE_EXPIRE_SEC = 2 * 60 * 60;

    /**
     * 每次调用发送短信接口最大的号码个数
     */
    public static final Integer SMS_NUMBER_MAX_SIZE_PER_TIMES = 100;

    /**
     * 短信验证码的长度
     */
    public static final Integer SMS_VERIFY_CODE_LENGTH = 4;

    /**
     * 短信回复内容分隔符
     */
    public static final String SMS_CONTENT_SEPARATOR_CHAR = "#";

    /**
     * 无限量
     */
    public static final Integer UNLIMITED = -1;

    /**
     * 订单表悲观锁初始状态，未加锁
     */
    public static final Integer ORDER_UNLOCK = 0;

    /**
     * 订单表悲观锁初始状态，加锁
     */
    public static final Integer ORDER_LOCK = 1;
}
