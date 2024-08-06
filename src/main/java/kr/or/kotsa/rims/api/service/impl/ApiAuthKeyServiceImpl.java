package kr.or.kotsa.rims.api.service.impl;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import kr.or.kotsa.rims.api.service.ApiAuthKeyService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Service
public class ApiAuthKeyServiceImpl extends CmmnAbstractServiceImpl implements ApiAuthKeyService {

	private static final Logger logger = LoggerFactory.getLogger(ApiAuthKeyServiceImpl.class);

	@Autowired
	private ApiAuthKeyDao apiAuthKeyDao;

	/**
	 * 목록 조회
	 * 
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {

		return apiAuthKeyDao.selectlistView(paramsMap);
	}
//	@Override
//	public List<Map<String, Object>> selectIssueApi(Map<String, Object> paramsMap) {
//		
//		return apiAuthKeyDao.selectIssueApi(paramsMap);
//	}

	@Override
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.selectlistViewCnt(paramsMap);
	}
	@Override
	public int selectchecksttsCnt(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.selectchecksttsCnt(paramsMap);
	}
	@Override
	public int selectcheckapiCnt(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.selectcheckapiCnt(paramsMap);
	}
//	@Override
//	public List<Map<String, Object>> selectcheckApiNum(Map<String, Object> paramsMap) {
//		
//		return apiAuthKeyDao.selectcheckApiNum(paramsMap);
//	}
	
	@Override
	public int selectcheckApiNumCnt(Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());

		return apiAuthKeyDao.selectcheckApiNumCnt(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectcheckstts(Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());

		return apiAuthKeyDao.selectcheckstts(paramsMap);
	}
	
//	@Override
//	public List<Map<String, Object>> selectcheckstts2(Map<String, Object> paramsMap) {
//		return apiAuthKeyDao.selectcheckstts2(paramsMap);
//	}
	
	
	/**
	 * 인증키 승인/반려 버튼
	 */
	// 승인
	@Override
	public int updateapproveBtn(Map<String, Object> paramsMap) {
		int tot = 0;
		int approveKey = apiAuthKeyDao.updateapproveBtn(paramsMap);
		int approveList = apiAuthKeyDao.updateapproveApiList(paramsMap);
		tot = approveKey+approveList;
		
		return tot;
	}
	// 반려
	@Override
	public int updaterefuseBtn(Map<String, Object> paramsMap) {
		int tot = 0;
		int refuseKey = apiAuthKeyDao.updaterefuseBtn(paramsMap); 
		int refuseList = apiAuthKeyDao.updaterefuseApiList(paramsMap); 
		tot = refuseKey+refuseList;
		return tot;
	}
	// 중지
	@Override
	public int updatestopUse(Map<String, Object> paramsMap) {
		int tot = 0;
		int stopUseKey = apiAuthKeyDao.updatestopUseBtn(paramsMap); 
		int stopUseList = apiAuthKeyDao.updatestopUseList(paramsMap); 
		tot = stopUseKey+stopUseList;
		return tot;
	}
	// 중지해제
	@Override
	public int updateReUse(Map<String, Object> paramsMap) {
		int tot = 0;
		int stopUseKey = apiAuthKeyDao.updateReUseBtn(paramsMap); 
		int stopUseList = apiAuthKeyDao.updateReUseList(paramsMap); 
		tot = stopUseKey+stopUseList;
		return tot;
	}
	

	@Override
	public int updateextendAPi(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.updateextendAPi(paramsMap);
	}
	
	
//	@Override
//	public List<Map<String, Object>> selectCheckApi(Map<String, Object> paramsMap) {
//		
//		return apiAuthKeyDao.selectCheckApi(paramsMap);
//	}
//	
//	@Override
//	public int selectCheckApiCnt(Map<String, Object> paramsMap) {
//		return apiAuthKeyDao.selectCheckApiCnt(paramsMap);
//	}
	
	// 상태 드롭다운
	@Override
	public List<Map<String, Object>> selectsttsDrop(Map<String, Object> paramsMap)throws RimsException {
		return apiAuthKeyDao.selectsttsDrop(paramsMap);
	}
	
	@Override
	public int updateSttCd(Map<String, Object> paramsMap)throws RimsException {
		return apiAuthKeyDao.updateSttCd(paramsMap);
	}
	@Override
	public int insertApiNum(Map<String, Object> paramsMap) {
		
		return apiAuthKeyDao.insertApiNum(paramsMap);
	}
	@Override
	public int insertReApi(Map<String, Object> paramsMap) {
		
		return apiAuthKeyDao.insertReApi(paramsMap);
	}
	@Override
	public int insertApiAuthKey(Map<String, Object> paramsMap) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpSession httpSession = request.getSession();
		Object userData = httpSession.getAttribute("userData");
		
		Map<String, Object> userDataMap = (Map) userData;
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("ssoUserId", userDataMap.get("ssoUserId"));
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("ssoUserNm", userDataMap.get("ssoUserNm"));
		return apiAuthKeyDao.insertApiAuthKey(paramsMap);
	}
	@Override
	public int insertApiTestKey(Map<String, Object> paramsMap) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		HttpSession httpSession = request.getSession();
		Object userData = httpSession.getAttribute("userData");
		
		Map<String, Object> userDataMap = (Map) userData;
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("ssoUserId", userDataMap.get("ssoUserId"));
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("ssoUserNm", userDataMap.get("ssoUserNm"));
		return apiAuthKeyDao.insertApiTestKey(paramsMap);
	}
	@Override
	public int selectapiInsert(Map<String, Object> paramsMap) {
	
		return apiAuthKeyDao.selectapiInsert(paramsMap);
	}
	// API목록 전부 insert
	@Override
	public int insertApiList(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.insertApiList(paramsMap);
	}
	// API목록 전부 update(재발급)
	@Override
	public int updateorgList(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.updateorgList(paramsMap);
	}
	@Override
	public int updateReStts(Map<String, Object> paramsMap) {
		return apiAuthKeyDao.updateReStts(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap) {
//		System.out.println("paramsMapd"+paramsMap);
		paramsMap.put("userSn", getUserSn());

		return apiAuthKeyDao.selectApiSttsView(paramsMap);
	}
	@Override
	public int selectApiSttsViewCnt(Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());
		return apiAuthKeyDao.selectApiSttsViewCnt(paramsMap);
	}

}
