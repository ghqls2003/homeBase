package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.TotSttsService;

@Service
public class TotSttsServiceImpl extends CmmnAbstractServiceImpl implements TotSttsService {

	@Autowired
	private TotSttsDao totSttsDao;
	
    /**
     * 대여사업자 현황 그리드
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyAreaGrid(paramsMap);
    }
    @Override
    public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyAreaDetailGrid(paramsMap);
    }
    
    /**
     * 지자체별 가입 사용자 현황 그리드
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> gvAccUserGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.gvAccUserGrid(paramsMap);
    }
    @Override
    public List<Map<String, Object>> gvAccUserDetailGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.gvAccUserDetailGrid(paramsMap);
    }
    
    /**
     * 대여사업자 등록 현황
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> agencyAccessionChart(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyAccessionChart(paramsMap);
    }
    
    /**
     * 권한 가져오기
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> authrt(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.authrt(paramsMap);
    }
    
    /**
     * 카쉐어링 업체 현황
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> carShareGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.carShareGrid(paramsMap);
    }
    @Override
    public int carShareGridCnt(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.carShareGridCnt(paramsMap);
    }
}
