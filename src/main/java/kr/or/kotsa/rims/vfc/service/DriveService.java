package kr.or.kotsa.rims.vfc.service;

import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

import java.util.List;

public interface DriveService {

    //차량정보 조회
    public Map<String, Object> selectCarList(Map<String, Object> paramsMap) throws RimsException;

    //운전자격 확인 코드
	public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap) throws RimsException;

	//대여처리
	public String updateRentSttsCd(Map<String, Object> paramsMap);

	//지역 코드
	public List<Map<String, Object>> selectAreaCd(Map<String, Object> paramsMap);

	//모바일신분증 - QR생성
	public String start(Map<String, Object> paramsMap);

	//모바일신분증 - Profile 요청
	public String getProfile(Map<String, Object> m310);

	//모바일신분증 - VP 검증
	public Boolean verifyVP(Map<String, Object> m400);

	 //모바일신분증 - 오류 전송
	public void sendError(Map<String, Object> paramsMap);

	//법인번호 조회
	public List<Map<String, Object>> selectCrno(Map<String, Object> paramsMap);

	// 해당 코드에 대한 공통코드 테이블에서 메시지 가져오기
	List<Map<String, Object>> getRtnMsg(Map<String, Object> paramsMap);

	// 면허번호에 해당하는 최근 7일간의 운전자격확인이력 조회 24.10.25 jeonghyewon
	List<Map<String, Object>> drvListView(Map<String, Object> paramsMap);

	// 면허번호에 해당하는 최근 7일간의 운전자격확인이력 조회 건수 24.10.25 jeonghyewon
	int drvListViewCnt(Map<String, Object> paramsMap);

	// 해당 법인 차량 및 결함 유무 조회  24.11.05 jeonghyewon
	Object selectBzmnCarAndDefectedCarInfo(Map<String, Object> paramsMap) throws RimsException;

	// S권한 일 경우만 법인번호 가져오기 24.11.06 jeonghyewon
	public String selectCorpNumIfSAuthrtCd(Map<String, Object> paramsMap);

	// 해당 차량 결함정보 상세팝업 출력  24.11.26 jeonghyewon
	Map<String, Object> selectDefectList(Map<String, Object> paramsMap);

	// 해당 차량 상세 조회 :24.11.26 jeonghyewon
	Map<String, Object> selectDetailCarList(Map<String, Object> paramsMap) throws RimsException;
}