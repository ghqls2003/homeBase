package kr.or.kotsa.rims.vfc.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.RentIdpService;
import kr.or.kotsa.rims.vfc.service.impl.RentIdpDao;

@Controller
@RequestMapping("vfc")
public class RentIdpController extends CmmnAbstractServiceImpl{

	private static final Logger logger = LoggerFactory.getLogger(RentIdpController.class);
	
	@Autowired
	private RentIdpService rentIdpService;
	
	@Autowired
	private CmmnService cmmnService;
	
	@Autowired
	private RentIdpDao rentIdpDao; 
	
	String author = "";
	
	@RequestMapping("rentIdp")
	public ModelAndView rentIdpView(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		mav.setViewName("vfc/rentIdp");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	@RequestMapping("/rentIdp/selectRentIdpList")
	@ResponseBody
	public Object selectRentIdpList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
		paramsMap.put("bzmnSn", getBzmnSn());
	
		return rentIdpService.selectRentIdpList(paramsMap);

	}
	
	@RequestMapping("/rentIdp/selectDetailRentInfo")
	@ResponseBody
	public List<Map<String, Object>> selectDetailRentInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rentIdpService.selectDetailRentInfo(paramsMap);
	}
	
	@RequestMapping(value = "/rentIdp/updateRentInfo")
	@ResponseBody
	public ModelAndView updateRentInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		int ret = 0;
		String resultMsg = "";
		ModelAndView mav = new ModelAndView("jsonView");
		ret =  rentIdpService.updateRentInfo(paramsMap);
		if(ret == 1) {
			resultMsg = "완료";
		} else {
			resultMsg = "실패";
		}
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	
	@RequestMapping("/rentIdp/selectCarList")
	@ResponseBody
	public Object selectCarList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> list = rentIdpDao.selectCarList(paramsMap);
		int total = rentIdpDao.selectCarListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
	
	@RequestMapping("/rentIdp/updateDeleteYn")
	@ResponseBody
	public int updateDeleteYn(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rentIdpService.updateDeleteYn(paramsMap);
	}
	
	@RequestMapping("/rentIdp/insertRentReg")
	@ResponseBody
	public int insertRentReg(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("LoginUserAuthrtCd", getAuthrtCd());
		paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("IP", getClientIP());
		//추가
		paramsMap.put("bzmnSn", getBzmnSn());
		return rentIdpService.insertRentReg(paramsMap);
	}
	
	@RequestMapping("/rentIdp/insertConfData")
	@ResponseBody
	public int insertConfData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("clientIP", getClientIP());

		return rentIdpService.insertConfData(paramsMap);
	}
	
	@RequestMapping("rentIdpReport")
	public ModelAndView rentIdpReport(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("vfc/rentalIdpReport");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	
	

}
