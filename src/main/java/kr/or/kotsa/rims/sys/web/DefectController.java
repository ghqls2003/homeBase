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
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
		paramsMap.put("bzmnSn", getBzmnSn());
		
		return defectService.selectDefectInfo(paramsMap);
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
    
	@RequestMapping("/defect/selectDetailDefectInfo")
	@ResponseBody
	public Map<String, Object> selectDetailDefectInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		return defectService.selectDetailDefectInfo(paramsMap);
	}
}
