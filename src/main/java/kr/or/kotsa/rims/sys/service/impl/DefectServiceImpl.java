package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.DefectService;

@Service
public class DefectServiceImpl extends CmmnAbstractServiceImpl implements DefectService{
	
	@Autowired
	private DefectDao defectDao;

	@Override
	public Map<String, Object> selectDefectInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = defectDao.selectDefectInfoCnt(paramsMap);
		List<Map<String, Object>> data = defectDao.selectDefectInfo(paramsMap);
		
		result.put("total", total);
		result.put("data", data);

		return result; 
	}
	
	@Override
	public int insertDefect(Map<String, Object> paramsMap) throws RimsException {
		 return defectDao.insertDefect(paramsMap);
	}
	
	@Override
	public Map<String, Object> selectValidDuplicate(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> dataCarInfoList = defectDao.selectCarInfoList(paramsMap);
		List<Map<String, Object>> dataDefectList = defectDao.selectDefectList(paramsMap);
		result.put("dataCarInfoList", dataCarInfoList);
		result.put("dataDefectList", dataDefectList);

		return result; 
	}
	
	@Override
	public int updateDefect(Map<String, Object> paramsMap) throws RimsException {
		return defectDao.updateDefect(paramsMap);
	}
	
	@Override
	public int deleteDefect(Map<String, Object> paramsMap) throws RimsException {
		return defectDao.deleteDefect(paramsMap);
	}
	
	
	@Override
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return defectDao.selectCtpvNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return defectDao.selectSggNm(paramsMap);
	}
	

}