package kr.or.kotsa.rims.vfc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.RentalHistManageService;

@Service
public class RentalHistManageServiceImpl extends CmmnAbstractServiceImpl implements RentalHistManageService {
	
	@Autowired
	private RentalHistManageDao rentalHistManageDao;

	@Override
	public Object selectRentalHistList(Map<String, Object> paramsMap){
		Map<String, Object> result = new HashMap<>();
		
		String bzauthCd =  rentalHistManageDao.selectBzmnSeCd(paramsMap);
		
		paramsMap.put("bzauthCd", bzauthCd);
		
		List<Map<String, Object>> list = rentalHistManageDao.selectRentalHistList(paramsMap);
		int total = rentalHistManageDao.selectRentalHistListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}

	@Override
	public List<Map<String, Object>> selectRentalHistListEx(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectRentalHistList(paramsMap);
	}
	
	@Override
	public int selectRentalHistListCnt(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectRentalHistListCnt(paramsMap);
	}

	@Override
	public Object selectCarList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> list = rentalHistManageDao.selectCarList(paramsMap);
		int total = rentalHistManageDao.selectCarListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}

	@Override
	public int insertRentReg(Map<String, Object> paramsMap) {
		return rentalHistManageDao.insertRentReg(paramsMap);
	}
	
	@Override
	public int insertRentRegHs(Map<String, Object> paramsMap) {
		return rentalHistManageDao.insertRentRegHs(paramsMap);
	}

	/* 대여이력 상세 */
	@Override
	public List<Map<String, Object>> selectDetailRentInfo(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectDetailRentInfo(paramsMap);
	}
	
	@Override
	public List<Map<String, Object>> selectIssuedData(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectIssuedData(paramsMap);
	}

	@Override
	public int updateRentInfo(Map<String, Object> paramsMap) {
		paramsMap.put("IP", getClientIP());
		paramsMap.put("userSn", getUserSn());
		return rentalHistManageDao.updateRentInfo(paramsMap);
	}

	@Override
	public int insertRentInfo(Map<String, Object> paramsMap) {
		return rentalHistManageDao.insertRentInfo(paramsMap);
	}

	@Override
	public int insertRentHisInfo(Map<String, Object> paramsMap) {

		//이전 데이터 가지고 오기
		Map<String, Object> beforeMtData = rentalHistManageDao.selectRentMtInfo((String) paramsMap.get("rentNo"));
		//대여정보이력테이블에 그 전에 데이터가 있는지 확인
		List<Map<String, Object>> beforeHsData = rentalHistManageDao.selectRentHsInfo((String) paramsMap.get("rentNo"));

		beforeMtData.put("userSn", getUserSn());
		beforeMtData.put("IP", getClientIP());

		if(beforeHsData.size() != 0){
			return rentalHistManageDao.insertRentHisInfo1(beforeMtData);
		}else{
			return rentalHistManageDao.insertRentHisInfo2(beforeMtData);
		}
	}

	@Override
	public int insertConfData(Map<String, Object> paramsMap) {
		return rentalHistManageDao.insertConfData(paramsMap);
	}

	@Override
	public int updateDeleteYn(Map<String, Object> paramsMap) {
		return rentalHistManageDao.updateDeleteYn(paramsMap);
	}

	@Override
	public Map<String, Object> selectHisDetailRentInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = rentalHistManageDao.selectHisDetailRentInfoCnt(paramsMap);
		List<Map<String, Object>> data = rentalHistManageDao.selectHisDetailRentInfo(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}


}
