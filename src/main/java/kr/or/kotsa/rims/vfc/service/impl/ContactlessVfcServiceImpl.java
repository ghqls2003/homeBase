package kr.or.kotsa.rims.vfc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.ContactlessVfcService;

@Service
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
public class ContactlessVfcServiceImpl extends CmmnAbstractServiceImpl implements ContactlessVfcService {

	@Autowired
	private ContactlessVfcDao contactlessVfcDao;
	
	@Override
	public List<Map<String, Object>> selectRentInfo(Map<String, Object> paramsMap) throws RimsException {
		return contactlessVfcDao.selectRentInfo(paramsMap);
	}

	@Override
	public Object selectVerifyCd(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return null;
	}

	//운전자격 확인 코드
//		public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap) {
//			Map<String, Object> result = new HashMap<>();
//
//			Map<String, Object> rentNo = driveDao.selectRentNo(paramsMap);
//			Map<String, Object> vin = driveDao.selectVin(paramsMap);
//
//			result.putAll(rentNo);
//			paramsMap.putAll(rentNo);
//			result.put("code", driveDao.selectVerifyCd(paramsMap));
//			if(vin != null) {
//				paramsMap.putAll(vin);
//				result.putAll(selectDefectList(paramsMap));
//			}
//			String successCode = (String) paramsMap.get("cd");
//			
//			result.putAll(selectEtcInfo(paramsMap));
//			return result;
//		}

}
