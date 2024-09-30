package kr.or.kotsa.rims.stts.service.impl;

import java.util.HashMap;
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
    public Map<String, Object> carShareGrid(Map<String, Object> paramsMap) throws RimsException {
    	Map<String, Object> result = new HashMap<>();
    	
    	List<Map<String, Object>> data = totSttsDao.carShareGrid(paramsMap);
    	int total = totSttsDao.carShareGridCnt(paramsMap);
    	
    	result.put("data", data);
    	result.put("total", total);
    	
    	return result;
    }
    
    /**
     * 지역 드롭다운
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> areaDrop(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.areaDrop(paramsMap);
    }
    
    /**
     * 카쉐어링 업체 등록
     * @return
     * @throws RimsException
     */
    @Override
    public int insertCarShare(Map<String, Object> paramsMap) throws RimsException {
    	paramsMap.put("regIp", getClientIP());
    	return totSttsDao.insertCarShare(paramsMap);
    }
    
    /**
     * 카쉐어링 업체 상세 팝업
     * @return
     * @throws RimsException
     */
    @Override
    public Map<String, Object> detailCarshare(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.detailCarshare(paramsMap);
    }
    
    /**
     * 카쉐어링 업체 수정
     * @return
     * @throws RimsException
     */
    @Override
    public int updateCarShare(Map<String, Object> paramsMap) throws RimsException {
    	paramsMap.put("mdfcnIp", getClientIP());
    	return totSttsDao.updateCarShare(paramsMap);
    }
    
    /**
     * 카쉐어링 업체 삭제
     * @return
     * @throws RimsException
     */
    @Override
    public int deleteCarShare(Map<String, Object> paramsMap) throws RimsException {
    	paramsMap.put("mdfcnIp", getClientIP());
    	paramsMap.put("delRmrk", "삭제");
    	return totSttsDao.deleteCarShare(paramsMap);
    }
    
    /**
     * 회사명 자동완성
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectCoNm(Map<String, Object> paramsMap) throws RimsException {
    	return totSttsDao.selectCoNm(paramsMap);
    }
}
