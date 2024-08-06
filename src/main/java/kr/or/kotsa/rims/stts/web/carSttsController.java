package kr.or.kotsa.rims.stts.web;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import kr.or.kotsa.rims.stts.service.CarSttsService;

@Controller
@RequestMapping("stts")
public class carSttsController extends CmmnAbstractServiceImpl {

	@Autowired
	CarSttsService carSttsService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 대여차량통계 페이지
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/carStts")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		String [] validAuth = {"K01", "Z01", "M01", "D01"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("cmptncZoneCd", getCmptncZoneCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("upBzmnSn", getUpBzmnSn());
			
			paramsMap.put("url", "stts/carStts");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);
			
			mav.setViewName("stts/carStts");
		} else {
			mav.setViewName("redirect:/");
		}
		
		return mav;
	}
	
	/**
	 * 대여차량 차종
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carStts/carmdl")
	@ResponseBody
	public Object selectCarmdl(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> carmdl = carSttsService.carmdl(paramsMap);
		
		return carmdl;
	}
	
	/**
	 * 대여차량 연식
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carStts/mdlyr")
	@ResponseBody
	public Object selectMdlyr(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> mdlyr = carSttsService.mdlyr(paramsMap);
		
		return mdlyr;
	}
	
	/**
	 * 법인별 대여차량
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carStts/crprtnData")
	@ResponseBody
	public Object selectCrprtnData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> crprtnData = carSttsService.crprtnData(paramsMap);
		result.put("crprtnData", crprtnData);
		
		return result;
	}
	
	/**
	 * 법인별 대여차량 목록
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carStts/crprtnCarData")
	@ResponseBody
	public Object selectCrprtnCarData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> crprtnCarData = carSttsService.crprtnCarData(paramsMap);
		result.put("crprtnCarData", crprtnCarData);
		
		return result;
	}
}