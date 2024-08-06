package kr.or.kotsa.rims.ma.service.impl;

import static kr.or.kotsa.rims.cmmn.sys.util.CommonUtil.getXSS;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.MainViewService;

@Service
public class MainViewServiceImpl extends CmmnAbstractServiceImpl implements MainViewService {

	private static final Logger logger = LoggerFactory.getLogger(MainViewServiceImpl.class);

	@Autowired
	private MainViewDao mainViewDao;

	private static final String USERID = "userId";
	private static final String USERNM = "userNm";
	private static final String UPDIP = "updIp";
	private static final String UPDID = "updId";
	private static final String SUCCESS = "success";
	private static final String MESSAGE = "message";
	private static final String LOGINFAILRCO = "loginFailrCo";
	private static final String LOCKRESN = "lockResn";
	private static final String LOCKDT = "lockDt";
	private static final String LASTLOGINDT = "lastLoginDt";
	private static final String IPADDR = "ipAddr";
	private static final String CONFMCD = "confmCd";
	private static final String CMPNYNM = "cmpnyNm";
	private static final String BIZRNO = "bizrno";
	private static final String AUTHORNM = "authorNm";
	private static final String AUTHORID = "authorId";
	private static final String ACNTSTACD = "acntStaCd";
	private static final String SSO_ID = "SSO_ID";

    /**
     * 메인 지도 조회
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectShpMap(Map<String, Object> paramsMap) throws RimsException {
    	return mainViewDao.selectShpMap(paramsMap);
    }

    /**
     * 공지사항 조회
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> searchTopNotice(Map<String, Object> paramsMap) throws RimsException {
    	return mainViewDao.searchTopNotice(paramsMap);
    }



	/**
	 * 메뉴 조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@Override
	public Map<String, Object> menuInfoList(HttpServletRequest request, Map<String, Object> paramsMap)
			throws RimsException {

		HttpSession session = request.getSession();
		String authrtCd = (String) session.getAttribute("authrtCd");
		if ( authrtCd != null ) {
			paramsMap.put("authorId", authrtCd);
		} else {
			paramsMap.put("authorId", "A01");
		}

		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> menuInfo = mainViewDao.selectMenuInfo(paramsMap);

		menuInfo = getMenuHire(menuInfo);
		session.removeAttribute("menuData");
		session.setAttribute("menuData", menuInfo);

		result.put(SUCCESS, true);
		result.put("menuInfoList", menuInfo);
		return result;
	}

    @Override
    public String selectMenuCd(Map<String, Object> paramsMap) throws RimsException {
    	String url = (String) paramsMap.get("url");
        String modifiedUrl = extractFirstTwoSegmentsFromUrl(url);
        paramsMap.put("urlSr", modifiedUrl);
        return mainViewDao.selectMenuCd(paramsMap);
    }
    
    private String extractFirstTwoSegmentsFromUrl(String url) {
        String[] segments = url.split("/");
        if (segments.length >= 3) {
            return segments[1] + "/" + segments[2];
        }
        return url;
    }
    
    /**
   	 * 메인화면 팝업 조회
   	 * author:정영훈
   	 * date:240228
   	 */
   	public List<Map<String, Object>> selectMainPopup(String authrtCd) throws RimsException{
	   List<Map<String, Object>> result = mainViewDao.selectMainPopup();
       if (result == null) {
       		return new ArrayList<>();
       }
       List<Map<String, Object>> filteredList =  filterPopup(result, authrtCd);
       if(filteredList == null) {
    	   return new ArrayList<>();
       }
       
       return filteredList;
    }

	public List<Map<String, Object>> filterPopup(List<Map<String, Object>> resultList, String authrtCd) {
   		
   		Map<String, Integer> authMap = new HashMap<>();
   		authMap.put("D01", 1);
   		authMap.put("Z01", 2);
   		authMap.put("K01", 4);
   		authMap.put("M01", 8);
   		authMap.put("G01", 16);
   		authMap.put("G02", 32);
   		authMap.put("S01", 64);
   		authMap.put("S02", 128);
   		authMap.put("S03", 256);
   		authMap.put("S04", 512);
   		authMap.put("A01", 1024);
   		
        String currentUserCd = authrtCd;
        if (currentUserCd == null || currentUserCd.isEmpty()) {
        	currentUserCd = "A01";
        }
        
        int currentUserVal = authMap.get(currentUserCd); 
        
        // 결과 담을 거
        List<Map<String, Object>> filteredList = new ArrayList<>();
        
        for (Map<String, Object> result : resultList) {
    		try {
    			int prslAuthrtCd = Integer.parseInt((String) result.getOrDefault("prslAuthrtCd", "0"));
    			
    			for (Map.Entry<String, Integer> auth : authMap.entrySet()) {
    				if (currentUserVal != 0 && auth.getValue() != null && (prslAuthrtCd & auth.getValue()) == currentUserVal) {
    					 filteredList.add(result);
    					 break;
    				 }
    			}
        
    		} catch (NumberFormatException e){
    			e.printStackTrace();
    			
    		}
        }
        
        return filteredList;
	
   	}

	@Override
	public Map<String, Object> selectSvrStat() throws RimsException {
	   Map<String, Object> result = new HashMap<>();
		try {
			List<Map<String, Object>> svrStatList = mainViewDao.selectSvrStat();
			result.put(SUCCESS, true);
		   	result.put("svrStatList", svrStatList);
	   }catch (Exception e){
			result.put(SUCCESS, false);
			result.put("svrStatList", Collections.emptyList());
			logger.error("selectSvrStat Error", e);
			e.printStackTrace();
	   }
	   return result;
	}
   	
}
   	
   	
