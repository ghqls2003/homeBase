package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class CarManageDao extends CmmnAbstractMapper {
	
    //차량정보 조회
    public List<Map<String, Object>> selectCarList(Map<String, Object> paramsMap) throws RimsException {
        return selectList("sys.carManage.carList", paramsMap);
    }
    
    public int selectCarListCnt(Map<String, Object> paramsMap) throws RimsException {
    	return selectOne("sys.carManage.carListCnt", paramsMap);
    }
    
    //결함정보 조회
    public List<Map<String, Object>> selectDefectList(Map<String, Object> paramsMap) {
    	return selectList("sys.carManage.defectList", paramsMap);
	}

	public int selectDefectListCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.carManage.defectListCnt", paramsMap);
	}

    //시도
    public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.carManage.ctpvNm", paramsMap);
	}

    //시군구
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.carManage.sggNm", paramsMap);
	}
	
	//시도 시군구 이름만
	public Map<String, Object> selectCtpvSggNm(Map<String, Object> paramsMap) {
		return selectOne("sys.carManage.ctpvSggNm", paramsMap);
	}
	
	//차량 수정
    public void updateCar(Map<String, Object> paramsMap) {
    	update("sys.carManage.updateCar", paramsMap);
    }
	
	public List<Map<String, Object>> selectExcel(Map<String, Object> paramsMap) {
    	return selectList("sys.carManage.excel", paramsMap);
    }
	
	
	 //차량 등록
    public void insertCar(Map<String, Object> paramsMap) {
    	insert("sys.carManage.insertCar", paramsMap);
	}

    //차량 삭제
    public void deleteCar(Map<String, Object> paramsMap) {
    	delete("sys.carManage.deleteCar", paramsMap);
	}
    
	//회사리스트
	public List<Map<String, Object>> selectCompanyList(Map<String, Object> paramsMap) {
		return selectList("sys.carManage.selectCompanyList", paramsMap);
	}

	public int selectCompanyListCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.carManage.selectCompanyListCnt", paramsMap);
	}

	//중복확인
	public int selectDuplicChk(Map<String, Object> paramsMap) {
		return selectOne("sys.carManage.selectDuplicChk", paramsMap);
	}

	public void insertExcelCar(Map<String, Object> paramsMap) {
		insert("sys.carManage.insertExcelCar", paramsMap);
	}

	public int selectMatchChk(Map<String, Object> paramsMap) {
		return selectOne("sys.carManage.selectMatchChk", paramsMap);
	}

	public int insertBookmark(Map<String, Object> paramsMap) {
		return insert("sys.carManage.insertBookmark", paramsMap);
	}

	public int deleteBookmark(Map<String, Object> paramsMap) {
		return update("sys.carManage.deleteBookmark", paramsMap);
	}
}
