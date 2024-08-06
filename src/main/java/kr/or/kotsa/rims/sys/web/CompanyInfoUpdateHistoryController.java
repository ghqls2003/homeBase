package kr.or.kotsa.rims.sys.web;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.CompanyInfoUpdateHistoryService;
import kr.or.kotsa.rims.sys.service.impl.CompanyInfoUpdateHistoryDao;

@Controller
@RequestMapping("sys")
public class CompanyInfoUpdateHistoryController extends CmmnAbstractServiceImpl{

	@Autowired
	private CompanyInfoUpdateHistoryService companyInfoUpdateHistoryService;

	@Autowired
	private CompanyInfoUpdateHistoryDao companyInfoUpdateHistoryDao;

	@Autowired
	private CmmnService cmmnService;

	/**
	 * 사업자 정보 갱신 이력 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/companyInfoUpdateHistory")
	public ModelAndView viewCompanyInfoUpdateHistory(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws RimsException {

		String [] validAuth = {"K01", "Z01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			
			paramsMap.put("url", "sys/companyInfoUpdateHistory");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);
			
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("getCmptncZoneCd", getCmptncZoneCd());
			mav.setViewName("sys/companyInfoUpdateHistory");
		} else {
			mav.setViewName("redirect:/");
		}

		return mav;
	}

	// 검색조건 - 시도(전체)
	@RequestMapping("/company/selectCtpvNm")
	@ResponseBody
	public List<Map<String, Object>> ctpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyInfoUpdateHistoryService.selectCtpvNm(paramsMap);
	}

	// 검색옵션 - 시군구(전체)
	@RequestMapping("/company/selectSggNm")
	@ResponseBody
	public List<Map<String, Object>> sggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyInfoUpdateHistoryService.selectSggNm(paramsMap);
	}

	// 검색옵션 - 영업상태(전체)
	@RequestMapping("/company/searchBsnStts")
	@ResponseBody
	public List<Map<String, Object>> searchBsnStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyInfoUpdateHistoryService.searchBsnStts(paramsMap);
	} 

	// 사업자 정보 갱신 이력 그리드
	@RequestMapping("/company/selectCompanyHistoryInfo")
	@ResponseBody
	public Map<String, Object> selectCompanyHistoryInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyInfoUpdateHistoryService.selectCompanyHistoryInfo(paramsMap);
	}

	// 상세팝업 정보
	@RequestMapping("/company/selectDetailInfo")
	@ResponseBody
	public Map<String, Object> selectDetailInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyInfoUpdateHistoryService.selectDetailInfo(paramsMap);
	}

	// 사업자 정보 갱신 이력 엑셀다운로드
	@PostMapping("/company/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
        String fileName = "사업자 정보 갱신 이력";
        String colName[] = {"순번", "지자체", "회사명", "수정사유", "수정일", "등록자", "누적횟수", "비고"};
        String valName[] = {"rn", "jurisdiction", "co_nm", "mdfcn_rsn", "reg_dt", "user_nm", "cnt", "rmrk"};

        List<Map<String, Object>> colValue = companyInfoUpdateHistoryDao.selectCompanyHistoryInfo(paramsMap);
        int total = companyInfoUpdateHistoryDao.selectCompanyHistoryInfoCnt(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }
}