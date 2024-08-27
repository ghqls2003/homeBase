package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.InspectionHistService;

@Service
public class InspectionHistServiceImpl extends CmmnAbstractServiceImpl implements InspectionHistService {
	@Autowired
	private InspectionHistDao inspectionHistDao;

	@Override
	public Map<String, Object> selectInspectionHistInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = inspectionHistDao.selectInspectionHistInfoCnt(paramsMap);
		List<Map<String, Object>> data = inspectionHistDao.selectInspectionHistInfo(paramsMap);
		
		result.put("total", total);
		result.put("data", data);

		return result; 
	}

	@Override
	public int insertInspectionHist(Map<String, Object> paramsMap) {
		return inspectionHistDao.insertInspectionHist(paramsMap);
	}

	@Override
	public List<Map<String, Object>> ctpvNm(Map<String, Object> paramsMap) {
		return inspectionHistDao.ctpvNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> sggNm(Map<String, Object> paramsMap) {
		return inspectionHistDao.sggNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> bsnStts(Map<String, Object> paramsMap) {
		return inspectionHistDao.bsnStts(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return inspectionHistDao.selectAuth(paramsMap);
	}

	@Override
	public int updateInspectionHist(Map<String, Object> paramsMap) {
		return inspectionHistDao.updateInspectionHist(paramsMap);
	}

	@Override
	public List<Map<String, Object>> agencyList(Map<String, Object> paramsMap) {
		return inspectionHistDao.agencyList(paramsMap);
	}

	@Override
	public List<Map<String, Object>> agencyInfo(Map<String, Object> paramsMap) {
		return inspectionHistDao.agencyInfo(paramsMap);
	}

	@Override
	public int updateDeleteYn(Map<String, Object> paramsMap) {
		return inspectionHistDao.updateDeleteYn(paramsMap);
	}

}
