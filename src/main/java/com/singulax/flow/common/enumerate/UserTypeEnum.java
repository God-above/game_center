package com.singulax.flow.common.enumerate;

public enum UserTypeEnum {
    ONE(1, "业务员"),
    TWO(2, "客户"),
    THREE(3, "管理员"),
    FOUR(4, "副官"),
    FIVE(5, "主管"),
    SIX(6, "平台管理"),
    ;

    private Integer code;
    private String comment;

    UserTypeEnum(Integer code, String comment) {
        this.code = code;
        this.comment = comment;
    }

    public static UserTypeEnum getByCode(Integer code) {
        if (code == null) {
            return null;
        }

        for (UserTypeEnum operationEnum : values()) {
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
