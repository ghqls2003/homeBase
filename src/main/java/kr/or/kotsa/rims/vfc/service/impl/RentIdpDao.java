package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class RentIdpDao extends CmmnAbstractMapper{
	
	public List<Map<String, Object>> selectRentIdpList(Map<String, Object> paramsMap) {
		return selectList("vfc.rentIdp.selectRentIdpList", paramsMap);
	}

	public int selectRentIdpListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentIdp.selectRentIdpListCnt", paramsMap);

	}
	
	public List<Map<String, Object>> selectDetailRentInfo(Map<String, Object> paramsMap) {
		return selectList("vfc.rentIdp.detailRentInfo", paramsMap);
	}
	
	
	public int updateRentInfo(Map<String, Object> paramsMap) {
		return update("vfc.rentIdp.updateRentInfo", paramsMap);
	}
	
	public List<Map<String, Object>> selectCarList(Map<String, Object> paramsMap) {
		return selectList("vfc.rentIdp.CarList", paramsMap);
	}

	public int selectCarListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentIdp.CarListCnt", paramsMap);
	}
	
	public int selectHisDetailRentInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentIdp.HisDetailRentInfoCnt", paramsMap);
	}
	
	public Map<String, Object> selectRentMtInfo(String rentNo) {
		return selectOne("vfc.rentIdp.RentMtInfo", rentNo);
	}

	public int updateDeleteYn(Map<String, Object> paramsMap) {
		return update("vfc.rentIdp.updateDeleteYn", paramsMap);
	}
	
	public int insertRentReg(Map<String, Object> paramsMap) {
		return insert("vfc.rentIdp.insertRentReg", paramsMap);
	}
	
	public int insertConfData(Map<String, Object> paramsMap) {
		return insert("vfc.rentIdp.insertConfData", paramsMap);
	}
	
	public String selectBzmnSeCd(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentIdp.BzmnSeCd", paramsMap);
	}
	

}
