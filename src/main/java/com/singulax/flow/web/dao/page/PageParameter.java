package com.singulax.flow.web.dao.page;

import java.io.Serializable;
import java.util.Map;

import com.singulax.flow.web.constant.Constant;



/**
 * 分页参数类
 * 
 */
public class PageParameter implements Serializable {

    /** 
	 * @author jiangchao 
	 * @date 2014年11月6日 下午12:44:33
	 */ 
	private static final long serialVersionUID = 983422972021204844L;

	public static final int DEFAULT_PAGE_SIZE = 10;

    private Integer pageSize;//每页显示数量
    private Integer currentPage;//当前页数
    private Integer prePage;
    private Integer nextPage;
    private Integer totalPage;//总页数
    private Integer totalCount;//总数量

    public PageParameter() {
        this.currentPage = 1;
        this.pageSize = DEFAULT_PAGE_SIZE;
    }

    /**
     * 
     * @param currentPage
     * @param pageSize
     */
    public PageParameter(Integer currentPage, Integer pageSize) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }
    
    /**
     * 
     * @param currentPage
     * @param pageSize
     */
    public PageParameter(Map<String,Object> map) {
        this.currentPage = (Integer) map.get( Constant.CURRENT_PAGE_KEY);
        this.pageSize =  (Integer) map.get( Constant.PAGE_SIZE_KEY);
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPrePage() {
        return prePage;
    }

    public void setPrePage(Integer prePage) {
        this.prePage = prePage;
    }

    public Integer getNextPage() {
        return nextPage;
    }

    public void setNextPage(Integer nextPage) {
        this.nextPage = nextPage;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(Integer totalCount) {
        this.totalCount = totalCount;
    }

}
