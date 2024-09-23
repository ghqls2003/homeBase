package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class TotSttsDao extends CmmnAbstractMapper {
	/**
	 * 대여사업자 현황 그리드
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAreaGrid", paramsMap);
	}
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAreaDetailGrid", paramsMap);
	}
	
	/**
	 * 지자체별 가입 사용자 현황 그리드
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> gvAccUserGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.gvAccUserGrid", paramsMap);
	}
	public List<Map<String, Object>> gvAccUserDetailGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.gvAccUserDetailGrid", paramsMap);
	}
	
	/**
	 * 대여사업자 등록 현황
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAccessionChart(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAccessionChart", paramsMap);
	}
	
	/**
	 * 권한 가져오기
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> authrt(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.authrt", paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 현황
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> carShareGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.carShareGrid", paramsMap);
	}
	public int carShareGridCnt(Map<String, Object> paramsMap)throws RimsException {
		return selectOne("stts.totStts.carShareGridCnt", paramsMap);
	}
	
	/**
	 * 지역 드롭다운
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> areaDrop(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.areaDrop", paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 등록
	 * @param paramsMap
	 * @return 
	 * @throws RimsException
	 */
	public int insertCarShare(Map<String, Object> paramsMap)throws RimsException {
		return insert("stts.totStts.insertCarShare", paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 상세 팝업
	 * @param paramsMap
	 * @return 
	 * @throws RimsException
	 */
	public Map<String, Object> detailCarshare(Map<String, Object> paramsMap)throws RimsException {
		return selectOne("stts.totStts.detailCarshare", paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 수정
	 * @param paramsMap
	 * @return 
	 * @throws RimsException
	 */
	public int updateCarShare(Map<String, Object> paramsMap)throws RimsException {
		return update("stts.totStts.updateCarShare", paramsMap);
	}
	
	/**
	 * 카쉐어링 업체 삭제
	 * @param paramsMap
	 * @return 
	 * @throws RimsException
	 */
	public int deleteCarShare(Map<String, Object> paramsMap)throws RimsException {
		return update("stts.totStts.deleteCarShare", paramsMap);
	}
}
