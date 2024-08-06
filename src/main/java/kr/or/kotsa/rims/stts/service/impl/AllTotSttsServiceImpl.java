package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.AllTotSttsService;

@Service
public class AllTotSttsServiceImpl extends CmmnAbstractServiceImpl implements AllTotSttsService {

	@Autowired
	private AllTotSttsDao allTotSttsDao;
    
    /**
     * 지역별 차량관련현황(Top5)
     * @return
     * @throws RimsException
     */
    // 대여현황
    @Override
    public List<Map<String, Object>> areaRentTop5(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.areaRentTop5(paramsMap);
    }
    @Override
    public List<Map<String, Object>> agencyRentTop5(Map<String, Object> paramsMap) throws RimsException {  // 지자체
    	return allTotSttsDao.agencyRentTop5(paramsMap);
    }
    // 결함현황
    @Override
    public List<Map<String, Object>> areaFlawTop5(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.areaFlawTop5(paramsMap);
    }
    // 결함현황
    @Override
    public List<Map<String, Object>> agencyFlawTop5(Map<String, Object> paramsMap) throws RimsException {  // 지자체
    	return allTotSttsDao.agencyFlawTop5(paramsMap);
    }
    // 보유현황
    @Override
    public List<Map<String, Object>> areaHaveTop5(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.areaHaveTop5(paramsMap);
    }
    // 보유현황
    @Override
    public List<Map<String, Object>> agencyHaveTop5(Map<String, Object> paramsMap) throws RimsException {  // 지자체
    	return allTotSttsDao.agencyHaveTop5(paramsMap);
    }
    
    /**
     * 면허조회 결과
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> verfResult(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.verfResult(paramsMap);
    }
    
    /**
     * 최상단 대여사업자 종합 현황
     * @return
     * @throws RimsException
     */
    // 대여사업자
    @Override
    public List<Map<String, Object>> agencyTimeYearGrid(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.agencyTimeYearGrid(paramsMap);
    }
    // 정보갱신이력
    @Override
    public int agencyHsGrid(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.agencyHsGrid(paramsMap);
    }
    
    /**
     * 지역 / 계절별 차량 대여 현황
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> areaSeasonRent(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.areaSeasonRent(paramsMap);
    }
    
    /**
     * 차량 결함정보 그리드
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> carDefectsInfo(Map<String, Object> paramsMap) throws RimsException {
    	return allTotSttsDao.carDefectsInfo(paramsMap);
    }    
}
