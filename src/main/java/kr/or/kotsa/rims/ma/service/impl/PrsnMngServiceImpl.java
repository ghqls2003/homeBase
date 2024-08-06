package kr.or.kotsa.rims.ma.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.AuthService;
import kr.or.kotsa.rims.ma.service.PrsnMngService;

@Service
public class PrsnMngServiceImpl extends CmmnAbstractServiceImpl implements PrsnMngService{
	
	@Autowired
	private PrsnMngDao prsnMngDao;

	@Override
	public List<Map<String, Object>> selectPrsnMngList(Map<String, Object> paramsMap) throws RimsException {
		return prsnMngDao.selectPrsnMngList(paramsMap);
	}
}
