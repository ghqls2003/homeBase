package kr.or.kotsa.rims.sys.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.web.CmmnController;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.DefectService;
import kr.or.kotsa.rims.sys.service.SmsSendService;
import kr.or.kotsa.rims.sys.service.impl.DefectDao;

@Controller
@RequestMapping("sys")
public class DefectController extends CmmnAbstractServiceImpl{
	
	@Autowired
	private DefectService defectService;
	
	@Autowired
	private DefectDao defectDao;
	
	private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);
	
	
	
	/**
	 * 차량결합정보 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	
	@RequestMapping("defect")
	public ModelAndView viewCarDefect(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("sys/defect");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	//차량결함정보 그리드
	@PostMapping("/defect/selectDefectInfo")
	@ResponseBody
	public Map<String, Object> selectDefectInfo(@RequestBody Map<String, Object> paramsMap){
		return defectService.selectDefectInfo(paramsMap);
	}
	
	
	
	//차량등록번호 중복확인
	@PostMapping("/defect/selectValidDuplicate")
	@ResponseBody
	public Map<String, Object> selectValidDuplicate(@RequestBody Map<String, Object> paramsMap){
		return defectService.selectValidDuplicate(paramsMap);
	}
	
	/**
     *   등록
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("defect/insertDefect")
	@ResponseBody
	public ModelAndView insertPrsnMng(@RequestBody Map<String, Object> paramsMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException{
		
		int ret = 0;
		String resultMsg = "";
		String resultMsg1 = "";
		ModelAndView mav = new ModelAndView("jsonView");
		paramsMap.put("userSn", getUserSn());
		
		
		ret = defectService.insertDefect(paramsMap);
		if(ret == 1) {
			resultMsg = "완료";
		} else {
			resultMsg = "실패";
		}

		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	
	
	
	/**
	 *  수정
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "/defect/updateDefect")
	@ResponseBody
	public ModelAndView updateDefect(@RequestBody Map<String, Object> paramsMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		int ret = 0;
		String resultMsg = "";
		ModelAndView mav = new ModelAndView("jsonView");
		
		ret = defectService.updateDefect(paramsMap);    	
		
		if(ret == 1) {
			resultMsg = "완료";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	
	@RequestMapping("defect/deleteDefect")
	@ResponseBody
	public ModelAndView deleteDefect(@RequestBody Map<String, Object> paramsMap,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		int ret = 0;
		String resultMsg = "";
		
		ModelAndView mav = new ModelAndView("jsonView");
			
		ret = defectService.deleteDefect(paramsMap);  
		
		if(ret == 1) {
			resultMsg = "완료";
		} else {
			resultMsg = "실패";
		}
		
		mav.addObject("resultMsg", resultMsg);
		return mav;
	}
	
	   /**
     * 엑셀다운로드 요청
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@PostMapping("/defect/excelDown")
    public GenericExcelView selectExcelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap
    						, HttpServletResponse response) throws RimsException {
	
	
    	String fileName = "defect" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
    	String colName[] = {"순번", "차대번호",  "차량번호", "결합일련번호","발생일시","결합유형","처리상태코드","결합내용","시정조치결과"};
    	String valName[] = {"rn", "vin", "vhcl_reg_no", "defects_sn","ocrn_dt","defects_type_cd","prcs_stts_cd","defects_cn"};

    	List<Map<String, Object>> colValue = defectDao.selectDefectInfo(paramsMap);
    	int total = defectDao.selectDefectInfoCnt(paramsMap);
  
    	paramsMap.put("total", total);

		modelMap.put("excelName", fileName);
		modelMap.put("colName", colName);
		modelMap.put("valName", valName);
		modelMap.put("colValue", colValue);

		return new GenericExcelView();
    }
	
	

	
	
	
	//시도
    @RequestMapping(value = "/defect/selectCtpvNm")
    @ResponseBody
    public List<Map<String, Object>> CtpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return defectService.selectCtpvNm(paramsMap);
    }
    
    //읍/면/동
    @RequestMapping(value = "/defect/selectSggNm")
    @ResponseBody
    public List<Map<String, Object>> SggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return defectService.selectSggNm(paramsMap);
    }
    
	@RequestMapping("/defect/selectCarList")
	@ResponseBody
	public Object selectCarList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> list = defectDao.selectCarList(paramsMap);
		int total = defectDao.selectCarListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
	@RequestMapping("/defect/selectDetailDefectInfo")
	@ResponseBody
	public Map<String, Object> selectDetailDefectInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return defectService.selectDetailDefectInfo(paramsMap);
	}
}
