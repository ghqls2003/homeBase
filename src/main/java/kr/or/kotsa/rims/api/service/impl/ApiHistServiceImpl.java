package kr.or.kotsa.rims.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.api.service.ApiHistService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Service
public class ApiHistServiceImpl extends CmmnAbstractServiceImpl implements ApiHistService {

	private static final Logger logger = LoggerFactory.getLogger(ApiHistServiceImpl.class);

	@Autowired
	private ApiHistDao apiHistDao;

	/**
	 * 목록 조회
	 * 
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
		return apiHistDao.selectlistView(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap) {
//		System.out.println("paramsMapd"+paramsMap);

		return apiHistDao.selectApiSttsView(paramsMap);
	}

	@Override
	public int selectApiSttsViewCnt(Map<String, Object> paramsMap) {
		return apiHistDao.selectApiSttsViewCnt(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectlistViewapiHistDev(Map<String, Object> paramsMap) {
		return apiHistDao.selectlistViewapiHistDev(paramsMap);
	}
	@Override
	public int selectlistViewapiHistDevCnt(Map<String, Object> paramsMap) {
		return apiHistDao.selectlistViewapiHistDevCnt(paramsMap);
	}
	@Override
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return apiHistDao.selectlistViewCnt(paramsMap);
	}

	/**
	 * 상세 조회
	 * 
	 * @return
	 * @throws RimsException
	 */
	@Override
	public Map<String, Object> selectdetaillistView(Map<String, Object> paramsMap) {

		paramsMap.put("UserSn", getUserSn());

		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list = apiHistDao.selectdetaillistView(paramsMap);
		int total = apiHistDao.selectdetaillistViewCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	@Override
	public int updateStopApiUse(Map<String, Object> paramsMap) {
		return apiHistDao.updateStopApiUse(paramsMap);
	}

	@Override
	public int updateApiReUse(Map<String, Object> paramsMap) {
		return apiHistDao.updateApiReUse(paramsMap);
	}

	@Override
	public int updateUseExtendApi(Map<String, Object> paramsMap) {
		return apiHistDao.updateUseExtendApi(paramsMap);
	}
	@Override
	public Object ckapiList(Map<String, Object> paramsMap) {
		return apiHistDao.ckapiList(paramsMap);
	}
}
