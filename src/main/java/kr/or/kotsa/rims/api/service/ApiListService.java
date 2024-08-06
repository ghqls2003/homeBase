package kr.or.kotsa.rims.api.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface ApiListService {

    /**
     * 상세 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	List<Map<String, Object>> selectlistViewReq(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectlistViewRes(Map<String, Object> paramsMap);
	int selectlistViewCnt(Map<String, Object> paramsMap);
//	int listViewCnt(Map<String, Object> paramsMap);
//	int updateSttCd(Map<String, Object> paramsMap);

}
