package kr.or.kotsa.rims.cmmn.sys.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 시간관련 처리 유틸 클래스.
 *
 * @author YangJunHo
 * <p>
 * 2013. 1. 16.
 */
public class TimeUtil {
    private static final Log logger = LogFactory.getLog(TimeUtil.class);

    public static final long MILLI_WEEK = 1000 * 60 * 60 * 24 * 7;

    /**
     * 두 "날짜/시간" 간격을 'milliseconds' 단위로 반환.
     *
     * @param parmStartDate
     * @param parmEndDate
     * @param parmDateFormat
     * @return end date - start date
     * @throws ParseException
     */
    public static long getDateInterval(String parmStartDate, String parmEndDate, String parmDateFormat
    ) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(parmDateFormat);
        Date startDate = null, endDate = null;
        try {
            startDate = format.parse(parmStartDate);
            endDate = format.parse(parmEndDate);
        } catch (ParseException e) {
            logger.error(e);
            throw e;
        }

        return endDate.getTime() - startDate.getTime();
    }

    /**
     * 원하는 포맷을 입력 받아 원하는 간격의 날짜/시간 값을 구한다.
     *
     * @return
     */
    public static String simpleCalendarFormat(String parmDateFormat, int parmField, int parmAmount) {
        Calendar cal = Calendar.getInstance();
        //cal.setTime( new Date ( System.currentTimeMillis() ) );
        if (parmAmount != 0) {
            cal.add(parmField, parmAmount);
        }
        return new SimpleDateFormat(parmDateFormat).format(cal.getTime());
    }

    public static String simpleCalendarFormat(String parmDateFormat) {
        Calendar cal = Calendar.getInstance();
        //cal.setTime( new Date ( System.currentTimeMillis() ) );
        return new SimpleDateFormat(parmDateFormat).format(cal.getTime());
    }

    public static boolean checkDateFormat(String parmDate) {
        String pattern = "[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])";
        if (java.util.regex.Pattern.compile(pattern).matcher(parmDate).find() == false || parmDate.length() != 8) {
            return false;
        }
        return true;
    }

    public static String getSomeDay(String date, int day) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        Date sDate = formatter.parse(date);

        Calendar startCal = Calendar.getInstance();
        startCal.setTime(sDate);
        startCal.add(Calendar.DAY_OF_MONTH, day);
        String str = formatter.format(startCal.getTime());
        return str;
    }

    public static String getSomedaysAgo(int day) {
        Calendar todayCal = Calendar.getInstance();
        todayCal.setTimeInMillis(System.currentTimeMillis());
        todayCal.add(Calendar.DAY_OF_MONTH, -day);
        return new SimpleDateFormat("yyyyMMdd").format(todayCal.getTime());
    }

    public static String getSomedaysAfter(int day) {
        Calendar todayCal = Calendar.getInstance();
        todayCal.setTimeInMillis(System.currentTimeMillis());
        todayCal.add(Calendar.DAY_OF_MONTH, day);
        return new SimpleDateFormat("yyyyMMdd").format(todayCal.getTime());
    }

    public static String dateparsing(String date) {
        date = date.substring(0, 4) + "." + date.substring(4, 6) + "." + date.subSequence(6,
            8
        ) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
        return date;
    }
    
    /**
     * yyyymmddhhmmss 와 같은 8자리 또는 14자리 date string 값을 날짜 형식으로 전환 YYYY-MM-DD 또는 YYYY-MM-DD H:M:S
     * @param date
     * @param pattern
     * @return
     */
    public static String dateStringParsing(String date, String pattern) {
    	if(date.length() > 8 ) {
	        date = date.substring(0, 4) + pattern + date.substring(4, 6) + pattern + date.subSequence(6,8) + 
	        		" " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
    	}
    	else {
    		date = date.substring(0, 4) + pattern + date.substring(4, 6) + pattern + date.subSequence(6,8);
    	}
        return date;
    }
    
    /**
     * 엑셀용 : yyyymmddhhmmss 와 같은 8자리 또는 14자리 date string 값을 날짜 형식으로 전환 YYYY-MM-DD 또는 YYYY-MM-DD H:M 
     * @param date
     * @param pattern
     * @return
     */
    public static String dateStringExcelParsing(String date, String pattern) {
    	if(date.length() > 8 ) {
	        date = date.substring(0, 4) + pattern + date.substring(4, 6) + pattern + date.subSequence(6,8) + 
	        		" " + date.substring(8, 10) + ":" + date.substring(10, 12);
    	}
    	else {
    		date = date.substring(0, 4) + pattern + date.substring(4, 6) + pattern + date.subSequence(6,8);
    	}
        return date;
    }

    public static String timeparsing(String time) {
        time = time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6);
        return time;
    }

    public static String dayparsing(String day) {
        day = day.substring(0, 4) + "년" + day.substring(4, 6) + "월" + day.substring(6, 8) + "일";
        return day;
    }

    /**
     * 응용어플리케이션에서 고유값을 사용하기 위해 시스템에서17자리의TIMESTAMP값을 구하는 기능
     *
     * @param
     * @return Timestamp 값
     * @throws
     * @see
     */
    public static String getTimeStamp() {

        String rtnStr = null;

        // 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
        String pattern = "yyyyMMddHHmmssSSS";

        SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
        Timestamp ts = new Timestamp(System.currentTimeMillis());

        rtnStr = sdfCurrent.format(ts.getTime());

        return rtnStr;
    }

    /**
     * 특정한 time 값을 받아 yyyyMMddhhmmssSSS Timestamp로 변환
     *
     * @param time 값
     * @return Timestamp 값
     * @throws
     * @see
     */
    public static String getTokenTimeStamp(long time) {

        String rtnStr = null;

        // 문자열로 변환하기 위한 패턴 설정(년도-월-일 시:분:초:초(자정이후 초))
        String pattern = "yyyyMMddHHmmssSSS";

        SimpleDateFormat sdfCurrent = new SimpleDateFormat(pattern, Locale.KOREA);
        Timestamp ts = new Timestamp(time);

        rtnStr = sdfCurrent.format(ts.getTime());


        return rtnStr;
    }

    /**
     * 특정한 time 값을 받아 yyyyMMddhhmmssSSS Timestamp로 변환
     *
     * @param Timestamp 값
     * @return Timestamp 값
     * @throws ParseException
     * @see
     */
    public static long getDateTime(String Timestamp) throws ParseException {

        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        Date tempDate = null;
        String tempDateString = null;
        try {
            tempDate = df.parse(Timestamp);
        } catch (ParseException e) {
            logger.error(e);
            throw e;
        }
        return tempDate.getTime();
    }
}
