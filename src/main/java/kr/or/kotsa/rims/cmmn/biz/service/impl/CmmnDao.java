package kr.or.kotsa.rims.cmmn.biz.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class CmmnDao extends CmmnAbstractMapper {

	/**
	 * 코드 목록 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectCommonCodeList(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectCommonCodeList", paramsMap);
	}

	/**
	 * 멀티 코드 목록 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectMultiCodeList(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectMultiCodeList", paramsMap);
	}

	/**
	 * 지사 목록 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectBrffcCodeList(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectBrffcCodeList", paramsMap);
	}

	/**
	 * 파일 업로드 등록
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public int getAtchFileSn() throws RimsException {
		return selectOne("cmmn.getAtchFileSn");
	}

    /**
     * 파일 업로드 등록
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> insertFileUpload(Map<String, Object> paramsMap) throws RimsException {
    	Map<String, Object> result = new HashMap<>();
        	insert("cmmn.file.insertFileUpload", paramsMap);
        	result.put("fileSn", paramsMap.get("file_sn"));
        	System.out.println("paramsMapparamsMap : " + paramsMap);
        return result;
    }

    /**
     * 암호화 파일 업로드 등록
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> insertEncryptFileUpload(Map<String, Object> paramsMap) throws RimsException {
    	Map<String, Object> result = new HashMap<>();
        	insert("cmmn.file.insertEncryptFileUpload", paramsMap);
        	result.put("fileSn", paramsMap.get("file_sn"));
        	System.out.println("paramsMapparamsMap : " + paramsMap);
        return result;
    }

    /**
     * 파일 업로드 등록
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public int insertFileUploadInt(Map<String, Object> paramsMap) throws RimsException {
        return insert("cmmn.insertFileUpload", paramsMap);
    }

    /**
     * 파일 데이터 조회(atchFileSn)
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	public Map<String, Object> selectFileInfoByAtchFileSn(int atchFileSn) throws RimsException {
		return selectOne("cmmn.selectFileInfoByAtchFileSn", atchFileSn);
	}

    /**
     * 파일 데이터 조회2(atchFileSn, fileName)
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	public Map<String, Object> selectFileInfo(Map<String, Object> paramsMap) throws RimsException {
		return selectOne("cmmn.file.selectFileInfo", paramsMap);
	}

	/**
	 * 파일 데이터 조회2(atchFileSn, fileName)
	 * @param atchFileSn
	 * @return
	 * @throws RimsException
	 */
	public Map<String, Object> selectFileInfo2(int atchFileSn, String atchFileNm) throws RimsException {
		Map<String, Object> paraMap = new HashMap<>();
		paraMap.put("atchmnflSn", atchFileSn);
		paraMap.put("atchmnflNm", atchFileNm);
		return selectOne("cmmn.file.selectFileInfo2", paraMap);
	}

	  /**
     * 암호화 파일 데이터 조회(atchFileSn, fileName)
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	public Map<String, Object> selectEncryptFileInfo(Map<String, Object> paramsMap) throws RimsException {
		return selectOne("cmmn.file.selectEncryptFileInfo", paramsMap);
	}

	/**
	 * 지역 코드 리스트 (시도)
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectAreaSidoList(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectAreaSidoList", paramsMap);
	}

	/**
	 * 지역 코드 리스트 (시/군/구)
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectAreaSignguList(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectAreaSignguList", paramsMap);
	}

	/**
	 * 지역 코드 리스트 (읍/면/동)
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectAreaEmdList(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectAreaEmdList", paramsMap);
	}

	/**
	 * 진입금지구역 목록 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectZoneCdInfo(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectZoneCdInfo", paramsMap);
	}

	/**
	 * 진입제한구역 목록
	 * @return
	 * @throws RimsException
	 */
	public List<Object> selectZoneInfo(Map<String, Object> paramsMap) throws RimsException {
		return selectList("cmmn.selectZoneInfo", paramsMap);
	}

	/**
	 * 권한 목록
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectAuthTypeList() throws RimsException{
		return selectList("pt.main.selectAuthTypeList");
	}

	/**
	 * 소속 목록
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectBelongTypeList(Map<String, Object> paramsMap) throws RimsException{
		return selectList("pt.main.selectBelongTypeList");
	}

	public List<Map<String, Object>> getCmmCode(Map<String, Object> paramsMap) {
	  return selectList("cmmn.getCmmCode", paramsMap);
	 }

	/**
	 * 물질 목록
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> getMttrList(Map<String, Object> paramsMap) {
		return selectList("cmmn.getMttrList", paramsMap);
	}

    /** 물질 목록 */
    public List<Map<String, Object>> readMttrList(Map<String, Object> paramsMap) throws RimsException {
        return selectList("cmmn.selectMttrList", paramsMap);
    }

    /** 물질 건수 */
    public int readMttrCnt(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("cmmn.selectMttrCnt", paramsMap);
    }

    /** 파일 삭제 */
	public int deleteFile(Map<String, Object> paramsMap) {
		return delete("cmmn.file.deleteFile", paramsMap);
	}

	// 페이지명 db 조회 기능
    public List<Map<String, Object>> findTableNameByUrl(Map<String, Object> paramsMap) {
		return selectList("cmmn.common.findTableNameByUrl", paramsMap);
    }

    //개인정보 식별여부
	public Object selectPrvYn(Map<String, Object> paramsMap) {
		return selectList("cmmn.common.selectPrvYn", paramsMap);
	}

	//사용자 전환 리스트
	public Object trnsprtUserList(Map<String, Object> paramsMap) {
		return selectList("cmmn.common.selectTrnsprtUserList", paramsMap);
	}

	// 인증서 등록
	public void insertCert(Map<String, Object> paramsMap) {
		insert("cmmn.common.insertCert", paramsMap);
	}
}
