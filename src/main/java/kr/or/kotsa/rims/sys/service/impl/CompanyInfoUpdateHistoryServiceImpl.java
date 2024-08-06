package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.CompanyInfoUpdateHistoryService;

@Service
public class CompanyInfoUpdateHistoryServiceImpl extends CmmnAbstractServiceImpl implements CompanyInfoUpdateHistoryService	 {

	@Autowired
	private CompanyInfoUpdateHistoryDao companyInfoUpdateHistoryDao;

	// 검색옵션 - 시도(전체)
	@Override
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap){
		return companyInfoUpdateHistoryDao.selectCtpvNm(paramsMap);
	}

	// 검색옵션 - 시군구(전체)
	@Override
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return companyInfoUpdateHistoryDao.selectSggNm(paramsMap);
	}

	// 검색옵션 - 영업상태(전체)
	@Override
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap) {
		return companyInfoUpdateHistoryDao.searchBsnStts(paramsMap);
	}

	// 사업자 정보 갱신 이력 그리드
	@Override
	public Map<String, Object> selectCompanyHistoryInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = companyInfoUpdateHistoryDao.selectCompanyHistoryInfoCnt(paramsMap);
		List<Map<String, Object>> data = companyInfoUpdateHistoryDao.selectCompanyHistoryInfo(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}

	// 상세팝업 정보
	@Override
	public Map<String, Object> selectDetailInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = companyInfoUpdateHistoryDao.selectmdfCnt(paramsMap); // 수정된 갯수
		List<Map<String, Object>> data = companyInfoUpdateHistoryDao.selectDetailInfo(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}
}
