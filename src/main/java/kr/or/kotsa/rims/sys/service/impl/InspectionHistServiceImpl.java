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
}
