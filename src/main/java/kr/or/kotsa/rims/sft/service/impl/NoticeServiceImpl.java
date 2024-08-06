package kr.or.kotsa.rims.sft.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sft.service.NoticeService;

import java.util.*;

@Service
public class NoticeServiceImpl extends CmmnAbstractServiceImpl implements NoticeService {

	@Autowired
	private NoticeDao noticeDao;

	//공지사항 리스트
	public Map<String, Object> selectNoticeList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = noticeDao.selectNoticeList(paramsMap);
		int total = noticeDao.selectNoticeListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//공지사항 상세
	public Map<String, Object> selectDetailNoticeInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		// 공지사항 상세정보(내용)
		Map<String, Object> info = noticeDao.selectDetailNoticeInfo(paramsMap);

		// 조회수+1 증가
		paramsMap.put("inqCnt", info.get("inq_cnt"));
		noticeDao.updateNoticeCnt(paramsMap);
		result.put("info", info);

		int pstSn;

		// 이전글, 다음글 정보
		if(paramsMap.get("pstSn").getClass().getName() == "java.lang.String")
			pstSn = Integer.parseInt((String) paramsMap.get("pstSn"));
		else
			pstSn = (int) paramsMap.get("pstSn");

		paramsMap.put("pstSn", pstSn); // 공지사항 글 전체 갯수

		Map<String, Object> title = noticeDao.selectDetailNoticeTitle(paramsMap);
		result.put("title", title);

		return result;
	}

	//공지사항 등록
	public String  insertNotice(Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("regIp", getClientIP());

		String replacePstTtl = java.util.regex.Matcher.quoteReplacement((String) paramsMap.get("pstTtl"));
		String replacePstCn = java.util.regex.Matcher.quoteReplacement((String) paramsMap.get("pstCn"));
		paramsMap.replace("pstTtl", paramsMap.get("pstTtl"), replacePstTtl);
		paramsMap.replace("pstCn", paramsMap.get("pstCn"), replacePstCn);
//		Map<String, Object> result = new HashMap<String, Object>();
		
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
		noticeDao.insertNotice(paramsMap);
		return "success";
	}
	
	private List<Map<String, Object>> automationAttackPrevention(Map<String, Object> paramsMap){
//		Map<String, Object>  atatcPrvnt= new HashMap<String, Object>();
		List<Map<String, Object>> atatcPrvnt =  noticeDao.atatcPrvnt(paramsMap);
		
		return atatcPrvnt;
	}
	
	//

	//공지사항 수정
	public Object updateNotice(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());

		String replacePstTtl = java.util.regex.Matcher.quoteReplacement((String) paramsMap.get("pstTtl"));
		String replacePstCn = java.util.regex.Matcher.quoteReplacement((String) paramsMap.get("pstCn"));
		paramsMap.replace("pstTtl", paramsMap.get("pstTtl"), replacePstTtl);
		paramsMap.replace("pstCn", paramsMap.get("pstCn"), replacePstCn);

		noticeDao.updateNotice(paramsMap);
		return "success";
	}

	//공지사항 삭제
	public Object updateDeleteNotice(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());

		noticeDao.updateDeleteNotice(paramsMap);
		return "success";
	}

}
