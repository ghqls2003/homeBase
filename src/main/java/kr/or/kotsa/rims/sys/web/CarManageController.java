package kr.or.kotsa.rims.sys.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.biz.web.CmmnController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.ExcelStatusManager;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelStream;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.CarManageService;

import org.apache.ibatis.session.SqlSessionFactory;



@Controller
@RequestMapping("sys")
public class CarManageController extends CmmnAbstractServiceImpl {
	private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);

	private final CarManageService carManageService;
	private final CmmnService cmmnService;
	
	@Autowired
	@Qualifier("sqlSession")
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
    private ExcelStatusManager excelStatusManager;
	
	@Autowired
	public CarManageController(CarManageService carManageService, CmmnService cmmnService) {
		this.carManageService = carManageService;
		this.cmmnService = cmmnService;
	}
	
	/**
	 * 차량정보 관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carManage")
	public ModelAndView viewCarManage(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.addObject("authrtCd", getAuthrtCd());
		mav.addObject("getCmptncZoneCd", getCmptncZoneCd());
		mav.addObject("getBzmnSn", getBzmnSn());

		paramsMap.put("url", "sys/carManage");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName", tableName);

		mav.setViewName("sys/carManage");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
	 * 차량정보 조회
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carManage/selectCarList")
	@ResponseBody
	public Object selectCarList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		Map<String, Object> result = carManageService.selectCarList(paramsMap);
		return result;
	}
	

	
	/**
	 * 결함정보 조회
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carManage/selectDefectList")
	@ResponseBody
	public Object selectDefectList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return carManageService.selectDefectList(paramsMap);
	}

	/**
	 * 차량 등록
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
//	@RequestMapping("carManage/insertCar")
	@ResponseBody
	public String insertCar(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return carManageService.insertCar(paramsMap);
	}

	/**
	 * 차량 일괄 등록
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
//	@RequestMapping("carManage/insertExcelReg")
	@ResponseBody
	public int insertExcelReg(@RequestBody List<Map<String, Object>> paramsList) throws RimsException {
		int insertData = 0;

		for (Map<String, Object> params : paramsList) {
			Map<String, Object> paramsMap = params;
			carManageService.insertExcelCar(paramsMap);
			insertData++;
		}

		return insertData;
	}

	/**
	 * 차량 수정
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("carManage/updateCar")
	@ResponseBody
	public String updateCar(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("authrtCd", getAuthrtCd());
		return carManageService.updateCar(paramsMap);
	}

	/**
	 * 차량 삭제
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
//	@RequestMapping("carManage/deleteCar")
	@ResponseBody
	public String deleteCar(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return carManageService.deleteCar(paramsMap);
	}

	/** 시도 */
	@RequestMapping(value = "/carManage/selectCtpvNm")
	@ResponseBody
	public List<Map<String, Object>> selectCtpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return carManageService.selectCtpvNm(paramsMap);
	}

	/** 시구군 */
	@RequestMapping(value = "/carManage/selectSggNm")
	@ResponseBody
	public List<Map<String, Object>> selectSggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return carManageService.selectSggNm(paramsMap);
	}

	/** 시도, 시구군 이름 */
	@RequestMapping(value = "/carManage/selectCtpvSggNm")
	@ResponseBody
	public Map<String, Object> selectCtpvSggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return carManageService.selectCtpvSggNm(paramsMap);
	}

	/**
	 * 회사찾기 팝업 - 회사리스트
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
//	@RequestMapping("carManage/selectCompanyList")
	@ResponseBody
	public Map<String, Object> selectCompanyList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return carManageService.selectCompanyList(paramsMap);
	}

	/**
	 * 중복확인
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
//	@RequestMapping("carManage/selectDuplicChk")
	@ResponseBody
	public Object selectDuplicChk(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return carManageService.selectDuplicChk(paramsMap);
	}

	/**
	 * 중복확인
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
//	@RequestMapping("carManage/selectMatchChk")
	@ResponseBody
	public int selectMatchChk(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return carManageService.selectMatchChk(paramsMap);
	}

	// 차량정보 관리 엑셀다운로드
	@PostMapping("/carManage/excelDown")
	public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String sheetName = "차량 관리";
		String colName[] = { "즐겨찾기", "순번", "차량등록번호", "차대번호", "차종", "연식", "법인등록번호", "법인명", "소유자명", "사용여부", "결함여부", "최초등록일자",
				"만료일자", "자료연계등록일" };
		String valName[] = { "regYn", "rn", "vhclRegNo", "vin", "carmdl", "mdlyr", "crno", "coNm", "ownrNm", "useYn", "defectYn",
				"frstRegYmd", "expryYmd", "regDt" };
		List<Map<String, Object>> colValue;
		int total;
		paramsMap.put("authrtCd", getAuthrtCd());

		if (getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")) {
			// 공단, 국토부, 관리자
		} else if (getAuthrtCd().equals("G01")) {
			// 지자체
			paramsMap.put("signguCd", getCmptncZoneCd());
		} else if (getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02")) {
			// 대여사업자(주사무소, 영업소)
			paramsMap.put("signguCd", getCmptncZoneCd());
			paramsMap.put("bzmnSn", getBzmnSn());
		} else {
			// 기타
		}

		colValue = carManageService.selectExcelCarList(paramsMap);
		// total = carManageService.selectExcelCarListCnt(paramsMap);
		
		modelMap.put("excelName", sheetName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		modelMap.put("colValue", colValue);
		// paramsMap.put("total", total);

		try {
			response.flushBuffer();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return new GenericExcelView();
	}
	
	/**
	 * 엑셀 다운로드 스트리밍 상태 체크
	 * @param response
	 * @return true:엑셀 다운로드 진행 중 || false:진행 중 아님
	 */
	@RequestMapping("/carManage/excelDownStream/isProgress")
	public ResponseEntity<Boolean> checkDownloadStatus(HttpServletResponse response) {
		boolean isDownloadInProgress = excelStatusManager.isExcelInProgress();
        return ResponseEntity.ok(isDownloadInProgress);
	}
	
	/**
	 * 엑셀 다운로드 스트리밍 요청
	 * @param paramsMap, response
	 */
	@RequestMapping("/carManage/excelDownStream")
	public void excelDownStream(@RequestParam Map<String, Object> paramsMap, HttpServletResponse response)
			throws RimsException, IOException{
		carManageService.selectExcelStream(paramsMap, response);
	}
	
	/**
	 * 엑셀 다운로드 스트리밍 건수 조회
	 * 240428 사용 중단
	 */
	@RequestMapping("/carManage/excelDownStream/cnt")
	@ResponseBody
	public int selectCarListCnt(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return carManageService.selectCarListCnt(paramsMap);
	}
	
	
	@RequestMapping(value = "/carManage/insertBookmark")
	@ResponseBody
	public Map<String, Object> insertBookmark(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("mdfr_sn", getUserSn());
		paramsMap.put("mdfcn_ip", getClientIP());
		return carManageService.insertBookmark(paramsMap);
	}
	
	@RequestMapping(value = "/carManage/deleteBookmark")
	@ResponseBody
	public Map<String, Object> deleteBookmark(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("mdfr_sn", getUserSn());
		return carManageService.deleteBookmark(paramsMap);
	}

	
	
}