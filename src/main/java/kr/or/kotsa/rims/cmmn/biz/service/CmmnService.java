package kr.or.kotsa.rims.cmmn.biz.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface CmmnService {

    /** 공통 코드 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public List<Map<String, Object>> selectCommonCodeList(Map<String, Object> paramsMap) throws RimsException;

    /**
     * 지사 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectBrffcCodeList(Map<String, Object> paramsMap) throws RimsException;

    /**
     * 파일 업로드
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public Map<String, Object> insertFileUpload(MultipartFile multipartFile, Map<String, Object> paramsMap) throws RimsException;

	/**
     * 암호화 파일 업로드
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public Map<String, Object> insertEncryptFileUpload(MultipartFile multiPartFile, byte[] encryptedFile, Map<String, Object> paramsMap) throws RimsException;

    /**
     * 파일 데이터 조회(파일일련번호) - 현재 이미지 파일 조회에만 사용
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	public Map<String, Object> selectFileInfoByAtchFileSn(int atchFileSn) throws RimsException;

    /**
     * 파일 데이터 조회2(파일일련번호, 파일명)
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	public Map<String, Object> selectFileInfo(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 파일 데이터 조회get(파일일련번호, 파일명)
	 * @param atchFileSn
	 * @return
	 * @throws RimsException
	 */
	public Map<String, Object> selectFileInfo2(int atchFileSn, String atchFileNm) throws RimsException;

	/**
	 * 암호화 파일 데이터 조회(파일일련번호, 파일명)
	 * @param atchFileSn
	 * @return
	 * @throws RimsException
	 */
	public Map<String, Object> selectEncryptFileInfo(Map<String, Object> paramsMap) throws RimsException;


    /** 지역 코드 리스트 (시도)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public List<Map<String, Object>> selectAreaSidoList(Map<String, Object> paramsMap) throws RimsException;

    /** 지역 코드 리스트 (시/군/구)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public List<Map<String, Object>> selectAreaSignguList(Map<String, Object> paramsMap) throws RimsException;

    /** 지역 코드 리스트 (읍/면/동)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectAreaEmdList(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 진입금지구역 목록 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectZoneCdInfo(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 진입제한구역 목록
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Object> selectZoneInfo(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 권한 목록
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectAuthTypeList() throws RimsException;

	/**
	 * 소속 목록
	 * @return
	 * @throws RimsException1
	 */
	public List<Map<String, Object>> selectBelongTypeList(Map<String, Object> paramsMap) throws RimsException ;

	public List<Map<String, Object>> getCmmCode(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 물질 목록
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> getMttrList(Map<String, Object> paramsMap) throws RimsException;

    /**물질 목록 */
    List<Map<String, Object>> readMttrList(Map<String, Object> paramsMap) throws RimsException;

    /**물질 건수 */
    int readMttrCnt(Map<String, Object> paramsMap) throws RimsException;

    // 파일 삭제
	public Map<String, Object> deleteFile(Map<String, Object> paramsMap);


	// 페이지명 db 조회
	List<Map<String, Object>> findTableNameByUrl(Map<String, Object> s) throws RimsException;

	//개인정보 식별여부
	public Object selectPrvYn(Map<String, Object> paramsMap);
}
