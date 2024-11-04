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
	public Object agencyAreaGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> agencyAreaGrid = totSttsService.agencyAreaGrid(paramsMap);
		result.put("agencyAreaGrid", agencyAreaGrid);
		
		List<Map<String, Object>> agencyAreaDetailGrid = totSttsService.agencyAreaDetailGrid(paramsMap);
		result.put("agencyAreaDetailGrid", agencyAreaDetailGrid);
		
		return result;
	}
	
	/**
	 * 지자체별 가입 사용자 현황 그리드
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("totStts/gvAccUserGrid")
	@ResponseBody
	public Object gvAccUserGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> gvAccUserGrid = totSttsService.gvAccUserGrid(paramsMap);
		result.put("gvAccUserGrid", gvAccUserGrid);
		
		List<Map<String, Object>> gvAccUserDetailGrid = totSttsService.gvAccUserDetailGrid(paramsMap);
		result.put("gvAccUserDetailGrid", gvAccUserDetailGrid);
		
		return result;
	}
	
	/**
	 * 대여사업자 등록 현황
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
	
	/**
	 * 권한 가져오기
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("totStts/authrt")
	@ResponseBody
	public Object authrt(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> authrt = totSttsService.authrt(paramsMap);
		return authrt;
	}
	
	/**
	 * 카쉐어링 업체 현황
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("totStts/carShareGrid")
	@ResponseBody
	public Map<String, Object> carShareGrid(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.carShareGrid(paramsMap);
	}
	
	/**
	 * 지역 드롭다운
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("totStts/areaDrop")
	@ResponseBody
	public List<Map<String, Object>> areaDrop(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.areaDrop(paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 등록
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "totStts/insertCarShare")
	@ResponseBody
	public int insertCarShare(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.insertCarShare(paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 상세 팝업
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "totStts/detailCarshare")
	@ResponseBody
	public Map<String, Object> detailCarshare(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.detailCarshare(paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 수정
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "totStts/updateCarShare")
	@ResponseBody
	public int updateCarShare(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.updateCarShare(paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 삭제
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "totStts/deleteCarShare")
	@ResponseBody
	public int deleteCarShare(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.deleteCarShare(paramsMap);
	}
	
	/**
	 * 회사명 자동완성
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "totStts/selectCoNm")
	@ResponseBody
	public List<Map<String, Object>> selectCoNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return totSttsService.selectCoNm(paramsMap);
	}
	
	// kendoExcel AOP 태우기용
	@RequestMapping("/totStts/excelDown")
	@ResponseBody
    public Map<String, Object> excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		return result;
    }		
}