package kr.or.kotsa.rims.sft.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import kr.or.kotsa.rims.cmmn.biz.service.impl.CmmnDao;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sft.service.InquiryService;

@Service
public class InquiryServiceImpl extends CmmnAbstractServiceImpl implements InquiryService {

	private static final Logger logger = LoggerFactory.getLogger(InquiryServiceImpl.class);

	@Autowired
	private InquiryDao inquiryDao;
	@Autowired
	private CmmnDao cmmnDao;

	// 문의하기 리스트
	public Map<String, Object> selectinquiryList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list = inquiryDao.selectNoticeList(paramsMap);
		int total = inquiryDao.selectinquiryListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	// 문의하기 상세
	public Map<String, Object> selectDetailinquiryInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		// 공지사항 상세정보(내용)
		Map<String, Object> info = inquiryDao.selectDetailinquiryInfo(paramsMap);

		// 조회수+1 증가
		paramsMap.put("inqCnt", info.get("inq_cnt"));
		inquiryDao.updateNoticeCnt(paramsMap);
		result.put("info", info);

		int pstSn;

		// 이전글, 다음글 정보
		if(paramsMap.get("pstSn").getClass().getName() == "java.lang.String")
			pstSn = Integer.parseInt((String) paramsMap.get("pstSn"));
		else
			pstSn = (int) paramsMap.get("pstSn");

		paramsMap.put("pstSn", pstSn); 

		Map<String, Object> title = inquiryDao.selectDetailinquiryTitle(paramsMap);
		result.put("title", title);

		return result;
	}


	@Override
	public String insertInquiry(Map<String, Object> paramsMap) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpSession httpSession = request.getSession();
		Object userData = httpSession.getAttribute("userData");
//		paramsMap.put("inquiryTitle", escapeFunction(paramsMap.get("inquiryTitle")));
//        paramsMap.put("inquiryContent", escapeFunction(paramsMap.get("inquiryContent")));

		
		Map<String, Object> userDataMap = (Map<String, Object>) userData;
		paramsMap.put("assiTelno", userDataMap.get("assiTelno"));
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("ssoUserNm", userDataMap.get("ssoUserNm"));
		paramsMap.put("ssoEmail", userDataMap.get("ssoEmail"));
		
		List<Map<String, Object>> result = automationAttackPrevention(paramsMap);
		Map<String, Object> getItem = result.get(0);
		int textcount = ((Number) getItem.get("textcount")).intValue();
	    int logincount = ((Number) getItem.get("logincount")).intValue();
	    if(logincount >= 5) {
	    	return "5분 이내 글 작성 5회 초과 하셨습니다. ";
	    }
		if(textcount == 1) {
			return "5분 이내 같은 글을 작성하셨습니다. ";
		}
		
		inquiryDao.insertInquiry(paramsMap);
		
		return "success";
	}
	
	private List<Map<String, Object>> automationAttackPrevention(Map<String, Object> paramsMap){
//		Map<String, Object>  atatcPrvnt= new HashMap<String, Object>();
		List<Map<String, Object>> atatcPrvnt =  inquiryDao.atatcPrvnt(paramsMap);
		
		return atatcPrvnt;
	}

	@Override
	public int Insertreply(Map<String, Object> paramsMap) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpSession httpSession = request.getSession();
		Object userData = httpSession.getAttribute("userData");
		
		
		Map<String, Object> userDataMap = (Map) userData;
		paramsMap.put("userSn", userDataMap.get("userSn"));
		paramsMap.put("ssoUserId", userDataMap.get("ssoUserId"));
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("ssoUserNm", userDataMap.get("ssoUserNm"));
		return inquiryDao.Insertreply(paramsMap);
	}

	// 문의하기 리스트
	@Override
	public Map<String, Object> selectinquiryReply(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = inquiryDao.selectinquiryReply(paramsMap);
		int total = inquiryDao.selectinquiryReplyCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);

		return result;
	}
	// 문의하기 리스트
	@Override
	public Map<String, Object> selectcheckPswd(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = inquiryDao.selectcheckPswd(paramsMap);
		
		result.put("data", list);
		
		return result;
	}

	/**
	 * 목록 조회
	 * 
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> selectComment(Map<String, Object> paramsMap) throws RimsException {
		return inquiryDao.selectComment(paramsMap);
	}
	@Override
	public int updateReply(Map<String, Object> paramsMap) {
		
		return inquiryDao.updateReply(paramsMap);
	}
	@Override
	public int updateInquiry(Map<String, Object> paramsMap) {
		
		return inquiryDao.updateInquiry(paramsMap);
	}
	@Override
	public int updateDeleteReply(Map<String, Object> paramsMap) {
		
		return inquiryDao.updateDeleteReply(paramsMap);
	}
	@Override
	public int updateInquieryuseY(Map<String, Object> paramsMap) {
		
		return inquiryDao.updateInquieryuseY(paramsMap);
	}
	@Override
	public int deleteInquiry(Map<String, Object> paramsMap) {
		
		return inquiryDao.deleteInquiry(paramsMap);
	}

	private String escapeFunction(Object input) {
	    if (input instanceof String) {
	        String inputValue = (String) input;
	        inputValue = java.util.regex.Matcher.quoteReplacement(inputValue); // 이스케이프 처리
	        return inputValue;
	    }
	    return input.toString();
	}
}
