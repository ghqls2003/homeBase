package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class drvRsvMagDao extends CmmnAbstractMapper {

	public List<Map<String, Object>> selectRsvList(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.RentalHistList", paramsMap);
	}

	public int selectRsvListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drvRsvMag.RentalHistListCnt", paramsMap);
	}

	public int insertRsv(Map<String, Object> paramsMap) {
		return insert("vfc.drvRsvMag.insertRsv", paramsMap);
	}

	public int updateRsv(Map<String, Object> paramsMap) {
		return update("vfc.drvRsvMag.updateRsv", paramsMap);
	}

	public int deleteRsv(Map<String, Object> paramsMap) {
		return update("vfc.drvRsvMag.deleteRsv", paramsMap);
	}

	public List<Map<String, Object>> selectSearchRentNo(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.SearchRentNo", paramsMap);
	}
	public  List<Map<String, Object>> selectDlnFind(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.DlnFind", paramsMap);
	}

	public int selectSearchRentNoCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drvRsvMag.SearchRentNoCnt", paramsMap);
	}
	
	public List<Map<String, Object>> selectRsvNoList(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.RsvNoList", paramsMap);
	}

	public int selectRsvNoListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drvRsvMag.RsvNoListCnt", paramsMap);
	}
	public Object selectPeriodCd(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.PeriodCd", paramsMap);
	}
	public Object selectLncdDrop(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.LncdDrop", paramsMap);
	}
	public List<Map<String, Object>> selectdetailRsv(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.selectdetailRsv", paramsMap);
	}
	public List<Map<String, Object>> selectCheckRentNo(Map<String, Object> paramsMap) {
		return selectList("vfc.drvRsvMag.CheckRentNo", paramsMap);
	}
}
