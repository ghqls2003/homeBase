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
     * 대여사업자 가입 현황
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> agencyAccessionChart(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyAccessionChart(paramsMap);
    }
}
