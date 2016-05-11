package com.singulax.flow.web.propertis;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Properties;
import java.util.Set;

/**
 * 配置文件读取类
 * @author: hp.long
 * @date : 2014-09-15 16:16
 */
public class ConfigProperties {

    public static HashMap<String,Object> map = new HashMap<String,Object>();
    public static Properties properties = new Properties();
    static{
        init();
    }

    public static void init(){
        InputStream input = null;
        try{
           input = ConfigProperties.class.getClassLoader().getResourceAsStream("config.properties");
           
           properties.load(input);
        }catch ( Exception e ){
            e.printStackTrace();
        }finally {
            if( input != null ){
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public static void main(String[] args) {
    	String time = ConfigProperties.properties.getProperty("api.cid");
    	System.out.println(time);
        Set<String> set = ConfigProperties.map.keySet();
        Iterator<String> it = set.iterator();
        while( it.hasNext() ){
            System.out.println(it.next());
        }
    }
}
