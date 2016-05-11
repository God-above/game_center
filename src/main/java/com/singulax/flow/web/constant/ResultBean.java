package com.singulax.flow.web.constant;

import com.singulax.flow.common.enumerate.ControllerResultEnum;

import java.io.Serializable;
import java.util.Map;

public class ResultBean implements Serializable{
	
	private static final long serialVersionUID = -3976594874635098654L;

	private Boolean resultFlag;//成功状态
	
	private Integer resultCode;//状态码
	
	private String requestTime;//请求时间  yyyy-MM-dd HH:mm:ss
	
	private String resultMsg;//返回描述
	
	private Object results;//返回结果Object对象

	public ResultBean() {
	}

	public ResultBean(Boolean resultFlag, ControllerResultEnum controllerResultEnum) {
		this.resultFlag = resultFlag;
		this.resultCode = controllerResultEnum.getStatus();
		this.resultMsg = controllerResultEnum.getDescription();
	}

	public ResultBean(boolean resultFlag, ControllerResultEnum controllerResultEnum, String customMsg) {
		this.resultFlag = resultFlag;
		this.resultCode = controllerResultEnum.getStatus();
		this.resultMsg = customMsg;
	}

	public void update(ControllerResultEnum controllerResultEnum) {
		this.resultCode = controllerResultEnum.getStatus();
		this.resultMsg = controllerResultEnum.getDescription();
	}

	public Boolean getResultFlag() {
		return resultFlag;
	}

	public void setResultFlag(Boolean resultFlag) {
		this.resultFlag = resultFlag;
	}

	public Integer getResultCode() {
		return resultCode;
	}

	public void setResultCode(Integer resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}

	public String getRequestTime() {
		return requestTime;
	}

	public void setRequestTime(String requestTime) {
		this.requestTime = requestTime;
	}

	public Object getResults() {
		return results;
	}

	public void setResults(Object results) {
		this.results = results;
	}

}
