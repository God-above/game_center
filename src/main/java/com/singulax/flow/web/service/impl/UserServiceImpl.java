package com.singulax.flow.web.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.singulax.flow.common.model.User;
import com.singulax.flow.web.dao.UserMapper;
import com.singulax.flow.web.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
    private UserMapper userMapper;


	@Override
	public User getUserByUserCode(String userCode) {
		return userMapper.getUserByUserCode(userCode);
	}
	
	@Override
	public Integer saveUser(User user) {
		return userMapper.saveUser(user);
	}

	@Override
	public Integer updateUser(User user) {
		return userMapper.updateUser(user);
	}


	@Override
	public User getUserInfo(String info) {
		// TODO Auto-generated method stub
		return userMapper.getUserInfo(info);
	}


}
