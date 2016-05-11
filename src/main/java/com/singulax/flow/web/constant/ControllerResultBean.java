package com.singulax.flow.web.constant;

import java.util.List;

import com.singulax.flow.common.enumerate.ControllerResultEnum;
import com.singulax.flow.web.dao.page.PageParameter;


public class ControllerResultBean {

    /** 处理结果代码 */
    private Integer resultCode;

    /** 处理结果说明 */
    private String resultComment;

    /** 结果集, 查询时使用 */
    private List resultSet;

    /** 保存自定义返回数据 */
    private Object resultBody;

    /** 分页信息, 分页查询时使用 */
    private PageParameter pageInfo;

    public ControllerResultBean(ControllerResultEnum resultEnum, List resultSet, PageParameter pageInfo) {
        this.resultCode = resultEnum.getStatus();
        this.resultComment = resultEnum.getDescription();
        this.resultSet = resultSet;
        this.pageInfo = pageInfo;
    }

    public ControllerResultBean() {
        this.resultCode = ControllerResultEnum.UNKNOWN_ERROR.getStatus();
        this.resultComment = ControllerResultEnum.UNKNOWN_ERROR.getDescription();
    }

    public ControllerResultBean(ControllerResultEnum resultEnum) {
        this.resultCode = resultEnum.getStatus();
        this.resultComment = resultEnum.getDescription();
    }

    public ControllerResultBean(ControllerResultEnum resultEnum, List resultSet, Object resultBody, PageParameter pageInfo) {
        this.resultCode = resultEnum.getStatus();
        this.resultComment = resultEnum.getDescription();
        this.resultSet = resultSet;
        this.resultBody = resultBody;
        this.pageInfo = pageInfo;
    }

    public ControllerResultBean(ControllerResultEnum resultEnum, Object resultBody) {
        this.resultCode = resultEnum.getStatus();
        this.resultComment = resultEnum.getDescription();
        this.resultBody = resultBody;
    }

    public Integer getResultCode() {
        return resultCode;
    }

    public void setResultCode(Integer resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultComment() {
        return resultComment;
    }

    public void setResultComment(String resultComment) {
        this.resultComment = resultComment;
    }

    public List getResultSet() {
        return resultSet;
    }

    public void setResultSet(List resultSet) {
        this.resultSet = resultSet;
    }

    public PageParameter getPageInfo() {
        return pageInfo;
    }

    public void setPageInfo(PageParameter pageInfo) {
        this.pageInfo = pageInfo;
    }

    public Object getResultBody() {
        return resultBody;
    }

    public void setResultBody(Object resultBody) {
        this.resultBody = resultBody;
    }
}
