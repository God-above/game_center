package com.singulax.flow.web.controller;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.singulax.flow.common.model.User;
import com.singulax.flow.common.util.MD5Util;
import com.singulax.flow.web.constant.ControllerResultBean;
import com.singulax.flow.common.enumerate.ControllerResultEnum;
import com.singulax.flow.common.enumerate.UserTypeEnum;
import com.singulax.flow.web.constant.SessionConstant;
import com.singulax.flow.web.service.UserService;


/**
 * @author jiangchao
 * @since 15/3/24 10:38
 */
@Controller
public class LoginController extends BaseController{
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private UserService userService;

    // 登录密码错误期限
    private final int verifyLimitMinutes = 30;

    /**
     * 检查用户登录是否需要输入验证码
     * 半个小时内密码输入错误, 则需要输入验证码, 登录成功以后不再需要
     * <p/>
     * 必填参数:
     * username         - 登录名
     *
     * @return {
     *      resultBody: true|false
     * }
     */
    @RequestMapping(value = "isVerifyCodeRequired", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE + ";charset=utf-8")
    @ResponseBody
    public String isVerifyCodeRequired() {
        String username = getStringValueByParams(getParams(), "username");

        if (StringUtils.isBlank(username)) {
            return requiredParamsResponse();
        }

        User user = userService.getUserInfo(username);
        if (user == null) {
            return JSON.toJSONString(new ControllerResultBean(ControllerResultEnum.SERVER_USER_NOT_EXIST));
        }

        boolean isNeedVerifyCode = false;
        Date lastLoginFailedDate = user.getLastLoginFailedDate();
        if (lastLoginFailedDate != null) {
            // 30 分钟内密码输入错误过, 则需要输入验证码
            if (DateUtils.addMinutes(lastLoginFailedDate, verifyLimitMinutes).compareTo(new Date()) > 0) {
                isNeedVerifyCode = true;
            }
        }

        ControllerResultBean resultBean = new ControllerResultBean(ControllerResultEnum.REQUEST_SUCCESS);
        resultBean.setResultBody(isNeedVerifyCode);
        return JSON.toJSONString(resultBean);
    }

    /**
     * 登陆系统
     * @return
     */
    @RequestMapping(value = "login",  produces = "text/plain;charset=utf-8",method = RequestMethod.POST)
    @ResponseBody
    public String doLogin(HttpServletRequest request){
        // 服务端验证
        Map<String,Object> params = getParams();
        String loginName = getStringValueByParams(params, "loginName");// 登陆账号
        String loginPswd = getStringValueByParams(params, "loginPswd");// 登陆密码
        Integer userType = getIntegerValueByParams(params, "userType");// 登陆
        String validateCode = getStringValueByParams(params, "validateCode");// 验证码
        if(StringUtils.isBlank(loginName) || StringUtils.isBlank(loginPswd) || userType == null){
            return requiredParamsResponse();
        }
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(ControllerResultEnum.LOGIN_FAIL.getStatus());
        result.setResultComment(ControllerResultEnum.LOGIN_FAIL.getDescription());
        Object code = getSession().getAttribute(SessionConstant.VAILDATE_CODE);
        String sessionValidateCode = (code != null ? code.toString() : "");
        try{
            User user= userService.getUserInfo(loginName);

            // 验证是否需要验证码
            boolean needVerifyCode = false;
            if (user != null) {
                Date lastLoginFailedDate = user.getLastLoginFailedDate();
                if (lastLoginFailedDate != null && DateUtils.addMinutes(lastLoginFailedDate, verifyLimitMinutes).compareTo(new Date()) > 0) {
                    needVerifyCode = true;
                }
            }

            if(needVerifyCode && StringUtils.equalsIgnoreCase(sessionValidateCode, validateCode)){
                result.setResultCode(ControllerResultEnum.CAPTCHA_CODE_ERROR.getStatus());
                result.setResultComment(ControllerResultEnum.CAPTCHA_CODE_ERROR.getDescription());
                return JSON.toJSONString(result);
            }
            if( user != null ){
                String pswdMd5 = MD5Util.MD5(loginPswd);
                if( !pswdMd5.equals(user.getPassword()) ){// 登陆密码错误
                    result.setResultCode(ControllerResultEnum.LOGIN_PWD_ERROR.getStatus());
                    result.setResultComment(ControllerResultEnum.LOGIN_PWD_ERROR.getDescription());
                    return JSON.toJSONString(result);
                }
                if( user.getStatus() == 0 ){// 登陆账号已停用
                    result.setResultCode(ControllerResultEnum.SERVER_USER_DISABLE.getStatus());
                    result.setResultComment(ControllerResultEnum.SERVER_USER_DISABLE.getDescription());
                    return JSON.toJSONString(result);
                }
                if (user.getUserType().compareTo(userType) != 0) {
                    return JSON.toJSONString(responseContent(ControllerResultEnum.SERVER_USER_NOT_EXIST));
                }
                user.setLastLoginDate(new Date());
                logger.debug("更新用户最后一次登录时间");
//                userService.updateLastLoginDate(user.getUserCode(), user.getLastLoginDate());
                setCurrentUser(user);

                // 清空最后一次登录失败时间
                logger.debug("登录成功, 清空最后一次登录失败时间字段");
//                userService.clearLastLoginFailed(loginName);

                User u = new User();//前端传递时只需要传以下字段，其余的不需要
                u.setUserCode(user.getUserCode());
                u.setUserName(user.getUserName());
                u.setNickName(user.getNickName());
                u.setStatus(user.getStatus());
                u.setEmail(user.getEmail());
                u.setTel(user.getTel());
                u.setUserType(user.getUserType());
                u.setUrlType(getStringValueByParams(params, "urlType"));//前台如果传递则填充
                result.setResultBody(u);
                result.setResultCode(ControllerResultEnum.PROCESS_SUCCESS.getStatus());
                result.setResultComment(ControllerResultEnum.PROCESS_SUCCESS.getDescription());
                logger.info(JSON.toJSONString(result));
                return JSON.toJSONString(result);
            }else{
                result.setResultCode(ControllerResultEnum.SERVER_USER_NOT_EXIST.getStatus());
                result.setResultComment(ControllerResultEnum.SERVER_USER_NOT_EXIST.getDescription());
                return JSON.toJSONString(result);
            }
        }catch ( Exception e){
            logger.error("登陆异常,{}",e.toString());
            return JSON.toJSONString(result);
        }
    }
    
    /**
     * 管理员登陆
     * loginName       		String  登陆账号
     * loginPswd      		String  登陆密码
     * validateCode			String  验证码
     * @return
     */
    @RequestMapping(value = "adminLogin",  produces = "text/plain;charset=utf-8",method = RequestMethod.POST)
    @ResponseBody
    public String adminLogin(HttpServletRequest request){
        // 服务端验证
        Map<String,Object> params = getParams();
        String loginName = getStringValueByParams(params, "loginName");// 登陆账号
        String loginPswd = getStringValueByParams(params, "loginPswd");// 登陆密码
        String validateCode = getStringValueByParams(params, "validateCode");// 验证码
        if(StringUtils.isBlank(loginName) || StringUtils.isBlank(loginPswd) || StringUtils.isBlank(validateCode) ){
            return requiredParamsResponse();
        }
        ControllerResultBean result = new ControllerResultBean();
        result.setResultCode(ControllerResultEnum.LOGIN_FAIL.getStatus());
        result.setResultComment(ControllerResultEnum.LOGIN_FAIL.getDescription());
        Object code = getSession().getAttribute(SessionConstant.VAILDATE_CODE);
        String sessionValidateCode = (code != null ? code.toString() : "");
        try{
            if( null != validateCode && !validateCode.toLowerCase().equals(sessionValidateCode.toLowerCase())){
                result.setResultCode(ControllerResultEnum.CAPTCHA_CODE_ERROR.getStatus());
                result.setResultComment(ControllerResultEnum.CAPTCHA_CODE_ERROR.getDescription());
                return JSON.toJSONString(result);
            }
//            User user= userService.getUserByUserCode(loginName);
            User user= userService.getUserInfo(loginName);
            if( user != null ){
                String pswdMd5 = MD5Util.MD5(loginPswd);
                if( !pswdMd5.equals(user.getPassword()) ){// 登陆密码错误
                    result.setResultCode(ControllerResultEnum.LOGIN_PWD_ERROR.getStatus());
                    result.setResultComment(ControllerResultEnum.LOGIN_PWD_ERROR.getDescription());
                    return JSON.toJSONString(result);
                }
                if( user.getStatus() == 0 ){// 登陆账号已停用
                    result.setResultCode(ControllerResultEnum.SERVER_USER_DISABLE.getStatus());
                    result.setResultComment(ControllerResultEnum.SERVER_USER_DISABLE.getDescription());
                    return JSON.toJSONString(result);
                }
                if( user.getUserType()!=UserTypeEnum.SIX.getCode() ){// 登陆账号非管理员
                    result.setResultCode(ControllerResultEnum.ILLEGAL_ACCESS.getStatus());
                    result.setResultComment(ControllerResultEnum.ILLEGAL_ACCESS.getDescription());
                    return JSON.toJSONString(result);
                }
                
                setCurrentUser(user);
//                setAuthority(user);
                User u = new User();//前端传递时只需要传以下字段，其余的不需要
                u.setUserCode(user.getUserCode());
                u.setUserName(user.getUserName());
                u.setNickName(user.getNickName());
                u.setStatus(user.getStatus());
                u.setEmail(user.getEmail());
                u.setTel(user.getTel());
                u.setUserType(user.getUserType());
                u.setUrlType(getStringValueByParams(params, "urlType"));//前台如果传递则填充
                result.setResultBody(u);
                result.setResultCode(ControllerResultEnum.PROCESS_SUCCESS.getStatus());
                result.setResultComment(ControllerResultEnum.PROCESS_SUCCESS.getDescription());
                logger.info(JSON.toJSONString(result));
                return JSON.toJSONString(result);
            }else{
                result.setResultCode(ControllerResultEnum.SERVER_USER_NOT_EXIST.getStatus());
                result.setResultComment(ControllerResultEnum.SERVER_USER_NOT_EXIST.getDescription());
                return JSON.toJSONString(result);
            }
        }catch ( Exception e){
            logger.error("登陆异常,{}",e.toString());
            return JSON.toJSONString(result);
        }
    }

    /**
     * 登出系统
     * @return
     */
    @RequestMapping("logout")
    @ResponseBody
    public String logout(){
        ControllerResultBean result = new ControllerResultBean();
        try{
            getSession().setAttribute(SessionConstant.CURRENT_USER, null);
            getSession().removeAttribute(SessionConstant.CURRENT_USER);
            result.setResultCode(ControllerResultEnum.PROCESS_SUCCESS.getStatus());
            result.setResultComment(ControllerResultEnum.PROCESS_SUCCESS.getDescription());
        }catch (Exception e ){
            logger.error("登出异常，{}", e.toString());
        }
        return JSON.toJSONString(result);
    }

}
