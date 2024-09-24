package kr.or.kotsa.rims.vfc.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.drvRsvMagService;

@Service
public class drvRsvMagServiceImpl extends CmmnAbstractServiceImpl implements drvRsvMagService {
	
	@Autowired
	private drvRsvMagDao rentalHistManageDao;


	@Override
	public Object selectRsvList(Map<String, Object> paramsMap){
		Map<String, Object> result = new HashMap<>();
		
//		String bzauthCd =  rentalHistManageDao.selectBzmnSeCd(paramsMap);
		
//		paramsMap.put("bzauthCd", bzauthCd);
		
		List<Map<String, Object>> list = rentalHistManageDao.selectRsvList(paramsMap);
		int total = rentalHistManageDao.selectRsvListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}
	@Override
	public Object selectRsvNoList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> list = rentalHistManageDao.selectRsvNoList(paramsMap);
		int total = rentalHistManageDao.selectRsvNoListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}
	
	
	@Override
	public Object selectSearchRentNo(Map<String, Object> paramsMap){
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = rentalHistManageDao.selectSearchRentNo(paramsMap);
		int total = rentalHistManageDao.selectSearchRentNoCnt(paramsMap);
		result.put("data", list);
		result.put("total", total);
		return result;
	}
//	@Override
//	public int insertRsv(Map<String, Object> paramsMap) {
//		return rentalHistManageDao.insertRsv(paramsMap);
//	}

	@Override
	public int insertRsv(Map<String, Object> paramsMap) {
	    // startDt와 periodRsv 추출
	    String startDtStr = (String) paramsMap.get("startDt");
	    LocalDateTime nextStartDt;
	    String periodRsv = (String) paramsMap.get("periodRsv");
	    String rentNoFind = (String) paramsMap.get("rentNo");
	        
	        LocalDateTime startDt = LocalDateTime.parse(startDtStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

	    // 기간에 따라 날짜 추가
	    if ("1".equals(periodRsv)) {
	    	nextStartDt = startDt.plusWeeks(1);
	    } else if ("2".equals(periodRsv)) {
	    	nextStartDt = startDt.plusDays(15);
	    } else if ("3".equals(periodRsv)) {
	    	nextStartDt = startDt.plusMonths(1);
	    } else {
	        throw new IllegalArgumentException("Invalid periodRsv: " + periodRsv);
	    }

	    // 수정된 시작일을 paramsMap에 추가
	    paramsMap.put("nextStartDt", startDt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
	    paramsMap.put("rgtrSn", getUserSn());
	    paramsMap.put("rgtrIp", getClientIP());
	    
	    // insertRsv 호출
	    return rentalHistManageDao.insertRsv(paramsMap);
	}






	@Override
	public int updateRsv(Map<String, Object> paramsMap) {
		return rentalHistManageDao.updateRsv(paramsMap);
	}
	@Override
	public int deleteRsv(Map<String, Object> paramsMap) {
		return rentalHistManageDao.deleteRsv(paramsMap);
	}
	@Override
	public Object selectPeriodCd(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectPeriodCd(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectdetailRsv(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectdetailRsv(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectCheckRentNo(Map<String, Object> paramsMap) {
		return rentalHistManageDao.selectCheckRentNo(paramsMap);
	}
}
