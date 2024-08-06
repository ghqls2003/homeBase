package kr.or.kotsa.rims.api.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface ApiHistService {

    /**
     * 상세 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap);
	int selectApiSttsViewCnt(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectlistViewapiHistDev(Map<String, Object> paramsMap);
	int selectlistViewapiHistDevCnt(Map<String, Object> paramsMap);
	int selectlistViewCnt(Map<String, Object> paramsMap);

    /**
     * 상세 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    /**
     * 목록 카운트 조회
     * @param paramsMap
     * @return
     * @throws HmtsException
     */
    Map<String, Object> selectdetaillistView(Map<String, Object> paramsMap);

	int updateStopApiUse(Map<String, Object> paramsMap);
	int updateApiReUse(Map<String, Object> paramsMap);
	int updateUseExtendApi(Map<String, Object> paramsMap);
    Object ckapiList(Map<String, Object> paramsMap);

}
