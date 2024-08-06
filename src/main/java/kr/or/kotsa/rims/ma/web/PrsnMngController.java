package kr.or.kotsa.rims.ma.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.MyPageService;
import kr.or.kotsa.rims.ma.service.PrsnMngService;

@Controller
@RequestMapping("ma")
public class PrsnMngController extends CmmnAbstractServiceImpl{
	
	@Autowired
	private	PrsnMngService prsnMngService;
	
	@RequestMapping("prsnMng/selectPrsnMngList")
	@ResponseBody
    public ModelAndView selectPrsnMngList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");
    	
    	List<Map<String, Object>> list = prsnMngService.selectPrsnMngList(paramsMap);
		
    	mav.addObject("data", list);
    	
        return mav;
    }

}
