package com.singulax.flow.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.*;

/**
 * @author tonnyyi
 * @since 15/5/11 10:39
 */
public class PropertiesUtil {
    private static ConcurrentHashMap<String, Properties> loadedPropertiesFile = new ConcurrentHashMap<>(10);


    public static String getStringValue(String key) {
        String defaultPropertiesFile = "config.properties";
        if (loadedPropertiesFile.get(defaultPropertiesFile) == null) {
            loadProperties(defaultPropertiesFile);
        }

        return readProperties(defaultPropertiesFile, key);
    }

    private static String readProperties(String propertiesFileName, String key) {
        Properties properties = loadedPropertiesFile.get(propertiesFileName);
        return properties == null ? null : properties.getProperty(key);
    }

    private static synchronized Properties loadProperties(String filePath) {
        Properties properties = loadedPropertiesFile.get(filePath);
        if (properties == null) {
            final File propFile = new File(filePath);
            try (InputStream is = propFile.isFile() ? new FileInputStream(propFile) : PropertiesUtil.class.getClassLoader().getResourceAsStream(filePath)) {
                if (is != null) {
                    properties = new Properties();
                    properties.load(is);
                    loadedPropertiesFile.put(filePath, properties);
                }
                else {
                    throw new IllegalArgumentException("Property file " + filePath + " was not found.");
                }
            }
            catch (IOException io) {
                throw new RuntimeException("Error loading properties file", io);
            }
        }
        return properties;
    }


}
