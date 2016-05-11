package com.singulax.flow.web.dao;

import java.util.*;

import com.singulax.flow.common.model.User;

import org.apache.ibatis.annotations.Param;

/**
 * 用户dao操作
 * 
 * @author: 江超
 * @date : 2014-09-11 14:36
 */
public interface UserMapper {

	User getUserByUserCode(String userCode);

	User getUserByEmail(String email);

	/**
	 * 插入用户信息
	 * 
	 * @param user
	 * @return 1：插入成功；0：插入失败
	 */
	Integer saveUser(User user);

	Integer updateUser(User user);

	/**
	 * 通过字段获取用户
	 * 
	 * @param info
	 * @return
	 */
	User getUserInfo(String info);
	/**
	 * 用户是不是存在
	 * 
	 * @param info
	 * @return
	 */
	int getUserExist(String info);

	/**
	 * 向redis中增加用户支付错误记录
	 * 
	 * @param userCode
	 *            用户编号
	 * @param date
	 *            错误时间
	 * @param expireSecs
	 *            key的过期时间, 单位为秒
	 * @return 增加的记录数
	 */
	Integer addPayErrorLog2Redis(String userCode, Date date, Long expireSecs);

	/**
	 * 从redis中查询用户支付错误记录数
	 * 
	 * @param userCode
	 *            用户编号
	 * @return 记录数
	 */
	Integer getPayErrorLogFromRedis(String userCode);

	/**
	 * 清空redis中用户支付错误记录
	 * 
	 * @param userCode
	 *            用户编号
	 * @return
	 */
	boolean cleanPayErrorInRedis(String userCode);

	List<User> userPage(Map<String, Object> map);

	Integer updateUserStatus(Map<String, Object> map);

	Integer clearLastLoginFailedDate(@Param("userCode") String userCode);

	Integer updateLastLoginDate(@Param("userCode") String userCode,
			@Param("lastLoginDate") Date lastLoginDate);

	User getUserByTel(String tel);

	int emptyTel(@Param("userCode") String userCode);

	int emptyEmail(String userCode);

	/**
	 * 根据openId查询用户信息 <功能详细描述>
	 * 
	 * @param openId
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	User getUserByOpenId(String openId);

	/**
	 * 更新用户微信状态 <功能详细描述>
	 * 
	 * @param user
	 * @param newState
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	Integer updateUserState(@Param(value = "user") User user,
			@Param(value = "newState") Integer newState);

	/**
	 * 根据userCode更新手机号 <功能详细描述>
	 * 
	 * @param userCode
	 * @param tel
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	Integer updateTelByUserCode(@Param(value = "userCode") String userCode,
			@Param(value = "tel") String tel);

	/**
	 * 获取所有关注用户的列表
	 * <功能详细描述>
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	List<User> getUserListAttention(Integer state);

	/**
	 * 根据条件查询用户列表总条数
	 * <功能详细描述>
	 * @param params
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	Integer getUserListCountByParams(Map<String, Object> params);

	/**
	 * 根据列表查询用户列表
	 * <功能详细描述>
	 * @param params
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	List<User> getUserListByParams(Map<String, Object> params);
}
