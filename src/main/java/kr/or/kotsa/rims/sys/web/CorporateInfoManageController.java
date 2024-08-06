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
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.CorporateInfoManageService;
import kr.or.kotsa.rims.sys.service.impl.CorporateInfoManageDao;

@Controller
@RequestMapping("sys")
public class CorporateInfoManageController extends CmmnAbstractServiceImpl{

	@Autowired
	private CorporateInfoManageService corporateInfoManageService;

	@Autowired
	private CorporateInfoManageDao corporateInfoManageDao;

	@Autowired
	private CmmnService cmmnService;
	/**
	 * 기업정보 관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/crprtInfoManage")
	public ModelAndView viewCmpnymanage(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws RimsException {
		
		String [] validAuth = {"S01", "S02", "S03", "S04", "M01", "K01", "Z01", "D01"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("getCmptncZoneCd", getCmptncZoneCd());
			mav.addObject("userSn", getUserSn());

			paramsMap.put("url", "sys/crprtInfoManage");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName",tableName);

			mav.setViewName("sys/crprtInfoManage");
		} else {
			mav.setViewName("redirect:/");
		}

		return mav;
	}
	
	// 기업정보관리 목록 그리드
	@PostMapping("/crprtInfoManage/selectCrprtInfo")
	@ResponseBody
	public Map<String, Object> selectCrprtInfo(@RequestBody Map<String, Object> paramsMap) {
		return corporateInfoManageService.selectCrprtInfo(paramsMap);
	}

	// 기업사용자관리 목록 그리드
	@PostMapping("/crprtInfoManage/selectCrprtUserInfo")
	@ResponseBody
	public Map<String, Object> selectCrprtUserInfo(@RequestBody Map<String, Object> paramsMap) {
		return corporateInfoManageService.selectCrprtUserInfo(paramsMap);
	}
	
	// 영업소 등록 사업자번호 중복확인
	@RequestMapping(value = "/crprtInfoManage/requestCkDuple")
	@ResponseBody
	public Map<String, Object> requestCkDuple(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.requestCkDuple(paramsMap);
	}

	// 영업소 등록 요청
	@RequestMapping(value = "/crprtInfoManage/insertCmpnyRequest")
	@ResponseBody
	public Map<String, Object> insertCmpnyRequest(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.insertCmpnyRequest(paramsMap);
	}
	
	// 내기업정보 수정 요청
	@RequestMapping(value = "/crprtInfoManage/updateCmpnyRequest")
	@ResponseBody
	public Map<String, Object> updateCmpnyRequest(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.updateCmpnyRequest(paramsMap);
	}
	
	// 내 기업정보 수정 팝업 기존 데이터 불러오기
	@RequestMapping(value = "/crprtInfoManage/callDefaultData")
	@ResponseBody
	public List<Map<String, Object>> selectcallDefaultData(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.callDefaultData(paramsMap);
	}
	
	// 수정요청 승인상태
	@RequestMapping(value = "/crprtInfoManage/requestAprvStts")
	@ResponseBody
	public List<Map<String, Object>> requestAprvStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.requestAprvStts(paramsMap);
	}
	
	// 팝업옵션 - 시도(전체)
	@RequestMapping(value = "/crprtInfoManage/selectCtpvNm")
	@ResponseBody
	public List<Map<String, Object>> ctpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.selectCtpvNm(paramsMap);
	}

	// 팝업옵션 - 시군구(전체)
	@RequestMapping(value = "/crprtInfoManage/selectSggNm")
	@ResponseBody
	public List<Map<String, Object>> sggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.selectSggNm(paramsMap);
	}

	// 팝업옵션 - 사업소종류(선택)
	@RequestMapping(value = "/crprtInfoManage/selectBzmnSe")
	@ResponseBody
	public List<Map<String, Object>> bzmnSe(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.selectBzmnSe(paramsMap);
	}
	
	// 팝업옵션 - 상위 사업자번호
	@RequestMapping(value = "/crprtInfoManage/selectUpBrno")
	@ResponseBody
	public List<Map<String, Object>> upBrno(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.selectUpBrno(paramsMap);
	}
	
	// 팝업옵션 - 영업상태(전체)
	@RequestMapping(value = "/crprtInfoManage/searchBsnStts")
	@ResponseBody
	public List<Map<String, Object>> searchBsnStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.searchBsnStts(paramsMap);
	}
	
	// 상세보기 - 승인
	@RequestMapping(value = "/crprtInfoManage/approveBtn")
	@ResponseBody
	public List<Map<String, Object>> updateapproveBtn(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.approveBtn(paramsMap);
	}
	
	// 상세보기 - 반려
	@RequestMapping(value = "/crprtInfoManage/rejectBtn")
	@ResponseBody
	public List<Map<String, Object>> updaterejectBtn(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.rejectBtn(paramsMap);
	}
	
	// 상세보기 - 장기미접속해제
	@RequestMapping(value = "/crprtInfoManage/disconnBtn")
	@ResponseBody
	public List<Map<String, Object>> updatedisconnBtn(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.disconnBtn(paramsMap);
	}
	
	// 상세보기 - 삭제
	@RequestMapping(value = "/crprtInfoManage/deleteBtn")
	@ResponseBody
	public List<Map<String, Object>> updatedeleteBtn(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageService.deleteBtn(paramsMap);
	}
	
	// 기업사용자관리 - 계정상태 드롭다운
	@RequestMapping(value = "/crprtInfoManage/userAcntStts")
	@ResponseBody
	public List<Map<String, Object>> userAcntStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageDao.userAcntStts(paramsMap);
	}
	
	// 기업사용자관리 - 승인상태 드롭다운
	@RequestMapping(value = "/crprtInfoManage/userAprvStts")
	@ResponseBody
	public List<Map<String, Object>> userAprvStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return corporateInfoManageDao.userAprvStts(paramsMap);
	}
	
	// 기업관리 엑셀다운로드
	@PostMapping("/crprtInfoManage/excelDown")
	public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String fileName = "기업정보 관리";
		String colName[] = {"순번", "사업자번호", "사업소종류", "회사명", "영업상태", "연락처", "사업개시일", "사업지주소"};
		String valName[] = {"sn", "brno", "corp", "co_nm", "bsn_stts_cd_nm", "telno", "biz_strt_day", "road_nm"};
		
		List<Map<String, Object>> colValue = corporateInfoManageDao.selectCrprtInfo(paramsMap);
		int total = corporateInfoManageDao.selectCrprtInfoCnt(paramsMap);
		
		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		modelMap.put("colValue", colValue);
		paramsMap.put("total", total);
		
		return new GenericExcelView();
	}

	// 기업사용자관리 엑셀다운로드
	@PostMapping("/crprtInfoManage/excelDownUser")
    public GenericExcelView excelDownUser(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
        String fileName = "기업사용자 관리";
        String colName[] = {"순번", "아이디", "성명", "연락처", "이메일", "상태", "권한", "승인자(ID)"};
        String valName[] = {"sn", "user_id", "user_nm", "telno", "addr", "stts_acnt", "author", "approver"};

        List<Map<String, Object>> colValue = corporateInfoManageDao.selectCrprtUserInfo(paramsMap);
        int total = corporateInfoManageDao.selectCrprtUserInfoCnt(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }

}