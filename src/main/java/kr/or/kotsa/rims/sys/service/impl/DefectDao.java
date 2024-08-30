package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class DefectDao extends CmmnAbstractMapper {
	public int selectDefectInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.defect.selectDefectInfoCnt", paramsMap);
	}

	public List<Map<String, Object>> selectDefectInfo(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectDefectInfo", paramsMap);
	}
	
	public int insertDefect(Map<String, Object> paramsMap) throws RimsException {
		return insert("sys.defect.insertDefect", paramsMap);
	}
	
	public List<Map<String, Object>> selectCarInfoList(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectCarInfoList", paramsMap);
	}
	
	public List<Map<String, Object>> selectDefectList(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectDefectList", paramsMap);
	}
	
	public int updateDefect(Map<String, Object> paramsMap) throws RimsException {
		return update("sys.defect.updateDefect", paramsMap);
	}
	
	public int deleteDefect(Map<String, Object> paramsMap) throws RimsException {
		return update("sys.defect.deleteDefect", paramsMap);
	}
	
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectCtpvNm", paramsMap);
	}

	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectSggNm", paramsMap);
	}
	
}		
