package kr.or.kotsa.rims.ma.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Controller
@RequestMapping("ma")
public class PrivacyController {


	/**
	 * 개인정보 처리방침 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("privacy")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("ma/privacy");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	/**
	 * 개인정보 처리방침 화면 241002
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("privacy_241002")
	public ModelAndView privacy_241002(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("ma/privacy_241002");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}



}