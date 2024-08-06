package kr.or.kotsa.rims.sys.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
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
import kr.or.kotsa.rims.sys.service.FileService;

@Controller
@RequestMapping("sys")
public class FileController {


	@Autowired
	private CmmnService cmmnService;

	@Autowired
	private FileService fileService;
	/**
	 * 파일관리 관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/file")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "sys/file");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);


		mav.setViewName("sys/file");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 파일 관리 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("/file/selectNomalFileList")
	@ResponseBody
	public Object selectNomalFileList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        Map<String,Object> result = new HashMap<>();
		result.put("data", fileService.selectNomalFileList(paramsMap)) ;
		result.put("total", fileService.selectNomalFileListCnt(paramsMap)) ;
		return result;
	}

	/**
	 * 파일관리 엑셀다운로드
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@PostMapping("/file/excelBySelectInfo")
	public GenericExcelView excelBySelectInfo(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
									  HttpServletRequest request, HttpServletResponse response) throws RimsException {

		String fileName = "fileManage" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
		String colName[] = {"순번", "실제파일명", "첨부파일명", "첨부파일크기", "첨부파일경로", "등록일시", "등록IP", "등록ID" };
		String valName[] = {"rn", "actlFileNm", "atchFileNm", "atchFileSz", "atchFilePath", "regDt", "regIp" , "rgtrId"};
		Object colValue = fileService.selectNomalFileList(paramsMap);

		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		modelMap.put("colValue", colValue);

		return new GenericExcelView();
	}



}