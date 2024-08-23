package kr.or.kotsa.rims.sys.service.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.clipsoft.clipreport.export.hwpx.contents.header.borderfill.charproperties.StrikeOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.CompanyManageService;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class CompanyManageServiceImpl extends CmmnAbstractServiceImpl implements CompanyManageService {

	@Autowired
	private CompanyManageDao companyManageDao;


	@Value(value="${Globals.brno.publicDataApi.url}")
	private String proxyUrl;


	// 주 사업자등록번호
	@Override
	public String selectBrno(Map<String, Object> paramsMap) {
		return companyManageDao.selectBrno(paramsMap);
	}

	// 검색/등록팝업 옵션 - 시도(전체)
	@Override
	public List<Map<String, Object>> ctpvNm(Map<String, Object> paramsMap){
		return companyManageDao.selectCtpvNm(paramsMap);
	}

	// 검색/등록팝업 옵션 - 시군구(전체)
	@Override
	public List<Map<String, Object>> sggNm(Map<String, Object> paramsMap) {
		return companyManageDao.selectSggNm(paramsMap);
	}

	// 등록팝업 - 기본정보 (등록지역, 등록지차체)
	@Override
	public Map<String, Object> area(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> area  = companyManageDao.selectArea(paramsMap);
		result.put("ctpvNm", area.get("ctpv_nm"));
		result.put("sggNm", area.get("sgg_nm"));
		return result;
	}

	// 등록팝업 - 기본정보 (상위 사업자번호)
	@Override
	public List<Map<String, Object>> upBrno(Map<String, Object> paramsMap) {
		return companyManageDao.selectUpBrno(paramsMap);
	}

	// 검색옵션 - 승인상태(전체)
	@Override
	public List<Map<String, Object>> aprvStts(Map<String, Object> paramsMap) {
		return companyManageDao.selectAprvStts(paramsMap);
	}

	// 검색옵션 - 영업상태(전체)
	@Override
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap) {
		return companyManageDao.searchBsnStts(paramsMap);
	}

	// 검색옵션 - 권한(전체)
	@Override
	public List<Map<String, Object>> authSelected(Map<String, Object> paramsMap) {
		return companyManageDao.authSelected(paramsMap);
	}

	// 사업자 관리 목록 그리드
	@Override
	public Map<String, Object> selectCompanyManageInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = companyManageDao.selectCompanyManageInfoCnt(paramsMap);
		List<Map<String, Object>> data = companyManageDao.selectCompanyManageInfo(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}

	// 사업자 관리 상세정보
	@Override
	public Map<String, Object> selectCmpnyDetailInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> sn = new HashMap<>();
		Map<String, Object> mr_sn = new HashMap<>();

		Map<String, Object> master = companyManageDao.selectCmpnyMasterInfo(paramsMap);
		if(master != null) {
			String bzmnLicenseAtchSn = (String) master.get("bzmn_license_atch_sn");
			String cocsAtchSn = (String) master.get("cocs_atch_sn");
			if(bzmnLicenseAtchSn != null) {
				sn.put("bzmnLicenseAtchSn", bzmnLicenseAtchSn);
				Map<String, Object> bzmnLicenseAtchNm = companyManageDao.selectFileNm(sn);
				if (bzmnLicenseAtchNm != null) {
					master.put("bzmnLicenseAtchNm", bzmnLicenseAtchNm.get("atch_file_nm"));
				}
			}
			if(cocsAtchSn != null) {
				sn = new HashMap<>();
				sn.put("cocsAtchSn", cocsAtchSn);
				Map<String, Object> cocsAtchNm = companyManageDao.selectFileNm(sn);
				if (cocsAtchNm != null) {
					master.put("cocsAtchNm", cocsAtchNm.get("atch_file_nm"));
				}
			}
			result.put("master", master);
		}

		Map<String, Object> request = companyManageDao.selectCmpnyRequestInfo(paramsMap);
		if(request != null) {
			String mr_bzmnLicenseAtchSn = null;
			String mr_cocsAtchSn = null;
			if (request.get("bzmn_license_atch_sn") != null) {
				mr_bzmnLicenseAtchSn = request.get("bzmn_license_atch_sn").toString();
			}

			if (request.get("cocs_atch_sn") != null) {
				mr_cocsAtchSn = request.get("cocs_atch_sn").toString();
			}

			if(mr_bzmnLicenseAtchSn != null) {
				mr_sn.put("bzmnLicenseAtchSn", mr_bzmnLicenseAtchSn);
				Map<String, Object> mr_bzmnLicenseAtchNm = companyManageDao.selectFileNm(mr_sn);
				if (mr_bzmnLicenseAtchNm != null) {
					request.put("bzmnLicenseAtchNm", mr_bzmnLicenseAtchNm.get("atch_file_nm"));
				}
			}
			if(mr_cocsAtchSn != null) {
				mr_sn = new HashMap<>();
				mr_sn.put("cocsAtchSn", mr_cocsAtchSn);
				Map<String, Object> mr_cocsAtchNm = companyManageDao.selectFileNm(mr_sn);
				if (mr_cocsAtchNm != null) {
					request.put("cocsAtchNm", mr_cocsAtchNm.get("atch_file_nm"));
				}
			}
			result.put("request", request);
		}
		return result;
	}

	// 상세팝업옵션 - 사업소종류(선택)
	@Override
	public List<Map<String, Object>> bzmnSe(Map<String, Object> paramsMap) {
		return companyManageDao.selectBzmnSe(paramsMap);
	}

	// 사업자 관리 등록
	@Override
	public Map<String, Object> insertCmpny(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		paramsMap.put("autzrSn", getUserSn());
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());

		Map<String, Object> offList = new HashMap<>();
		String bzmnSeCd = (String) paramsMap.get("bzmnSeCd");
		String upBrno = (String) paramsMap.get("upBrno");
		offList.put("bzmnSeCd", bzmnSeCd);
		offList.put("upBrno", upBrno);

		if(upBrno != null) {
			int offiSn = companyManageDao.selectOffiSn(offList);
			paramsMap.put("offiSn", offiSn);
		}else {
			paramsMap.put("offiSn", null);
		}

		int cmpny = companyManageDao.insertCmpny(paramsMap);

		if(cmpny > 0) {
			result.put("message", "사업자 등록이 완료되었습니다.");
			return result;
		}else {
			result.put("message", "에러");
			return result;
		}
	}

	// 사업자 관리 상세팝업 수정
	@Override
	public Map<String, Object> updateCmpny(List<Map<String, Object>> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> orgParam = paramsMap.get(0);
		Map<String, Object> hsParam = paramsMap.get(1);
		updateCommonParams(orgParam,hsParam);

		String bzmnSeCd = (String) orgParam.get("bzmnSeCd");
		String upBrno = (String) orgParam.get("upBrno");
		String offiSn1 = (String) orgParam.get("offiSn");

		if(bzmnSeCd.equals("2") && offiSn1 == null) {
			Map<String, Object> offList = new HashMap<>();
			offList.put("bzmnSeCd", bzmnSeCd);
			offList.put("upBrno", upBrno);

			int offiSn = companyManageDao.selectOffiSn(offList);
			orgParam.put("offiSn", offiSn);
			hsParam.put("offiSn", offiSn);
		} else {
			orgParam.put("offiSn", null);
			hsParam.put("offiSn", null);
		}

		int updateCmpny = companyManageDao.updateCmpny(orgParam);

		if(updateCmpny > 0) {
			if(!orgParam.get("regCmptncCd").equals(hsParam.get("regCmptncCd"))) {
				// 하위 사용자 관할코드 수정
				companyManageDao.updateUserCmptnc(orgParam);
			}

			companyManageDao.insertCmpnyHs(hsParam); // 히스토리 insert
			// 사용자 중치처리
			if(orgParam.get("bsnSttsCd").equals("3")) {
				orgParam.put("mdfrSn", getUserSn());
				orgParam.put("mdfcnIp", getClientIP());
				companyManageDao.cmpUserStop(orgParam);
			}
			result.put("message", "사업자 수정이 완료되었습니다.");
			return result;
		} else {
			result.put("message", "에러");
			return result;
		}
	}


	// 상황별 : openAPI를 이용한 사업자등록정보 상태 업데이트(server측 openAPI 요청)
	@Override
	public Map<String, Object> updateCmpnyBrnoBySituation(List<Map<String, Object>> paramsMap) throws UnsupportedEncodingException {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> orgParam = paramsMap.get(0); // 마스터 입력 데이터
		String brno = (String) orgParam.get("brno");
		List<Map<String, Object>> ApiResponseData = new ArrayList<>(); // api 응답데이터
		LocalDateTime now1 = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String updateDt = now1.format(formatter); // 업데이트 시간

		// 해당일련번호가 agency 마스터테이블에 있을 경우만 update
		Map<String, Object>	choiceBrnoInfo = companyManageDao.choiceBrno(orgParam);
		String selectedBsnSttsCd = (String) choiceBrnoInfo.get("bsnSttsNm");
		if( choiceBrnoInfo != null ) {
			Map<String, Object> hsParam = paramsMap.get(1); // 마스터일 경우만 데이터 존재함 , 히스토리 입력 데이터
			updateCommonParams(orgParam,hsParam);

			try {
				//국세청_사업자등록정보 진위확인 및 상태조회 서비스 openApi 이용한 회사상태 업데이트
				Map<String, Object> responseData = fetchBusinessStatus(brno);
				String status_code = (String) responseData.get("status_code");
				if(status_code.equals("OK")){
					ApiResponseData = (List<Map<String, Object>>) responseData.get("data");

					// 사업자 등록 상태 코드 및 명칭 변경 { api 응답 :  계속사업자(01), 휴업(02), 폐업(03)}
					updateBusinessStatus(orgParam, hsParam, ApiResponseData);
					String bStt = (String) hsParam.get("bStt");

					// api요청한 영업상태와 기존 영업상태가 다를 때만 사업자 및 사업자 히스토리 업데이트 발생
					if(!bStt.equals(selectedBsnSttsCd)){
						// 사업자등록정보 상태 업데이트
						LocalDateTime now = LocalDateTime.now();
						String formatedNow = now.format(DateTimeFormatter.ofPattern(("yyyyMMdd")));
						orgParam.put("bsnSttsMdfcnDt",formatedNow);
						int updateCmpnyBrno = companyManageDao.updateCmpnyBrnoToAgency(orgParam);

						//변경 사항 히스토리 insert
						if(updateCmpnyBrno > 0) {
							String bsnSttsCd = (String) hsParam.get("bsnSttsCd");
							hsParam.put("mdfcnRsn","영업상태 API 업데이트");
							// 현재 날짜
							hsParam.put("bsnSttsMdfcnDt",formatedNow);
							companyManageDao.insertCmpnyHs(hsParam);
							if(bsnSttsCd.equals("70")){
								result.put("bsnSttsCd", bsnSttsCd);
								result.put("message", "영업상태 : 국세청에 등록되지 않은 사업자등록번호입니다. (기준일시 : "+updateDt+")");
							}else{
								result.put("bsnSttsCd", bsnSttsCd);
								result.put("message", "영업상태 : 업데이트 되었습니다.(기준일시 : "+updateDt+")");
							}
						}
					}else{
						result.put("message", "영업상태 : 기존 영업상태와 동일하여 업데이트 하지 않습니다. (기준일시 : "+updateDt+")");
					}

				}else if(status_code.equals("BAD_JSON_REQUEST")){
					result.put("message","영업상태 : JSON format 오류(기준일시 : "+updateDt+")");
					return result;
				}else if(status_code.equals("REQUEST_DATA_MALFORMED")){
					result.put("message","영업상태 : 필수항목(사업자등록번호) 누락(기준일시 : "+updateDt+")");
					return result;
				}else if(status_code.equals("INTERNAL_ERROR")){
					result.put("message","영업상태 : 내부 에러(기준일시 : "+updateDt+")");
					return result;
				}
			} catch (HttpClientErrorException e) {
				System.err.println("HTTP 오류:" + e.getStatusCode());
				System.err.println("HTTP 오류 응답:" + e.getResponseBodyAsString());
			} catch (UnsupportedEncodingException e) {
				throw new RuntimeException(e);
			}

		}
		// todo : else 구문 에러 메세지 띄우기 !!🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎
//		else{
//			result.put("message", "기존 영업상태가 존재하지 않습니다."); // 없을시 호출했을때 영업상태로 업데이트 해주기 .
		return result;
	}

	// 국세청_사업자등록정보 진위확인 및 상태조회 서비스 openApi 이용한 회사상태 업데이트 : https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808
	private Map<String, Object> fetchBusinessStatus(String brno) throws UnsupportedEncodingException {
		Map<String,Object> result = new HashMap<>();
		RestTemplate restTemplate = new RestTemplate();
		// 서비스 키 디비에서 호출예정 ( 키 만료 대비하기 위해 업데이트되는 디비에서 서비스 키 호출  )
		Map<String, Object> paramsMap = new HashMap<>();
		paramsMap.put("serviceKey","ntsCertKey");
		String serviceKey = companyManageDao.selectServicekey(paramsMap);
		// 디코딩한 이유 restTemplate의 url로 들어갈때 한번때 인코딩 되어 총 두번 인코딩된 값이 되어 에러남
		String decodedServicekey = URLDecoder.decode(serviceKey, "UTF-8");
		// 프록시 연계 서버를 이용한 호출
		String url = proxyUrl + "/api/nts-businessman/v1/status?serviceKey=" + decodedServicekey;
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		Map<String, Object> requestBody = new HashMap<>();
		requestBody.put("b_no", Collections.singletonList(brno));

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
		return response.getBody();
	}

	// 사업자 등록 상태 코드 및 명칭 변경 { api 응답 :  계속사업자(01), 휴업(02), 폐업(03)}
	private void updateBusinessStatus(Map<String, Object> orgParam, Map<String, Object> hsParam ,List<Map<String, Object>> data) {
		String bsnSttsCd = (String) data.get(0).get("b_stt_cd");
		String bStt = (String) data.get(0).get("b_stt");
		String taxType = (String) data.get(0).get("tax_type"); //"국세청에 등록되지 않은 사업자등록번호입니다."
		if ("계속사업자".equals(bStt) && "01".equals(bsnSttsCd)) {
			bStt = "정상";
			bsnSttsCd = "0";
		} else if ("휴업자".equals(bStt) && "02".equals(bsnSttsCd)) {
			bStt = "휴업";
			bsnSttsCd = "1";
		} else if ("폐업자".equals(bStt) && "03".equals(bsnSttsCd)) {
			bStt = "폐업";
			bsnSttsCd = "3";
		} else if("".equals(bStt) && "".equals(bsnSttsCd) && taxType.equals("국세청에 등록되지 않은 사업자등록번호입니다.")){
			bStt = "사업자번호오류";
			bsnSttsCd = "70"; // 사업자번호 오류 코드  response :bsnSttsCd 값이 null임
		}else {
			bsnSttsCd = "9"; // 기타
		}
		orgParam.put("bsnSttsCd", bsnSttsCd);
		orgParam.put("bStt", bStt);
		orgParam.put("taxType", taxType);
		hsParam.put("bsnSttsCd", bsnSttsCd);
		hsParam.put("bStt", bStt);
		hsParam.put("taxType", taxType);
	}



	private void updateCommonParams(Map<String, Object> orgParam, Map<String, Object> hsParam) {
		String userSn = getUserSn();
		String clientIP = getClientIP();
		orgParam.put("rgtrSn", userSn);
		orgParam.put("regIp", clientIP);
		hsParam.put("rgtrSn", userSn);
		hsParam.put("regIp", clientIP);
	}

	// 사업자 관리 상세팝업 반려
	@Override
	public Map<String, Object> updateReject(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> cmpnyUpdatMap = new HashMap<>();

		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		String bzmnSn = (String) paramsMap.get("bzmnSn");
		cmpnyUpdatMap.put("mdfrSn", getUserSn());
		cmpnyUpdatMap.put("mdfcnIp", getClientIP());
		cmpnyUpdatMap.put("bzmnSn", bzmnSn);

		// 요청 일련번호
		String dmndSn = companyManageDao.selectDmndSn(paramsMap);

		if(dmndSn != null) {
			paramsMap.put("dmndSn", dmndSn);
			// 요청테이블 반려
			int updateRequestCompanion = companyManageDao.updateRequestCompanion(paramsMap);
			if(updateRequestCompanion > 0) {
				result.put("message", "반려 처리가 되었습니다.");
				return result;
			}else {
				result.put("message", "에러");
				return result;
			}
		}else {
			result.put("message", "에러");
			return result;
		}
	}

	// 사업자 관리 승인 - 수정 요청
	@Override
	public Map<String, Object> updateRequestApproval(Map<String, Object> paramsMap) {

		Map<String, Object> result = new HashMap<>();

		paramsMap.put("autzrSn", getUserSn());
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("rjctSn", null);
		paramsMap.put("rjctDt", null);

		String bzmnSeCd = (String) paramsMap.get("bzmnSeCd");
		String upBrno = (String) paramsMap.get("upBrno");
		String offiSn1 = (String) paramsMap.get("offiSn");

		if (bzmnSeCd.equals("2") && offiSn1 == null) {
			Map<String, Object> offList = new HashMap<>();
			offList.put("bzmnSeCd", bzmnSeCd);
			offList.put("upBrno", upBrno);

			int offiSn = companyManageDao.selectOffiSn(offList);
			paramsMap.put("offiSn", offiSn);
		}

		int cmpny = companyManageDao.updateCmpny(paramsMap);

		if(cmpny > 0) {
			int deleteRequestCmpny = companyManageDao.deleteRequestCmpny(paramsMap);
			companyManageDao.insertCmpnyHs(paramsMap);

			if(deleteRequestCmpny > 0) {
				result.put("message", "승인 처리가 되었습니다.");
				return result;
			} else {
				result.put("message", "에러");
				return result;
			}
		} else {
			result.put("message", "에러");
			return result;
		}
	}

	// 사업자 관리 승인 - 등록 요청
	@Override
	public Map<String, Object> insertRequestApproval(Map<String, Object> paramsMap) {

		Map<String, Object> result = new HashMap<>();

		paramsMap.put("autzrSn", getUserSn());
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("rjctSn", null);
		paramsMap.put("rjctDt", null);

		String bzmnSeCd = (String) paramsMap.get("bzmnSeCd");
		String upBrno = (String) paramsMap.get("upBrno");
		String offiSn1 = (String) paramsMap.get("offiSn");

		if (bzmnSeCd.equals("2") && offiSn1 == null) {
			Map<String, Object> offList = new HashMap<>();
			offList.put("bzmnSeCd", bzmnSeCd);
			offList.put("upBrno", upBrno);

			int offiSn = companyManageDao.selectOffiSn(offList);
			paramsMap.put("offiSn", offiSn);
		}

		int cmpny = companyManageDao.insertCmpny(paramsMap);

		if(cmpny > 0) {
			int deleteRequestCmpny = companyManageDao.deleteRequestCmpny(paramsMap);

			if(deleteRequestCmpny > 0) {
				result.put("message", "승인 처리가 되었습니다.");
				return result;
			} else {
				result.put("message", "에러");
				return result;
			}
		} else {
			result.put("message", "에러");
			return result;
		}
	}


	/**
	 * 사업소/사용자/차량 현황 버튼
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	// 사업소 현황
	@Override
	public Map<String, Object> selectOfficeDetailInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> data = companyManageDao.selectOfficeDetailInfo(paramsMap);
		int total = companyManageDao.selectOfficeDetailInfoCnt(paramsMap);

		result.put("data", data);
		result.put("total", total);

		return result;
	}
	// 사용자 현황
	@Override
	public Map<String, Object> selectUserCmp(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> data = companyManageDao.selectUserCmp(paramsMap);
		int total = companyManageDao.selectUserCmpCnt(paramsMap);

		result.put("data", data);
		result.put("total", total);

		return result;
	}
	// 차량 현황
	@Override
	public Map<String, Object> findCarCmp(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> data = companyManageDao.findCarCmp(paramsMap);
		int total = companyManageDao.findCarCmpCnt(paramsMap);

		result.put("data", data);
		result.put("total", total);

		return result;
	}


	// 이관팝업-지자체조회
	@Override
	public String areaNm(Map<String, Object> paramsMap) {
		return companyManageDao.selectAreaNm(paramsMap);
	}

	// 이관팝업-요청
	@Override
	public Map<String, Object> updateRequestTransferInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		paramsMap.put("rqstrSn", getUserSn()); //요청자
		paramsMap.put("rgtrSn", getUserSn()); //등록자
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("rjctSn", null);
		paramsMap.put("rjctDt", null);

		int insertCmpnyHs = companyManageDao.insertCmpnyHs(paramsMap);

		if(insertCmpnyHs > 0) {
			int insertRequestCmpny = companyManageDao.insertRequestCmpny(paramsMap);

			if(insertRequestCmpny > 0) {
				result.put("message", "지자체 이관 요청 처리가 되었습니다.");
				return result;
			}else {
				result.put("message", "에러");
				return result;
			}
		}else {
			result.put("message", "에러");
			return result;
		}
	}

	// 상세팝업-이관요청여부
	@Override
	public int cmpnyCnt(Map<String, Object> paramsMap) {

		int cmpnyCnt = companyManageDao.selectCmpnyCnt(paramsMap);
		int requestCnt = companyManageDao.selectRequestCnt(paramsMap);
		int companionCnt = companyManageDao.selectCompanionCnt(paramsMap);

		if(cmpnyCnt == 1 && requestCnt == 1 && companionCnt == 0) { // 요청
			return 1;
		} else if(cmpnyCnt == 1 && requestCnt == 0 && companionCnt == 1) { // 반려
			return 3;
		} else {
			return 0;
		}
	}

	// 상세팝업-이관요청승인
	@Override
	public Map<String, Object> updateTransferRequestApproval(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		paramsMap.put("autzrSn", getUserSn());
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("rjctSn", null);
		paramsMap.put("rjctDt", null);

		int updateCmpny = companyManageDao.updateCmpny(paramsMap);

		if(updateCmpny > 0) {

			// 하위 사용자 관할코드 수정
			companyManageDao.updateUserCmptnc(paramsMap);

			companyManageDao.insertCmpnyHs(paramsMap);
			int deleteRequestCmpny = companyManageDao.deleteRequestCmpny(paramsMap);

			if(deleteRequestCmpny > 0) {
				result.put("message", "승인 처리가 되었습니다.");
				return result;
			} else {
				result.put("message", "에러");
				return result;
			}
		} else {
			result.put("message", "에러");
			return result;
		}
	}

	// 상세팝업-반려확인
	@Override
	public Map<String, Object> updateRequestCompanionChk(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());

		// 요청 일련번호
		String dmndSn = companyManageDao.selectDmndSn(paramsMap);

		if(dmndSn != null) {
			paramsMap.put("dmndSn", dmndSn);

			// 요청테이블 반려
			int updateRequestCompanionChk = companyManageDao.updateRequestCompanionChk(paramsMap);

			if(updateRequestCompanionChk > 0) {

				result.put("message", "반려 확인이 되었습니다.");
				return result;

			}else {
				result.put("message", "에러");
				return result;
			}
		}else {
			result.put("message", "에러");
			return result;
		}
	}

	// 상세팝업 - 삭제
	@Override
	public Map<String, Object> deleteCmpny(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		String authrtCd = getAuthrtCd();
		paramsMap.put("rqstrSn", getUserSn()); //요청자
		paramsMap.put("rgtrSn", getUserSn()); //등록자
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("rjctSn", null);
		paramsMap.put("rjctDt", null);
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());

		if(authrtCd.equals("K01") || authrtCd.equals("Z01")) {

			paramsMap.put("delYn", "Y");
//			System.out.println("deleteCmpny =========================== " + paramsMap);
			int masterCmpny = companyManageDao.deleteCmpny(paramsMap);  // 마스터 delete

			if(masterCmpny > 0) {

				int insertCmpnyHs = companyManageDao.insertCmpnyHs(paramsMap); // 히스토리 insert

				if(insertCmpnyHs > 0) {
					result.put("message", "사업자 정보가 정상적으로 삭제 되었습니다.");
					return result;
				}else {
					result.put("message", "사업자 정보 갱신 이력에 문제가 발생하였습니다.");
					return result;
				}
			} else {
				result.put("message", "삭제 중 문제가 발생하였습니다.");
				return result;
			}
		}else {
			result.put("message", "관리자가 아닙니다.");
			return result;
		}
	}


}
