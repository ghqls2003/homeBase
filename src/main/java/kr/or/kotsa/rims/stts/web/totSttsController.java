package kr.or.kotsa.rims.stts.web;

import static kr.or.kotsa.rims.cmmn.sys.util.GeojsonRenderer.renderGeojson;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.TotSttsService;

@Controller
@RequestMapping("stts")
public class totSttsController extends CmmnAbstractServiceImpl {

	private static final String GEOMETRY = "geometry";

	@Autowired
	TotSttsService totSttsService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 종합통계 페이지
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/totStts")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		String [] validAuth = {"K01", "Z01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("cmptncZoneCd", getCmptncZoneCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("upBzmnSn", getUpBzmnSn());
			
			paramsMap.put("url", "stts/totStts");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);
			
			mav.setViewName("stts/totStts");
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
	@RequestMapping(value = "totStts/selectMapData", produces = "application/json; charset=utf8")
	@ResponseBody
	public Object selectMapData(@RequestParam Map<String, Object> paramsMap) throws RimsException {
	    Object obj = totSttsService.selectMapData(paramsMap);
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
	@RequestMapping("totStts/selectDetailMapData")
	@ResponseBody
	public Object selectDetailMapData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Object obj = totSttsService.selectDetailMapData(paramsMap); 
		return renderGeojson((List<Map>) obj, GEOMETRY);
	}
	
	/**
	 * 대여사업자 영업현황 통계
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// (년단위)
	@RequestMapping("totStts/agencyTimeYear")
	@ResponseBody
	public Object selectAgencyTimeYear(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> tyd = new HashMap<>();
		List<Map<String, Object>> timeYearData = totSttsService.agencyTimeYear(paramsMap);
		tyd.put("timeYearData", timeYearData);
		
		return tyd;
	}
	// (월단위)
	@RequestMapping("totStts/agencyTimeMonth")
	@ResponseBody
	public Object selectAgencyTimeMonth(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> tmd = new HashMap<>();
		List<Map<String, Object>> timeMonthData = totSttsService.agencyTimeMonth(paramsMap);
		tmd.put("timeMonthData", timeMonthData);
		
		return tmd;
	}
	// (지역단위)
	@RequestMapping("totStts/agencyArea")
	@ResponseBody
	public Object selectAgencyArea(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aa = new HashMap<>();
		List<Map<String, Object>> agencyArea = totSttsService.agencyArea(paramsMap);
		aa.put("agencyArea", agencyArea);
		
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
	@RequestMapping("totStts/agencyTimeYearGrid")
	@ResponseBody
	public Object selectAgencyTimeYearGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> atyg = new HashMap<>(); 
		List<Map<String, Object>> agencyTimeYearGrid = totSttsService.agencyTimeYearGrid(paramsMap);
		atyg.put("agencyTimeYearGrid", agencyTimeYearGrid);
		
		return atyg;
	}
	// (월단위)
	@RequestMapping("totStts/agencyTimeMonthGrid")
	@ResponseBody
	public Object selectAgencyTimeMonthGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> atmg = new HashMap<>();
		List<Map<String, Object>> agencyTimeMonthGrid = totSttsService.agencyTimeMonthGrid(paramsMap);
		atmg.put("agencyTimeMonthGrid", agencyTimeMonthGrid);
		
		return atmg;
	}
	// (지역단위)
	@RequestMapping("totStts/agencyAreaGrid")
	@ResponseBody
	public Object selectAgencyAreaGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> agencyAreaGrid = totSttsService.agencyAreaGrid(paramsMap);
		result.put("agencyAreaGrid", agencyAreaGrid);
		
		List<Map<String, Object>> agencyAreaDetailGrid = totSttsService.agencyAreaDetailGrid(paramsMap);
		result.put("agencyAreaDetailGrid", agencyAreaDetailGrid);
		
		return result;
	}
	
	/**
	 * 사업 개시 및 폐업 비율 통계
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// (지역별)
	@RequestMapping("totStts/agencyOpenCloseChart")
	@ResponseBody
	public Object selectAgencyOpenCloseChart(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aocc = new HashMap<>();
		List<Map<String, Object>> agencyOpenCloseChart = totSttsService.agencyOpenCloseChart(paramsMap);
		aocc.put("agencyOpenCloseChart", agencyOpenCloseChart);
		
		return aocc;
	}
	// (기간별/년도별)
	@RequestMapping("totStts/agencyOpenCloseChartPeriodYear")
	@ResponseBody
	public Object selectAgencyOpenCloseChartPeriodYear(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aoccpy = new HashMap<>();
		List<Map<String, Object>> agencyOpenCloseChartPeriodYear = totSttsService.agencyOpenCloseChartPeriodYear(paramsMap);
		aoccpy.put("agencyOpenCloseChartPeriodYear", agencyOpenCloseChartPeriodYear);
		
		return aoccpy;
	}
	// (기간별/월별)
	@RequestMapping("totStts/agencyOpenCloseChartPeriod")
	@ResponseBody
	public Object selectAgencyOpenCloseChartPeriod(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aoccp = new HashMap<>();
		List<Map<String, Object>> agencyOpenCloseChartPeriod = totSttsService.agencyOpenCloseChartPeriod(paramsMap);
		aoccp.put("agencyOpenCloseChartPeriod", agencyOpenCloseChartPeriod);
		
		return aoccp;
	}

}