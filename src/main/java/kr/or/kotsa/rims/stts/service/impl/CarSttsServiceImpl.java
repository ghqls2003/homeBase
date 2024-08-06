package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.CarSttsService;

@Service
public class CarSttsServiceImpl extends CmmnAbstractServiceImpl implements CarSttsService {

	@Autowired
	private CarSttsDao carSttsDao;
	
	/**
	 * 대여차량 차종
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> carmdl(Map<String, Object> paramsMap) throws RimsException {
		return carSttsDao.carmdl(paramsMap);
	}
	
	/**
	 * 대여차량 연식
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> mdlyr(Map<String, Object> paramsMap) throws RimsException {
		return carSttsDao.mdlyr(paramsMap);
	}
    
    /**
     * 법인별 대여차량
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> crprtnData(Map<String, Object> paramsMap) throws RimsException {
    	return carSttsDao.crprtnData(paramsMap);
    }
    @Override
    public List<Map<String, Object>> crprtnCarData(Map<String, Object> paramsMap) throws RimsException {
    	return carSttsDao.crprtnCarData(paramsMap);
    }
}
