package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class ContactlessVfcDao extends CmmnAbstractMapper {
    public List<Map<String, Object>> selectRentInfo(Map<String, Object> paramsMap) throws RimsException {
        return selectList("vfc.contactlessVfc.selectRentInfo", paramsMap);
    }
    
	// 대여정보 검증이력번호 업데이트
	public void updateVrfcSn(Map<String, Object> paramsMap) {
		update("vfc.contactlessVfc.updateVrfcSn", paramsMap);
	}
}
