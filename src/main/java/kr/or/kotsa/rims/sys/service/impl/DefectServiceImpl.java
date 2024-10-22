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
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return defectDao.selectCtpvNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return defectDao.selectSggNm(paramsMap);
	}
	
	@Override
	public Map<String, Object> selectDetailDefectInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = defectDao.selectDetailDefectInfoCnt(paramsMap);
		List<Map<String, Object>> data = defectDao.selectDetailDefectInfo(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}
	

}
