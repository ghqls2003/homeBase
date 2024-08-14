package kr.or.kotsa.rims.ma.web;

import static kr.or.kotsa.rims.cmmn.sys.util.GeojsonRenderer.renderGeojson;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.InterfaceAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;


import org.apache.poi.util.SystemOutLogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.LoginVO;
import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.AuthService;
import kr.or.kotsa.rims.ma.service.LoginViewService;
import kr.or.kotsa.rims.ma.service.MainViewService;

@Controller
@RequestMapping("ma")
public class MainViewController extends CmmnAbstractServiceImpl{
	private static final String GEOMETRY = "geometry";
	private static final Logger logger = LoggerFactory.getLogger(MainViewController.class);
	private static final String USERDATA = "userData";
	private static final String CONFMCD = "confmCd";
	private static final String SSO_ID = "SSO_ID";
	private static final String AUTHOR_LV = "AUTHOR_LV";

	final String isLogin = "isLogin";
	
	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";

	@Autowired
	private MainViewService mainViewService;

	@Autowired
	private CmmnService cmmnService;
	
	
	@Autowired
	private AuthService authService;
	
	
	/**
	 * 메인 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("main")
	public ModelAndView viewmain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		Boolean guest = false;
		Boolean busine = false;
		Boolean admstt = false;
		String auth = getAuthrtCd(); 
		
		
//		char firstChar = auth.charAt(0);
		if(auth == "" || auth == null) {
			guest = true;
		} else {
			char firstChar = auth.charAt(0);
			if(firstChar == 'S' ) {
				busine = true;
			} else if (firstChar == 'M' || firstChar == 'G' || firstChar == 'K' || firstChar == 'Z' || firstChar == 'D' ){
				admstt = true;
			}
		}
		String userType = isDevice(request);
		
		
//      이건 내부 WAS를 못잡더라		
//		try {
//            // 현재 호스트의 IP 주소 가져오기
//            InetAddress inetAddress = InetAddress.getLocalHost();
//            String inIp = request.getRemoteAddr();
//            String ipAddress = inetAddress.getHostAddress();
//            
//            if(inIp == "10.149.150.59" || ipAddress == "10.149.150.59") {
//            	mav.addObject("ipCheck", "W1");
//            } else if(inIp == "10.149.150.60" || ipAddress == "10.149.150.60") {
//            	mav.addObject("ipCheck", "W2");
//            } else {
//            	mav.addObject("ipCheck", "none");
//            }
//        } catch (UnknownHostException e) {
//            e.printStackTrace();
//        }
		
		
		try {
			Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();
			
			boolean ipFound = false;
			
		    while (networkInterfaces.hasMoreElements() && !ipFound) {
		    	NetworkInterface networkInterface = networkInterfaces.nextElement();
		        Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
		        
		        while (inetAddresses.hasMoreElements()) {
			        InetAddress inetAddress = inetAddresses.nextElement();
			        System.out.println("inetCheck : "+ inetAddress);
			        
			        if (inetAddress.isSiteLocalAddress()) {
			        	if(inetAddress.getHostAddress().equals("10.149.150.59")) {
			        		mav.addObject("ipCheck", "W1");
			        		ipFound = true;
			        		break;
			        	} else if(inetAddress.getHostAddress().equals("10.149.150.60")) {
			        		mav.addObject("ipCheck", "W2");
			        		ipFound = true;
			        		break;
			        	} else {
			        		mav.addObject("ipCheck", "none");
			        	}
			        }
		        }
		    }
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		mav.addObject("busine", busine);
		mav.addObject("admstt", admstt);
		mav.addObject("type", userType);
		mav.addObject("guest", guest);
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	public static String isDevice(HttpServletRequest req) {
	    String userAgent = req.getHeader("User-Agent").toUpperCase();
	    if(userAgent.contains(IS_MOBILE) || userAgent.contains("IPAD") || 
	       (userAgent.contains("ANDROID") && !userAgent.contains("MOBILE")) || 
	       userAgent.contains("SM-T")) {
	        return IS_MOBILE;
	    } else {
	        return IS_PC;
	    }
	}
	
	/**
	 * 회원가입 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws HmtsException
	 */
	@RequestMapping("join")
	public ModelAndView viewjoin(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.setViewName("ma/join");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
	 * 에러 페이지 설정
	 *
	 * @param paramsMap
	 * @return
	 * @throws HmtsException
	 */
	@RequestMapping("error")
	public ModelAndView viewerrorView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.setViewName("/error");
		return mav;
	}

	/**
	 * shpMap조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws HmtsException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value = "main/selectShpMap", produces = "application/json; charset=utf8")
	@ResponseBody
	public Object shpMap(@RequestParam Map<String, Object> paramsMap) throws RimsException {
	    Object obj = mainViewService.selectShpMap(paramsMap);
    	return renderGeojson((List<Map>) obj, GEOMETRY);
	}

	/**
	 * 공지사항 조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws HmtsException
	 */
	@RequestMapping(value = "main/topNotice")
	@ResponseBody
	public Object topNotice(@RequestParam Map<String, Object> paramsMap) throws RimsException {
		return mainViewService.searchTopNotice(paramsMap);
	}

	/**
	 * default 메뉴 조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws MtisException
	 */
	@RequestMapping("main/menuInfoList")
	@ResponseBody
	public Object menuInfoList(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request)
			throws RimsException {
		Map<String, Object> resultMap = mainViewService.menuInfoList(request, paramsMap);
		
		return resultMap;
	}
	
	/**
	 * 팝업 조회
	 *
	 * @return result
	 * @throws RimsException
	 */
	@RequestMapping(value= "main/popup")
	@ResponseBody
	public List<Map<String, Object>> popup() throws RimsException {
		String authrtCd = getAuthrtCd();
		List<Map<String, Object>> popupData = mainViewService.selectMainPopup(authrtCd);
		
		if (popupData == null) {
	        return Collections.emptyList();
	    }
		 
		return popupData;
	}

	@RequestMapping("main/svrStat")
	@ResponseBody
	@Async
	public void svrStat(HttpServletRequest request, HttpServletResponse response) throws RimsException, IOException {
		String result = "";
		String authrtCd = getAuthrtCd();

		Gson objGson = new Gson();

		char firstChar = authrtCd.charAt(0);
		if(firstChar == 'S' ) {
			result = objGson.toJson(Collections.emptyMap());
		}else {
			Map<String, Object> resultMap = mainViewService.selectSvrStat();
			result = objGson.toJson(resultMap);
		}
		response.setContentType("text/event-stream;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Connection", "keep-alive");
		PrintWriter writer = response.getWriter();
		writer.write("event: message\n\n");
		writer.write("data: " + new StringBuffer(result) + "\n\n");
		writer.flush();

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			logger.error("InterruptedException 에러 발생");
			Thread.currentThread().interrupt();
		}
	}
	
	  /**
     * 개인정보보호 보안 서약서 처리
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("main/updateTermsInfo")
	@ResponseBody
	public Object updateAgre(@RequestBody Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException {
		HttpSession httpSession = httpServletRequest.getSession();
		paramsMap.put("userId", httpSession.getAttribute(SSO_ID).toString());
		
		Object userData = httpSession.getAttribute("userData");
		Map<String, Object> userDataMap = (Map) userData;
		
		paramsMap.put("userSn", userDataMap.get("userSn"));
		paramsMap.put("regIp", userDataMap.get("regIp"));
		
		int res = mainViewService.updateAgre(paramsMap);
		return res;
	} 
}