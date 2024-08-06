package kr.or.kotsa.rims.api.web;

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

import kr.or.kotsa.rims.api.service.ApiViewService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
@Controller
@RequestMapping("api")
public class ApiViewController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;

	@Autowired
	private ApiViewService apiViewService;

	@Autowired
	private CmmnService cmmnService;

	/**
	 * 자격검증 화면
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/apiview")
	public ModelAndView viewApiview(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		mav.addObject("UserSn",getUserSn());
		mav.addObject("AuthCd", getAuthrtCd());



		paramsMap.put("url", "api/apiview");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);

		mav.setViewName("api/apiview");
		
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	@RequestMapping("apiview/listView")
	@ResponseBody
	public Object selectlistApiview(@RequestBody Map<String, Object> paramsMap) {
		int total = apiViewService.selectlistViewCnt(paramsMap);

		List<Map<String, Object>> list = apiViewService.selectlistView(paramsMap);

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);

		return mav;
	}
	@RequestMapping("apiview/apiSttsview")
	@ResponseBody
	public Object selectlistApiSttsView(@RequestBody Map<String, Object> paramsMap) {
		int total = apiViewService.selectApiSttsViewCnt(paramsMap);
		paramsMap.put("total", total);
		List<Map<String, Object>> list = apiViewService.selectApiSttsView(paramsMap);

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);

		return mav;
	}
//	@RequestMapping("apiview/apiSttsview")
//	@ResponseBody
//	public Map<String, Object> ApiSttsView(@RequestBody Map<String, Object> paramsMap) throws HmtsException {
//
//		return apiViewService.ApiSttsView(paramsMap);
//	}

	@RequestMapping("apiview/detaillistView")
	@ResponseBody
	public Map<String, Object> selectinquiryList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("UserSn", getUserSn());

		return apiViewService.selectdetaillistView(paramsMap);
	}
	
	@RequestMapping("apiview/UseExtendApi")
	@ResponseBody
	public int updateUseExtendApi(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		return apiViewService.updateUseExtendApi(paramsMap);
		
	}

	@RequestMapping("apiview/StopApiUse")
	@ResponseBody
	public int updateStopApiUse(@RequestBody Map<String, Object> paramsMap) {

		return apiViewService.updateStopApiUse(paramsMap);
	}
	@RequestMapping("apiview/ApiReUse")
	@ResponseBody
	public int updateApiReUse(@RequestBody Map<String, Object> paramsMap) {
		
		return apiViewService.updateApiReUse(paramsMap);
	}


    /**
     * 공통코드관리  엑셀
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("excelDown")
    public GenericExcelView excelApiview(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
        String fileName = "Api이용현황";
        String colName[] = {"번호", "상태", "API명", "요청사", "신청일", "만료예정일", "사용건수"};
        String valName[] = {"rn", "sttsCd", "apiNm", "coNmid", "dmndDt", "expryYmd", "dmndCnt"};
		paramsMap.put("UserSn", getUserSn());

        List<Map<String, Object>> colValue = apiViewService.selectlistView(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        
        paramsMap.put("total", apiViewService.selectlistViewCnt(paramsMap));

        return new GenericExcelView();
    }
	
}

