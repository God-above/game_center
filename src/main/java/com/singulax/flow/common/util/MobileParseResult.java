package com.singulax.flow.common.util;

import java.io.Serializable;
import java.util.*;

/**
 * 批量订单时, 解析上传手机号后的解析结果
 *
 * @author tonnyyi
 */
public class MobileParseResult implements Serializable {
    private static final long serialVersionUID = -1139907406387720430L;

    /** 接收到的数据条数 */
    private Integer total = 0;

    /** 合法的数据条数 */
    private Integer validTotal = 0;

    /** 不可法的数据条数 */
    private Integer invalidTotal = 0;

    /** 合法的数据 */
    private List<String> validNumbers = new ArrayList<>();

    /**不合法的数据 */
    private List<String> invalidNumbers = new ArrayList<>();

    /** 合法的移动手机号 */
    private List<String> validCMCCNumbers = new ArrayList<>();

    /** 合法的联通手机号 */
    private List<String> validCUCCNumbers = new ArrayList<>();

    /** 合法的电信手机号 */
    private List<String> validCTCCNumbers = new ArrayList<>();

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getValidTotal() {
        return validTotal;
    }

    public void setValidTotal(Integer validTotal) {
        this.validTotal = validTotal;
    }

    public Integer getInvalidTotal() {
        return invalidTotal;
    }

    public void setInvalidTotal(Integer invalidTotal) {
        this.invalidTotal = invalidTotal;
    }

    public List<String> getValidNumbers() {
        return validNumbers;
    }

    public void setValidNumbers(List<String> validNumbers) {
        this.validNumbers = validNumbers;
    }

    public List<String> getInvalidNumbers() {
        return invalidNumbers;
    }

    public void setInvalidNumbers(List<String> invalidNumbers) {
        this.invalidNumbers = invalidNumbers;
    }

    public List<String> getValidCMCCNumbers() {
        return validCMCCNumbers;
    }

    public void setValidCMCCNumbers(List<String> validCMCCNumbers) {
        this.validCMCCNumbers = validCMCCNumbers;
    }

    public List<String> getValidCUCCNumbers() {
        return validCUCCNumbers;
    }

    public void setValidCUCCNumbers(List<String> validCUCCNumbers) {
        this.validCUCCNumbers = validCUCCNumbers;
    }

    public List<String> getValidCTCCNumbers() {
        return validCTCCNumbers;
    }

    public void setValidCTCCNumbers(List<String> validCTCCNumbers) {
        this.validCTCCNumbers = validCTCCNumbers;
    }
}
