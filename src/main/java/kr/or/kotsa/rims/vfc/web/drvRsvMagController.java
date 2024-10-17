package kr.or.kotsa.rims.vfc.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.vfc.service.drvRsvMagService;
import kr.or.kotsa.rims.vfc.service.impl.drvRsvMagDao;

@Controller
@RequestMapping("vfc")
public class drvRsvMagController extends CmmnAbstractServiceImpl {

	@Autowired
	private drvRsvMagService DrvRsvMagService;
	@Autowired
	private CmmnService cmmnService;
	@Autowired
	private drvRsvMagDao drvRsvMagDao;

	String author = "";

	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";

	/**
	 * 대여이력 관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drvRsvMag")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String userType = isDevice(request);
		Boolean userTypeBool = true;

		if(userType == "MOBI") {
			userTypeBool = false;
		}

		paramsMap.put("url", "vfc/drvRsvMag");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);

		mav.setViewName("vfc/drvRsvMag");
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
     * 예약이력 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("drvRsvMag/selectRsvList")
	@ResponseBody
	public Object selectRentalHistList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("authrtCd", getAuthrtCd());
		author = getAuthrtCd();
		char firstChar = author.charAt(0);
		if(firstChar == 'G') {
			if(paramsMap.get("vhclRegNo") != "" && paramsMap.get("vhclRegNo") != null) {paramsMap.put("authrtCd", "K01");}
			else {
				String cmptncZoneCd = getCmptncZoneCd();
				if(cmptncZoneCd.matches("..00000000"))
					paramsMap.put("cmptncZoneCd", cmptncZoneCd.substring(0,2));
				else
					paramsMap.put("cmptncZoneCd", cmptncZoneCd);
			}
		} else if(firstChar == 'S') {
			paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
			paramsMap.put("bzmnSn", getBzmnSn());
			paramsMap.put("upBzmnSn", getUpBzmnSn());
			paramsMap.put("userSn", getUserSn());
			paramsMap.put("Sauth", "S");
		}

		return DrvRsvMagService.selectRsvList(paramsMap);

	}
	@RequestMapping("drvRsvMag/SearchRentNo")
	@ResponseBody
	public Object selectSearchRentNo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		
		return DrvRsvMagService.selectSearchRentNo(paramsMap);
		
	}
	//예약 등록
	@RequestMapping("/drvRsvMag/insertRsv")
	@ResponseBody
	public int insertRsv(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("clientIP", getClientIP());

		return DrvRsvMagService.insertRsv(paramsMap);
	}
	//예약수정
	@RequestMapping("/drvRsvMag/updateRsv")
	@ResponseBody
	public int updateRsv(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("clientIP", getClientIP());

		return DrvRsvMagService.updateRsv(paramsMap);
	}
	//예약최소
	@RequestMapping("/drvRsvMag/deleteRsv")
	@ResponseBody
	public int deleteRsv(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("clientIP", getClientIP());

		return DrvRsvMagService.deleteRsv(paramsMap);
	}
	
	/**
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("drvRsvMag/selectRsvNoList")
	@ResponseBody
	public Object CarList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("authrtCd", getAuthrtCd());
		author = getAuthrtCd();
		char firstChar = author.charAt(0);
		if(firstChar == 'G') {
			if(paramsMap.get("vhclRegNo") != "" && paramsMap.get("vhclRegNo") != null) {paramsMap.put("authrtCd", "K01");}
			else {
				String cmptncZoneCd = getCmptncZoneCd();
				if(cmptncZoneCd.matches("..00000000"))
					paramsMap.put("cmptncZoneCd", cmptncZoneCd.substring(0,2));
				else
					paramsMap.put("cmptncZoneCd", cmptncZoneCd);
			}
		} else if(firstChar == 'S') {
			paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
			paramsMap.put("bzmnSn", getBzmnSn());
			paramsMap.put("upBzmnSn", getUpBzmnSn());
			paramsMap.put("Sauth", "S");
		}
		
		
		if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02") || getAuthrtCd().equals("S03")) {
			paramsMap.put("bzmnSn", getBzmnSn());
			return DrvRsvMagService.selectRsvNoList(paramsMap);
		} else {
			return DrvRsvMagService.selectRsvNoList(paramsMap);
		}
	}
    @RequestMapping(value = "drvRsvMag/selectPeriodCd")
    @ResponseBody
    public Map<String, Object> selectPeriodCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("result" , DrvRsvMagService.selectPeriodCd(paramsMap));
        return result;
    }
    @RequestMapping(value = "drvRsvMag/selectLncdDrop")
    @ResponseBody
    public Map<String, Object> selectLncdDrop(@RequestBody Map<String, Object> paramsMap) throws RimsException {
    	Map<String, Object> result = new HashMap<String, Object>();
    	result.put("result" , DrvRsvMagService.selectLncdDrop(paramsMap));
    	return result;
    }
	@RequestMapping("/drvRsvMag/selectdetailRsv")
	@ResponseBody
	public List<Map<String, Object>> selectIssuedData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return DrvRsvMagService.selectdetailRsv(paramsMap);
	}
	@RequestMapping("/drvRsvMag/selectCheckRentNo")
	@ResponseBody
	public List<Map<String, Object>> selectCheckRentNo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return DrvRsvMagService.selectCheckRentNo(paramsMap);
	}

	@PostMapping("drvRsvMag/listexcel")
	public GenericExcelView excelloginViewExcel(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
												HttpServletResponse response) throws RimsException {

		List<Map<String, Object>> colValue = drvRsvMagDao.selectRsvList(paramsMap);
		modelMap.put("colValue", colValue);
		int total = drvRsvMagDao.selectRsvListCnt(paramsMap);
		paramsMap.put("total", total);

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		Date todayDate = new Date();
		String today = dateFormat.format(todayDate);
		String fileName = "자격확인반복예약_일시" + today;

		String colName[] = { "번호", "대여번호", "면허번호", "면허 소유자", "면허종별", "회사명", "예약자", "예약 지정일","수정자","수정일"};
		String valName[] = { "rn", "rentNo", "dln2", "lcnsFlnm", "lcnsAsortCd", "coNm",
				"regNm", "regDt", "mdfrNm", "mdfcnDt"};


		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		return new GenericExcelView();
	}
	
}