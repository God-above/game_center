package com.singulax.flow.web.dao;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.singulax.flow.web.ServiceTest;
import com.singulax.flow.web.service.UserService;

/**
 * @author tonnyyi
 * @since 15/3/26 15:06
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ServiceTest
public class UserPersistTest {
    @Autowired
    private UserService userService;

}
