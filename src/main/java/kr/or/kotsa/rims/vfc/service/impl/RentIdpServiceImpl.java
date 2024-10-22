package kr.or.kotsa.rims.vfc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.RentIdpService;

@Service
public class RentIdpServiceImpl extends CmmnAbstractServiceImpl implements RentIdpService{
	
	@Autowired
	private RentIdpDao rentIdpDao;
	
	@Override
	public Object selectRentIdpList(Map<String, Object> paramsMap){
		Map<String, Object> result = new HashMap<>();
		
		String bzauthCd =  rentIdpDao.selectBzmnSeCd(paramsMap);
		
		paramsMap.put("bzauthCd", bzauthCd);
		
		List<Map<String, Object>> list = rentIdpDao.selectRentIdpList(paramsMap);
		int total = rentIdpDao.selectRentIdpListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> selectDetailRentInfo(Map<String, Object> paramsMap) {
		return rentIdpDao.selectDetailRentInfo(paramsMap);
	}
	
	@Override
	public int updateRentInfo(Map<String, Object> paramsMap) {
		
		
		paramsMap.put("IP", getClientIP());
		paramsMap.put("userSn", getUserSn());
		return rentIdpDao.updateRentInfo(paramsMap);
	}
	
	@Override
	public Object selectCarList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> list = rentIdpDao.selectCarList(paramsMap);
		int total = rentIdpDao.selectCarListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
	@Override
	public int updateDeleteYn(Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("IP", getClientIP());
		return rentIdpDao.updateDeleteYn(paramsMap);
	}

	@Override
	public int insertRentReg(Map<String, Object> paramsMap) {
		return rentIdpDao.insertRentReg(paramsMap);
	}
	
	@Override
	public int insertConfData(Map<String, Object> paramsMap) {
		return rentIdpDao.insertConfData(paramsMap);
	}
}
