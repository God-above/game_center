package com.singulax.flow.web;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.web.WebAppConfiguration;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@ContextHierarchy({@ContextConfiguration(name = "parent", locations = {"classpath:spring-context.xml", "classpath:spring-mybatis.xml"}), @ContextConfiguration(name = "child", locations = "classpath:spring-mvc.xml")})
@WebAppConfiguration(value = "src/main/webapp")
//@TransactionConfiguration(transactionManager = "transactionManager", defaultRollback = true)
//@Transactional
public @interface ControllerTest {
}
