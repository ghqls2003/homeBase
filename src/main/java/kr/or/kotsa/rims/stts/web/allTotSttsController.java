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
import kr.or.kotsa.rims.stts.service.AllTotSttsService;

@Controller
@RequestMapping("stts")
public class allTotSttsController extends CmmnAbstractServiceImpl {

	@Autowired
	AllTotSttsService allTotSttsService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 종합통계 페이지
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/allTotStts")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		String [] validAuth = {"K01", "Z01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("cmptncZoneCd", getCmptncZoneCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("upBzmnSn", getUpBzmnSn());


			paramsMap.put("url", "stts/allTotStts");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);

			mav.setViewName("stts/allTotStts");
		} else {
			mav.setViewName("redirect:/");
		}
		
		return mav;
	}
	
	/**
	 * 지역별 차량관련현황(Top5)
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// 대여현황
	@RequestMapping("allTotStts/areaRentTop5")
	@ResponseBody
	public Object selectAreaRentTop5(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> art5 = new HashMap<>();
		List<Map<String, Object>> areaRentTop5 = allTotSttsService.areaRentTop5(paramsMap);
		art5.put("areaRentTop5", areaRentTop5);
		// 지자체
		List<Map<String, Object>> agencyRentTop5 = allTotSttsService.agencyRentTop5(paramsMap);
		art5.put("agencyRentTop5", agencyRentTop5);
		
		return art5;
	}
	// 결함현황
	@RequestMapping("allTotStts/areaFlawTop5")
	@ResponseBody
	public Object selectAreaFlawTop5(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aft5 = new HashMap<>();
		List<Map<String, Object>> areaFlawTop5 = allTotSttsService.areaFlawTop5(paramsMap);
		aft5.put("areaFlawTop5", areaFlawTop5);
		// 지자체
		List<Map<String, Object>> agencyFlawTop5 = allTotSttsService.agencyFlawTop5(paramsMap);
		aft5.put("agencyFlawTop5", agencyFlawTop5);
		
		return aft5;
	}
	// 보유현황
	@RequestMapping("allTotStts/areaHaveTop5")
	@ResponseBody
	public Object selectAreaHaveTop5(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> aht5 = new HashMap<>();
		List<Map<String, Object>> areaHaveTop5 = allTotSttsService.areaHaveTop5(paramsMap);
		aht5.put("areaHaveTop5", areaHaveTop5);
		// 지자체
		List<Map<String, Object>> agencyHaveTop5 = allTotSttsService.agencyHaveTop5(paramsMap);
		aht5.put("agencyHaveTop5", agencyHaveTop5);
		
		return aht5;
	}

	/**
	 * 면허조회 결과
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("allTotStts/verfResult")
	@ResponseBody
	public Object selectVerfResult(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> vr = new HashMap<>();
		List<Map<String, Object>> verfResult = allTotSttsService.verfResult(paramsMap);
		vr.put("verfResult", verfResult);
		
		return vr;
	}	
	
	/**
	 * 최상단 대여사업자 종합 현황
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// 대여사업자
	@RequestMapping("allTotStts/agencyTimeYearGrid")
	@ResponseBody
	public Object selectAgencyTimeYearGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> atyg = new HashMap<>();
		List<Map<String, Object>> agencyTimeYearGrid = allTotSttsService.agencyTimeYearGrid(paramsMap);
		atyg.put("agencyTimeYearGrid", agencyTimeYearGrid);
		
		return atyg;
	}
	// 정보갱신이력
	@RequestMapping("allTotStts/agencyHsGrid")
	@ResponseBody
	public Object selectAgencyHsGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> agencyHsGrid = new HashMap<>();
		int agencyHs = allTotSttsService.agencyHsGrid(paramsMap);
		agencyHsGrid.put("agencyHsGrid", agencyHs);
		
		return agencyHsGrid;
	}
	
	/**
	 * 지역 / 계절별 차량 대여 현황
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("allTotStts/areaSeasonRent")
	@ResponseBody
	public Object selectAreaSeasonRent(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> asr = new HashMap<>();
		List<Map<String, Object>> areaSeasonRent = allTotSttsService.areaSeasonRent(paramsMap);
		asr.put("areaSeasonRent", areaSeasonRent);
		
		return asr;
	}
	
	/**
	 * 차량 결함정보 그리드
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("allTotStts/carDefectsInfo")
	@ResponseBody
	public Object selectCarDefectsInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> cdi = new HashMap<>();
		List<Map<String, Object>> carDefectsInfo = allTotSttsService.carDefectsInfo(paramsMap);
		cdi.put("carDefectsInfo", carDefectsInfo);
		
		return cdi;
	}	
}