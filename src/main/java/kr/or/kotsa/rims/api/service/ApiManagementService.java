package kr.or.kotsa.rims.api.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface ApiManagementService {

    /**
     * 상세 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap);
	int selectlistViewCnt(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectdetailApiList(Map<String, Object> paramsMap);
	int selectdetailApiListCnt(Map<String, Object> paramsMap);
	int updateApproveApiUse(Map<String, Object> paramsMap);
	int updateRejectApiUse(Map<String, Object> paramsMap);
	int updateStopApiUse(Map<String, Object> paramsMap);
	int updateReuseApiUse(Map<String, Object> paramsMap);

}
