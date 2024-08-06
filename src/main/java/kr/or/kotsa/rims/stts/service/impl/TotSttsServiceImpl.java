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
     * 메인 지도 데이터 조회
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectMapData(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.selectMapData(paramsMap);
    }
    
    /**
     * 시군구 데이터 조회
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectDetailMapData(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.selectDetailMapData(paramsMap);
    }
    
    /**
     * 대여사업자 영업현황 통계
     * @return
     * @throws RimsException
     */
    //(년단위)
    @Override
    public List<Map<String, Object>> agencyTimeYear(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyTimeYear(paramsMap);
    }
    //(월단위)
    @Override
    public List<Map<String, Object>> agencyTimeMonth(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyTimeMonth(paramsMap);
    }
    //(지역단위)
    @Override
    public List<Map<String, Object>> agencyArea(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyArea(paramsMap);
    }
    
    /**
     * 대여사업자 현황 그리드
     * @return
     * @throws RimsException
     */
    // (년단위)
    @Override
    public List<Map<String, Object>> agencyTimeYearGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyTimeYearGrid(paramsMap);
    }
    // (월단위)
    @Override
    public List<Map<String, Object>> agencyTimeMonthGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyTimeMonthGrid(paramsMap);
    }
    // (지역단위)
    @Override
    public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyAreaGrid(paramsMap);
    }
    @Override
    public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyAreaDetailGrid(paramsMap);
    }
    
    /**
     * 사업 개시 및 폐업 비율 통계
     * @return
     * @throws RimsException
     */
    // (지역별)
    @Override
    public List<Map<String, Object>> agencyOpenCloseChart(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyOpenCloseChart(paramsMap);
    }
    // (기간별/년도별)
    @Override
    public List<Map<String, Object>> agencyOpenCloseChartPeriodYear(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyOpenCloseChartPeriodYear(paramsMap);
    }
    // (기간별/월별)
    @Override
    public List<Map<String, Object>> agencyOpenCloseChartPeriod(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.agencyOpenCloseChartPeriod(paramsMap);
    }
}
