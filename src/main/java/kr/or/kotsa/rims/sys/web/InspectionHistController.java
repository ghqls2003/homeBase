package kr.or.kotsa.rims.sys.web;

import java.util.Arrays;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.InspectionHistService;

@Controller
@RequestMapping("sys")
public class InspectionHistController extends CmmnAbstractServiceImpl{
	
	@Autowired
	private InspectionHistService inspectionHistService;
	
	@RequestMapping("/inspectionHist")
	public ModelAndView viewInspectionHist(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws RimsException {
		
 		String [] validAuth = {"Z01", "K01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
		} else {
			mav.setViewName("redirect:/");
		}		
		return mav;
	}
	
	@PostMapping("/inspectionHist/selectInspectionHistInfo")
	@ResponseBody
	public Map<String, Object> selectSmsSendInfo(@RequestBody Map<String, Object> paramsMap){
		Map<String, Object> aa = inspectionHistService.selectInspectionHistInfo(paramsMap);
		return aa;
	}
	
	@RequestMapping(value = "/inspectionHist/insertInspectionHist")
	@ResponseBody
	public int insertRentReg(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.insertInspectionHist(paramsMap);
	}
	
	
}


