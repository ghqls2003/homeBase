package kr.or.kotsa.rims.sys.service.impl;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.CommonUtil;
import kr.or.kotsa.rims.sys.service.InspectionHistService;

@Service
public class InspectionHistServiceImpl extends CmmnAbstractServiceImpl implements InspectionHistService {
	
	@Value("${Globals.fileStorePath}")
    private String storePath;
	
	@Autowired
	private InspectionHistDao inspectionHistDao;

	@Override
	public Map<String, Object> selectInspectionHistInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = inspectionHistDao.selectInspectionHistInfoCnt(paramsMap);
		List<Map<String, Object>> data = inspectionHistDao.selectInspectionHistInfo(paramsMap);
		
		result.put("total", total);
		result.put("data", data);

		return result; 
	}

	@Override
	public int insertInspectionHist(Map<String, Object> paramsMap) {
		return inspectionHistDao.insertInspectionHist(paramsMap);
	}

	@Override
	public List<Map<String, Object>> ctpvNm(Map<String, Object> paramsMap) {
		return inspectionHistDao.ctpvNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> sggNm(Map<String, Object> paramsMap) {
		return inspectionHistDao.sggNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> bsnStts(Map<String, Object> paramsMap) {
		return inspectionHistDao.bsnStts(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return inspectionHistDao.selectAuth(paramsMap);
	}

	@Override
	public int updateInspectionHist(Map<String, Object> paramsMap) {
		return inspectionHistDao.updateInspectionHist(paramsMap);
	}

	@Override
	public List<Map<String, Object>> agencyList(Map<String, Object> paramsMap) {
		return inspectionHistDao.agencyList(paramsMap);
	}

	@Override
	public List<Map<String, Object>> agencyInfo(Map<String, Object> paramsMap) {
		return inspectionHistDao.agencyInfo(paramsMap);
	}

	@Override
	public int updateDeleteYn(Map<String, Object> paramsMap) {
		return inspectionHistDao.updateDeleteYn(paramsMap);
	}

	@Override
	public Map<String, Object> insertFilesUpload(List<MultipartFile> multipartFile, Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("success", false);
        if (!multipartFile.isEmpty()) {
        	
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
    		dir.setReadable(true);
    		
    		// 디렉토리가 존재하지 않으면 생성
            if (!dir.exists()) {
            	boolean success = dir.mkdirs();
            	if (!success) {
                    System.err.println("Failed to create the directory: " + dir);

                    return resultMap;
                }
            }
        	
        	List<Map<String, String>> fileList = new ArrayList<>();
    		
    		for(int i = 0; i < multipartFile.size(); i++) {
    			
    			String uuid = "BBS_" + dateTimeStr+UUID.randomUUID().toString().replaceAll("-", "");
    			File serverFile = new File(dir.getAbsolutePath() + File.separator + uuid);
    			
    			Map<String, String> map = new HashMap<>();
    			
    			
    			paramsMap.put("actlFileNm", uuid);
	            paramsMap.put("atchFileNm", multipartFile.get(i).getOriginalFilename());
	            paramsMap.put("atchFileSz", multipartFile.get(i).getSize());
	            paramsMap.put("atchFilePath", dir.getAbsolutePath());
	            paramsMap.put("useYn", "Y");
	            paramsMap.put("rgtrSn", getUserSn());
	            paramsMap.put("regIp", getClientIP());
    			
    			
    			fileList.add(map);
    			
    			Map<String, Object> fileSn = inspectionHistDao.insertFilesUpload(paramsMap);
                if (fileSn != null) {
                    try {
                        multipartFile.get(i).transferTo(serverFile);
                    } catch (IOException e) {
                        throw new RimsException(e);
                    }
                    resultMap.put("success", true);
                   
                    if(resultMap.get("fileSn") != null) {
                    	String exFileSn = resultMap.get("fileSn").toString();
                    	String addFileSn = fileSn.get("fileSn").toString();;
                    	
                    	String newFileSn = exFileSn+","+ addFileSn;
                    	resultMap.put("fileSn", newFileSn);
                    }else {
                    	resultMap.put("fileSn", fileSn.get("fileSn").toString());
                    }
                    
                }
    		}
        }
        return resultMap;
	}

}
