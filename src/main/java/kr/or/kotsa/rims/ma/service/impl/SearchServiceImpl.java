package kr.or.kotsa.rims.ma.service.impl;

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
import kr.or.kotsa.rims.ma.service.SearchService;

@Service
public class SearchServiceImpl extends CmmnAbstractServiceImpl implements SearchService {

	private static final Logger logger = LoggerFactory.getLogger(SearchServiceImpl.class);

	@Autowired
	private SearchDao searchDao;
	@Autowired
	private CmmnDao cmmnDao;

	// 문의하기 리스트
	public Map<String, Object> selectinquiry(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list = searchDao.selectinquiry(paramsMap);
		int total = searchDao.selectinquiryCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
	//공지사항 리스트
	public Map<String, Object> selectNoticeList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = searchDao.selectNoticeList(paramsMap);
		int total = searchDao.selectNoticeListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}
	//FAQ리스트
	public Map<String, Object> selectFAQList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = searchDao.selectFAQList(paramsMap);
		int total = searchDao.selectFAQListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	// 문의하기 상세selectDetailinquiryInfo
	public Map<String, Object> selectDetailinquiryInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		// 공지사항 상세정보(내용)
		Map<String, Object> info = searchDao.selectDetailinquiryInfo(paramsMap);
		// 공지사항 상세정보(내용 카운트)
		int noticeCnt = searchDao.selectDetailNoticeInfoCnt(paramsMap);
		// 조회수+1 증가
		paramsMap.put("inqCnt", info.get("inq_cnt"));
		searchDao.updateNoticeCnt(paramsMap);
		result.put("info", info);

		int pstSn;

		// 이전글, 다음글 정보
		if(paramsMap.get("pstSn").getClass().getName() == "java.lang.String")
			pstSn = Integer.parseInt((String) paramsMap.get("pstSn"));
		else
			pstSn = (int) paramsMap.get("pstSn");

		int	prevPstSn = pstSn+1; // 이전글
		int nextPstSn = pstSn-1; // 다음글

		paramsMap.put("noticeCnt", noticeCnt); // 공지사항 글 전체 갯수
		paramsMap.put("prevPstSn", prevPstSn); // 이전글
		paramsMap.put("nextPstSn", nextPstSn); // 다음글

		// 공지사항 상세정보(이전글, 다음글 제목)
		if(prevPstSn > noticeCnt){ // 이전글이 없는 경우
			Map<String, Object> title = searchDao.selectDetailNoticeNullPrevTitle(paramsMap);
			result.put("title", title);
		} else if(nextPstSn == 0) { // 다음글이 없는 경우
			Map<String, Object> title = searchDao.selectDetailNoticeNullNextTitle(paramsMap);
			result.put("title", title);
		}else{
			Map<String, Object> title = searchDao.selectDetailNoticeTitle(paramsMap);
			result.put("title", title);
		}
		return result;
	}

	@Override
	public int insertInquiry(Map<String, Object> paramsMap) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpSession httpSession = request.getSession();
		Object userData = httpSession.getAttribute("userData");
		Map<String, Object> userDataMap = (Map<String, Object>) userData;
		paramsMap.put("userSn", userDataMap.get("userSn"));
		paramsMap.put("assiTelno", userDataMap.get("assiTelno"));
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("ssoUserNm", userDataMap.get("ssoUserNm"));
		paramsMap.put("ssoEmail", userDataMap.get("ssoEmail"));

		return searchDao.insertInquiry(paramsMap);
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
		return searchDao.Insertreply(paramsMap);
	}

	// 문의하기 리스트
	@Override
	public Map<String, Object> selectinquiryReply(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = searchDao.selectinquiryReply(paramsMap);
		int total = searchDao.selectinquiryReplyCnt(paramsMap);
//		System.out.println("------ㅁㅎ--> " + paramsMap);

		result.put("data", list);
		result.put("total", total);

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
		return searchDao.selectComment(paramsMap);
	}
	
	@Override
	public List<Map<String, Object>> selectmenuShow(Map<String, Object> paramsMap) throws RimsException {
		return searchDao.selectmenuShow(paramsMap);
	}

}
