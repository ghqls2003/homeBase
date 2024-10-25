package kr.or.kotsa.rims.vfc.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kr.or.kotsa.rims.api.service.impl.ApiAuthKeyServiceImpl;
import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.vfc.service.DrvVfcHistService;

@Controller
@RequestMapping("vfc")
public class DrvVfcHistController extends CmmnAbstractServiceImpl {

	private static final Logger logger = LoggerFactory.getLogger(DrvVfcHistController.class);
	@Autowired
	private DrvVfcHistService drvVfcHistService;

	@Autowired
	private CmmnService cmmnService;
	/**
	 * 자격검증 이력 화면
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drvVfcHist")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "vfc/drvVfcHist");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		String authrtCd = drvVfcHistService.curAuthrtCd();
		mav.addObject("authrtCd",authrtCd);
		mav.addObject("tableName",tableName);
		mav.setViewName("vfc/drvVfcHist");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 자격검증이력 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("drvVfcHist/listView.do")
	@ResponseBody
    public Map<String, Object> selectlistView(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        Map<String, Object> result = new HashMap<String, Object>();

        result.put("data" , drvVfcHistService.listView(paramsMap));
        result.put("total", drvVfcHistService.listViewCnt(paramsMap));
        return result;
    }


	/**
     * 자격검증이력 엑셀다운로드
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@PostMapping("/drvVfcHist/excelBySelectInfo")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
	                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {

		String fileName = "drvVfcHist" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
		String colName[] = {"순번", "면허번호", "면허종별", "확인요청일시", "확인방법", "확인결과", "요청자", "소속사업자명" };
		String valName[] = {"sn", "dln", "lcnsType", "vrfcDmndDt", "vrfcMthd", "verifyNm", "rqstrNm" , "coNm"};
		// resNm  , cd ->  cd/ codeType
		List<Map<String, Object>> colValue = drvVfcHistService.listView(paramsMap);
		int total = drvVfcHistService.listViewCnt(paramsMap);
		modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);
        
        return new GenericExcelView();
    }

	/**
	 * 소속자업자명 리스트 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drvVfcHist/coNmList.do")
	@ResponseBody
	public Map<String, Object> coNmList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("coNmList" , drvVfcHistService.selectCoNm(paramsMap));
		return result;
	}


	/**
	 * 확인결과리스트
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drvVfcHist/ckResultsList.do")
	@ResponseBody
	public Map<String, Object> ckResultsList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("ckResults" , drvVfcHistService.ckResults(paramsMap));
		return result;
	}


}