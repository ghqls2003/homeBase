package kr.or.kotsa.rims.api.service.impl;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
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

import kr.or.kotsa.rims.api.service.ApiListService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Service
public class ApiListServiceImpl extends CmmnAbstractServiceImpl implements ApiListService {

	private static final Logger logger = LoggerFactory.getLogger(ApiListServiceImpl.class);

	@Autowired
	private ApiListDao apiListDao;

	/**
	 * 목록 조회
	 * 
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> selectlistViewReq(Map<String, Object> paramsMap) {

		return apiListDao.selectlistViewReq(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectlistViewRes(Map<String, Object> paramsMap) {

		return apiListDao.selectlistViewRes(paramsMap);
	}
	@Override
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		
		return apiListDao.selectlistViewCnt(paramsMap);
	}
	
}
