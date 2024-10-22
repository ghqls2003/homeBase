package kr.or.kotsa.rims.vfc.service.impl;

import java.util.HashMap;
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
	@Autowired
	private DriveDao driveDao;	
	
	@Override
	public List<Map<String, Object>> selectRentInfo(Map<String, Object> paramsMap) throws RimsException {
		return contactlessVfcDao.selectRentInfo(paramsMap);
	}

	@Override
	public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		Map<String, Object> rentNo = driveDao.selectRentNo(paramsMap);
		Map<String, Object> vin = driveDao.selectVin(paramsMap);

		result.putAll(rentNo);
		paramsMap.putAll(rentNo);
		result.put("code", driveDao.selectVerifyCd(paramsMap));
		if(vin != null) {
			paramsMap.putAll(vin);
			result.putAll(selectDefectList(paramsMap));
		}
		
		result.putAll(selectEtcInfo(paramsMap));
		return result;
	}
	
	// 대여정보 검증이력번호 업데이트
	public void updateVrfcSn(Map<String, Object> paramsMap) {
		contactlessVfcDao.updateVrfcSn(paramsMap);
	}

	//운전자격 확인 결과
	public Map<String, Object> selectEtcInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		//대여이력 건수
		int rentCnt = driveDao.selectRentCnt(paramsMap);
		result.put("rentCnt", rentCnt);
		// 최근 7일 운전자격이력 건수
		int VfcHistCnt = driveDao.selectVfcHistCnt(paramsMap);
		result.put("VfcHistCnt", VfcHistCnt);


		if(rentCnt > 0) {
			paramsMap.put("rentCnt", rentCnt);
			paramsMap.put("typeCd", "1");
			paramsMap.put("rsltCd", "1");

			//운전자격검증 부가정보 등록
			insertEtcInfo(paramsMap);
		} else if(rentCnt == 0) {
			paramsMap.put("rentCnt", rentCnt);
			paramsMap.put("typeCd", "1");
			paramsMap.put("rsltCd", "2");

			//운전자격검증 부가정보 등록
			insertEtcInfo(paramsMap);
		}
		return result;
	}	
	
	//운전자격검증 부가정보 등록
	public void insertEtcInfo(Map<String, Object> paramsMap) {
		driveDao.insertEtcInfo(paramsMap);
	}	


	//결함정보 조회
	public Map<String, Object> selectDefectList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list  = driveDao.selectDefectList(paramsMap);
		int total = driveDao.selectDefectListCnt(paramsMap);
		result.put("data", list);
		result.put("total", total);

		return result;
	}	
	
}
