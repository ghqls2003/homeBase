package kr.or.kotsa.rims.cmmn.sys.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.impl.CmmnDao;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ExcelRegValChk {

    // 공통
    @Autowired
    private CmmnDao cmmnDao;

    // 공통코드값 체크
    private Map<String, Object> commonCdChkMsg(int num, String colval, String name, List<Map<String, Object>> commonCdList)throws RimsException{
        Map<String, Object> resultMap = new HashMap<>();
        String result = "";
        boolean isValid = true;
        boolean hvCommonChk = false;

        for(Map<String, Object> commonCd : commonCdList){
            String cdId = commonCd.get("cdId").toString();
            if(colval.equals(cdId)){
                hvCommonChk = true;
                break;
            }
        }

        if(!hvCommonChk){
            isValid = false;
            result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "이(가) 유효한 코드값이 아닙니다.";
        }

        resultMap.put("isValid", isValid);
        resultMap.put("result", result);

        return resultMap;
    }

    // null 체크 & '-' replace
    private Map<String, Object> nullChkMsg(List<Map<String, Object>> list, int num, String column, String name) {
        Map<String, Object> map = new HashMap<>();
        boolean isValid = true;
        String reStr = "";
        String result = "";

        String val = (String) list.get(num).get(column);

        if (val == null || val.equals("")) {
            result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "이(가) 없습니다.";
            isValid = false;
        } else {
            reStr = ((String) list.get(num).get(column)).replaceAll("-", "");
        }

        map.put("isValid", isValid);
        map.put("reStr", reStr);
        map.put("result", result);

        return map;
    }

    // 휴대폰 번호 형식 체크
    private String phoneChkMsg(int num, String colval, String name) {
        String result = "";
        Pattern p = Pattern.compile("^01([0|1|2|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$");
        Matcher m = p.matcher(colval);

        if (m.find()) {
            if(colval.length() < 10) result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "이(가) 휴대폰번호 형식이 아닙니다.";
        }

        return result;
    }

    // 숫자인지 체크
    private String numChkMng(int num, String colval, String name) {
        String result = "";
//        int numChk = 0;

        try{
            Integer.parseInt(colval);
            return result;
        } catch(NumberFormatException e){
            result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "에 숫자를 제외한 값이 존재합니다.";
            return result;
        }

    }

    // useYn 'Y', 'N' 체크
    private String useYnChkMsg(int num, String colval, String name) {
        String result = "";

        if (!(colval.equals("Y")) && !(colval.equals("N"))) {
            result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "이(가) 'Y'나 'N'이 아닙니다.";
        }

        return result;
    }

    // 문자열 max 길이 체크
    private String maxLengthChkMsg(int num, String colval, String name, int maxLength) {
        String result = "";

        if (colval.length() > maxLength) {
            result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "이(가) 문자열 제한길이를 초과하였습니다.";
        }

        return result;
    }

    // 문자열 길이 체크
    private String lengthChkMsg(int num, String colval, String name, int[] lengthList) {
        String result = "";
        boolean lengthChk = false;

        for(int length : lengthList){
            if(colval.length() == length){
                lengthChk = true;
                break;
            }
        }
        if(!lengthChk) {
            result = "\n" + String.valueOf(num + 1) + " 번째 줄의 " + name + "은(는) " + lengthList.toString() + "만 가능합니다.";
        }

        return result;
    }

    //날짜 형식 체크
    private String dateCheck(int num, String colval, String form){
        String result = "";
        SimpleDateFormat df = new SimpleDateFormat(form);

        df.setLenient(false);
        try {
            Date date = df.parse(colval);
            return result;
        } catch (ParseException e) {
            result = "\n" + String.valueOf(num + 1) + " 번째 줄은 잘못된 날짜 형식 입니다.";
            return result;
        }
    }

    // 엑셀파일 내부 중복 체크
    private Map<String, Object> listDupicateCheck(List<Map<String, Object>> list, List<Map<String, Object>> columns) {
        Map<String, Object> reObj = new HashMap<>();
        boolean isValid = true;
        List<Map<String, Object>> resultList = new ArrayList<>();


        for(Map<String, Object> column : columns) {

            List<String> valList = new ArrayList<>();
            List<String> dumList = new ArrayList<>();

            // 20200515 replaceBar 없으면 '-'제거 ("N" > '-'제거안함)
            if(!column.containsKey("replaceBar") ) {
                for (Map<String, Object> map : list) {
                    valList.add(((String) map.get(column.get("column"))).replaceAll("-", ""));
                }
            }else{
                for (Map<String, Object> map : list) {
                    valList.add((String) map.get(column.get("column")));
                }
            }

            int num = 0;
            for(String val : valList) {
                if(dumList.contains(val)) {
                    Map<String, Object> obj = new HashMap<>();
                    obj.put("num", (num + 1));
                    obj.put("column", column.get("name"));
                    obj.put("value", val);
                    resultList.add(obj);

                    isValid = false;
            }

                if(!dumList.contains(val)){
                    dumList.add(val);
                }

                num++;
            }

        }

        reObj.put("resultList", resultList);
        reObj.put("isValid", isValid);

        return reObj;
    }

}
