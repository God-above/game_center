package com.singulax.flow.web.service;

import com.singulax.flow.common.model.User;

public interface UserService {

	public User getUserByUserCode(String userCode);

	public User getUserInfo(String info);

	public Integer saveUser(User user);

	public Integer updateUser(User user);

}
