package kr.or.kotsa.rims.sft.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface InquiryService {

    //공지사항 리스트
    Map<String, Object> selectinquiryList(Map<String, Object> paramsMap);

    //공지사항 상세
	Map<String, Object> selectDetailinquiryInfo(Map<String, Object> paramsMap);

	Object insertInquiry(Map<String, Object> paramsMap);
	int Insertreply(Map<String, Object> paramsMap);

    Map<String, Object> selectinquiryReply(Map<String, Object> paramsMap);
    Map<String, Object> selectcheckPswd(Map<String, Object> paramsMap);
    List<Map<String, Object>> selectComment(Map<String, Object> paramsMap) throws RimsException;
	int updateReply(Map<String, Object> paramsMap);
	int updateInquiry(Map<String, Object> paramsMap);
	int updateDeleteReply(Map<String, Object> paramsMap);
	int updateInquieryuseY(Map<String, Object> paramsMap);
	int deleteInquiry(Map<String, Object> paramsMap);

}