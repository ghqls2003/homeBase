package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.RentSttsService;

@Service
public class RentSttsServiceImpl extends CmmnAbstractServiceImpl implements RentSttsService {

	@Autowired
	private RentSttsDao rentSttsDao;

    /**
     * 메인 지도 데이터 조회
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectMapData(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.selectMapData(paramsMap);
    }
    
    /**
     * 시군구 데이터 조회
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectDetailMapData(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.selectDetailMapData(paramsMap);
    }
    
    /**
     * 대여이력 차종별 통계
     * @return
     * @throws RimsException
     */
    //(년단위)
    @Override
    public List<Map<String, Object>> rentCarmdlTime(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.rentCarmdlTime(paramsMap);
    }
    //(지역단위)
    @Override
    public List<Map<String, Object>> rentCarmdlArea(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.rentCarmdlArea(paramsMap);
    }
    
    /**
     * 대여사업자 현황 그리드
     * @return
     * @throws RimsException
     */
    // (년단위)
    @Override
    public List<Map<String, Object>> rentHistTimeGrid(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.rentHistTimeGrid(paramsMap);
    }
    // (지역단위)
    @Override
    public List<Map<String, Object>> rentHistGrid(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.rentHistGrid(paramsMap);
    }
    @Override
    public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.agencyAreaDetailGrid(paramsMap);
    }
    
    /**
     * 대여이력 월/기간별 통계
     * @return
     * @throws RimsException
     */
    // (지역별)
    @Override
    public List<Map<String, Object>> mpChartArea(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.mpChartArea(paramsMap);
    }
    // (기간별)
    @Override
    public List<Map<String, Object>> mpChartTime(Map<String, Object> paramsMap) throws RimsException {
    	return rentSttsDao.mpChartTime(paramsMap);
    }
}
