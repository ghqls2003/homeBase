package kr.or.kotsa.rims.sys.web;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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
import kr.or.kotsa.rims.sys.service.SmsSendService;
import kr.or.kotsa.rims.sys.service.impl.SmsSendDao;

@Controller
@RequestMapping("sys")
public class SmsSendController extends CmmnAbstractServiceImpl{

	@Autowired
	private SmsSendService smsSendService;
	
	@Autowired
	private SmsSendDao SmsSendDao;

	// 문자발송이력 화면
	@RequestMapping("/smsSend")
	public ModelAndView viewSmsSend(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws RimsException {
		
 		String [] validAuth = {"Z02", "K01", "D01"};
		if(Arrays.asList(validAuth).contains(getAuthrtCd())) {
		} else {
			mav.setViewName("redirect:/");
		}
		
		mav.addObject("userCmptncZoneCd", getCmptncZoneCd()); // 관할지
		
		return mav;
	}

    @RequestMapping(value = "/smsSend/selectCtpvNm")
    @ResponseBody
    public List<Map<String, Object>> CtpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return smsSendService.selectCtpvNm(paramsMap);
    }
    
    @RequestMapping(value = "/smsSend/selectSggNm")
    @ResponseBody
    public List<Map<String, Object>> SggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return smsSendService.selectSggNm(paramsMap);
    }
	
    @RequestMapping("/smsSend/selectSttsCd")
    @ResponseBody
    public List<Map<String, Object>> SttsCd(@RequestBody Map<String, Object> paramsMap) {
        return smsSendService.selectSttsCd(paramsMap);
    }
	
	// 권한
	@RequestMapping("/smsSend/selectAuth")
    @ResponseBody
    public List<Map<String, Object>> selectAuth(@RequestBody Map<String, Object> paramsMap) {
        return smsSendService.selectAuth(paramsMap);
    }
	
	// 법인별 회사 목록
	@RequestMapping("/smsSend/selectCrno")
    public ModelAndView selectCrno(@RequestBody Map<String, Object> paramsMap) {
        List<Map<String, Object>> result = smsSendService.selectCrno(paramsMap);
        
        ModelAndView mav = new ModelAndView("jsonView");
        mav.addObject("data", result);
        
        return mav;
    }
	
	// 문자 발송 이력 그리드
	@PostMapping("/smsSend/selectSmsSendInfo")
	@ResponseBody
	public Map<String, Object> selectSmsSendInfo(@RequestBody Map<String, Object> paramsMap){
		paramsMap.put("userSn", getUserSn());
		return smsSendService.selectSmsSendInfo(paramsMap);
	}
	
	// 수신자 목록 그리드
	@PostMapping("/smsSend/selectReceiverList")
	@ResponseBody
	public Map<String, Object> selectReceiverList(@RequestBody Map<String, Object> paramsMap){
		return smsSendService.selectReceiverList(paramsMap);
	}
	
	// 개별 발송 그리드
	@PostMapping("/smsSend/selectIndivReceiverList")
	@ResponseBody
	public Map<String, Object> selectIndivReceiverList(@RequestBody Map<String, Object> paramsMap){
		return smsSendService.selectIndivReceiverList(paramsMap);
	}
	
	// 그룹 발송 그리드
	@PostMapping("/smsSend/selectGroupReceiverList")
	@ResponseBody
	public Map<String, Object> selectGroupReceiverList(@RequestBody Map<String, Object> paramsMap){
		return smsSendService.selectGroupReceiverList(paramsMap);
	}
	
	//문자발송
	@RequestMapping(value = "/smsSend/insertSendMsg")
	@ResponseBody
	public Map<String, Object> insertSendMsg(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("userIp", getClientIP());
		return smsSendService.insertSendMsg(paramsMap);
	}
	
	/**
     * 문자발송 이력 엑셀다운로드
     * @param
     * @return
     * @throws RimsException
     */
	@PostMapping("/smsSend/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		String fileName = "smsSend" + (new java.text.SimpleDateFormat("yyyyMMddHHmmss")).format(new java.util.Date());
        String colName[] = {"순번", "내용", "발송등록일", "발송일", "수신자명", "연락처"};
        String valName[] = {"rn", "cn", "sndng_dt", "sndng_rsvt_dt", "rcvr", "rcvr_telno"};


        List<Map<String, Object>> colValue = SmsSendDao.selectSmsSendInfo(paramsMap);
		int total = SmsSendDao.selectSmsSendInfoCnt(paramsMap);

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }
	

}