package kr.or.kotsa.rims.ma.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.AuthService;

@Controller
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
@RequestMapping("ma")
public class UserManualController extends CmmnAbstractServiceImpl {

	@Autowired
	private AuthService authService;
	@Autowired
	private CmmnService cmmnService;

	@Value("${Globals.verifyLicense}")
	private String verifyLicense;

	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";

	/**
	 * 사용자메뉴얼 웹 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("userManualWeb")
	public ModelAndView viewmain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		String userType = isDevice(request);
		Boolean userTypeBool = true;
		Boolean userOperSystemBool = true;
		String auth = getAuthrtCd();

		if ("G01".equals(auth)) {
			return viewmainCido(paramsMap, mav, request, response);
		} else {
			if (userType == "MOBI") {
				userTypeBool = false;
				String userOperSystem = getOperatingSystem(request);
				if (userOperSystem == "iOS") {
					userOperSystemBool = false;
				}
				return viewmainMobile(paramsMap, mav, request, response);
			} else {
				return viewmainWeb(paramsMap, mav, request, response);
			}
		}
	}

	/**
	 * 사용자메뉴얼 모바일 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("userManualMobile")
	public ModelAndView viewmainMobile(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.setViewName("ma/userManualMobile");
		return mav;
	}

	@RequestMapping("userManual")
	public ModelAndView viewmainWeb(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		paramsMap.put("url", "ma/userManualWeb");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName", tableName);

		mav.setViewName("ma/userManualWeb");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	@RequestMapping("userManualCido")
	public ModelAndView viewmainCido(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.setViewName("ma/userManualCido");
		return mav;
	}

	public static String isDevice(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();
		if (userAgent.contains(IS_MOBILE) || userAgent.contains("IPAD")
				|| (userAgent.contains("ANDROID") && !userAgent.contains("MOBILE")) || userAgent.contains("SM-T")) {
			return IS_MOBILE;
		} else {
			return IS_PC;
		}
	}

	public static String getOperatingSystem(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();

		if (userAgent.contains("IPHONE") || userAgent.contains("IPAD") || userAgent.contains("IPOD")
				|| userAgent.contains("MAC OS")) {
			return "iOS";
		} else {
			return "Android";
		}
	}

}