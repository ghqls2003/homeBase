package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.CorporateInfoManageService;

@Service
public class CorporateInfoManageServiceImpl extends CmmnAbstractServiceImpl implements CorporateInfoManageService {

	@Autowired
	private CorporateInfoManageDao corporateInfoManageDao;
	
	// 기업정보관리 목록 그리드
	@Override
	public Map<String, Object> selectCrprtInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> data = corporateInfoManageDao.selectCrprtInfo(paramsMap);
		int total = corporateInfoManageDao.selectCrprtInfoCnt(paramsMap);
		
		result.put("total", total);
		result.put("data", data);
		
		return result;
		
	}

	// 기업사용자관리 목록 그리드
	@Override
	public Map<String, Object> selectCrprtUserInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> data = corporateInfoManageDao.selectCrprtUserInfo(paramsMap);
		int total = corporateInfoManageDao.selectCrprtUserInfoCnt(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}
	
	// 영업소 등록 사업자번호 중복확인
	@Override
	public Map<String, Object> requestCkDuple(Map<String, Object> paramsMap) {
		
		Map<String, Object> request = corporateInfoManageDao.requestCkDuple(paramsMap);
		paramsMap.put("request", request);
		Map<String, Object> master = corporateInfoManageDao.masterCkDuple(paramsMap);
		paramsMap.put("master", master);
		
		return paramsMap;
	}

	// 영업소 등록 요청
	@Override
	public Map<String, Object> insertCmpnyRequest(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		paramsMap.put("rgtrSn", getUserSn());
        paramsMap.put("regIp", getClientIP());
		int cmpny = corporateInfoManageDao.insertCmpnyRequest(paramsMap);
		if(cmpny > 0) {
			result.put("message", "영업소 등록 요청이 완료되었습니다.");
			return result;
		}else {
			result.put("message", "에러");
			return result;
		}
	}
	
	// 내기업정보 수정 요청
	@Override
	public Map<String, Object> updateCmpnyRequest(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		int cmpny = corporateInfoManageDao.insertCmpnyRequest(paramsMap);
		if(cmpny > 0) {
			result.put("message", "정보수정 요청이 완료되었습니다.");
			return result;
		}else {
			result.put("message", "에러");
			return result;
		}
	}
	
	// 내 기업정보 수정 팝업 기존 데이터 불러오기
	@Override
	public List<Map<String, Object>> callDefaultData(Map<String, Object> paramsMap){
		return corporateInfoManageDao.callDefaultData(paramsMap);
	}
	
	// 수정요청 승인상태확인
	@Override
	public List<Map<String, Object>> requestAprvStts(Map<String, Object> paramsMap){
		return corporateInfoManageDao.requestAprvStts(paramsMap);
	}
	
	// 팝업옵션 - 시도(전체)
	@Override
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap){
		return corporateInfoManageDao.selectCtpvNm(paramsMap);
	}

	// 팝업옵션 - 시군구(전체)
	@Override
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return corporateInfoManageDao.selectSggNm(paramsMap);
	}
	
	// 팝업옵션 - 사업소종류(선택)
	@Override
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return corporateInfoManageDao.selectBzmnSe(paramsMap);
	}
	
	// 팝업옵션 - 상위 사업자번호
	@Override
	public List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap) {
		return corporateInfoManageDao.selectUpBrno(paramsMap);
	}
	
	// 팝업옵션 - 영업상태(전체)
	@Override
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap) {
		return corporateInfoManageDao.searchBsnStts(paramsMap);
	}
	
	// 상세보기 - 승인
	@Override
	public List<Map<String, Object>> approveBtn(Map<String, Object> paramsMap) {
		paramsMap.put("approveSn", getUserSn());
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		return corporateInfoManageDao.approveBtn(paramsMap);
	}
	// 상세보기 - 반려
	@Override
	public List<Map<String, Object>> rejectBtn(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		return corporateInfoManageDao.rejectBtn(paramsMap);
	}
	// 상세보기 - 장기미접속해제
	@Override
	public List<Map<String, Object>> disconnBtn(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		return corporateInfoManageDao.disconnBtn(paramsMap);
	}
	// 상세보기 - 삭제
	@Override
	public List<Map<String, Object>> deleteBtn(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		return corporateInfoManageDao.deleteBtn(paramsMap);
	}
}
