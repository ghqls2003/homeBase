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
		
		String [] validAuth = {"K01", "Z01", "D01", "G01"};
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
	 * 대여사업자 현황 그리드
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
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
	 * 대여사업자 가입 현황
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("totStts/agencyAccessionChart")
	@ResponseBody
	public Object agencyAccessionChart(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aocc = new HashMap<>();
		List<Map<String, Object>> agencyAccessionChart = totSttsService.agencyAccessionChart(paramsMap);
		aocc.put("agencyAccessionChart", agencyAccessionChart);
		
		return aocc;
	}
}