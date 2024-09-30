package kr.or.kotsa.rims.api.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface ApiAuthKeyService {

    /**
     * 상세 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap);
	int selectlistViewCnt(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectlistView2(Map<String, Object> paramsMap);
	int selectlistViewCnt2(Map<String, Object> paramsMap);
	int selectchecksttsCnt(Map<String, Object> paramsMap);
	int selectcheckapiCnt(Map<String, Object> paramsMap);
//	List<Map<String, Object>> selectcheckApiNum(Map<String, Object> paramsMap);
	int selectcheckApiNumCnt(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectcheckstts(Map<String, Object> paramsMap);
//	List<Map<String, Object>> selectcheckstts2(Map<String, Object> paramsMap);
//	List<Map<String, Object>> selectCheckApi(Map<String, Object> paramsMap);
//	int selectCheckApiCnt(Map<String, Object> paramsMap);
	int insertApiNum(Map<String, Object> paramsMap);

	// 상태 드롭다운
	List<Map<String, Object>> selectsttsDrop(Map<String, Object> paramsMap) throws RimsException;
	
	int updateSttCd(Map<String, Object> paramsMap)throws RimsException;
	int insertReApi(Map<String, Object> paramsMap)throws RimsException;
	int insertApiAuthKey(Map<String, Object> paramsMap) throws RimsException;
	int insertApiTestKey(Map<String, Object> paramsMap) throws RimsException;
	int selectapiInsert(Map<String, Object> paramsMap) throws RimsException;
	// API목록 전부 insert
	int insertApiList(Map<String, Object> paramsMap) throws RimsException;
	// API목록 전부 update(재발급)
	int updateorgList(Map<String, Object> paramsMap) throws RimsException;

	
	/**
	 * 인증키 승인/반려 버튼
	 */
	// 승인
	int updateapproveBtn(Map<String, Object> paramsMap);
	// 반려후 신청
	int updateReStts(Map<String, Object> paramsMap);
	// 반려
	int updaterefuseBtn(Map<String, Object> paramsMap);
	//중지
	int updatestopUse(Map<String, Object> paramsMap);
	int updateReUse(Map<String, Object> paramsMap);
	int updateextendAPi(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap);
	int selectApiSttsViewCnt(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectApiSttsView2(Map<String, Object> paramsMap);
	int selectApiSttsViewCnt2(Map<String, Object> paramsMap);
}
