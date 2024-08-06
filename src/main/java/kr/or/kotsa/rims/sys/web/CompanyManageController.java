package kr.or.kotsa.rims.sys.web;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import kr.or.kotsa.rims.sys.service.CompanyManageService;
import kr.or.kotsa.rims.sys.service.impl.CompanyManageDao;

@Controller
@RequestMapping("sys")
public class CompanyManageController extends CmmnAbstractServiceImpl{
	
	@Autowired
	private CompanyManageService companyManageService;

	@Autowired
	private CompanyManageDao companyManageDao;

	@Value(value="${brno.publicDataApi.serviceKey}")
	private String serviceKey;

	/**
	 * 사업자관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/companyManage")
	public ModelAndView viewCmpnymanage(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws RimsException {

		String getBrno = "";
		String [] validAuth = {"Z01", "K01", "M01", "D01", "G01", "G02"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			if(getBzmnSn() != "" && getBzmnSn() != null) {
				Map<String, Object> bzmnSn = new HashMap<>();
				bzmnSn.put("bzmnSn", getBzmnSn());
				
				getBrno = companyManageService.selectBrno(bzmnSn);
			}
			
			mav.addObject("authrtCd", getAuthrtCd()); // 권한(주사무소, 영업소)
			mav.addObject("getCmptncZoneCd", getCmptncZoneCd()); // 관할지
			mav.addObject("getBzmnSn", getBzmnSn()); // 일련번호
			mav.addObject("getBrno", getBrno); // 사업자등록번호
			mav.setViewName("sys/companyManage");
		} else {
			mav.setViewName("redirect:/");
		}		

		return mav;
	}

	// 검색/등록팝업 옵션 - 시도(전체)
	@RequestMapping(value = "/companyManage/ctpvNm")
	@ResponseBody
	public List<Map<String, Object>> ctpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.ctpvNm(paramsMap);
	}

	// 검색/등록팝업 옵션 - 시군구(전체)
	@RequestMapping(value = "/companyManage/sggNm")
	@ResponseBody
	public List<Map<String, Object>> sggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.sggNm(paramsMap);
	}

	// 등록팝업 - 기본정보 (등록지역, 등록지차체)
	@RequestMapping(value = "/companyManage/area")
	@ResponseBody
	public Map<String, Object> area(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.area(paramsMap);
	}

	// 등록팝업 - 기본정보 (상위 사업자번호)
	@RequestMapping(value = "/companyManage/upBrno")
	@ResponseBody
	public List<Map<String, Object>> upBrno(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.upBrno(paramsMap);
	}

	// 검색옵션 - 승인상태(전체)
	@RequestMapping(value = "/companyManage/aprvStts")
	@ResponseBody
	public List<Map<String, Object>> aprvStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.aprvStts(paramsMap);
	}

	// 검색옵션 - 영업상태(전체)
	@RequestMapping(value = "/companyManage/searchBsnStts")
	@ResponseBody
	public List<Map<String, Object>> searchBsnStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.searchBsnStts(paramsMap);
	}
	
	// 검색옵션 - 권한(전체)
	@RequestMapping(value = "/companyManage/authSelected")
	@ResponseBody
	public List<Map<String, Object>> authSelected(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.authSelected(paramsMap);
	}

	// 사업자 관리 목록 그리드
	@PostMapping("/companyManage/selectCompanyManageInfo")
	@ResponseBody
	public Map<String, Object> selectCompanyManageInfo(@RequestBody Map<String, Object> paramsMap) {
		return companyManageService.selectCompanyManageInfo(paramsMap);
	}

	// 사업자 관리 상세 목록
	@PostMapping(value = "/companyManage/selectCmpnyDetailInfo")
	@ResponseBody
	public Map<String, Object> selectCmpnyDetailInfo(@RequestBody Map<String, Object> paramsMap,
			HttpServletRequest request) throws Exception {
		return companyManageService.selectCmpnyDetailInfo(paramsMap);
	}

	// 상세팝업옵션 - 사업소종류(선택)
	@RequestMapping(value = "/companyManage/bzmnSe")
	@ResponseBody
	public List<Map<String, Object>> bzmnSe(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.bzmnSe(paramsMap);
	}

	// 사업자 관리 등록
	@RequestMapping(value = "/companyManage/insertCmpny")
	@ResponseBody
	public Map<String, Object> insertCmpny(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.insertCmpny(paramsMap);
	}

	// 사업자 관리 상세팝업 수정
	@RequestMapping(value = "/companyManage/updateCmpny")
	@ResponseBody
	public Map<String, Object> updateCmpny(@RequestBody List<Map<String, Object>> paramsMap) throws RimsException {
		return companyManageService.updateCmpny(paramsMap);
	}

	// 상황별 : openAPI를 이용한 사업자등록정보 상태 업데이트
	@RequestMapping(value = "/companyManage/updateCmpnyBrnoBySituation")
	@ResponseBody
	public Map<String, Object> updateCmpnyBrnoBySituation(@RequestBody List<Map<String, Object>> paramsMap) throws RimsException, UnsupportedEncodingException {
		return companyManageService.updateCmpnyBrnoBySituation(paramsMap);
	}

	// 사업자 관리 상세팝업 반려
	@RequestMapping(value = "/companyManage/updateReject")
	@ResponseBody
	public Map<String, Object> updateReject(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.updateReject(paramsMap);
	}

	// 사업자 관리 상세팝업 승인 (수정 요청)
	@RequestMapping(value = "/companyManage/updateRequestApproval")
	@ResponseBody
	public Map<String, Object> updateRequestApproval(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.updateRequestApproval(paramsMap);
	}
	
	// 사업자 관리 상세팝업 승인 (등록 요청)
	@RequestMapping(value = "/companyManage/insertRequestApproval")
	@ResponseBody
	public Map<String, Object> insertRequestApproval(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.insertRequestApproval(paramsMap);
	}

	
	/**
	 * 사업소/사용자/차량 현황 버튼
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */	
	// 사업소 현황
	@RequestMapping(value = "/companyManage/selectOfficeDetailInfo")
	@ResponseBody
	public Map<String, Object> selectOfficeDetailInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.selectOfficeDetailInfo(paramsMap);
	}
	// 사용자 현황
	@RequestMapping(value = "/companyManage/selectUserCmp")
	@ResponseBody
	public Map<String, Object> selectUserCmp(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.selectUserCmp(paramsMap);
	}
	// 차량 현황
	@RequestMapping(value = "/companyManage/findCarCmp")
	@ResponseBody
	public Map<String, Object> findCarCmp(@RequestBody Map<String, Object> paramsMap) throws RimsException {
//		logger.info(NO_LOG_MARKER, "Log this without %msg");
		return companyManageService.findCarCmp(paramsMap);
	}

	// 이관팝업-지자체조회
	@RequestMapping(value = "/companyManage/areaNm")
	@ResponseBody
	public String areaNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.areaNm(paramsMap);
	}

	// 이관팝업-요청
	@RequestMapping(value = "/companyManage/updateRequestTransferInfo")
	@ResponseBody
	public Map<String, Object> updateRequestTransferInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.updateRequestTransferInfo(paramsMap);
	}

	// 상세팝업-이관요청여부
	@RequestMapping(value = "/companyManage/cmpnyCnt")
	@ResponseBody
	public int cmpnyCnt(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.cmpnyCnt(paramsMap);
	}

	// 상세팝업-이관요청승인
	@RequestMapping(value = "/companyManage/updateTransferRequestApproval")
	@ResponseBody
	public Map<String, Object> updateTransferRequestApproval(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.updateTransferRequestApproval(paramsMap);
	}

	// 상세팝업-반려확인
	@RequestMapping(value = "/companyManage/updateRequestCompanionChk.do")
	@ResponseBody
	public Map<String, Object> updateRequestCompanionChk(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.updateRequestCompanionChk(paramsMap);
	}
	
	// 상세팝업-삭제
	@RequestMapping(value = "/companyManage/deleteCmpny")
	@ResponseBody
	public Map<String, Object> deleteCmpny(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return companyManageService.deleteCmpny(paramsMap);
	}

	// 사업자 관리 엑셀다운로드
	@PostMapping("/companyManage/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {

		String fileName = "companyManage_" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
        String colName[] = {"순번", "회사명", "대표자", "사업자등록번호", "법인등록번호", "사업소종류", "주 사업소_회사명(사업자등록번호)", "사업게시일", "관할지", "소재지", "위도", "경도", "도로명주소", "지번주소",
        		"차고지 도로명주소", "승인상태", "영업상태", "연락처", "평일운영시간", "차량등록대수", "승용차대수", "승합차대수", "전기승용차", "전기승합차", "비고", "가입자수", "삭제여부"};
        String valName[] = {"rn", "co_nm", "rprsv_nm", "brno", "crno", "bzmn_se_cd_nm", "up_brno_nm", "reg_dt", "jurisdiction", "locgov", "lat", "lot", "road_nm_addr", "lotno_addr",
        		"garage_road_nm_addr", "aprv_stts_cd_nm", "bsn_stts_cd_nm", "telno", "oper_dt", "vhcl_reg_noh", "car_noh", "van_noh", "elcty_car_noh", "elcty_van_noh", "rmrk", "user_cnt", "del_yn"};

        List<Map<String, Object>> colValue = companyManageDao.selectExcelDown(paramsMap);
        int total = companyManageDao.selectExcelDownCnt(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }

}