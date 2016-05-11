package com.singulax.flow.common.util;

import java.util.regex.*;

/**
 * @author tonnyyi
 * @since 15/6/17 19:41
 */
public abstract class EmailUtil {

    private static final String EMAIL_REGEX = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
    private static final Pattern PATTERN = Pattern.compile(EMAIL_REGEX);

    /**
     * 验证是否为邮箱地址
     *
     * @see EmailUtil#EMAIL_REGEX 邮箱地址正则
     * @param emailAddr 待验证地址
     * @return false: null|不是邮箱
     */
    public static boolean isEmail(String emailAddr) {
        if (emailAddr == null) {
            return false;
        }
        Matcher matcher = PATTERN.matcher(emailAddr);
        return matcher.matches();
    }
}
