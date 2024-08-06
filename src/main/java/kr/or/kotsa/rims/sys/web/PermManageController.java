package kr.or.kotsa.rims.sys.web;

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

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.PermManageService;
import kr.or.kotsa.rims.sys.service.impl.PermManageDao;

@Controller
@RequestMapping("sys")
public class PermManageController extends CmmnAbstractServiceImpl{

	@Autowired
	private PermManageService permManageService;

	@Autowired
	private PermManageDao permManageDao;
	@Autowired
	private CmmnService cmmnService;
	// 권한관리 화면
	@RequestMapping("/permManage")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "sys/permManage");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);

		mav.setViewName("sys/permManage");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	// 권한관리 리스트
	@RequestMapping("/selectPermManageInfo.do")
	@ResponseBody
	public Map<String, Object> selectPermManageInfo(@RequestBody Map<String, Object> paramsMap) throws Exception {
		return permManageService.selectPermManageInfo(paramsMap);
	}

	// 포털관리메뉴 리스트 (등록팝업)
	@RequestMapping("/selectPtsMenuInfo.do")
	@ResponseBody
	public Map<String, Object> selectPtsMenuInfo(@RequestBody Map<String, Object> paramsMap) throws Exception {

		return permManageService.selectPtsMenuInfo(paramsMap);
	}

	// 포털관리메뉴 리스트 (상세팝업)
	@RequestMapping("/selectPerDetailInfo.do")
	@ResponseBody
	public Map<String, Object> selectPerDetailInfo(@RequestBody Map<String, Object> paramsMap) throws Exception {

		return permManageService.selectPerDetailInfo(paramsMap);
	}

	// 등록
	@RequestMapping("/insertAuth.do")
	@ResponseBody
	public Map<String, Object> insertAuth(@RequestBody Map<String, Object> paramsMap) throws Exception {

		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());

		return permManageService.insertAuth(paramsMap);
	}

	// 수정
	@RequestMapping("/updateAuth.do")
	@ResponseBody
	public Map<String, Object> updateAuth(@RequestBody Map<String, Object> paramsMap) throws Exception {

		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());

		return permManageService.updateAuth(paramsMap);
	}

	// 삭제
	@RequestMapping("/deleteAuth.do")
	@ResponseBody
	public Map<String, Object> deleteAuth(@RequestBody Map<String, Object> paramsMap) throws Exception {

		paramsMap.put("mdfcnIp", getClientIP());
		return permManageService.deleteAuth(paramsMap);
	}

	// 엑셀다운로드
	@RequestMapping("/excelDown")
	public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
	                                  HttpServletRequest request, HttpServletResponse response) throws RimsException {

	    String fileName = "권한 관리_" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
	    String colName[] = {"순번", "권한코드", "권한명", "권한설명", "인원", "사용", "미사용", "등록자", "권한생성일"};
	    String valName[] = {"rn", "authrt_cd", "authrt_nm", "authrt_expln", "total_user", "use_user", "nouse_user",
	    					"user_id", "reg_dt"};

	    List<Map<String, Object>> colValue = permManageDao.selectPermManageInfo(paramsMap);
	    int total = permManageDao.selectPermManageInfoCnt(paramsMap);

	    modelMap.put("excelName", fileName);
	    modelMap.put("colName", colName);
	    modelMap.put("valName", valName);
	    modelMap.put("colValue", colValue);
	    paramsMap.put("total", total);

	    return new GenericExcelView();
	}

}