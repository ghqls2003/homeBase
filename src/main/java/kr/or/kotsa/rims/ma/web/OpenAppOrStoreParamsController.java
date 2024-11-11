package kr.or.kotsa.rims.ma.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@RequestMapping("ma")
@Controller
public class OpenAppOrStoreParamsController {

	@RequestMapping("openAppOrStoreParams")
	public ModelAndView openAppOrStoreParamsView(@RequestParam Map<String, Object> paramsMap, HttpServletRequest request, ModelAndView mav) throws RimsException {
		mav.setViewName("ma/openAppOrStoreParams");
		System.out.println(paramsMap);
		
		return mav;
	}
}