package kr.or.kotsa.rims.ma.web;

import static kr.or.kotsa.rims.cmmn.sys.util.GeojsonRenderer.renderGeojson;

import java.io.IOException;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
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
	private static boolean IS_MW = false;

	@Autowired
	private MainViewService mainViewService;
	
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
		String old_new = isOldNew(request);
		
		
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
		boolean userTypeDetail = isAccMthd(request);
		
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
		} catch (IOException e) {
			System.out.println("exception Occured");
		}
		
		mav.addObject("busine", busine);
		mav.addObject("admstt", admstt);
		mav.addObject("type", userType);
		mav.addObject("userTypeDetail", userTypeDetail);
		mav.addObject("guest", guest);
		mav.addObject("old_new", old_new);
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

	public static boolean isAccMthd(HttpServletRequest req) {
//		iOS에서 크롬으로 접속 시, CRIOS(Chrome on iOS)가 존재
		String userAgent = req.getHeader("User-Agent").toUpperCase();
		if(userAgent.contains("INRIMSAPP")) {
			return IS_MW;
		} else if(userAgent.contains("WV")) {
			return IS_MW;
		} else if(userAgent.contains("IPHONE") && !userAgent.contains("SAFARI")) {
			return IS_MW;
		} else {
			return true;
		}
	}
	
	public static String isOldNew(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();
		if(userAgent.contains("INRIMSAPP") && userAgent.contains("WV")) {
			return "NEW";
		} else if(!userAgent.contains("INRIMSAPP") && userAgent.contains("WV")) {
			return "OLD";
		} else if(userAgent.contains("INRIMSAPP") && userAgent.contains("IPHONE") && !userAgent.contains("SAFARI")) {
			return "NEW";
		} else if(!userAgent.contains("INRIMSAPP") && userAgent.contains("IPHONE") && !userAgent.contains("SAFARI")) {
			return "OLD";
		} else {
			return "";
		}
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
	
	/**
	 * 시간별 API 요청 건수 조회
	 * @param request
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("main/apiHourCnt")
	@ResponseBody
	public List<Map<String, Object>> apiHourCnt(HttpServletRequest request) throws RimsException{
		List<Map<String, Object>> result = mainViewService.apiHourCnt();
		
		return  result;
	}
	
	@RequestMapping("main/svrStat")
	@ResponseBody
	public Map<String, Object> svrStat(HttpServletRequest request, HttpServletResponse response) throws RimsException, IOException {
		return mainViewService.svrStat();
	}
}