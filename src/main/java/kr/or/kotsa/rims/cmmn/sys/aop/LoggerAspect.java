package kr.or.kotsa.rims.cmmn.sys.aop;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.MainViewService;
import kr.or.kotsa.rims.ma.service.impl.MainViewDao;

/**
 * Created by ischoi on 2017-03-15.
 */
@Component
@Aspect
public class LoggerAspect extends CmmnAbstractServiceImpl{

    private final static Logger logger = LoggerFactory.getLogger(LoggerAspect.class);

	@Autowired
	private MainViewService mainViewService;

	@Autowired
	private MainViewDao mainViewDao;

    @Pointcut("execution(* kr.or.kotsa.rims..*Controller.view*(..))")
    public void MenuAop() {
    }

    @Pointcut("execution(* kr.or.kotsa.rims..*Controller.select*(..))")
    public void ContollerSelectAOP() {
    }

    @Pointcut("execution(* kr.or.kotsa.rims..*Controller.insert*(..))")
    public void ContollerInsertAOP() {
    }

    @Pointcut("execution(* kr.or.kotsa.rims..*Controller.update*(..))")
    public void ContollerUpdateAOP() {
    }

    @Pointcut("execution(* kr.or.kotsa.rims..*Controller.excel*(..))")
    public void ContollerExcelAOP() {
    }

    @Pointcut("execution(* kr.or.kotsa.rims..*Controller.*(..))")
    public void ContollerAOP() {
    }

    @Pointcut("execution(* kr.or.kotsa.rims..*Impl.*(..))")
    public void ServiceAOP() {

    }
    /**
     * @name               : beforeMenu
     * @description    : URL 접근 제한
     * @date                 : 2023. 06. 21
     * @author	            : 최진호
     * @modify_date  : 2024. 08. 14
     */
    @Before("MenuAop()")
    public void beforeMenu(JoinPoint joinPoint) throws RimsException, IOException {
        // 파라미터 맵 초기화
        Map<String, Object> paramsMap = new HashMap<>();

        HttpServletRequest request = getCurrentRequest();
        paramsMap.put("classNm", getClassName(joinPoint));
        paramsMap.put("menuId", "");

        // 요청된 URL을 파라미터 맵에 추가
        String url = processUrl(request.getRequestURI(), request.getContextPath());
        paramsMap.put("url", url);

        // 세션에서 메뉴 ID를 추가하고 파라미터 맵에 업데이트
        updateMenuIdInSession(paramsMap, request);

        // 필요한 경우, 세션에 전체 메뉴 조회 결과 저장
        saveAllMenuInSessionIfAbsent(request);

        // 필요한 경우, 세션에 메뉴 정보 조회 결과 저장
        saveMenuInfoInSessionIfAbsent(request);

        // 사용자의 메뉴 접근 권한 확인
        checkAccessAuthority(paramsMap, request);
    }

    private HttpServletRequest getCurrentRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    private String getClassName(JoinPoint joinPoint) {
        String[] classNames = joinPoint.getTarget().getClass().toString().split("\\.");
        return classNames[classNames.length - 1];
    }

    private String processUrl(String requestUri, String contextPath) {
        String url = requestUri.substring(contextPath.length());
        return url.startsWith("/") ? url.substring(1) : url;
    }

    private void updateMenuIdInSession(Map<String, Object> paramsMap, HttpServletRequest request)throws RimsException {
        String menuId = mainViewService.selectMenuCd(paramsMap);
        HttpSession session = request.getSession();
        Map<String, Object> userData = (Map)session.getAttribute("userData");
        if (userData != null) {
            userData.put("MENU_ID", menuId);
            session.setAttribute("userData", userData);
        }
        paramsMap.put("menuId", menuId);
    }

    private void saveAllMenuInSessionIfAbsent(HttpServletRequest request)throws RimsException {
        HttpSession session = request.getSession();
        if (session.getAttribute("allMenu") == null) {
            session.setAttribute("allMenu", mainViewDao.selectAllMenu());
        }
    }

    private void saveMenuInfoInSessionIfAbsent(HttpServletRequest request)throws RimsException {
        HttpSession session = request.getSession();
//        if (session.getAttribute("menuData") == null) {
            Map<String, Object> params = new HashMap<>();
            String authorId = getAuthrtCd();

            if (authorId == null || authorId.isEmpty()) {
                authorId = "A01";
                session.setAttribute("authrtCd", "A01");
            }

            params.put("authorId", authorId);
            session.setAttribute("menuData", mainViewDao.selectMenuInfo(params));
//        }
    }

    private void checkAccessAuthority(Map<String, Object> paramsMap, HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession();
        if (session.getAttribute("allMenu") != null) {
            List<Map<String, Object>> allMenu = (List<Map<String, Object>>) session.getAttribute("allMenu");
            for (Map menuMap : allMenu ) {
                if(menuMap != null && isMatchingUrl(menuMap, paramsMap)) {
                    checkMenuPermission(session, paramsMap);
                }
            }
        }
    }

    private boolean isMatchingUrl(Map menuMap, Map paramsMap) {
        String menuUrl = (String) menuMap.get("menuUrl");
        return menuUrl != null && menuUrl.equals(paramsMap.get("url"));
    }

    private void checkMenuPermission(HttpSession session, Map<String, Object> paramsMap) throws IOException {
        List<Map<String, Object>> menuList = (List<Map<String, Object>>) session.getAttribute("menuData");
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
        if (isAccessForbidden(menuList, paramsMap)) {
            response.sendRedirect("/");
        }
    }

    private boolean isAccessForbidden(List<Map<String, Object>> menuList, Map<String, Object> paramsMap) {
        boolean isForbidden = true;
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        HttpSession httpSession = request.getSession();
        Object userData = httpSession.getAttribute("userData");
        Map<String, Object> userDataMap;
        if (userData == null) {
            userDataMap = new HashMap<>();
            userDataMap.put("userSn", 0);
        } else {
            userDataMap = (Map) userData;
        }
        if (menuList != null) {
            for(Map menuMap : menuList){
                String menuCode = (String) menuMap.get("menuCd");
                if (paramsMap.get("menuId").equals(menuCode)) {
                	try {
                		paramsMap.put("userSn", Integer.parseInt(userDataMap.get("userSn").toString()));
                		paramsMap.put("userIp", getClientIP());
                	    paramsMap.put("typeCd", "화면조회");
                	    paramsMap.put("menuType", "1");
						mainViewDao.insertUserConnLog(paramsMap);
					} catch (RimsException e) {
						System.out.println("메뉴 접근권한 확인 중 예외가 발생하였습니다.");
					}
                    isForbidden = false;
                }
            }
        }
        return isForbidden;
    }

    @SuppressWarnings("unchecked")
    @Around(value = "ContollerSelectAOP()")
    public Object listViewSuccessLog(ProceedingJoinPoint joinPoint) throws Throwable, RimsException {

    	long start = System.currentTimeMillis();
	    Object res = joinPoint.proceed();
	    long end = System.currentTimeMillis();

        Map<String, Object> paramsMap = new HashMap();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String[] classNms = joinPoint.getTarget().getClass().toString().split("\\.");
        String classNm = classNms[classNms.length-1];
		String menuUrl = extractSecondMainFromUrl(request.getRequestURI());
		paramsMap.put("menuUrl", menuUrl);
        paramsMap.put("userIp", getClientIP());
        paramsMap.put("classNm", classNm);
        paramsMap.put("typeCd", "R");
        paramsMap.put("url", request.getRequestURI().substring(request.getContextPath().length()));
        String menuId = mainViewService.selectMenuCd(paramsMap);
        paramsMap.put("menuId", menuId);
        
       	// 조회 파라미터
       	Object[] param = joinPoint.getArgs();
	    Map<String, Object> map = new HashMap<String, Object>();
	    if (param.length != 0) {
	    	if (param[0] instanceof Map) {
	    		map = (Map<String, Object>) param[0];
	    	}
	    }
	    
	    String paramTotal = paramTotalSearch(param);
	    
	    
	    if(paramTotal == null || paramTotal.equals("")) {
	    	// 조회건수
	    	if (res instanceof Map) {
	    		Object totalObj = ((Map<String, Object>) res).get("total");
	    		if (totalObj != null && !totalObj.toString().isEmpty()) {
	    			paramsMap.put("total", Integer.parseInt(totalObj.toString())); // 조회건수
	    		} else {
	    			paramsMap.put("total", 0);
	    		}
	    	} else if (res instanceof ModelAndView) {
	    		Object totalObj = ((ModelAndView) res).getModelMap().get("total");
	    		if (totalObj != null && !totalObj.toString().isEmpty()) {
	    			paramsMap.put("total", Integer.parseInt(totalObj.toString())); // 조회건수
	    		} else {
	    			paramsMap.put("total", 0);
	    		}
	    	} 
	    } else {
	    	paramsMap.put("total", Integer.parseInt(paramTotal.toString()));
	    }
	    
        
//     // 조회건수
//        if (res instanceof Map) {
//            Object totalObj = ((Map<String, Object>) res).get("total");
//            if (totalObj != null && !totalObj.toString().isEmpty()) {
//                paramsMap.put("total", Integer.parseInt(totalObj.toString())); // 조회건수
//            }
//        } else if (res instanceof ModelAndView) {
//            Object totalObj = ((ModelAndView) res).getModelMap().get("total");
//            if (totalObj != null && !totalObj.toString().isEmpty()) {
//                paramsMap.put("total", Integer.parseInt(totalObj.toString())); // 조회건수
//            }
//        } else if (res instanceof List){
//            if (res != null && !((List) res).isEmpty()) {
//                paramsMap.put("total", ((List) res).size());
//            } else {
//                paramsMap.put("total", 0);
//            }
//        }
	    

       	String paramStr = "";
       	int firstCheck = 0;
       	for(String key : map.keySet()) {
       		if (!key.equals("_csrf") && !String.valueOf(map.get(key)).equals("") && map.get(key) != null) {

       			if (firstCheck == 0) {
       				paramStr = paramStr.concat(key + "=" + String.valueOf(map.get(key)));
       			} else {
       				paramStr = paramStr.concat(", " + key + "=" + String.valueOf(map.get(key)));
       			}
       			firstCheck = 1;
       		}
       	}
       	paramsMap.put("requstParamtr", paramStr);

        String showUrl = paramsMap.get("url")==null?"":paramsMap.get("url").toString();

        HttpSession httpSession = request.getSession();
        Object userData = httpSession.getAttribute("userData");
        Map<String, Object> userDataMap = (Map)userData;

//        if (userDataMap != null && userDataMap.get("menuId") != null) {
//            paramsMap.put("menuId", userDataMap.get("menuId").toString());
//        }
        if (userDataMap != null && userDataMap.get("userSn") != null) {
        	paramsMap.put("userSn", Integer.parseInt(userDataMap.get("userSn").toString()));
        } else {
        	paramsMap.put("userSn", 0);//비회원
        }
        // 밀리초를 초 단위로 변환
        double excTimeInSeconds = (end - start) / 1000.0;

        // DecimalFormat을 사용하여 소수점 5자리까지 포맷팅
        DecimalFormat df = new DecimalFormat("#.#####");
        String formattedExcTime = df.format(excTimeInSeconds);
        double excTimeAsDouble = Double.parseDouble(formattedExcTime);
        paramsMap.put("param", params(joinPoint));
        paramsMap.put("excTime", excTimeAsDouble);
        paramsMap.put("menuType", "1");
        mainViewDao.insertUserConnLog(paramsMap);
        return res;
    }

    @Around(value = "ContollerInsertAOP()")
    public Object afterCreate(ProceedingJoinPoint joinPoint) throws Throwable, RimsException, IOException {
		long start = System.currentTimeMillis();
	    Object res = joinPoint.proceed();
	    long end = System.currentTimeMillis();
        Map<String, Object> paramsMap = new HashMap();

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String[] classNms = joinPoint.getTarget().getClass().toString().split("\\.");
        String classNm = classNms[classNms.length-1];

        paramsMap.put("classNm", classNm);
        paramsMap.put("url", request.getRequestURI().substring(request.getContextPath().length()));
        String showUrl = paramsMap.get("url")==null?"":paramsMap.get("url").toString();
        if (showUrl.indexOf(".") != -1) {
            paramsMap.put("url", showUrl.substring(0, showUrl.indexOf(".")));
        };
        paramsMap.put("userIp", getClientIP());

        // 메뉴ID 세션에서 가져오기
        HttpSession httpSession = request.getSession();
        Object userData = httpSession.getAttribute("userData");
        Map<String, Object> userDataMap = (Map)userData;
        String menuId = mainViewService.selectMenuCd(paramsMap);

        paramsMap.put("menuId", menuId);
        if (userDataMap != null && userDataMap.get("userSn") != null) {
        	paramsMap.put("userSn", Integer.parseInt(userDataMap.get("userSn").toString()));
        }

        // 조회 파라미터
        Object[] param = joinPoint.getArgs();
	    Map<String, Object> map = new HashMap<String, Object>();
	    if (param.length != 0) {
	    	if (param[0] instanceof Map) {
	    		map = (Map<String, Object>) param[0];
	    	}
	    }
	 // 밀리초를 초 단위로 변환
        double excTimeInSeconds = (end - start) / 1000.0;

        // DecimalFormat을 사용하여 소수점 5자리까지 포맷팅
        DecimalFormat df = new DecimalFormat("#.#####");
        String formattedExcTime = df.format(excTimeInSeconds);
        double excTimeAsDouble = Double.parseDouble(formattedExcTime);
        paramsMap.put("excTime", excTimeAsDouble);
	    paramsMap.put("typeCd", "C");
	    paramsMap.put("param", params(joinPoint));
	    paramsMap.put("menuType", "1");
        convertParamsMapToStr(map, paramsMap);

        mainViewDao.insertUserConnLog(paramsMap);
        return res;
   }

    @Around(value = "ContollerUpdateAOP()")
	public Object updateSuccessLog(ProceedingJoinPoint joinPoint) throws RuntimeException, Throwable, RimsException, IOException{
		long start = System.currentTimeMillis();
	    Object res = joinPoint.proceed();
	    long end = System.currentTimeMillis();

//	    Signature sig = joinPoint.getSignature();
	    Map<String, Object> paramsMap = new HashMap();
	    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	    String[] classNms = joinPoint.getTarget().getClass().toString().split("\\.");
	    String classNm = classNms[classNms.length-1];

	    paramsMap.put("menuId", "");
	    paramsMap.put("classNm", classNm);
	    paramsMap.put("url", request.getRequestURI().substring(request.getContextPath().length()));

	    //조회건수
	    if (res instanceof Map) {
	        if (((Map<String, Object>) res).get("total") != null && ((Map<String, Object>) res).get("total") != "") {
	            paramsMap.put("total", String.valueOf(((Map<String, Object>) res).get("total"))); // 조회건수
	        }
	    } else if (res instanceof ModelAndView) {
	        if (((ModelAndView) res).getModelMap().get("total") != null && ((ModelAndView) res).getModelMap().get("total") != "") {
	            paramsMap.put("total", String.valueOf(((ModelAndView) res).getModelMap().get("total"))); // 조회건수
	        }
	    } else if (res instanceof List){
	        if (res != null && ((List) res).size() != 0) {
	            paramsMap.put("total", ((List) res).size());
	        } else {
	            paramsMap.put("total", "0");
	        }
	    }

	    // 조회 파라미터
	    Object[] param = joinPoint.getArgs();
	    Map<String, Object> map = new HashMap<String, Object>();
	    if (param.length != 0) {
	    	if (param[0] instanceof Map) {
	    		map = (Map<String, Object>) param[0];
	    	}
	    }

	    String paramStr = "";
	    int firstCheck = 0;
	    for(String key : map.keySet()) {
	        if (!key.equals("_csrf") && !String.valueOf(map.get(key)).equals("") && map.get(key) != null) {

	            if (firstCheck == 0) {
	                paramStr = paramStr.concat(key + "=" + String.valueOf(map.get(key)));
	            } else {
	                paramStr = paramStr.concat(", " + key + "=" + String.valueOf(map.get(key)));
	            }

	            firstCheck = 1;
	        }
	    }
	    paramsMap.put("requstParamtr", paramStr);

	    String showUrl = paramsMap.get("url")==null?"":paramsMap.get("url").toString();

	    HttpSession httpSession = request.getSession();
	    Object userData = httpSession.getAttribute("userData");
	    Map<String, Object> userDataMap = (Map)userData;
	    if (userDataMap != null && userDataMap.get("userSn") != null) {
        	paramsMap.put("userSn", Integer.parseInt(userDataMap.get("userSn").toString()));
        } else {
        	paramsMap.put("userSn", 0);//비회원
        }

	    if (userDataMap != null && userDataMap.get("menuId") != null) {
	        paramsMap.put("menuId", userDataMap.get("menuId").toString());
	    }
	    paramsMap.put("userIp", getClientIP());
	    paramsMap.put("typeCd", "U");
	    double excTimeInSeconds = (end - start) / 1000.0;

        // DecimalFormat을 사용하여 소수점 5자리까지 포맷팅
        DecimalFormat df = new DecimalFormat("#.#####");
        String formattedExcTime = df.format(excTimeInSeconds);
        double excTimeAsDouble = Double.parseDouble(formattedExcTime);
        paramsMap.put("excTime", excTimeAsDouble);
	    paramsMap.put("param", params(joinPoint));
	    paramsMap.put("menuType", "1");
	    convertParamsMapToStr(map, paramsMap);
	    mainViewDao.insertUserConnLog(paramsMap);
	    return res;
	}

    @Around(value = "ContollerExcelAOP()")
    public Object AfterReturningExcel(ProceedingJoinPoint joinPoint) throws RuntimeException, Throwable, RimsException, IOException {

    	long start = System.currentTimeMillis();
    	
    	Object[] args = joinPoint.getArgs(); // 메서드 입력 파라미터
        logParameters(args); // 입력 파라미터 로깅
        
        
	    Object res = joinPoint.proceed();
	    long end = System.currentTimeMillis();
        Map<String, Object> paramsMap = new HashMap();;
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String[] classNms = joinPoint.getTarget().getClass().toString().split("\\.");
        String classNm = classNms[classNms.length-1];

        paramsMap.put("menuId", "");
        paramsMap.put("classNm", classNm);
        paramsMap.put("url", request.getRequestURI().substring(request.getContextPath().length()));
        String showUrl = paramsMap.get("url")==null?"":paramsMap.get("url").toString();

        HttpSession httpSession = request.getSession();
        Object userData = httpSession.getAttribute("userData");
        Map<String, Object> userDataMap = (Map)userData;
	    if (userDataMap != null && userDataMap.get("userSn") != null) {
        	paramsMap.put("userSn", Integer.parseInt(userDataMap.get("userSn").toString()));
        } else {
        	paramsMap.put("userSn", 0);//비회원
        }

        if (userDataMap != null && userDataMap.get("menuId") != null) {
            paramsMap.put("menuId", userDataMap.get("menuId").toString());
        }

        // 조회 파라미터
        Object[] param = joinPoint.getArgs();
	    Map<String, Object> map = new HashMap<String, Object>();
	    if (param.length != 0) {
	    	if (param[0] instanceof Map) {
	    		map = (Map<String, Object>) param[0];
	    	}
	    }

	    // 엑셀다운로드 사유입력
        String excelDownReason = (String) map.get("excelDownReason");
        paramsMap.put("excelDownReason", excelDownReason);

    	// 조회건수
    	if (map.get("total") != null && map.get("total") != "") {
    		paramsMap.put("total", map.get("total"));
    	}
    	
    	logResult(res); // 결과 객체 로깅
        logExecutionTime(start, end); // 실행 시간 로깅
//    	Object parameter = null;
//		if (invocation.getArgs().length > 1) {
//			parameter = invocation.getArgs()[1];
//		}
//    	BoundSql boundSql = mappedStatement.getBoundSql(parameter);
//		Configuration configuration = mappedStatement.getConfiguration();
//		
//    	showSql(configuration, boundSql);

    	paramsMap.put("userIp", getClientIP());
	    paramsMap.put("typeCd", "파일 다운로드");
	    double excTimeInSeconds = (end - start) / 1000.0;

        // DecimalFormat을 사용하여 소수점 5자리까지 포맷팅
        DecimalFormat df = new DecimalFormat("#.#####");
        String formattedExcTime = df.format(excTimeInSeconds);
        double excTimeAsDouble = Double.parseDouble(formattedExcTime);
        paramsMap.put("excTime", excTimeAsDouble);
	    paramsMap.put("param", params(joinPoint));
	    paramsMap.put("menuType", "1");
    	mainViewDao.insertUserConnLog(paramsMap);
    	return res;
        /*
        try {
           //TODO:로그처리 필요 commonService.createDownloadHist(paramsMap);
        } catch (HmtsException e) {
            throw new HmtsException("예외가 발생했습니다.");
        }*/
    }
    
    private void logParameters(Object[] args) {
        if (args == null || args.length == 0) {
            System.out.println("No parameters.");
            return;
        }

        System.out.println("Method parameters:");
        for (int i = 0; i < args.length; i++) {
            if (args[i] != null) {
                System.out.println("Parameter " + (i + 1) + ": " + args[i].toString());
            } else {
                System.out.println("Parameter " + (i + 1) + ": null");
            }
        }
    }

    private void logResult(Object result) {
        if (result != null) {
            System.out.println("Method result: " + result.toString());
        } else {
            System.out.println("Method result: null");
        }
    }

    private void logExecutionTime(long start, long end) {
        long executionTime = end - start;
        System.out.println("Method execution time: " + executionTime + " milliseconds");
    }
    
    
    
    /////////////////////////////////////////////////////////////////////////////test


    @Before("ContollerAOP()")
    public void before(JoinPoint joinPoint) {
        Signature sig = joinPoint.getSignature();
        logger.info("{}.{}( {} )", joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), Arrays.toString(joinPoint.getArgs()));
    }

    @Around("ServiceAOP()")
    public Object serviceMeasure(ProceedingJoinPoint joinPoint) throws Throwable {

        long start = System.nanoTime();
        //String type = joinPoint.getSignature().getDeclaringTypeName();

        try {
            Object result = joinPoint.proceed();
            return result;
        } finally {

            long finish = System.nanoTime();
            Signature sig = joinPoint.getSignature();
            logger.info("{}.{}({}) 실행 시간 : {} ns", joinPoint.getTarget().getClass().getSimpleName(), sig.getName(), Arrays.toString(joinPoint.getArgs()), (finish - start));
        }
    }

    @AfterThrowing(pointcut = "ContollerAOP() || ServiceAOP()", throwing = "ex")
    public void afterThrowing(Throwable ex) {
        logger.error("에러 {}", ex);
    }

    private void checkTooLongValues(Map<String, Object> map) {
        ArrayList<String> willDeleteKeys = new ArrayList<>();
        for (String key : map.keySet()) {
            boolean tooLongValue = String.valueOf(map.get(key)).length() > 500;
            if (tooLongValue) {
                willDeleteKeys.add(key);
            }
        }

        for (String key : willDeleteKeys) {
            map.remove(key);
        }
    }

	private String params(JoinPoint joinPoint) {
		CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
		String[] parameterNames = codeSignature.getParameterNames();
		Object[] args = joinPoint.getArgs();
		if (parameterNames == null)
			return "";

		String params = "";
		/*
		 * for (int i = 0; i < parameterNames.length; i++) { params+= args[i]; }
		 */

		// 위 로직은 모든 파라메터를 DB에 넣게 되어 있어 길이나 특수문자 등 오류 발생함
		// 첫 번째 인자값에만 파라메터를 넣도록 해야 함
		if (parameterNames.length > 0) {
			params += args[0];
		}

		return params;
	}
    private void convertParamsMapToStr(Map<String, Object> map, Map<String, Object> paramsMap) {
        checkTooLongValues(map);

        String paramStr = "";
        int firstCheck = 0;
        for(String key : map.keySet()) {
            if (!key.equals("_csrf") && !String.valueOf(map.get(key)).equals("") && map.get(key) != null) {

                if (firstCheck == 0) {
                    paramStr = paramStr.concat(key + "=" + String.valueOf(map.get(key)));
                } else {
                    paramStr = paramStr.concat(", " + key + "=" + String.valueOf(map.get(key)));
                }

                firstCheck = 1;
            }
        }

        // paramStr에 csrf 포함되어 있을 시 삭제
        if (paramStr.contains("_csrf")) {
            int deleteStartIndex = paramStr.indexOf("_csrf");
            int deleteEndIndex = 0;

            for (int i = deleteStartIndex; i < paramStr.length(); i++) {
                char cr = paramStr.charAt(i);
                String crToStr = Character.toString(cr);
                if (crToStr.equals(",")) {
                    deleteEndIndex = i;
                    break;
                }
            }
            paramStr = paramStr.substring(0, deleteStartIndex) + paramStr.substring(deleteEndIndex + 2, paramStr.length());
        }

        paramsMap.put("requstParamtr", "");
        paramsMap.put("requstParamtr", paramStr);
    }

    private String extractSecondMainFromUrl(String url) {
	    // URL을 '/'로 분리
	    String[] parts = url.split("/");

	    if (parts.length >= 2) { // parts[0]은 빈 문자열이므로 실제 URL 세그먼트는 parts[1]부터 시작
	        return parts[2].toUpperCase();
	    } else {
	        // URL에 두 번째 세그먼트가 없는 경우 빈 문자열을 반환
	        return "";
	    }
	}
    
    public String paramTotalSearch (Object[] param) {
    	
    	String pageTotal = null;
    	if (param.length != 0) {
    		Object firstParam = param[0];
    		 // 첫 번째 매개변수가 Map인지 확인
            if (firstParam instanceof Map) {
                Map<String, Object> paramMap = (Map<String, Object>) firstParam;
                
                if (paramMap.containsKey("pageSize")) {
                    pageTotal = String.valueOf(paramMap.get("pageSize"));
                } else if (paramMap.containsKey("take")) {
                    pageTotal = String.valueOf(paramMap.get("take"));
                }
            } 
//    		Map<String, Object> paramMap = (Map<String, Object>)param[0];
//    		
//    		if (paramMap.containsKey("pageSize")) {
//    			pageTotal = String.valueOf(paramMap.get("pageSize"));
//    		} else if (paramMap.containsKey("take")) {
//    			pageTotal = String.valueOf(paramMap.get("take"));
//    		} 
    	}
    	
    	return pageTotal;
    }
}
