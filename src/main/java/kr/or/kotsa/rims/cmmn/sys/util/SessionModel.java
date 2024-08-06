package kr.or.kotsa.rims.cmmn.sys.util;


import java.io.Serializable;

public class SessionModel implements Serializable {

	//사용자ID
	private String USER_ID;
	
	//사용자성명
	private String USER_NM;
	
	//사용자유형
	private String USER_TY;
	
	//소속명
	private String PSITN_NM;  
	
	//회사코드
	private String CMPNY_CD;
	
	//운수회사
	private String CMPNY_NM;
	
    //지역코드
	private String AREA_CD;
	
    //지역명
	private String AREA_NM;
	
	//승인코드
	private String CONFM_CD;
	
	//휴대폰번호
	private String MPNO;
	
	//이메일
	private String EMAIL;
	
	//통신사
	private String TELECOM;
	
	// 권한
	private String AUTHOR_ID;
	
	// 로그인 단계(p = portal로그인, pi = 2차 로그인, t = 설치관리 로그인)
	private String AUTHOR_LV;
	
	
	public String getUSER_ID() {
		return USER_ID;
	}

	public void setUSER_ID(String uSER_ID) {
		USER_ID = uSER_ID;
	}

	public String getUSER_NM() {
		return USER_NM;
	}

	public void setUSER_NM(String uSER_NM) {
		USER_NM = uSER_NM;
	}

	public String getUSER_TY() {
		return USER_TY;
	}

	public void setUSER_TY(String uSER_TY) {
		USER_TY = uSER_TY;
	}

	public String getPSITN_NM() {
		return PSITN_NM;
	}

	public void setPSITN_NM(String pSITN_NM) {
		PSITN_NM = pSITN_NM;
	}

	public String getCMPNY_CD() {
		return CMPNY_CD;
	}

	public void setCMPNY_CD(String cMPNY_CD) {
		CMPNY_CD = cMPNY_CD;
	}

	public String getCMPNY_NM() {
		return CMPNY_NM;
	}

	public void setCMPNY_NM(String cMPNY_NM) {
		CMPNY_NM = cMPNY_NM;
	}

	public String getAREA_CD() {
		return AREA_CD;
	}

	public void setAREA_CD(String aREA_CD) {
		AREA_CD = aREA_CD;
	}

	public String getAREA_NM() {
		return AREA_NM;
	}

	public void setAREA_NM(String aREA_NM) {
		AREA_NM = aREA_NM;
	}

	public String getCONFM_CD() {
		return CONFM_CD;
	}

	public void setCONFM_CD(String cONFM_CD) {
		CONFM_CD = cONFM_CD;
	}

	public String getMPNO() {
		return MPNO;
	}

	public void setMPNO(String mPNO) {
		MPNO = mPNO;
	}

	public String getEMAIL() {
		return EMAIL;
	}

	public void setEMAIL(String tELECOM) {
		TELECOM = tELECOM;
	} 
	
	public String getTELECOM() {
		return TELECOM;
	}

	public void setTELECOM(String tELECOM) {
		TELECOM = tELECOM;
	}
	
	public String getAUTHOR_ID() {
		return AUTHOR_ID;
	}

	public void setAUTHOR_ID(String aUTHOR_ID) {
		AUTHOR_ID = aUTHOR_ID;
	} 

	public String getAUTHOR_LV() {
		return AUTHOR_LV;
	}

	public void setAUTHOR_LV(String aUTHOR_LV) {
		AUTHOR_LV = aUTHOR_LV;
	} 
}