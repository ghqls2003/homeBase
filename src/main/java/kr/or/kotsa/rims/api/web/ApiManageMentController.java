package kr.or.kotsa.rims.api.web;

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

import kr.or.kotsa.rims.api.service.ApiManagementService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;

@Controller
@RequestMapping("api")
public class ApiManageMentController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;

	@Autowired
	private ApiManagementService apiManagementService;


	/**
	 * API
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/ApiManagement")
	public ModelAndView viewApiManagement(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.addObject("UserSn", getUserSn());
		mav.setViewName("api/ApiManagement");
		mav.addObject("error", request.getAttribute("error"));

		return mav;
	}
	@RequestMapping("ApiManagement/selectApiList")
	@ResponseBody
	public Object selectlistApiManagement(@RequestBody Map<String, Object> paramsMap) {
		int total = apiManagementService.selectlistViewCnt(paramsMap);
		paramsMap.put("total", total);
		paramsMap.put("AuthCd", getAuthrtCd());
		List<Map<String, Object>> list = apiManagementService.selectlistView(paramsMap);

		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);

		return mav;
	}
	@RequestMapping("ApiManagement/selectdetailApiList")
	@ResponseBody
	public Object selectdetailApiApiManagement(@RequestBody Map<String, Object> paramsMap) {
		int total = apiManagementService.selectdetailApiListCnt(paramsMap);
		paramsMap.put("total", total);
		paramsMap.put("AuthCd", getAuthrtCd());
		List<Map<String, Object>> list = apiManagementService.selectdetailApiList(paramsMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);
		
		return mav;
	}
	@RequestMapping("ApiManagement/updateApproveApiUse")
	@ResponseBody
	public int updateApproveApiUse(@RequestBody Map<String, Object> paramsMap) {

		return apiManagementService.updateApproveApiUse(paramsMap);
	}
	@RequestMapping("ApiManagement/updateRejectApiUse")
	@ResponseBody
	public int updateRejectApiUse(@RequestBody Map<String, Object> paramsMap) {
		
		return apiManagementService.updateRejectApiUse(paramsMap);
	}
	@RequestMapping("ApiManagement/updateStopApiUse")
	@ResponseBody
	public int updateStopApiUse(@RequestBody Map<String, Object> paramsMap) {
		
		return apiManagementService.updateStopApiUse(paramsMap);
	}
	@RequestMapping("ApiManagement/updateReuseApiUse")
	@ResponseBody
	public int updateReuseApiUse(@RequestBody Map<String, Object> paramsMap) {
		
		return apiManagementService.updateReuseApiUse(paramsMap);
	}

    /**
     * 공통코드관리  엑셀
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("ApiManagement/excelDown")
    public GenericExcelView excelDownApiManagement(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
        String fileName = "Api이용현황";
        String colName[] = {"번호", "회사명", "사용자ID", "사업자등록번호", "상태", "API명", "요청일자", "승인일시","만료예정일","요청건수"};
        String valName[] = {"rn", "ogdpNm", "userId", "bzmnSn", "cdnm", "apiNm", "dmndDt", "aprvDt","expryYmd", "sec"};
		paramsMap.put("UserSn", getUserSn());

        List<Map<String, Object>> colValue = apiManagementService.selectlistView(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        
        paramsMap.put("total", apiManagementService.selectlistViewCnt(paramsMap));

        return new GenericExcelView();
    }
}
