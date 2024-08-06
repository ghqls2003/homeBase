package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface CmmnCdService {

	//공통코드 관리 조회
	public Map<String, Object> selectCmmnCdList(Map<String, Object> paramsMap) throws RimsException;

	//그룹명
	public List<Map<String, Object>> selectCdGroupNm(Map<String, Object> paramsMap) throws RimsException;

	//공통코드 등록
	public String insertCmmnCd(Map<String, Object> paramsMap);

	//공통코드 수정
	public String updateCmmnCd(Map<String, Object> paramsMap);

	//공통코드 삭제
	public String updateDeleteCmmnCd(Map<String, Object> paramsMap);

}