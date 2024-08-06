package kr.or.kotsa.rims.sys.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface CarManageService {

    //차량정보 조회
    public Map<String, Object> selectCarList(Map<String, Object> paramsMap) throws RimsException;
    
    /**
	 * 엑셀 다운로드 스트리밍 건수 조회
	 */
    public int selectCarListCnt(Map<String, Object> paramsMap) throws RimsException;

    //차량 등록
  	public String insertCar(Map<String, Object> paramsMap);

  	//차량 수정
  	public String updateCar(Map<String, Object> paramsMap);

  	//차량 삭제
  	public String deleteCar(Map<String, Object> paramsMap);

    //시도
    List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap);

  	//시군구
    List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap);
    
	//시도 시군구 이름만
    Map<String, Object> selectCtpvSggNm(Map<String, Object> paramsMap);
    
    //결함정보 조회
    public Object selectDefectList(Map<String, Object> paramsMap);
    
    //엑셀 다운
    public List<Map<String, Object>> selectExcelCarList(Map<String, Object> paramsMap) throws RimsException;
    
    //엑셀 다운 스트리밍
    public void selectExcelStream(Map<String, Object> paramsMap, HttpServletResponse response) throws RimsException, IOException;

    
    //회사리스트
    Map<String, Object> selectCompanyList(Map<String, Object> paramsMap);

    //중복확인
	public Object selectDuplicChk(Map<String, Object> paramsMap);

	public void insertExcelCar(Map<String, Object> paramsMap);

	public int selectMatchChk(Map<String, Object> paramsMap);

	public Map<String, Object> insertBookmark(Map<String, Object> paramsMap);

	public Map<String, Object> deleteBookmark(Map<String, Object> paramsMap);
	
}