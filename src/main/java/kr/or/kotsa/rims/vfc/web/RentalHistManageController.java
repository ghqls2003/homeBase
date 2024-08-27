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
import kr.or.kotsa.rims.vfc.service.RentalHistManageService;
import kr.or.kotsa.rims.vfc.service.impl.RentalHistManageDao;

@Controller
@RequestMapping("vfc")
public class RentalHistManageController extends CmmnAbstractServiceImpl {

	@Autowired
	private RentalHistManageService rentalHistManageService;
	@Autowired
	private CmmnService cmmnService;
	@Autowired
	private RentalHistManageDao rentalHistManageDao;

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
	@RequestMapping("rentalHistManage")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String userType = isDevice(request);
		Boolean userTypeBool = true;

		if(userType == "MOBI") {
			userTypeBool = false;
		}

		paramsMap.put("url", "vfc/rentalHistManage");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);

		mav.setViewName("vfc/rentalHistManage");
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
	@RequestMapping("rentalReport")
	public ModelAndView rentalReport(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("vfc/rentalReport");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 대여이력 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("rentalHistManage/selectRentalHistList")
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
			paramsMap.put("Sauth", "S");
		}

		return rentalHistManageService.selectRentalHistList(paramsMap);

//		기존 코드
//		paramsMap.put("authrtCd", getAuthrtCd());
//		if(getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")){
//			return rentalHistManageService.selectRentalHistList(paramsMap);
//		}else if(getAuthrtCd().equals("G01")) {
//			if(paramsMap.get("vhclRegNo") != "" && paramsMap.get("vhclRegNo") != null)
//				paramsMap.put("authrtCd", "K01");
//			else
//				paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
//			return rentalHistManageService.selectRentalHistList(paramsMap);
//		}else if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02") || getAuthrtCd().equals("S03")) {
//
//			paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
//			paramsMap.put("bzmnSn", getBzmnSn());
//			paramsMap.put("upBzmnSn", getUpBzmnSn());
//			return rentalHistManageService.selectRentalHistList(paramsMap);
//		}else {
//			return null;
//		}
	}
	
	/**
     * 차량 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("rentalHistManage/selectCarList")
	@ResponseBody
	public Object CarList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02") || getAuthrtCd().equals("S03")) {
			paramsMap.put("bzmnSn", getBzmnSn());
			return rentalHistManageService.selectCarList(paramsMap);
		} else {
			return rentalHistManageService.selectCarList(paramsMap);
		}
	}

	/**
     * 대여이력 상세
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("/rentalHistManage/selectDetailRentInfo")
	@ResponseBody
	public List<Map<String, Object>> selectDetailRentInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rentalHistManageService.selectDetailRentInfo(paramsMap);
	}
	
	/**
     * 자격확인정보
     * @param paramsMap
     * @return
     * @throws RimsException
     */	
	@RequestMapping("/rentalHistManage/selectDetailVerfInfo")
	@ResponseBody
	public List<Map<String, Object>> selectDetailVerfInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rentalHistManageDao.selectDetailVerfInfo(paramsMap);
	}

	/**
	 * 대여정보이력조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/rentalHistManage/selectHisDetailRentInfo")
	@ResponseBody
	public Map<String, Object> selectHisDetailRentInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rentalHistManageService.selectHisDetailRentInfo(paramsMap);
	}

	@RequestMapping("/rentalHistManage/selectIssuedData")
	@ResponseBody
	public List<Map<String, Object>> selectIssuedData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return rentalHistManageService.selectIssuedData(paramsMap);
	}


	/**
     * 대여이력 등록(마스터와 히스토리에 동시 등록)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "/rentalHistManage/insertRentReg")
	@ResponseBody
	public int insertRentReg(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("LoginUserAuthrtCd", getAuthrtCd());
		paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("IP", getClientIP());
		//추가
		paramsMap.put("bzmnSn", getBzmnSn());
		rentalHistManageService.insertRentRegHs(paramsMap);
		return rentalHistManageService.insertRentReg(paramsMap);
	}

	/**
     * 대여이력 수정
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "/rentalHistManage/updateRentInfo")
	@ResponseBody
	public int updateRentInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		//대여이력 수정시 이전데이터 hs테이블 insert
		insertRentHisInfo(paramsMap);
		return rentalHistManageService.updateRentInfo(paramsMap);
	}

	/**
     * 대여이력 수정시 이전데이터 hs테이블 insert
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public int insertRentHisInfo(Map<String, Object> paramsMap) throws RimsException {

		return rentalHistManageService.insertRentHisInfo(paramsMap);
	}

	/**
     * 대여이력 삭제
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "/rentalHistManage/updateDeleteYn")
	@ResponseBody
	public int updateDeleteYn(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		insertRentHisInfo(paramsMap);

		paramsMap.put("userSn", getUserSn());
		paramsMap.put("IP", getClientIP());

		return rentalHistManageService.updateDeleteYn(paramsMap);
	}

	@RequestMapping(value = "/rentalHistManage/insertConfData")
	@ResponseBody
	public int insertConfData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("clientIP", getClientIP());

		return rentalHistManageService.insertConfData(paramsMap);
	}
}