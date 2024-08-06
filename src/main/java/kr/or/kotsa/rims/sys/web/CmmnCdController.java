package kr.or.kotsa.rims.sys.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
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
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.CmmnCdService;

@Controller
@RequestMapping("sys")
public class CmmnCdController {

	@Autowired
	private CmmnCdService cmmnCdService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * 공통코드 관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("cmmnCd")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "sys/cmmnCd");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);


		mav.setViewName("sys/cmmnCd");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 공통코드 관리 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("cmmnCd/selectCmmnCdList")
	@ResponseBody
	public Object selectCmmnCdList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return cmmnCdService.selectCmmnCdList(paramsMap);
	}

	/**
     * 공통코드 등록
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("cmmnCd/insertCmmnCd")
	@ResponseBody
	public String insertCmmnCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return cmmnCdService.insertCmmnCd(paramsMap);
	}

	/**
     * 공통코드 수정
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("cmmnCd/updateCmmnCd")
	@ResponseBody
	public String updateCmmnCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return cmmnCdService.updateCmmnCd(paramsMap);
	}

	/**
     * 공통코드 삭제
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("cmmnCd/updateDeleteCmmnCd")
	@ResponseBody
	public String updateDeleteCmmnCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return cmmnCdService.updateDeleteCmmnCd(paramsMap);
	}

	/**
     * 드롭다운 - 그룹명
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("cmmnCd/selectCdGroupNm")
	@ResponseBody
	public List<Map<String, Object>> CdGroupNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return cmmnCdService.selectCdGroupNm(paramsMap);
	}

	/**
     * 공통코드 - 엑셀다운로드
     * @param paramsMap
     * @return
     * @throws RimsException
	 * @throws IOException
     */
	@PostMapping("cmmnCd/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException, IOException {
        String fileName = "공통코드 관리_" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
        String colName[] = {"순번", "코드", "코드명", "그룹코드", "그룹명", "정렬순서", "사용여부"};
        String valName[] = {"rn", "cd", "cdNm", "cdGroup", "cdGroupNm", "sortOrdr", "useYn"};

		Map<String, Object> data = cmmnCdService.selectCmmnCdList(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", data.get("data"));
        paramsMap.put("total", data.get("total"));

        return new GenericExcelView();
    }

}