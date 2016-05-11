package com.singulax.flow.common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.lang3.StringUtils;

public class DateUtil {
	private static final SimpleDateFormat commonDatePattern = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private static final SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final SimpleDateFormat year = new SimpleDateFormat("yyyy");
	private static final SimpleDateFormat month = new SimpleDateFormat("M");
	private static final SimpleDateFormat day = new SimpleDateFormat("d");
	private static final SimpleDateFormat standardTime = new SimpleDateFormat("yyyy-MM-dd");
	private static final SimpleDateFormat codeTime = new SimpleDateFormat("yyyyMMdd");
	private static final SimpleDateFormat timeStamp = new SimpleDateFormat("yyyyMMddHHmmss");
	private static final SimpleDateFormat millisecond = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	/**
	 * HH:mm 格式
	 */
	public final static String hmFormat = "HH:mm";
	
	/**
	 * MM-dd HH:mm 格式
	 */
	public final static String mdhmFormat = "MM-dd HH:mm";
	
	public static Date getDateByString(String time){
		if (null == time)
			return null;
		Date date = null;
		try {
			date = format.parse(time);
		}
		catch (ParseException e) {
			return null;
		}
		return date;
	}
	public static String getStringFromByLongStandardTime(Long date) {
		if (null == date)
			return null;
		Date aDate = new Date(date);
		return standardTime.format(aDate);
	}
	public static String getStringFromByLongNOss(Long date) {
		if (null == date)
			return null;
		Date aDate = new Date(date);
		return commonDatePattern.format(aDate);
	}
	public static String getStringFromByDate(Date date) {
		if (null == date)
			return null;
		return format.format(date);
	}
	public static String getMillisecondFromByDate() {
		Date aDate = new Date();
		return millisecond.format(aDate);
	}
	
	public static String getCodeTimeByDate(Date date) {
		if (null == date)
			return null;
		return codeTime.format(date);
	}
	
	public static String getStringFromByLong(Long date) {
		if (null == date)
			return null;
		Date aDate = new Date(date);
		return format.format(aDate);
	}
	public static String getTimeStampString() {
		Date aDate = new Date();
		return timeStamp.format(aDate);
	}
	
	public static Long getLongFromByString(String time) {
		Date date = null;
		try {
			date = format.parse(time);
		}
		catch (ParseException e) {
			return null;
		}
		if (null != date)
			return date.getTime();
		return null;
	}
	
	public static Long getLongByStringDate(String time) {
		Date date = null;
		try {
			if( StringUtils.isNotBlank( time ))
				date = standardTime.parse(time);
		}
		catch (ParseException e) {
			return null;
		}
		if (null != date)
			return date.getTime();
		return null;
	}
	
	/**
	 * @return yyyy 当前年
	 */
	public static String getYear() {
		Date aDate = new Date();
		return year.format(aDate);
	}
	
	/**
	 * @return M 当前月
	 */
	public static String getMonth() {
		Date aDate = new Date();
		return month.format(aDate);
	}
	
	/**
	 * 当前日
	 * @return
	 */
	public static String getDay(){
		Date aDate = new Date();
		return day.format(aDate);
	}
	
	/**
	 * 得到当前周周一的年份
	 * @return
	 */
	public static String getYearByWeekFirstDay(){
		Calendar calendar = new GregorianCalendar();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
		Date aDate = calendar.getTime();
		return year.format(aDate);
	}
	/**
	 * 得到当前周周一的月份
	 * @return
	 */
	public static String getMonthByWeekFirstDay(){
		Calendar calendar = new GregorianCalendar();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
		Date aDate = calendar.getTime();
		return month.format(aDate);
	}
	/**
	 * 得到当前周周一日期
	 * @return
	 */
	public static String getCurrWeekFirstDay(){
		Calendar calendar = new GregorianCalendar();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
		Date aDate = calendar.getTime();
		return day.format(aDate);
	}
	
	/**
	 * 得到当前周周末的年份
	 * @return
	 */
	public static String getYearByWeekLastDay(){
		Calendar calendar = new GregorianCalendar();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek()+ 6);
		Date aDate = calendar.getTime();
		return year.format(aDate);
	}
	/**
	 * 得到当前周周末的月份
	 * @return
	 */
	public static String getMonthByWeekLastDay(){
		Calendar calendar = new GregorianCalendar();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek()+ 6);
		Date aDate = calendar.getTime();
		return month.format(aDate);
	}
	/**
	 * 得到当前周周末日期
	 * @return
	 */
	public static String getCurrWeekLastDay(){
		Calendar calendar = new GregorianCalendar();
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek() + 6);
		Date aDate = calendar.getTime();
		return day.format(aDate);
	}
	
	
	/**
	 * 当前日期减去指定月数
	 * 
	 * @param m
	 *            指定月数,正负数
	 * @return Calendar
	 */
	public static Calendar addMonth(int m) {
		Calendar date = Calendar.getInstance();
		date.add(Calendar.MONTH, m);
		return date;
	}

	/**
	 * 当前日期减去指定月数
	 * 
	 * @param startTime
	 *            开始时间
	 * @param m
	 *            指定月数,正负数
	 * @return Calendar
	 */
	public static Calendar addMonth(long startTime, int m) {
		Calendar start = Calendar.getInstance();
		start.setTimeInMillis(startTime);
		start.add(Calendar.MONTH, m);
		return start;
	}

	/**
	 * 得到当日开始时间
	 * 
	 * @return
	 */
	public static Date getCurrDayStartTime() {
		Calendar calendar = new GregorianCalendar();
		calendar.set(Calendar.HOUR, -12);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		return calendar.getTime();
	}
	
	/**
	 * 得到当日结束时间
	 * @return
	 */
	public static Date getCurrDayEndTime() {
		Calendar calendar = new GregorianCalendar();
		calendar.set(Calendar.HOUR, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		return calendar.getTime();
	}
	
	/**
	 * 转换时间  Long - String
	 * @param time
	 * @param dateFormat
	 * @return
	 */
	public static String longConvertToString( long time, String dateFormat){
		Date date = new Date( time );
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		return format.format( date );
	}
	
	public static String getBetweenTime( long oldTime ){
		return getBetweenTime( oldTime, System.currentTimeMillis() );
	}
	
	public static String getBetweenTime( long oldTime, long newTime ){
		Calendar oldCalendar = Calendar.getInstance();
		Calendar newCalendar = Calendar.getInstance();
		oldCalendar.setTimeInMillis( oldTime );
		newCalendar.setTimeInMillis( newTime );
		int year = newCalendar.get( Calendar.YEAR ) - oldCalendar.get( Calendar.YEAR );
		if( year > 0 ){
			return longConvertToString(oldTime, mdhmFormat);
		}
		
		int day = newCalendar.get( Calendar.DAY_OF_YEAR ) - oldCalendar.get( Calendar.DAY_OF_YEAR );
		if( day > 0 ){
			switch (day) {
			case 1:
				return "昨天"+ longConvertToString(oldTime, hmFormat);
			case 2:
				return "前天"+ longConvertToString(oldTime, hmFormat);
			default:
				return longConvertToString(oldTime, mdhmFormat);
			}
		}
		
		int hours = newCalendar.get( Calendar.HOUR_OF_DAY ) - oldCalendar.get( Calendar.HOUR_OF_DAY );
		if( hours > 0 ){
			return "今天" + longConvertToString(oldTime, hmFormat);
		}
		
		int minutes = newCalendar.get( Calendar.MINUTE ) - oldCalendar.get( Calendar.MINUTE );
		if( minutes > 0 ){
			return minutes + "分钟前";
		}
		
		int second = newCalendar.get( Calendar.SECOND ) - oldCalendar.get( Calendar.SECOND );
		if( second > 0 ){
			return second + "秒前";
		}else{
			return "刚刚";
		}
	}
	/**
	 * time2 距离 time1 还有 N 天(time1 > time2)
	 * @param time1
	 * @param time2
	 * @return
	 */
	public static Long getQuot(String time1, String time2){
		Long quot = (long) 0;
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
        try {
	        Date date1 = ft.parse( time1 );
	        Date date2 = ft.parse( time2 );
	        quot = date1.getTime() - date2.getTime();
	        quot = quot / 1000 / 60 / 60 / 24;
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
        return quot;
    }
	
	/**
	 * time2 距离 time1 还有 N 小时(time1 > time2)
	 * @param time1
	 * @param time2
	 * @return
	 */
	public static Long getQuotHours(String time1, String time2){
		Long quot = (long) 0;
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        try {
	        Date date1 = ft.parse( time1 );
	        Date date2 = ft.parse( time2 );
	        quot = date1.getTime() - date2.getTime();
	        quot = quot / 1000 / 60 / 60;
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
        return quot;
    }

	/**
	 * time2 距离 time1 还有 N 分钟(time1 > time2)
	 * @param time1
	 * @param time2
	 * @return
	 */
	public static Long getQuotMinute(String time1, String time2){
		Long quot = (long) 0;
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        try {
	        Date date1 = ft.parse( time1 );
	        Date date2 = ft.parse( time2 );
	        quot = date1.getTime() - date2.getTime();
	        quot = quot / 1000 / 60 ;
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
        return quot;
    }
	
    public static Date getNewDateByAdd(Date oldDate, int addYear, int addMonth, int addDay, int addHour, int addMinute, int addSecond){
        Calendar start = Calendar.getInstance();
        start.setTime(oldDate);
        return setNewDate(oldDate, start.get(Calendar.YEAR) + addYear,start.get(Calendar.MONTH) + addMonth,start.get(Calendar.DAY_OF_MONTH) + addDay,
                start.get(Calendar.HOUR_OF_DAY) + addHour, start.get(Calendar.MINUTE) + addMinute, start.get(Calendar.SECOND) + addSecond );
    }

    public static Date setNewDate(Date oldDate, int year, int month, int day, int hour, int minute, int second){
        Calendar start = Calendar.getInstance();
        start.setTime(oldDate);
        start.set(year,month,day,hour, minute, second);
        return start.getTime();
    }

	public static void main(String[] args) {
		long t=DateUtil.getCurrDayStartTime().getTime()-(1000*60*60*24);
		System.out.println(t);
		String endTimeStr = DateUtil.getStringFromByLong(t);
		System.out.println(endTimeStr);
		Date endTime = DateUtil.getDateByString(endTimeStr);
		
		System.out.println(DateUtil.getStringFromByDate(endTime));
//		Date d=DateUtil.getCurrDayStartTime().getTime();
//		DateUtil.get
		String date1 = "2015-01-08 03:25:00";
        String date2 = DateUtil.getStringFromByDate(new Date());
        long day = getQuot(date1,date2);
        long hours = getQuotHours(date1,date2);
        long minute = getQuotMinute(date2,date1);
        System.out.println( "距离"+date1+" 还有 "+day+" 天" );
        System.out.println( "距离"+date1+" 还有 "+hours+" 小时" );
        System.out.println( "距离"+date1+" 还有 "+minute+" 分钟" );
		System.out.println(DateUtil.getCurrWeekFirstDay());
		System.out.println(DateUtil.getCurrWeekLastDay());
		System.out.println(DateUtil.getMonth());
		System.out.println(DateUtil.getDay());
		System.out.println(DateUtil.getLongFromByString("2012-1-1 1:20:1"));
		System.out.println(DateUtil.getStringFromByLongNOss(1325380801000l));
		System.out.println(DateUtil.getDateByString("2014-08-24 14:42:55"));
		System.out.println(DateUtil.getCodeTimeByDate(new Date()));
		
		System.out.println(getTimeStampString().substring(0, 10));
		System.out.println(getMillisecondFromByDate());
		
	}
}
