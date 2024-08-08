package kr.or.kotsa.rims.sys.web;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import kr.or.kotsa.rims.sys.service.InspectionHistService;
import kr.or.kotsa.rims.sys.service.impl.InspectionHistDao;

@Controller
@RequestMapping("sys")
public class InspectionHistController extends CmmnAbstractServiceImpl{
	
	@Autowired
	private InspectionHistService inspectionHistService;
	
	@Autowired
	private InspectionHistDao inspectionHistDao;
	
	@RequestMapping("/inspectionHist")
	public ModelAndView viewInspectionHist(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws RimsException {
		
 		String [] validAuth = {"Z01", "K01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
		} else {
			mav.setViewName("redirect:/");
		}		
		return mav;
	}
	
	// 검색/등록팝업 옵션 - 시도(전체)
	@RequestMapping(value = "/inspectionHist/ctpvNm")
	@ResponseBody
	public List<Map<String, Object>> ctpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.ctpvNm(paramsMap);
	}

	// 검색/등록팝업 옵션 - 시군구(전체)
	@RequestMapping(value = "/inspectionHist/sggNm")
	@ResponseBody
	public List<Map<String, Object>> sggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.sggNm(paramsMap);
	}
	
	// 검색옵션 - 영업상태(전체)
	@RequestMapping(value = "/inspectionHist/bsnStts")
	@ResponseBody
	public List<Map<String, Object>> bsnStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.bsnStts(paramsMap);
	}
	
	// 검색옵션 - 권한(전체)
	@RequestMapping(value = "/inspectionHist/selectAuth")
	@ResponseBody
	public List<Map<String, Object>> selectAuth(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.selectAuth(paramsMap);
	}
	
	@PostMapping("/inspectionHist/selectInspectionHistInfo")
	@ResponseBody
	public Map<String, Object> selectInspectionHistInfo(@RequestBody Map<String, Object> paramsMap){
		Map<String, Object> aa = inspectionHistService.selectInspectionHistInfo(paramsMap);
		return aa;
	}
	
	@RequestMapping("/inspectionHist/insertInspectionHist")
	@ResponseBody
	public int insertInspectionHist(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.insertInspectionHist(paramsMap);
	}
	
	@RequestMapping("/inspectionHist/insertFile")
	@ResponseBody
	public int insertFile(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return inspectionHistService.insertFile(paramsMap);
	}
	
	//클립리포트
	@RequestMapping("inspectionReport")
	public ModelAndView inspectionReport(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("sys/inspectionReport");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	
	@PostMapping("/inspectionHist/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {

		String fileName = "inspectionHist" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
        String colName[] = {"순번", "관할지역", "조사원", "회사명", "권한", "사업자번호", "법인번호", "결과", "주소", "후속처리여부"};
        String valName[] = {"rn", "", "exmnr", "coNm", "bzmnSeCd", "brno", "crno", "rslt", "roadNmAddr", "prcsYn"};


        List<Map<String, Object>> colValue = inspectionHistDao.selectInspectionHistInfo(paramsMap);
		int total = inspectionHistDao.selectInspectionHistInfoCnt(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }
	
	@RequestMapping("/inspectionHist/updateInspectionHist")
    @ResponseBody
    public int updateInspectionHist(@RequestBody Map<String, Object> paramsMap) {
        //paramsMap.put("mdfrSn", getUserSn());
        //paramsMap.put("mdfcnIp", getClientIP());

        return inspectionHistService.updateInspectionHist(paramsMap);
    }
	
	
}


