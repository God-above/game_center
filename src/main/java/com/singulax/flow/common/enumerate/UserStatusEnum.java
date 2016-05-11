package com.singulax.flow.common.enumerate;

/**
 * 
 * 用户状态
 * <功能详细描述>
 * 
 * @author  ColdShine
 * @version  [版本号, 2015年6月18日]
 * @see  [相关类/方法]
 * @since  [产品/模块版本]
 */
public enum UserStatusEnum {
    DISABLE(0, "停用"),
    ENABLE(1, "启用"),
    WAITING(2, "注册待验证"),
    ;

    private Integer code;
    private String comment;

    UserStatusEnum(Integer code, String comment) {
        this.code = code;
        this.comment = comment;
    }

    public static UserStatusEnum getByCode(Integer code) {
        if (code == null) {
            return null;
        }

        for (UserStatusEnum operationEnum : values()) {
            if (operationEnum.getCode().compareTo(code) == 0) {
                return operationEnum;
            }
        }

        return null;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
