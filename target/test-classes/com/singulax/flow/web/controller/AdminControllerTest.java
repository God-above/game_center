package com.singulax.flow.web.controller;

import com.singulax.flow.web.ControllerTest;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author tonnyyi
 * @since 15/7/3 16:25
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ControllerTest
public class AdminControllerTest {

    @Autowired
    private WebApplicationContext wac;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void queryCouponList() throws Exception {
        MvcResult result = mockMvc.perform(post("/admin/getCouponList")) //执行请求
                //.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")) //验证响应contentType
                .andExpect(status().is2xxSuccessful()).andDo(print()).andReturn();
        //.andExpect(jsonPath("$.id").value(1)); //使用Json path验证JSON 请参考http://goessner.net/articles/JsonPath/

        assertThat(result.getResponse().getStatus(), is(200));
    }

    @Test
    public void queryCoupon() throws Exception {
        MvcResult result = mockMvc.perform(post("/admin/getCouponInfo").param("couponNo", "677137496255701")) //执行请求
                //.andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8")) //验证响应contentType
                .andExpect(status().is2xxSuccessful()).andDo(print()).andReturn();
        //.andExpect(jsonPath("$.id").value(1)); //使用Json path验证JSON 请参考http://goessner.net/articles/JsonPath/

        assertThat(result.getResponse().getStatus(), is(200));
    }
}
