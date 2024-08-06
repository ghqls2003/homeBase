package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class RentalHistManageDao extends CmmnAbstractMapper {

	public List<Map<String, Object>> selectRentalHistList(Map<String, Object> paramsMap) {
		return selectList("vfc.rentalHistManage.RentalHistList", paramsMap);
	}
	
	public String selectBzmnSeCd(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentalHistManage.BzmnSeCd", paramsMap);
	}

	public int selectRentalHistListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentalHistManage.RentalHistListCnt", paramsMap);
	}

	public List<Map<String, Object>> selectCarList(Map<String, Object> paramsMap) {
		return selectList("vfc.rentalHistManage.CarList", paramsMap);
	}

	public int selectCarListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentalHistManage.CarListCnt", paramsMap);
	}

	public int insertRentReg(Map<String, Object> paramsMap) {
		return insert("vfc.rentalHistManage.insertRentReg", paramsMap);
	}

	public int insertRentRegHs(Map<String, Object> paramsMap) {
		return insert("vfc.rentalHistManage.insertRentRegHs", paramsMap);
	}
	
	public List<Map<String, Object>> selectIssuedData(Map<String, Object> paramsMap) {
		return selectList("vfc.rentalHistManage.IssuedData", paramsMap);
	}

	/* 대여이력 상세 */
	public List<Map<String, Object>> selectDetailRentInfo(Map<String, Object> paramsMap) {
		return selectList("vfc.rentalHistManage.DetailRentInfo", paramsMap);
	}
	
	public List<Map<String, Object>> selectDetailVerfInfo(Map<String, Object> paramsMap) {
		return selectList("vfc.rentalHistManage.DetailVerfInfo", paramsMap);
	}

	public int updateRentInfo(Map<String, Object> paramsMap) {
		return update("vfc.rentalHistManage.updateRentInfo", paramsMap);
	}

	public int insertRentInfo(Map<String, Object> paramsMap) {
		return update("vfc.rentalHistManage.insertRentInfo", paramsMap);
	}

	public int insertConfData(Map<String, Object> paramsMap) {
		return insert("vfc.rentalHistManage.insertConfData", paramsMap);
	}

	public int updateDeleteYn(Map<String, Object> paramsMap) {
		return update("vfc.rentalHistManage.updateDeleteYn", paramsMap);
	}

	public int insertRentHisInfo1(Map<String, Object> paramsMap) {
		return insert("vfc.rentalHistManage.insertRentHisInfo1", paramsMap);
	}
	public int insertRentHisInfo2(Map<String, Object> paramsMap) {
		return insert("vfc.rentalHistManage.insertRentHisInfo2", paramsMap);
	}
	
//  이건 쿼리에 없는데??
//	public Map<String, Object> selectRentInfo(String rentNo) {
//		return selectOne("vfc.rentalHistManage.RentInfo", rentNo);
//	}

	public Map<String, Object> selectRentMtInfo(String rentNo) {
		return selectOne("vfc.rentalHistManage.RentMtInfo", rentNo);
	}

	public List<Map<String, Object>> selectRentHsInfo(String rentNo) {
		return selectList("vfc.rentalHistManage.RentHsInfo", rentNo);
	}

	public List<Map<String, Object>> selectHisDetailRentInfo(Map<String, Object> paramsMap) {
		return selectList("vfc.rentalHistManage.HisDetailRentInfo", paramsMap);
	}

	public int selectHisDetailRentInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rentalHistManage.HisDetailRentInfoCnt", paramsMap);
	}
}
