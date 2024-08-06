package kr.or.kotsa.rims.stts.web;

import static kr.or.kotsa.rims.cmmn.sys.util.GeojsonRenderer.renderGeojson;

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
import kr.or.kotsa.rims.stts.service.RentSttsService;

@Controller
@RequestMapping("stts")
public class rentSttController extends CmmnAbstractServiceImpl {

	private static final String GEOMETRY = "geometry";

	@Autowired
	RentSttsService rentSttsService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 종합통계 페이지
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/rentStts")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		String [] validAuth = {"K01", "Z01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("cmptncZoneCd", getCmptncZoneCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("upBzmnSn", getUpBzmnSn());
			
			paramsMap.put("url", "stts/rentStts");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);
			
			mav.setViewName("stts/rentStts");
		} else {
			mav.setViewName("redirect:/");
		}
		
		return mav;
	}
	
	/**
	 * mapData조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value = "rentStts/selectMapData", produces = "application/json; charset=utf8")
	@ResponseBody
	public Object selectMapData(@RequestParam Map<String, Object> paramsMap) throws RimsException {
	    Object obj = rentSttsService.selectMapData(paramsMap);
    	return renderGeojson((List<Map>) obj, GEOMETRY);
	}
	
	/**
	 * mapDetailData조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping("rentStts/selectDetailMapData")
	@ResponseBody
	public Object selectDetailMapData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Object obj = rentSttsService.selectDetailMapData(paramsMap); 
		return renderGeojson((List<Map>) obj, GEOMETRY);
	}
	
	/**
	 * 대여이력 차종별 통계
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// (년단위)
	@RequestMapping("rentStts/rentCarmdlTime")
	@ResponseBody
	public Object selectRentCarmdlTime(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> rct = new HashMap<>();
		List<Map<String, Object>> rentCarmdlTime = rentSttsService.rentCarmdlTime(paramsMap);
		rct.put("rentCarmdlTime", rentCarmdlTime);
		
		return rct;
	}
	// (지역단위)
	@RequestMapping("rentStts/rentCarmdlArea")
	@ResponseBody
	public Object rentCarmdlArea(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aa = new HashMap<>();
		List<Map<String, Object>> rentCarmdlArea = rentSttsService.rentCarmdlArea(paramsMap);
		aa.put("rentCarmdlArea", rentCarmdlArea);
		
		return aa;
	}
	
	/**
	 * 대여사업자 현황 그리드
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// (년단위)
	@RequestMapping("rentStts/rentHistTimeGrid")
	@ResponseBody
	public Object selectRentHistTimeGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> rhtg = new HashMap<>(); 
		List<Map<String, Object>> rentHistTimeGrid = rentSttsService.rentHistTimeGrid(paramsMap);
		rhtg.put("rentHistTimeGrid", rentHistTimeGrid);
		
		return rhtg;
	}
	// (지역단위)
	@RequestMapping("rentStts/rentHistGrid")
	@ResponseBody
	public Object selectRentHistGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> rentHistGrid = rentSttsService.rentHistGrid(paramsMap);
		result.put("rentHistGrid", rentHistGrid);
		
		List<Map<String, Object>> agencyAreaDetailGrid = rentSttsService.agencyAreaDetailGrid(paramsMap);
		result.put("agencyAreaDetailGrid", agencyAreaDetailGrid);
		
		return result;
	}
	
	/**
	 * 대여이력 월/기간별 통계
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// (지역별)
	@RequestMapping("rentStts/mpChartArea")
	@ResponseBody
	public Object selectMpChartArea(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> mpca = new HashMap<>();
		List<Map<String, Object>> mpChartArea = rentSttsService.mpChartArea(paramsMap);
		mpca.put("mpChartArea", mpChartArea);
		
		return mpca;
	}
	// (기간별)
	@RequestMapping("rentStts/mpChartTime")
	@ResponseBody
	public Object selectMpChartTime(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> mpct = new HashMap<>();
		List<Map<String, Object>> mpChartTime = rentSttsService.mpChartTime(paramsMap);
		mpct.put("mpChartTime", mpChartTime);
		
		return mpct;
	}
}