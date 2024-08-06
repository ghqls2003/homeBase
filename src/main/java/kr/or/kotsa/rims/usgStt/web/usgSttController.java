package kr.or.kotsa.rims.usgStt.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.usgStt.service.usgSttService;

@Controller
@RequestMapping("usgStt")
public class usgSttController {

	@Autowired
	private usgSttService usgSttService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 자격검증 이력 화면
	 *
	 * @return	    

	 * @throws RimsException
	 */
	@RequestMapping("usgStt")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "usgStt/usgStt");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		String menuCd = (String) cmmnService.findTableNameByUrl(paramsMap).get(0).get("menu_cd");

		mav.addObject("tableName",tableName);
		mav.addObject("menuCd",menuCd);

		mav.setViewName("usgStt/usgStt");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	/**
	 *  사용이력 목록 > 서비스 사용이력(메뉴별 사용집계)
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("usgStt/historylistView")
	@ResponseBody
	public Object selecthistorylistView(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request
											, HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");

		int total = usgSttService.selecthistorylistViewCnt(paramsMap);
		paramsMap.put("total", total);

		List<Map<String, Object>> result = 	usgSttService.selecthistorylistView(paramsMap);
		mav.addObject("data", result);
		mav.addObject("total", total);

		return mav;
	}
	@RequestMapping("usgStt/usercnctListView")
	@ResponseBody
	public Object selectusercnctListView(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request
											, HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");

		int total = usgSttService.selectusercnctListViewCnt(paramsMap);
		paramsMap.put("total", total);

		List<Map<String, Object>> result = 	usgSttService.selectusercnctListView(paramsMap);
		mav.addObject("data", result);
		mav.addObject("total", total);

		return mav;
	}

	@RequestMapping("usgStt/cnctHistListView")
	@ResponseBody
	public Object selectcnctHistListView(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request
											, HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");

		int total = usgSttService.selectcnctHistListViewCnt(paramsMap);
		paramsMap.put("total", total);

		List<Map<String, Object>> result = 	usgSttService.selectcnctHistListView(paramsMap);
		mav.addObject("data", result);
		mav.addObject("total", total);

		return mav;
	}
	
	@RequestMapping("usgStt/loginView")
	@ResponseBody
	public Object selectloginView(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request
			, HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");
		
		int total = usgSttService.selectloginViewCnt(paramsMap);
		paramsMap.put("total", total);
		
		List<Map<String, Object>> result = 	usgSttService.selectloginView(paramsMap);
		mav.addObject("data", result);
		mav.addObject("total", total);
		
		return mav;
	}
//	/**
//     * 엑셀다운로드 요청
//     *
//     * @param paramsMap
//     * @return
//     * @throws HmtsException
//     */
	@PostMapping("usgStt/historylistexcelDown")
	public GenericExcelView excelhistorylist(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
												HttpServletResponse response) throws RimsException {

		List<Map<String, Object>> colValue = usgSttService.selecthistorylistView(paramsMap);
		modelMap.put("colValue", colValue);
		int total = usgSttService.selecthistorylistViewCnt(paramsMap);
		paramsMap.put("total", total);

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		Date todayDate = new Date();
		String today = dateFormat.format(todayDate);
		String fileName = "historylist" + today;

		String colName[] = { "순번", "유저아이디", "요청시간", "이름", "요청유형", "메뉴이름", "요청URL", "요청파라미터값", "접속IP","다운로드 사유", "조회건수"  };
		String valName[] = { "rn", "sso_user_id", "dmnd_dt", "sso_user_nm", "dmnd_type_cd", "menu_nm", "dmnd_url_addr",
				"dmnd_parameter", "user_ip_addr", "dwnld_rsn", "inq_nocs" };

		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		return new GenericExcelView();
	}
    
    @RequestMapping("usgStt/cnctHistExcelexcelDown")
    public GenericExcelView excelcnctHist(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
            HttpServletRequest request, HttpServletResponse response) throws RimsException {
    	String excelName = "사용자별접속횟수";
		String colName[] = {"번호", "접속일시", "접속유형", "메뉴이름", "성명", "아이디", "조회 횟수"};
		String valName[] = { "rn", "dmnd_date", "up_menu_cd", "menu_nm", "sso_user_nm", "sso_user_id", "menu_view_count" };

    	int total;
		List<Map<String, Object>> colValue;
		
		colValue = usgSttService.selectcnctHistListView(paramsMap);
		total = usgSttService.selectcnctHistListViewCnt(paramsMap);
	    for (Map<String, Object> entry : colValue) {
	        String upMenuCd = (String) entry.get("up_menu_cd");
	        if (upMenuCd.startsWith("PMNU")) {
	            entry.put("up_menu_cd", "PTS");
	        } else if (upMenuCd.startsWith("OMNU")) {
	            entry.put("up_menu_cd", "OPS");
	        }
	    }
		
        modelMap.put("excelName", excelName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

		return new GenericExcelView();
    }
    
    @RequestMapping("usgStt/usercnctExcel")
    public GenericExcelView excelusercnct(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
            HttpServletRequest request, HttpServletResponse response) throws RimsException {
    	
		String colName[] = {  "번호", "일자", "접속분류", "메뉴ID", "메뉴명", "상위메뉴명", "조회횟수", "비율" };
		String valName[] = { "seq_num", "dmnd_date", "up_menu_cd", "menu_cd", "menu_nm", "up_menu_name", "duplicate_count", "ratio" };

    	int total;
    	String excelName = "메뉴별 통계 이력";
		List<Map<String, Object>> colValue;
		
		colValue = usgSttService.selectusercnctListView(paramsMap);
		total = usgSttService.selectusercnctListViewCnt(paramsMap);
	    for (Map<String, Object> entry : colValue) {
	        String upMenuCd = (String) entry.get("up_menu_cd");
	        if (upMenuCd.startsWith("PMNU")) {
	            entry.put("up_menu_cd", "PTS");
	        } else if (upMenuCd.startsWith("OMNU")) {
	            entry.put("up_menu_cd", "OPS");
	        }
	    }
		
        modelMap.put("excelName", excelName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

		return new GenericExcelView();
    }
    @RequestMapping("usgStt/loginViewExcel")
    public GenericExcelView excelloginView(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
    		HttpServletRequest request, HttpServletResponse response) throws RimsException {
    	
    	String colName[] = {  "번호", "일자", "유저ID", "유저이름", "로그인/로그아웃", "로그인유형", "PC/Mobile", "접속IP", "접속 건수" };
		String valName[] = { "seq_num", "cntn_dt", "sso_user_id", "sso_user_nm", "login_logout", "cd_nm",
				"cntn_mthd_cd", "cntn_ip_addr", "user_login_count" };    	
    	int total;
    	String excelName = "메뉴별 통계 이력";
    	List<Map<String, Object>> colValue;
    	
    	colValue = usgSttService.selectloginView(paramsMap);
    	total = usgSttService.selectloginViewCnt(paramsMap);
    	modelMap.put("excelName", excelName);
    	modelMap.put("colName", colName);
    	modelMap.put("valName", valName);
    	modelMap.put("colValue", colValue);
    	paramsMap.put("total", total);
    	
    	return new GenericExcelView();
    }
    
    
	

}
