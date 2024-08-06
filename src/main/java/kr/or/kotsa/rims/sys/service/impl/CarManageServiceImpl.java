package kr.or.kotsa.rims.sys.service.impl;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.ExcelStatusManager;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelStream;
import kr.or.kotsa.rims.sys.service.CarManageService;

import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletResponse;

@Service
public class CarManageServiceImpl extends CmmnAbstractServiceImpl implements CarManageService {

	@Autowired
	private CarManageDao carManageDao;

	@Autowired
	@Qualifier("sqlSession")
	private SqlSessionFactory sqlSessionFactory;
	
	@Autowired
    private ExcelStatusManager excelStatusManager;

    //차량정보 조회
	public Map<String, Object> selectCarList(Map<String, Object> paramsMap)
			throws RimsException {
		Map<String, Object> result = new HashMap<>();
		
		if(getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") 
				|| getAuthrtCd().equals("Z01") || getAuthrtCd().equals("D01")) {
			// 공단, 국토부, 관리자, 개발자
		}else if(getAuthrtCd().equals("G01") || getAuthrtCd().equals("G02"))  {
			// 지자체, 대여사업조합
			String searchCol = (String) paramsMap.get("searchCol");
			String searchWrd = (String) paramsMap.get("searchWrd");
			if ("vhclRegNoFull".equals(searchCol) && (searchWrd == null || searchWrd.trim().isEmpty())) {
				result.put("errorMsg", "정확한 차량등록번호를 입력해 주세요.");
				result.put("data", Collections.emptyList());
				result.put("total", 0);
				return result;
			}
		}else if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02") || getAuthrtCd().equals("S03")) {
			// 대여사업자(주사무소, 영업소)
		}else {
			result.put("errorMsg", "잘못된 접근입니다.");
			return result;
		}
		
		List<Map<String, Object>> list;
		int total = 0;
		
		Map<String, Object> authParams = new HashMap<>();
		authParams = getAuthParams(paramsMap);
		
		list  = carManageDao.selectCarList(authParams);
		total = carManageDao.selectCarListCnt(authParams);
		result.put("data", list);
		result.put("total", total);

		return result;
	}
	
	public int selectCarListCnt(Map<String, Object> paramsMap) throws RimsException {
		int total = 0;
		
		Map<String, Object> authParams = new HashMap<>();
		authParams = getAuthParams(paramsMap);
		total = carManageDao.selectCarListCnt(authParams);
		return total;
	}
	
	//권한별 파라미터 설정
	public Map<String, Object> getAuthParams(Map<String, Object> paramsMap) {
		//공통적으로 authrtCd 설정 
		paramsMap.put("authrtCd", getAuthrtCd());
		
		if(getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") 
				|| getAuthrtCd().equals("Z01") || getAuthrtCd().equals("D01")) {
			// 공단, 국토부, 관리자, 개발자
		} else if(getAuthrtCd().equals("G01") || getAuthrtCd().equals("G02"))  {
			// 지자체, 대여사업조합
			String regCmptncCd = (String) paramsMap.get("regCmptncCd");
			if(regCmptncCd==null || regCmptncCd.trim().isEmpty()) {
				paramsMap.put("regCmptncCd", restrictArea().get("ctpvCd").toString());
			}
		} else if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02") || getAuthrtCd().equals("S03")) {
			// 대여사업자(주사무소, 영업소)
			paramsMap.put("bzmnSn", getBzmnSn());
		}
		return paramsMap;
	}
	
	//결함정보 조회
	public Object selectDefectList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list  = carManageDao.selectDefectList(paramsMap);
		int total = carManageDao.selectDefectListCnt(paramsMap);
		result.put("data", list);
		result.put("total", total);

		return result;
	}
	
	//시도 검색조건
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap){
		String authCd = getAuthrtCd();
		if ("G01".equals(authCd) ||"G02".equals(authCd) ) {
			paramsMap = restrictArea();
		}
		return carManageDao.selectCtpvNm(paramsMap);
	}

	//시군구 검색조건
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap){
		String authCd = getAuthrtCd();
		if ("G01".equals(authCd) ||"G02".equals(authCd) ) {
			paramsMap = restrictArea();
		}
		return carManageDao.selectSggNm(paramsMap);
	}
	
	/**
	 * 권한, 담당 구역에 따라 지역 코드를 세부적으로 적용 위함
	 * @author: 정영훈 
	 */
	private Map<String, Object> restrictArea() {
		Map<String, Object> paramMap = new HashMap<>();
	    String cmptncZoneCd = getCmptncZoneCd();
	    String part0to2 = cmptncZoneCd.substring(0, 2);
	    String part0to4 = cmptncZoneCd.substring(0, 4);
	    String part0to5 = cmptncZoneCd.substring(0, 5);

	    String ctpvDivisionCd = cmptncZoneCd.substring(2, 4);
	    String sggDivisionCd = cmptncZoneCd.substring(4, 5);
	    String ctpvCd= "";
	    
	    if("00".equals(ctpvDivisionCd)) {
	    	ctpvCd = part0to2;
	    } else if("0".equals(sggDivisionCd)) {
	    	ctpvCd = part0to4;
	    } else {
	    	ctpvCd = part0to5;
	    }

	    paramMap.put("ctpvCd", ctpvCd);
	    
	    return paramMap;
	}

	//차량 수정
	public String updateCar(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		
		carManageDao.updateCar(paramsMap);
		return "success";
	}
	
	@Override
	public void selectExcelStream(Map<String, Object> paramsMap, HttpServletResponse response) throws RimsException, IOException{
		//queryData
		@SuppressWarnings("unchecked")
		Map<String, Object> queryMap = new ObjectMapper().readValue((String) paramsMap.get("params"), Map.class);
		//removeEmptyParams(queryMap);
		  //권한별 파라미터 추가 설정
		Map<String, Object> authParams = new HashMap<>();
		authParams = getAuthParams(queryMap);
		queryMap.putAll(authParams);
		queryMap.put("userSn", getUserSn());
		//excelData
		final String queryId = "sys.carManage.excel";
		final String fileName = "carManage";
		final String colTitle[] = {"순번" , "차량등록번호", "차대번호", "차종"  , "연식" , "법인등록번호", "법인명", "소유자명", "사용여부", "결함여부", "최초등록일자", "만료일자", "자료연계등록일" };
		final String colKey[] =   {"rn" , "vhclRegNo"   , "vin"     , "carmdl", "mdlyr", "crno"        , "coNm"  , "ownrNm"  , "useYn"   , "defectYn", "frstRegYmd"  , "expryYmd", "regDt"};
		final int total = (int)queryMap.get("total");
		
		//요청
		GenericExcelStream genericExcelStream = new GenericExcelStream(response);
		genericExcelStream.setExcelData(queryId, colTitle, colKey, total, fileName)
						  .setQueryMap(queryMap)
						  .setSqlSessionFactory(sqlSessionFactory)
						  .setExcelStatusManager(excelStatusManager)
					      .build();
	}
	
	public static void removeEmptyParams(Map<String, Object> paramsMap) {
		Iterator<Map.Entry<String, Object>> iterator = paramsMap.entrySet().iterator();
	    
	    while (iterator.hasNext()) {
	        Map.Entry<String, Object> entry = iterator.next();
	        Object value = entry.getValue();

	        // null, 공백, 빈 문자열 제거
	        if (value == null || value.toString().trim().isEmpty()) {
	            iterator.remove();
	        }
	    }
	}
	
	
	
	@Override
	public List<Map<String, Object>> selectExcelCarList(Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("signguCd", getCmptncZoneCd());
		return carManageDao.selectExcel(paramsMap);
	}
	
	/**
	 * 이하 메서드는 240301 시점 사용하지 않음. 
	 */
	
	//차량 등록
	public String insertCar(Map<String, Object> paramsMap) {
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());

		carManageDao.insertCar(paramsMap);
		return "success";
	}


	//차량 삭제
	public String deleteCar(Map<String, Object> paramsMap) {
		carManageDao.deleteCar(paramsMap);
		return "success";
	}
	
	//시도 시군구 이름만
	public Map<String, Object> selectCtpvSggNm(Map<String, Object> paramsMap) {
		return carManageDao.selectCtpvSggNm(paramsMap);
	}
	
	//회사리스트
	public Map<String, Object> selectCompanyList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list;
		int total;

		paramsMap.put("authrtCd", getAuthrtCd());
		if(getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")) {
			list = carManageDao.selectCompanyList(paramsMap);
			total = carManageDao.selectCompanyListCnt(paramsMap);
		}else if(getAuthrtCd().equals("G01")) {
			paramsMap.put("regCmptncCd", getCmptncZoneCd());

			list = carManageDao.selectCompanyList(paramsMap);
			total = carManageDao.selectCompanyListCnt(paramsMap);
		}else if(getAuthrtCd().equals("S01") || getAuthrtCd().equals("S02")){
			paramsMap.put("regCmptncCd", getCmptncZoneCd());

			list = carManageDao.selectCompanyList(paramsMap);
			total = carManageDao.selectCompanyListCnt(paramsMap);
		}else {
			list = carManageDao.selectCompanyList(paramsMap);
			total = carManageDao.selectCompanyListCnt(paramsMap);
		}

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//중복확인
	public Object selectDuplicChk(Map<String, Object> paramsMap) {
		return carManageDao.selectDuplicChk(paramsMap);
	}
	public void insertExcelCar(Map<String, Object> paramsMap) {
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());

		if(paramsMap.containsKey("carmdl")) {
			if(paramsMap.get("carmdl").equals("1")) {
				paramsMap.put("carmdl", "승용차");
			}else if(paramsMap.get("carmdl").equals("2")) {
				paramsMap.put("carmdl", "승합차");
			}else if(paramsMap.get("carmdl").equals("3")) {
				paramsMap.put("carmdl", "화물차");
			}
		}

		carManageDao.insertExcelCar(paramsMap);

	}

	@Override
	public int selectMatchChk(Map<String, Object> paramsMap) {
		return carManageDao.selectMatchChk(paramsMap);
	}

	@Override
	public Map<String, Object> insertBookmark(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		int boomarkList = carManageDao.insertBookmark(paramsMap);
		if(boomarkList > 0) {
			result.put("message", "즐겨찾기 되었습니다.");
			return result;
		}else {
			result.put("message", "에러");
			return result;
		}
	}

	@Override
	public Map<String, Object> deleteBookmark(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		int boomarkList = carManageDao.deleteBookmark(paramsMap);
		if(boomarkList > 0) {
			result.put("message", "삭제 되었습니다.");
			return result;
		}else {
			result.put("message", "에러");
			return result;
		}
	}
	

}
