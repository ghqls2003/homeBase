package kr.or.kotsa.rims.api.web;

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

import kr.or.kotsa.rims.api.service.ApiHistService;
import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;

@Controller
@RequestMapping("api")
public class ApiHistController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;

	@Autowired
	private ApiHistService ApiHistService;

	@Autowired
	private CmmnService cmmnService;

	/**
	 * 자격검증 화면
	 *북촌
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("apiHist")
	public ModelAndView viewMainapiHist(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.addObject("UserSn", getUserSn());
		mav.addObject("AuthCd", getAuthrtCd());

		paramsMap.put("url", "api/apiHist");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName", tableName);
		mav.setViewName("api/apiHist");
		mav.addObject("error", request.getAttribute("error"));
		return mav;

	}

	@RequestMapping("apiHist/listView")
	@ResponseBody
	public Object selectlistViewapiHist(@RequestBody Map<String, Object> paramsMap) {

		paramsMap.put("AuthCd", getAuthrtCd());
		String Auth = (String) paramsMap.get("AuthCd");

		if (!"K01".equals(Auth) && !"D01".equals(Auth) && !"Z01".equals(Auth)) {
		    paramsMap.put("userSn", getUserSn());
		}
		int total = ApiHistService.selectlistViewCnt(paramsMap);
		List<Map<String, Object>> list = ApiHistService.selectlistView(paramsMap);

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);

		return mav;
	}
	@RequestMapping("apiHist/listViewDev")
	@ResponseBody
	public Object selectlistViewapiDevHist(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());

		String Auth = (String) paramsMap.get("AuthCd");

		if (!"K01".equals(Auth) && !"D01".equals(Auth) && !"Z01".equals(Auth)) {
		    paramsMap.put("userSn", getUserSn());
		}
		int total = ApiHistService.selectlistViewapiHistDevCnt(paramsMap);
		List<Map<String, Object>> list = ApiHistService.selectlistViewapiHistDev(paramsMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);
		
		return mav;
	}
	@RequestMapping("apiHist/apiSttsview")
	@ResponseBody
	public Object selectlistApiSttsView(@RequestBody Map<String, Object> paramsMap) {
		int total = ApiHistService.selectApiSttsViewCnt(paramsMap);
		paramsMap.put("total", total);
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("UserSn", getUserSn());
		List<Map<String, Object>> list = ApiHistService.selectApiSttsView(paramsMap);

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);

		return mav;
	}

	@RequestMapping("apiHist/UseExtendApi")
	@ResponseBody
	public int updateUseExtendApi(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		return ApiHistService.updateUseExtendApi(paramsMap);

	}

	@RequestMapping("apiHist/StopApiUse")
	@ResponseBody
	public int updateStopApiUse(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("UserSn", getUserSn());

		return ApiHistService.updateStopApiUse(paramsMap);
	}

	@RequestMapping("apiHist/ApiReUse")
	@ResponseBody
	public int updateApiReUse(@RequestBody Map<String, Object> paramsMap) {

		return ApiHistService.updateApiReUse(paramsMap);
	}

	/**
	 * 공통코드관리 엑셀
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("apiHist/excelDown")
	public GenericExcelView excelapiHist(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String fileName = "Api이용현황";
		String colName[] = { "번호", "API명", "요청사", "원요청사", "요청일", "면허번호", "요청결과(코드/설명)", "소요시간", "요청횟수" };
		String valName[] = { "rn", "apiNm", "rq", "orq", "dmndDt", "dln", "rsltMsg", "reqHr", "dmndCnt" };
		paramsMap.put("userSn", getUserSn());

		List<Map<String, Object>> colValue = ApiHistService.selectlistView(paramsMap);

		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		modelMap.put("colValue", colValue);

		paramsMap.put("total", ApiHistService.selectlistViewCnt(paramsMap));

		return new GenericExcelView();
	}
	/**
	 * 공통코드관리 엑셀
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("apiHist/excelDownDev")
	public GenericExcelView excelapiDevHist(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String fileName = "Api이용현황";
		String colName[] = { "번호", "API명", "요청사", "원요청사", "요청일", "면허번호", "요청결과(코드/설명)", "소요시간", "요청횟수" };
		String valName[] = { "rn", "apiNm", "rq", "orq", "dmndDt", "dln", "rsltMsg", "reqHr", "dmndCnt" };
		paramsMap.put("userSn", getUserSn());
		
		List<Map<String, Object>> colValue = ApiHistService.selectlistViewapiHistDev(paramsMap);
		
		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		modelMap.put("colValue", colValue);
		
		paramsMap.put("total", ApiHistService.selectlistViewapiHistDevCnt(paramsMap));
		
		return new GenericExcelView();
	}
	@RequestMapping("apiHist/ckapiList")
	@ResponseBody
	public Map<String, Object> ckResultsList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("ckResults" , ApiHistService.ckapiList(paramsMap));
		return result;
	}
}
