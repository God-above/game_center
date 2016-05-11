package com.singulax.flow.web.controller;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.singulax.flow.common.enumerate.ControllerResultEnum;
import com.singulax.flow.common.model.User;
import com.singulax.flow.common.util.CodeUtil;
import com.singulax.flow.common.util.MD5Util;
import com.singulax.flow.web.constant.ControllerResultBean;
import com.singulax.flow.web.constant.SessionConstant;
import com.singulax.flow.web.service.UserService;


/**
 * @author jiangchao
 * @since 15/3/24 10:38
 */
@Controller
@RequestMapping(value = "/user/*")
public class UserController extends BaseController{
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private static final String successNologin= "success_nologin";//邮箱绑定成功  用户未登录
    private static final String successLogin= "success_";//邮箱绑定成功  如果当前session有用户则success后面接绑定的邮箱: success_123@qq.com 
    private static final String failEmail= "failEmail";//邮箱绑定失败
    
    @Autowired
    private UserService userService;


    /**
     * 获取用户帐号是否存在
     * @param  userName
     * @param  validateCode
     * @return
     * @throws IOException 
     */
    @RequestMapping(value = "checkUserName",  produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String checkUserName(HttpServletRequest request,HttpServletResponse response) throws IOException{
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(ControllerResultEnum.PROCESS_FAIL.getStatus());
        result.setResultComment(ControllerResultEnum.PROCESS_FAIL.getDescription());

        Map<String,Object> params = getParams();
        String userName = getStringValueByParams(params, "userName");
        String validateCode = getStringValueByParams(params, "validateCode");

        if(StringUtils.isBlank(userName)){
        	 return JSON.toJSONString(responseContent(result,ControllerResultEnum.LACK_REQUIRED_PARAM));
        }
        if (StringUtils.isNotBlank(validateCode)) {
            Object serverCode = getSession().getAttribute(SessionConstant.VAILDATE_CODE);
            if (validateCode != null && !serverCode.toString().equalsIgnoreCase(validateCode)) {
                return JSON.toJSONString(responseContent(ControllerResultEnum.CAPTCHA_CODE_ERROR));
            }
        }
        try{
        	User user = userService.getUserInfo(userName);
        	if(user != null){
        		return JSON.toJSONString(responseContent(result,ControllerResultEnum.SERVER_USER_NAME_EXIST));
        	}
        	result.setResultCode(ControllerResultEnum.PROCESS_SUCCESS.getStatus());
            result.setResultComment(ControllerResultEnum.PROCESS_SUCCESS.getDescription());
            return JSON.toJSONString(result);
        }catch ( Exception e){
            logger.error("获取用户信息异常,{}",e.toString());
            return JSON.toJSONString(result);
        }
    }



    /**
     * 验证用户登录密码
     *
     * 必填参数:
     *  userPwd         - 用户登录密码
     *
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "validaUserPwd", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")
    public String validaUserPwd() {
        String userPwd = getStringValueByParams(getParams(), "userPwd");

        if (StringUtils.isEmpty(userPwd)) {
            return requiredParamsResponse();
        }

        User currentUser = getCurrentUser();
        if (currentUser == null) {
            return JSON.toJSONString(responseContent(ControllerResultEnum.LOGIN_SESSION_TIMEOUT));
        } else if (!currentUser.getPassword().equals(MD5Util.MD5(userPwd))) {
            return JSON.toJSONString(responseContent(ControllerResultEnum.SERVER_USER_PWD_FAIL));
        }

        return JSON.toJSONString(responseContent(ControllerResultEnum.PROCESS_SUCCESS));
    }


    /**
     * 获取用户信息
     *
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "getUserInfo", produces = "text/plain;charset=utf-8")
    @ResponseBody
    public String getUserInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(ControllerResultEnum.PROCESS_FAIL.getStatus());
        result.setResultComment(ControllerResultEnum.PROCESS_FAIL.getDescription());
        
        User u = getCurrentUser();
        if (u == null) {
            return JSON.toJSONString(responseContent(result, ControllerResultEnum.LOGIN_SESSION_TIMEOUT));
        }
        String userCode = u.getUserCode();
        
        try {
            User user = userService.getUserByUserCode(userCode);
            if (user == null) {
                return JSON.toJSONString(responseContent(result, ControllerResultEnum.SERVER_USER_NOT_EXIST));
            }
            user.setPayPassword(StringUtils.isNotEmpty(user.getPayPassword()) ? "true" : "false");
            user.setPassword(StringUtils.isNotEmpty(user.getPassword()) ? "true" : "false");

            result.setResultBody(user);
            result.setResultCode(ControllerResultEnum.PROCESS_SUCCESS.getStatus());
            result.setResultComment(ControllerResultEnum.PROCESS_SUCCESS.getDescription());
            return JSON.toJSONString(result);
        }
        catch (Exception e) {
            logger.error("获取用户信息异常,{}", e.toString());
            return JSON.toJSONString(result);
        }
    }

    /**
     * 注册
     * @return
     */
    @RequestMapping(value = "register",  produces = "text/plain;charset=utf-8",method = RequestMethod.POST)
    @ResponseBody
    public String register(HttpServletRequest request){
        // 服务端验证
        Map<String,Object> params = getParams();
        String userName = getStringValueByParams(params, "userName");
        String nickName = getStringValueByParams(params, "nickName");
        String password = getStringValueByParams(params, "password");
        Integer userType = (Integer)params.get("userType");
        String companyName = getStringValueByParams(params, "companyName");
        String companyAddress = getStringValueByParams(params, "companyAddress");
        String contacts = getStringValueByParams(params, "contacts");
        String tel = getStringValueByParams(params, "tel");
        String email = getStringValueByParams(params, "email");
        String remark = getStringValueByParams(params, "remark");
        String payPassword = getStringValueByParams(params, "payPassword");

        if(StringUtils.isBlank(userName) || StringUtils.isBlank(password) || null==userType){
            return requiredParamsResponse();
        }
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(ControllerResultEnum.SERVER_REGISTER_FAIL.getStatus());
        result.setResultComment(ControllerResultEnum.SERVER_REGISTER_FAIL.getDescription());
        
        User user = userService.getUserInfo(userName);
        if(user!=null){
        	return JSON.toJSONString(responseContent(result,ControllerResultEnum.SERVER_USER_ALREADY_EXIST));
        } 
        user = new User();
        user.setUserCode(CodeUtil.genUserCode());
        user.setUserName(userName);
        user.setNickName(nickName);
        user.setUserType(userType);
        user.setPassword(MD5Util.MD5(password));
        user.setCompanyAddress(companyAddress);
        user.setCompanyName(companyName);
        user.setContacts(contacts);
        user.setCreateDate(new Date());
        user.setEmail(email);
        user.setPayPassword(StringUtils.isNotBlank(payPassword)?MD5Util.MD5(payPassword):null);
        user.setRemark(remark);
        user.setStatus(2);
        user.setTel(tel);
        
        try{
            Integer i = userService.saveUser(user);
            if( i.intValue() == 0 ){
                return JSON.toJSONString(responseContent(result,ControllerResultEnum.SERVER_REGISTER_FAIL));
            }else{
            	setCurrentUser(user);
            	result.setResultBody(user);
                result.setResultCode(ControllerResultEnum.PROCESS_SUCCESS.getStatus());
                result.setResultComment(ControllerResultEnum.PROCESS_SUCCESS.getDescription());
                logger.info(JSON.toJSONString(result));
                return JSON.toJSONString(result);
            }
        }catch ( Exception e){
            logger.error("注册异常,{}",e.toString());
            return JSON.toJSONString(result);
        }
    }
    



}
