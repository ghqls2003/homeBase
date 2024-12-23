package kr.or.kotsa.rims.cmmn.biz.service.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.biz.web.CmmnController;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.CommonUtil;

@Service
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
public class CmmnServiceImpl extends CmmnAbstractServiceImpl implements CmmnService {

    private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);
    @Value("${Globals.fileStorePath}")
    private String storePath;

    @Autowired
    private CmmnDao commonDao;

    /** 공통 코드 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectCommonCodeList(Map<String, Object> paramsMap) throws RimsException {
        return commonDao.selectCommonCodeList(paramsMap);
    }

    /** 지사 목록 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@Override
	public List<Map<String, Object>> selectBrffcCodeList(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.selectBrffcCodeList(paramsMap);
	}

    /** 파일업로드
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @Override
    public Map<String, Object> insertFileUpload(MultipartFile multipartFile, Map<String, Object> paramsMap) throws RimsException {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("success", false);

        if (!multipartFile.isEmpty()) {

        	if(CommonUtil.badFileExtIsReturnBoolean(multipartFile) == true) {
        		throw new RimsException();
        	}

            String pathname = storePath;

            Calendar cal = Calendar.getInstance(); // 오늘 날짜와 시간에 대한 객체 얻기

            String yStr  = String.valueOf(cal.get(Calendar.YEAR));					// 올해 년도 얻기
            String mStr  = String.format("%02d", cal.get(Calendar.MONTH) + 1);		// 현재 월 얻기 (월은 +1 해줘야함), 2자리로 표시
            String dStr  = String.format("%02d", cal.get(Calendar.DATE));			// 현재 일 얻기, 2자리로 표시
            String hStr  = String.format("%02d", cal.get(Calendar.HOUR_OF_DAY));	// 현재 시간(24시간 단위) 얻기, 2자리로 표시
            String miStr = String.format("%02d", cal.get(Calendar.MINUTE));			// 현재 분 얻기, 2자리로 표시
            String sStr  = String.format("%02d", cal.get(Calendar.SECOND));			// 현재 초 얻기, 2자리로 표시

            String dateTimeStr = yStr + mStr + dStr + hStr + miStr + sStr;
            String savePath = pathname + yStr + File.separator + mStr;
            savePath = CommonUtil.getFileXSS(savePath);

            File dir = new File(savePath);

    		//디렉토리 권한 설정
            dir.setExecutable(true, true);
    		dir.setReadable(true);
    		dir.setWritable(true, true);
//            dir.setExecutable(true, true); //실행
//            dir.setReadable  (true, true);  //읽기
//            dir.setWritable  (false, true);  //쓰기

            // 디렉토리가 존재하지 않으면 생성
            if (!dir.exists()) {
            	boolean success = dir.mkdirs();
            	if (!success) {
                    System.err.println("Failed to create the directory: " + dir);

                    return resultMap;
                }
            }

            String uuid = "BBS_" + dateTimeStr+UUID.randomUUID().toString().replaceAll("-", "");
            File serverFile = new File(dir.getAbsolutePath() + File.separator + uuid);

            paramsMap.put("actlFileNm", uuid);
            paramsMap.put("atchFileNm", multipartFile.getOriginalFilename());
            paramsMap.put("atchFileSz", multipartFile.getSize());
            paramsMap.put("atchFilePath", dir.getAbsolutePath());
            paramsMap.put("useYn", "Y");
            paramsMap.put("rgtrSn", getUserSn());
            paramsMap.put("regIp", getClientIP());

            Map<String, Object> fileSn = commonDao.insertFileUpload(paramsMap);
            if (fileSn != null) {
                try {
                    multipartFile.transferTo(serverFile);
                } catch (IOException e) {
                    throw new RimsException(e);
                }
                resultMap.put("success", true);
                resultMap.put("fileSn", fileSn.get("fileSn"));
            }
        }
        return resultMap;
    }
    /** 암호화 파일 업로드
     * @param paramsMap
     * @return
     * @throws RimsException
     * @author 정영훈
     */
    @Override
    public Map<String, Object> insertEncryptFileUpload(MultipartFile multiPartFile, byte[] encryptedFile, Map<String, Object> paramsMap) throws RimsException {
    	Map<String, Object> resultMap = new HashMap<>();
    	resultMap.put("success", false);

    	if (!multiPartFile.isEmpty()) {

    		if(CommonUtil.badFileExtIsReturnBoolean(multiPartFile) == true) {
    			throw new RimsException();
    		}

    		String pathname = storePath;

    		Calendar cal = Calendar.getInstance(); // 오늘 날짜와 시간에 대한 객체 얻기

    		String yStr = String.valueOf(cal.get(Calendar.YEAR)); // 올해 년도 얻기
    		String mStr = String.format("%02d", cal.get(Calendar.MONTH) + 1); // 현재 월 얻기 (월은 +1 해줘야함), 2자리로 표시
    		String dStr = String.format("%02d", cal.get(Calendar.DATE)); // 현재 일 얻기, 2자리로 표시
    		String hStr = String.format("%02d", cal.get(Calendar.HOUR_OF_DAY)); // 현재 시간(24시간 단위) 얻기, 2자리로 표시
    		String miStr = String.format("%02d", cal.get(Calendar.MINUTE)); // 현재 분 얻기, 2자리로 표시
    		String sStr = String.format("%02d", cal.get(Calendar.SECOND)); // 현재 초 얻기, 2자리로 표시

    		String dateTimeStr = yStr + mStr + dStr + hStr + miStr + sStr;
    		String savePath = pathname+yStr+"/"+mStr;

    		File dir = new File(savePath);

    		dir.setExecutable(true, true);
    		dir.setReadable(true);
    		dir.setWritable(true, true);
    		//디렉토리 권한 설정
//            dir.setExecutable(false, false); //실행
//            dir.setReadable  (false, true);  //읽기
//            dir.setWritable  (false, true);  //쓰기

            // 디렉토리가 존재하지 않으면 생성
            if (!dir.exists()) {
            	boolean success = dir.mkdirs();
            	if (!success) {
                    System.err.println("Failed to create the directory: " + dir);

                    return resultMap;
                }
            }

    		String uuid = "BBS_"+dateTimeStr+UUID.randomUUID().toString().replaceAll("-", "");
    		File serverFile = new File(dir.getAbsolutePath() + File.separator + uuid);

    		paramsMap.put("actlFileNm", uuid);
    		paramsMap.put("atchFileNm", multiPartFile.getOriginalFilename());
    		paramsMap.put("atchFileSz", multiPartFile.getSize());
    		paramsMap.put("atchFilePath", dir.getAbsolutePath());
    		paramsMap.put("useYn", "Y");
    		paramsMap.put("rgtrSn", getUserSn());
    		paramsMap.put("regIp", getClientIP());

    		Map<String, Object> fileSn = commonDao.insertEncryptFileUpload(paramsMap);
    		if (fileSn != null) {
    			FileOutputStream fos = null;

    			try {
    				fos = new FileOutputStream(serverFile);
    				fos.write(encryptedFile);
                    resultMap.put("success", true);
                    resultMap.put("fileSn", fileSn.get("fileSn"));
    			} catch (IOException e) {
    				throw new RimsException(e);
    			} finally {
    				try {
						fos.close();
					} catch (IOException e) {
						System.out.println("파일스트림을 닫는 중 IOException이 발생했습니다.");
					}
    			}
    		}
    	}
    	return resultMap;
    }

    /**
     * 파일 데이터 조회(파일일련번호) - 현재 이미지 파일 로더에서만 사용
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	@Override
	public Map<String, Object> selectFileInfoByAtchFileSn(int atchFileSn) throws RimsException {

		return commonDao.selectFileInfoByAtchFileSn(atchFileSn);

	}

    /**
     * 파일 데이터 조회2(파일일련번호, 파일명)
     * @param atchFileSn
     * @return
     * @throws RimsException
     */
	@Override
	public Map<String, Object> selectFileInfo(Map<String, Object> paramsMap) throws RimsException {

		return commonDao.selectFileInfo(paramsMap);
	}

	/**
	 * 파일 데이터 조회2(파일일련번호, 파일명)
	 * @param atchFileSn
	 * @return
	 * @throws RimsException
	 */
	@Override
	public Map<String, Object> selectFileInfo2(int atchFileSn, String atchFileNm) throws RimsException {

		return commonDao.selectFileInfo2(atchFileSn, atchFileNm);
	}

	/**
	 * 암호화 파일 데이터 조회(파일일련번호, 파일명)
	 * @param atchFileSn
	 * @return
	 * @throws RimsException
	 */
	@Override
	public Map<String, Object> selectEncryptFileInfo(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.selectEncryptFileInfo(paramsMap);
	}

    /** 지역 코드 리스트 (시도)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectAreaSidoList(Map<String, Object> paramsMap) throws RimsException {
        return commonDao.selectAreaSidoList(paramsMap);
    }

    /** 지역 코드 리스트 (시/군/구)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @Override
	public List<Map<String, Object>> selectAreaSignguList(Map<String, Object> paramsMap) throws RimsException {

		return commonDao.selectAreaSignguList(paramsMap);
	}

    /** 지역 코드 리스트 (동/읍)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@Override
	public List<Map<String, Object>> selectAreaEmdList(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.selectAreaEmdList(paramsMap);
	}

	/**
	 * 진입금지구역 목록 조희
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> selectZoneCdInfo(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.selectZoneCdInfo(paramsMap);
	}

	/**
	 * 진입제한구역 목록
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Object> selectZoneInfo(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.selectZoneInfo(paramsMap);
	}

    /**
     * 권한 목록
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectAuthTypeList() throws RimsException{
        return commonDao.selectAuthTypeList();

    }

    /**
     * 소속 목록
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> selectBelongTypeList(Map<String, Object> paramsMap) throws RimsException{
        return commonDao.selectBelongTypeList(paramsMap);
    }

    /*
     * 공통코드 정보조회
     */
    @Override
    public List<Map<String, Object>> getCmmCode(Map<String, Object> paramsMap) throws RimsException {
     return commonDao.getCmmCode(paramsMap);
    }

	/**
	 * 물질 목록
	 * @return
	 * @throws RimsException
	 */
	@Override
	public List<Map<String, Object>> getMttrList(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.getMttrList(paramsMap);
	}

    /**물질 목록 */
    @Override
    public List<Map<String, Object>> readMttrList(Map<String, Object> paramsMap) throws RimsException {
        return commonDao.readMttrList(paramsMap);
    }

    /**물질 건수 */
    @Override
    public int readMttrCnt(Map<String, Object> paramsMap) throws RimsException {
        return commonDao.readMttrCnt(paramsMap);
    }

    /**파일 삭제 */
	@Override
	public Map<String, Object> deleteFile(Map<String, Object> paramsMap) {
		 Map<String, Object> result = new HashMap<>();
		 result.put("success", false);
	 		int deleteBzFile = commonDao.deleteFile(paramsMap);
			if(deleteBzFile > 0) {
				result.put("success", true);
			}
		return result;
	}
	// 페이지명  db 조회
	@Override
	public List<Map<String, Object>> findTableNameByUrl(Map<String, Object> paramsMap) throws RimsException {
		return commonDao.findTableNameByUrl(paramsMap);
	}

	//개인정보 식별여부
	public Object selectPrvYn(Map<String, Object> paramsMap) {
		return commonDao.selectPrvYn(paramsMap);
	}
}

