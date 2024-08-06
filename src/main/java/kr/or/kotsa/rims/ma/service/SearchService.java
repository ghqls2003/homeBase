package kr.or.kotsa.rims.ma.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface SearchService {

    //문의하기 리스트
    Map<String, Object> selectinquiry(Map<String, Object> paramsMap);
    
    //공지사항 리스트
    Map<String, Object> selectNoticeList(Map<String, Object> paramsMap);
    //FAQ
    Map<String, Object> selectFAQList(Map<String, Object> paramsMap);


    //공지사항 상세
	Map<String, Object> selectDetailinquiryInfo(Map<String, Object> paramsMap);

	int insertInquiry(Map<String, Object> paramsMap);
	int Insertreply(Map<String, Object> paramsMap);

    Map<String, Object> selectinquiryReply(Map<String, Object> paramsMap);
    List<Map<String, Object>> selectComment(Map<String, Object> paramsMap) throws RimsException;
    List<Map<String, Object>> selectmenuShow(Map<String, Object> paramsMap) throws RimsException;

}