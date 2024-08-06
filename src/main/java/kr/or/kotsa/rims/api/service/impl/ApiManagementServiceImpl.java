package kr.or.kotsa.rims.api.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.api.service.ApiManagementService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Service
public class ApiManagementServiceImpl extends CmmnAbstractServiceImpl implements ApiManagementService {

	private static final Logger logger = LoggerFactory.getLogger(ApiManagementServiceImpl.class);

	@Autowired
	private ApiManagementDao apiManagementDao;

	/**
	 * 목록 조회
	 * 
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
//		System.out.println("paramsMapd" + paramsMap);

		return apiManagementDao.selectlistView(paramsMap);
	}

	@Override
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return apiManagementDao.selectlistViewCnt(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectdetailApiList(Map<String, Object> paramsMap) {
		return apiManagementDao.selectdetailApiList(paramsMap);
	}
	
	@Override
	public int selectdetailApiListCnt(Map<String, Object> paramsMap) {
		return apiManagementDao.selectdetailApiListCnt(paramsMap);
	}
	@Override
	public int updateApproveApiUse(Map<String, Object> paramsMap) {
		return apiManagementDao.updateApproveApiUse(paramsMap);
	}
	@Override
	public int updateRejectApiUse(Map<String, Object> paramsMap) {
		return apiManagementDao.updateRejectApiUse(paramsMap);
	}
	@Override
	public int updateStopApiUse(Map<String, Object> paramsMap) {
		return apiManagementDao.updateStopApiUse(paramsMap);
	}
	@Override
	public int updateReuseApiUse(Map<String, Object> paramsMap) {
		return apiManagementDao.updateReuseApiUse(paramsMap);
	}
}
