package kr.or.kotsa.rims.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.api.service.ApiViewService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Service
public class ApiViewServiceImpl extends CmmnAbstractServiceImpl implements ApiViewService {

	private static final Logger logger = LoggerFactory.getLogger(ApiViewServiceImpl.class);

	@Autowired
	private apiviewDao apiDao;

	/**
     * 목록 조회
     * @return
     * @throws RimsException
     */
	@Override
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());
		return apiDao.selectlistView(paramsMap);
	}
	@Override
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());
		return apiDao.selectlistViewCnt(paramsMap);
	}

	/**
     * 상세 조회
     * @return
     * @throws RimsException
     */
	@Override
	public Map<String, Object> selectdetaillistView(Map<String, Object> paramsMap) {
		
		paramsMap.put("UserSn", getUserSn());

		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list = apiDao.selectdetaillistView(paramsMap);
		int total = apiDao.selectdetaillistViewCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
//    /**
//     * 목록 카운트 조회
//     * @return
//     * @throws HmtsException
//     */
//
	@Override
	public List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap) {
//		System.out.println("paramsMapd"+paramsMap);
		paramsMap.put("userSn", getUserSn());

		return apiDao.selectApiSttsView(paramsMap);
	}
	@Override
	public int selectApiSttsViewCnt(Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());
		return apiDao.selectApiSttsViewCnt(paramsMap);
	}
//@Override
//	public int selectlistViewCnt(Map<String, Object> paramsMap) {
//		return apiDao.selectlistViewCnt(paramsMap);
//	}
//	@Override
//	public int detaillistViewCnt(Map<String, Object> paramsMap) {
//		return apiDao.detaillistViewCnt(paramsMap);
//	}
	
//	@Override
//	public List<Map<String, Object>> detaillistViewCnt(Map<String, Object> paramsMap) {
//		return apiDao.detaillistViewCnt(paramsMap);
//	}
//	
//	@Override
//	public List<Map<String, Object>> paramview(Map<String, Object> paramsMap) {
//		return apiDao.paramview(paramsMap);
//	}
	@Override
	public int updateStopApiUse(Map<String, Object> paramsMap) {
		return apiDao.updateStopApiUse(paramsMap);
	}
	@Override
	public int updateApiReUse(Map<String, Object> paramsMap) {
		return apiDao.updateApiReUse(paramsMap);
	}
	@Override
	public int updateUseExtendApi(Map<String, Object> paramsMap) {
		return apiDao.updateUseExtendApi(paramsMap);
	}
	}
