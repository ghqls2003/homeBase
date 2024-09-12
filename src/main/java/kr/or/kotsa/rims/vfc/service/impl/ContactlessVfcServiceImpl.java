package kr.or.kotsa.rims.vfc.service.impl;

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

}
