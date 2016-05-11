package com.singulax.flow.web.controller;

import java.awt.Menu;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
import com.singulax.flow.common.model.User;
import com.singulax.flow.common.util.AESUtil;
import com.singulax.flow.common.util.DateUtil;
import com.singulax.flow.web.constant.Constant;
import com.singulax.flow.web.constant.ControllerResultBean;
import com.singulax.flow.common.enumerate.ControllerResultEnum;
import com.singulax.flow.web.constant.SessionConstant;
import com.singulax.flow.web.dao.page.PageParameter;
import com.singulax.flow.web.propertis.ConfigProperties;


/**
 * @author: hp.long
 * @date : 2014-09-15 13:01
 */
public class BaseController {
	
	private static Logger logger = LoggerFactory.getLogger(BaseController.class);

    public static final String PAGE_KEY = "page";

    /**
     * 获取forward前缀的地址
     * @author hp.long
     * @param url
     * @return
     */
    protected static String getForwardUrl(String url) {
        return "forward:" + url;
    }

    /**
     * 获取redirect前缀的地址
     * @author hp.long
     * @param url
     * @return
     */
    protected static String getRedirectUrl(String url) {
        return "redirect:" + url;
    }

    protected HttpServletRequest getRequest(){
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    protected HttpSession getSession(){
        return getRequest().getSession();
    }

    /**
     * 当前登陆用户
     * @return
     */
    protected User getCurrentUser(){
        User user =  (User)getSession().getAttribute(SessionConstant.CURRENT_USER);
        return user;
    }

    public void setCurrentUser(User user){
        getSession().setAttribute(SessionConstant.CURRENT_USER,user);
    }

    public void setAuthority(Map<String,String> authorityMap){
        getSession().setAttribute(SessionConstant.CURRENT_USER_AUTHORITY, authorityMap);
    }

    public void setMenu(List<Menu> menuList){
        getSession().setAttribute(SessionConstant.CURRENT_USER_MENU,menuList);
    }

    /**
     * 获取请求参数
     * @return
     */
    protected Map<String,Object> getParams(){
        Map<String,Object> params = (Map<String,Object>)getRequest().getAttribute(SessionConstant.PARAM_MAP);
        if ( params == null ){
            params = new HashMap<String, Object>();
        }else{
            for(Map.Entry entry : params.entrySet() ){
                String key = entry.getKey().toString();
                // 转换时间参数 String to Date
                if( key.endsWith("Time")){
                    Object value = entry.getValue();
                    if( value != null ){
                        Date newDate = DateUtil.getDateByString(value.toString());
                        entry.setValue(newDate);
                    }
                }
            }
        }
        return params;
    }

    /**
     * 获取请求参数和分页信息
     * @return
     */
    protected Map<String,Object> getParamsAndPageInfo(){
        Map<String,Object> params = getParams();
        Integer currentPage = Constant.CURRENT_PAGE_VALUE;
        Integer pageSize = Constant.PAGE_SIZE_VALUE;
        if ( params.get(Constant.CURRENT_PAGE_KEY) == null ) {
            params.put(Constant.CURRENT_PAGE_KEY, currentPage);
        } else {
            currentPage = (Integer)params.get(Constant.CURRENT_PAGE_KEY);
        }
        if ( params.get(Constant.PAGE_SIZE_KEY) == null ) {
            params.put(Constant.PAGE_SIZE_KEY, pageSize);
        } else {
            pageSize = (Integer)params.get(Constant.PAGE_SIZE_KEY);
        }
        params.put(Constant.FROM_KEY, (currentPage-1) * pageSize);
        PageParameter page=new PageParameter(currentPage,pageSize);
        
        params.put(PAGE_KEY,page);//key一定要用"page"(不能为空)
        return params;
    }

    /**
     * 缺少必填参数返回信息
     * @return
     */
    protected String requiredParamsResponse(){
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(ControllerResultEnum.LACK_REQUIRED_PARAM.getStatus());
        result.setResultComment(ControllerResultEnum.LACK_REQUIRED_PARAM.getDescription());
        return JSON.toJSONString(result);
    }

    /**
     * 参数map中取出String
     * @param key
     * @return
     */
    protected String getStringValueByParams(Map<String,Object> params, String key){
        Object value = params.get(key);
        if( null == value ){
            return null;
        }
        return (String)value;
    }

    /**
     * 参数map中取出Integer
     * @param key
     * @return
     */
    protected Integer getIntegerValueByParams(Map<String,Object> params, String key){
        Object value = params.get(key);
        if( null == value ){
            return null;
        }
        return Integer.valueOf(value.toString());
    }

    /**
     * 参数map中取出Date
     * @param key
     * @return
     */
    protected Date getDateValueByParams(Map<String,Object> params, String key){
        Object value = params.get(key);
        if( null == value ){
            return null;
        }
        return (Date)value;
    }

    /**
     * 参数map中取出Float
     * @param key
     * @return
     */
    protected Float getFloatValueByParams(Map<String,Object> params, String key){
        Object value = params.get(key);
        if( null == value ){
            return null;
        }
        return new Float(value.toString());
    }

    /**
     * 参数map中取出Double
     * @param key
     * @return
     */
    protected Double getDoubleValueByParams(Map<String,Object> params, String key){
        Object value = params.get(key);
        if( null == value ){
            return null;
        }
        return new Double(value.toString());
    }
    
    protected void transDate(Map<String,Object> params){
    	if(params!=null){
        	for(Map.Entry entry : params.entrySet() ){
                String key = entry.getKey().toString();
                // 转换时间参数 String to Date
                if( key.endsWith("Time")){
                    Object value = entry.getValue();
                    if( value != null ){
                        Date newDate = DateUtil.getDateByString(value.toString());
                        entry.setValue(newDate);
                    }
                }
            }
        }
    }
    
    /**
     * 响应内容
     * @param codeEnum
     * @return
     */
    public ControllerResultBean responseContent(ControllerResultBean result,ControllerResultEnum codeEnum){
    	result.setResultCode(codeEnum.getStatus());
	    result.setResultComment(codeEnum.getDescription());
        return result;
    }

    /**
     * 响应内容
     * @param codeEnum
     * @return
     */
    public ControllerResultBean responseContent(ControllerResultEnum codeEnum) {
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(codeEnum.getStatus());
        result.setResultComment(codeEnum.getDescription());
        return result;
    }
    
}
