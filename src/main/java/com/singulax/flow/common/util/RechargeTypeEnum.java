package com.singulax.flow.common.util;

/**
 * 平台产品帐号类型枚举
 * @author jiangchao 
 * @date 2014年10月15日 上午10:37:04
 */
public enum RechargeTypeEnum {

    MOBILE(1, "手机号"),
    EMAIL(2, "邮箱"),
    QQ(3, "QQ号"),
    PHONE(4, "固话");
    

    private Integer code;     // 编号
    private String  description;// 描述

    private RechargeTypeEnum( Integer code, String description ) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据状态值，获取平台产品帐号类型枚举
     * @param status
     * @return
     */
    public static RechargeTypeEnum getRechargeTypeEnumByCode( Integer code ){
        if ( code == null ) {
            return null;
        }
        for ( RechargeTypeEnum rechargeTypeEnum : values() ) {
            if ( rechargeTypeEnum.getCode().equals( code ) ){
                return rechargeTypeEnum;
            }
        }
        return null;
    }

    public static String getDescByCode( Integer code ){
        RechargeTypeEnum rechargeTypeEnum = getRechargeTypeEnumByCode(code);
        if ( rechargeTypeEnum == null ) {
            return null;
        }
        return rechargeTypeEnum.getDescription();
    }

 
    public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
