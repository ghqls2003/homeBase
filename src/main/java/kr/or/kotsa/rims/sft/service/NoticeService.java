package kr.or.kotsa.rims.sft.service;

import java.util.Map;

public interface NoticeService {

    //공지사항 리스트
    Map<String, Object> selectNoticeList(Map<String, Object> paramsMap);

    //공지사항 상세
	Map<String, Object> selectDetailNoticeInfo(Map<String, Object> paramsMap);

	//공지사항 등록
	Object insertNotice(Map<String, Object> paramsMap);

	//공지사항 수정
	Object updateNotice(Map<String, Object> paramsMap);

	//공지사항 삭제
	Object updateDeleteNotice(Map<String, Object> paramsMap);
}