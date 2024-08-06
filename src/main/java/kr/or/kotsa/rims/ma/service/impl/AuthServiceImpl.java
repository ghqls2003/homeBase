package kr.or.kotsa.rims.ma.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import kr.or.kotsa.rims.cmmn.biz.service.impl.CmmnDao;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.AuthService;

import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class AuthServiceImpl extends CmmnAbstractServiceImpl implements AuthService {

	@Autowired
	private AuthDao authDao;

	@Autowired
    private CmmnDao commonDao;

	//시도 검색조건
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap){
		return authDao.selectCtpvNm(paramsMap);
	}

	//시군구 검색조건
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap){
		return authDao.selectSggNm(paramsMap);
	}

	//회사리스트
	public Map<String, Object> selectCompanyList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = authDao.selectCompanyList(paramsMap);
		int total = authDao.selectCompanyListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//지자체리스트
	public Map<String, Object> selectLocGovList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = authDao.selectLocGovList(paramsMap);
		int total = authDao.selectLocGovListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//사업자 등록 - 사업소종류 리스트
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return authDao.selectBzmnSe(paramsMap);
	}

	//사업자 등록 - 주사무소 리스트
		public List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap) {
			return authDao.selectUpBrno(paramsMap);
		}

	//사업자 등록 - 영업상태 리스트
	public List<Map<String, Object>> selectBsnStts(Map<String, Object> paramsMap) {
		return authDao.selectBsnStts(paramsMap);
	}

	//중복확인
	public Object selectDuplicChk(Map<String, Object> paramsMap) {
		return authDao.selectDuplicChk(paramsMap);
	}

	//사업자 등록
	public Object insertCmpny(Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("regIp", getClientIP());

		authDao.insertCmpny(paramsMap);
		return "success";
	}

	//신청요청
	public Object insertUser(Map<String, Object> paramsMap) {
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("userId", session.getAttribute("SSO_ID").toString());
		paramsMap.put("sn", authDao.selectUserSn(paramsMap));

		authDao.insertUser(paramsMap);
		authDao.insertSso(paramsMap);
		if(paramsMap.get("subjectRDN") != null && paramsMap.get("subjectRDN") != "")
			commonDao.insertCert(paramsMap);
		return "success";
	}

	//반려 후 재신청
	public Object updateUser(Map<String, Object> paramsMap) {
		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		paramsMap.put("userId", session.getAttribute("SSO_ID").toString());
		paramsMap.put("regIp", getClientIP());

		authDao.updateUser(paramsMap);

		return "success";
	}

	//기관 사업자일련번호
	public Map<String, Object> selectBzmnSn(Map<String, Object> paramsMap) {
		return authDao.selectBzmnSn(paramsMap);
	}

}
