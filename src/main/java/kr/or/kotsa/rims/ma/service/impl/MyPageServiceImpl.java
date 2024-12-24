package kr.or.kotsa.rims.ma.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.biz.service.impl.CmmnDao;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.LoginViewService;
import kr.or.kotsa.rims.ma.service.MainViewService;
import kr.or.kotsa.rims.ma.service.MyPageService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static kr.or.kotsa.rims.cmmn.sys.util.CommonUtil.getXSS;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MyPageServiceImpl extends CmmnAbstractServiceImpl implements MyPageService {

	private static final Logger logger = LoggerFactory.getLogger(MyPageServiceImpl.class);

	@Autowired
	private MyPageDao myPageDao;

	@Autowired
    private CmmnDao commonDao;


	@Override
	public List<Map<String, Object>> myInfo(Map<String, Object> paramsMap) {
		return myPageDao.myInfo(paramsMap);
	}

	@Override
	public int updateMyInfo(Map<String, Object> paramsMap) {
		if(paramsMap.get("subjectRDN") != null && paramsMap.get("subjectRDN") != "")
			commonDao.insertCert(paramsMap);

		return myPageDao.updateMyInfo(paramsMap);
	}

	@Override
	public List<Map<String, Object>> listView(Map<String, Object> paramsMap) {
		return myPageDao.listView(paramsMap);
	}

	@Override
	public int listViewCnt(Map<String, Object> paramsMap) {
		return myPageDao.listViewCnt(paramsMap);
	}

}
