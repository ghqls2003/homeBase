package kr.or.kotsa.rims.stts.web;

import java.util.Arrays;
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
import kr.or.kotsa.rims.stts.service.VerfSttsService;

@Controller
@RequestMapping("stts")
public class verfSttsController extends CmmnAbstractServiceImpl {

	@Autowired
	VerfSttsService verfSttsService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 자격검증결과 통계 페이지
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/verfStts")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		String [] validAuth = {"K01", "Z01", "D01"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("cmptncZoneCd", getCmptncZoneCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("upBzmnSn", getUpBzmnSn());


			paramsMap.put("url", "stts/verfStts");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);

			mav.setViewName("stts/verfStts");
		} else {
			mav.setViewName("redirect:/");
		}
		
		return mav;
	}
	
	// 검증결과카운트(시간별)
	@RequestMapping("verfStts/verfCount")
	@ResponseBody
	public Object selectVerfCount(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> verfCount = verfSttsService.verfCount(paramsMap);
		
		return verfCount;
	}
	
	// 검증결과카운트(사업자별)
	@RequestMapping("verfStts/verfResult")
	@ResponseBody
	public Object selectVerfResult(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> verfResult = verfSttsService.verfResult(paramsMap);
		
		return verfResult;
	}
	
	// 권한 드롭다운(사업자별)
	@RequestMapping("verfStts/authSelected")
	@ResponseBody
	public Object authSelected(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> authSelected = verfSttsService.authSelected(paramsMap);
		
		return authSelected;
	}
}