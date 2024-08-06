package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.DefectSttsService;

@Service
public class DefectSttsServiceImpl extends CmmnAbstractServiceImpl implements DefectSttsService {

	@Autowired
	private DefectSttsDao defectSttsDao;
	
	/**
	 * 대여차량결함 유형별 통계
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> defectCate(Map<String, Object> paramsMap) throws RimsException {
		return defectSttsDao.defectCate(paramsMap);
	}
	
	/**
	 * 대여차량결함 내용별 통계
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> defectCntnt(Map<String, Object> paramsMap) throws RimsException {
		return defectSttsDao.defectCntnt(paramsMap);
	}
    
    /**
     * 대여차량 결함 현황
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> defectsData(Map<String, Object> paramsMap) throws RimsException {
    	return defectSttsDao.defectsData(paramsMap);
    }
    @Override
    public int defectsDataCnt(Map<String, Object> paramsMap) throws RimsException {
    	return defectSttsDao.defectsDataCnt(paramsMap);
    }
}
