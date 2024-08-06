package kr.or.kotsa.rims.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class ApiAuthKeyDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
		return selectList("mm.apiAuthKey.listApiAuthKey", paramsMap);
	}
//	public List<Map<String, Object>> selectIssueApi(Map<String, Object> paramsMap) {
//		return selectList("mm.apiAuthKey.selectIssueApi", paramsMap);
//	}

	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apiAuthKey.listApiAuthKeyCnt", paramsMap);
	}
	public int selectchecksttsCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apiAuthKey.checksttsCnt", paramsMap);
	}
	public int selectcheckapiCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apiAuthKey.checkapiCnt", paramsMap);
	}
//	public List<Map<String, Object>> selectcheckApiNum(Map<String, Object> paramsMap) {
//		return selectList("mm.apiAuthKey.selectcheckApiNum", paramsMap);
//	}
	
	public int selectcheckApiNumCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apiAuthKey.checkApiNumCnt", paramsMap);
	}
	public List<Map<String, Object>> selectcheckstts(Map<String, Object> paramsMap) {
		return selectList("mm.apiAuthKey.checkstts", paramsMap);
	}
	
//	public List<Map<String, Object>> selectcheckstts2(Map<String, Object> paramsMap) {
//		return selectList("mm.apiAuthKey.selectcheckstts2", paramsMap);
//	}
	
	
	/**
	 * 인증키 승인/반려 버튼
	 * 
	 * @param paramsMap
	 * @return
	 */
	// 승인
	public int updateapproveBtn(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateapproveBtn", paramsMap);
	}
	// api목록 승인
	public int updateapproveApiList(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateapproveApiList", paramsMap);
	}
	// 반려
	public int updaterefuseBtn(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updaterefuseBtn", paramsMap);
	}
	// api목록 반려
	public int updaterefuseApiList(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updaterefuseApiList", paramsMap);
	}
	// 중지
	public int updatestopUseBtn(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updatestopUseBtn", paramsMap);
	}
	// 중지 해제
	public int updateReUseBtn(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateReUseBtn", paramsMap);
	}
	public int updateextendAPi(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateextendAPi", paramsMap);
	}
	// api목록 중지
	public int updatestopUseList(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updatestopUseList", paramsMap);
	}
	// api목록 중지해제
	public int updateReUseList(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateReUseList", paramsMap);
	}

	
//	public List<Map<String, Object>> selectCheckApi(Map<String, Object> paramsMap) {
//		return selectList("mm.apiAuthKey.selectCheckApi", paramsMap);
//	}
//	
//	public int selectCheckApiCnt(Map<String, Object> paramsMap) {
//		return selectOne("mm.apiAuthKey.selectCheckApiCnt", paramsMap);
//	}
	
	// 상태 드롭다운
	public List<Map<String, Object>> selectsttsDrop(Map<String, Object> paramsMap)throws RimsException {
		return selectList("mm.apiAuthKey.sttsDrop", paramsMap);
	}
	public int insertApiNum(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.insertApiNum", paramsMap);
	}
	public int insertReApi(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.insertReApi", paramsMap);
	}

	public int updateSttCd(Map<String, Object> paramsMap)throws RimsException {
		return update("mm.apiAuthKey.updateSttCd", paramsMap);
	}
	public int insertApiAuthKey(Map<String, Object> paramsMap) {
		return insert("mm.apiAuthKey.insertApiAuthKey", paramsMap);
	}
	public int insertApiTestKey(Map<String, Object> paramsMap) {
		return insert("mm.apiAuthKey.insertApiTestKey", paramsMap);
	}
	public int selectapiInsert(Map<String, Object> paramsMap) {
		return insert("mm.apiAuthKey.apiInsert", paramsMap);
	}
	// API목록 전부 insert
	public int insertApiList(Map<String, Object> paramsMap) {
		return insert("mm.apiAuthKey.insertApiList", paramsMap);
	}
	// API목록 전부 update(재발급)
	public int updateorgList(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateorgList", paramsMap);
	}
	public int updateReStts(Map<String, Object> paramsMap) {
		return update("mm.apiAuthKey.updateReStts", paramsMap);
	}
	public List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap) {
		return selectList("mm.apiAuthKey.apiSttsView", paramsMap);
	}   
	public int selectApiSttsViewCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apiAuthKey.apiSttsViewCnt", paramsMap);
	}
}
