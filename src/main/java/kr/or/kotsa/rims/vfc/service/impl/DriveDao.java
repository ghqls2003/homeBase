package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class DriveDao extends CmmnAbstractMapper {

    //차량정보 조회
    public List<Map<String, Object>> selectCarList(Map<String, Object> paramsMap) throws RimsException {
        return selectList("vfc.drive.selectCarList", paramsMap);
    }

    public int selectCarListCnt(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("vfc.drive.selectCarListCnt", paramsMap);
    }

    //운전자격 확인 코드
	public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap) {
		return selectOne("vfc.drive.selectVerifyCd", paramsMap);
	}

	public Map<String, Object> selectRentNo(Map<String, Object> paramsMap) {
		return selectOne("vfc.drive.selectRentNo", paramsMap);
	}

	//대여정보 등록
	public void insertRentInfo(Map<String, Object> paramsMap) {
		insert("vfc.drive.insertRentInfo", paramsMap);
	}

	public void insertRentHstryInfo(Map<String, Object> paramsMap) {
		insert("vfc.drive.insertRentHstryInfo", paramsMap);
	}

	//대여처리
	public void updateRentSttsCd(Map<String, Object> paramsMap) {
		update("vfc.drive.updateRentSttsCd", paramsMap);
	}

	//대여이력 수
	public int selectRentCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drive.selectRentCnt", paramsMap);
	}

	//차대번호
    public Map<String, Object> selectVin(Map<String, Object> paramsMap) {
    	return selectOne("vfc.drive.selectVin", paramsMap);
	}

	//결함정보 조회
    public List<Map<String, Object>> selectDefectList(Map<String, Object> paramsMap) {
    	return selectList("vfc.drive.selectDefectList", paramsMap);
	}

	public int selectDefectListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drive.selectDefectListCnt", paramsMap);
	}

	//운전자격검증 부가정보 등록
	public void insertEtcInfo(Map<String, Object> paramsMap) {
		insert("vfc.drive.insertEtcInfo", paramsMap);
	}

	//지역 코드
	public List<Map<String, Object>> selectAreaCd(Map<String, Object> paramsMap) {
		return selectList("vfc.drive.selectAreaCd", paramsMap);
	}

	//법인번호 조회
	public List<Map<String, Object>> selectCrno(Map<String, Object> paramsMap) {
		return selectList("vfc.drive.selectCrno", paramsMap);
	}

	// 해당 코드에 대한 공통코드 테이블에서 메시지 가져오기
	public List<Map<String, Object>> getRtnMsg(Map<String, Object> paramsMap) {
		return selectList("vfc.drive.getRtnMsg", paramsMap);
	}

 	// 운전자격이력 건수(팝업에 뜨는건 이거 사용함)
	public int selectVfcHistCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drive.selectVfcHistCnt", paramsMap);
	}


	// 대여처리시 운전자격이력에 대여유형 업데이트
	public void updateRentType(Map<String, Object> paramsMap) {
		update("vfc.drive.updateRentType", paramsMap);
	}

	// 면허번호에 해당하는 최근 7일간의 대여이력 조회 24.10.25 jeonghyewon
	public List<Map<String, Object>> drvListView(Map<String, Object> paramsMap) {
		return selectList("vfc.drive.drvListView", paramsMap);
	}

	// 면허번호에 해당하는 최근 7일간의 대여이력 조회 건수 24.10.25 jeonghyewon
	public int drvListViewCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.drive.drvListViewCnt", paramsMap);
	}

}
