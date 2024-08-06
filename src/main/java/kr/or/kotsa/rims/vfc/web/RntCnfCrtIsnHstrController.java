package kr.or.kotsa.rims.vfc.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import kr.or.kotsa.rims.vfc.service.RntCnfCrtIsnHstrService;

@Controller
@RequestMapping("vfc")
public class RntCnfCrtIsnHstrController extends CmmnAbstractServiceImpl {

	@Autowired
	private RntCnfCrtIsnHstrService rntCnfCrtIsnHstrService;

	@Autowired
	private CmmnService cmmnService;

	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";

	/**
	 * 대여확인증 발급 이력 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("rntCnfCrtIsnHstr")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String userType = isDevice(request);
		Boolean userTypeBool = true;

		if(userType == "MOBI") {
			userTypeBool = false;
		}

		paramsMap.put("url", "vfc/rntCnfCrtIsnHstr");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);

		mav.setViewName("vfc/rntCnfCrtIsnHstr");
		mav.addObject("authrtCd", getAuthrtCd());
		mav.addObject("userTypeBool", userTypeBool);
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	public static String isDevice(HttpServletRequest req) {
	    String userAgent = req.getHeader("User-Agent").toUpperCase();
	    if(userAgent.contains(IS_MOBILE) || userAgent.contains("IPAD") ||
	       (userAgent.contains("ANDROID") && !userAgent.contains("MOBILE")) ||
	       userAgent.contains("SM-T")) {
	        return IS_MOBILE;
	    } else {
	        return IS_PC;
	    }
	}

	/**
	 * 대여이력 보고서
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("reRentalReport")
	public ModelAndView reRentalReport(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("vfc/reRentalReport");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 대여확인증 발급 이력 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("rntCnfCrtIsnHstr/selectrntCnfCrtIsnHstrList")
	@ResponseBody
	public Object selectRentalHistList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("authrtCd", getAuthrtCd());
		if(getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")){
			return rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrList(paramsMap);
		}else if(getAuthrtCd().equals("G01")) {
			paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
			return rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrList(paramsMap);
		}else if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02")) {

			paramsMap.put("signguCd", getCmptncZoneCd());
			paramsMap.put("bzmnSn", getBzmnSn());
			return rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrList(paramsMap);
		}else {
			return null;
		}

	}

	/**
     * 대여확인증 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("rntCnfCrtIsnHstr/selectReIssuedData")
	@ResponseBody
	public Object ReIssuedData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
			return rntCnfCrtIsnHstrService.selectReIssuedData(paramsMap);
	}

	/**
     * 대여확인증 재발급
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("rntCnfCrtIsnHstr/insertConfData")
	@ResponseBody
	public int insertConfData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("clientIP", getClientIP());

		return rntCnfCrtIsnHstrService.insertConfData(paramsMap);
	}


	/**
     * 대여확인증 상세
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("/rntCnfCrtIsnHstr/selectDetailConfInfo")
	@ResponseBody
	public List<Map<String, Object>> selectDetailRentInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rntCnfCrtIsnHstrService.selectDetailConfInfo(paramsMap);
	}


	/**
     * 대여이력 관리 엑셀다운로드
     * @param
     * @return
     * @throws RimsException
     */
	@PostMapping("/rntCnfCrtIsnHstr/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {

		String fileName = "대여확인증 발급 이력";
        String colName[] = {"순번", "대여번호", "차량번호", "확인증발급 일시"};
        String valName[] = {"rn", "rentNo", "vhclRegNo", "mdfcnDt"};

        List<Map<String, Object>> colValue;
        int total;

        paramsMap.put("authrtCd", getAuthrtCd());

        if(getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")){
		colValue = rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrListExcel(paramsMap);
    	total = rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrListCnt(paramsMap);
        }else if(getAuthrtCd().equals("G01")) {
        	paramsMap.put("cmptncZoneCd", getCmptncZoneCd());

        	colValue = rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrListExcel(paramsMap);
    		total = rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrListCnt(paramsMap);
        }else if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02")) {

        	paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
			paramsMap.put("bzmnSn", getBzmnSn());
			paramsMap.put("upBzmnSn", getUpBzmnSn());

			colValue = rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrListExcel(paramsMap);
    		total = rntCnfCrtIsnHstrService.selectrntCnfCrtIsnHstrListCnt(paramsMap);
        }else {

        	colValue = null;
    		total = 0;

        }

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }

}