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
import kr.or.kotsa.rims.stts.service.DefectSttsService;

@Controller
@RequestMapping("stts")
public class defectSttsController extends CmmnAbstractServiceImpl {

	@Autowired
	DefectSttsService defectSttsService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 대여차량 결함 통계 페이지
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/defectStts")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		String [] validAuth = {"K01", "Z01", "M01", "D01"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("cmptncZoneCd", getCmptncZoneCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("upBzmnSn", getUpBzmnSn());
			
			paramsMap.put("url", "stts/defectStts");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);
			
			mav.setViewName("stts/defectStts");
		} else {
			mav.setViewName("redirect:/");
		}
		
		return mav;
	}
	
	/**
	 * 대여차량결함 유형별 통계
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("defectStts/defectCate")
	@ResponseBody
	public Object selectCarmdl(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> defectCate = defectSttsService.defectCate(paramsMap);
		
		return defectCate;
	}
	
	/**
	 * 대여차량결함 내용별 통계
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("defectStts/defectCntnt")
	@ResponseBody
	public Object selectDefectCntnt(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> defectCntnt = defectSttsService.defectCntnt(paramsMap);
		
		return defectCntnt;
	}
	
	/**
	 * 대여차량 결함 현황
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("defectStts/defectsData")
	@ResponseBody
	public Object selectDefectsData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> defectsData = defectSttsService.defectsData(paramsMap);
		result.put("data", defectsData);
		int defectsDataCnt = defectSttsService.defectsDataCnt(paramsMap);
		result.put("total", defectsDataCnt);
		
		return result;
	}
}