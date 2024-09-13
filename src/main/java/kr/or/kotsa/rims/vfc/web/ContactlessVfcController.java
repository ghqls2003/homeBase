package kr.or.kotsa.rims.vfc.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.ContactlessVfcService;

@Controller
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
@RequestMapping("vfc")
public class ContactlessVfcController extends CmmnAbstractServiceImpl {

	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";

	@Autowired
	private ContactlessVfcService contactlessVfcService;

	/**
	 * 자격검증 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("contactlessVfc")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
								 HttpServletRequest request, HttpServletResponse response) throws RimsException {

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

	public static String getOperatingSystem(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();

		if (userAgent.contains("IPHONE") || userAgent.contains("IPAD") || userAgent.contains("IPOD") || userAgent.contains("MAC OS")) {
			return "iOS";
		} else {
			return "Android";
		}
	}

	@RequestMapping("contactlessVfc/selectRentInfo")
	@ResponseBody
    public List<Map<String, Object>> selectlistView(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> aa = contactlessVfcService.selectRentInfo(paramsMap);
        return contactlessVfcService.selectRentInfo(paramsMap);
    }
}