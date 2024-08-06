<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<%@ include file="../cmm/include_gis.jsp" %>

<script src="${contextPath}/js/sys/crprtInfoManage.js"></script>

<!-- 다음 주소검색 API -->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>

<script>
    var authrtCd = "${authrtCd}";
    var bzmnSn = "${bzmnSn}";
    var userSn = "${userSn}" 
    var getCmptncZoneCd = '';
    if (authrtCd == 'Z01' || authrtCd == 'M01' || authrtCd == 'K01') {
    	getCmptncZoneCd = '';
    } else if (authrtCd == 'G01') {
		getCmptncZoneCd = '${getCmptncZoneCd}';
	} else if(authrtCd == 'S01') {
		getCmptncZoneCd = '${getCmptncZoneCd}';
		getBzmnSn = '${getBzmnSn}';
		getBrno = '${getBrno}';
	} else if(authrtCd == 'S02') {
		getCmptncZoneCd = '${getCmptncZoneCd}';
		getBzmnSn = '${getBzmnSn}';
	}
</script> 

<style>
.insert_popup {
	background-color: #d8e5ff;
    border-radius: 8px;
    padding: 10px 8px 10px 24px;
}

.legend {
	display: flex;
	justify-content : end;
	align-items: center;
}

.circle {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: #000;
	margin: 0px 5px 0px 15px;
}

.apCircle {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: #ff3838;
	margin: 0px 5px 0px 15px;
}

.ap_btn {
	margin-left: 5px;
}

.aprv .k-picker-solid {
	background-color: #f5f5f5;
}

.data .k-datepicker {
	background-color: #f5f5f5 !important;
}
	
.dMargin {
	margin: 5px;
}
.disabledOn {
	cursor: default;
}
#insertPopup > div.content > div.scrollBar02 > div > div:nth-child(3) > div.cont.cont-flex > table:nth-child(1) > tbody > tr:nth-child(1) > td > div > span > span.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button {
	cursor: default;
}
#insertPopup > div.content > div.scrollBar02 > div > div:nth-child(3) > div.cont.cont-flex > table:nth-child(2) > tbody > tr:nth-child(1) > td > div > span > span.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button {
	cursor: default;
}
#updatePopup > div > div.detail_popup.content > div.scrollBar02 > div > div:nth-child(3) > div.cont.cont-flex > table:nth-child(1) > tbody > tr:nth-child(1) > td > div > span > span.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button {
	cursor: default;
}
#updatePopup > div > div.detail_popup.content > div.scrollBar02 > div > div:nth-child(3) > div.cont.cont-flex > table:nth-child(2) > tbody > tr:nth-child(1) > td > div > span > span.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button {
	cursor: default;
}
.rejectReasonAgree {
	background-color: lightgray;
	color: white;
	border: 1px solid lightgray;
	height: 25px;
	width: 50px;
}
.rejectReasonAgree:hover {
	color: black;
	background-color: white;
}
.crprtTab {
	background-color: #F5F8FE;;
    border: 1px solid #364BC6;
    color: #364BC6;
    width: 110px;
    height: 40px;
    border-radius: 10px;
    font-size: 1.6rem;
    line-height: 40px;
    text-align: center;
    font-weight: 500;
    cursor: pointer;
}
.crprtTab:hover {
	background-color: #364BC6;
    color: #F5F8FE;
}
.crprtTab.tabCk {
	background-color: #364BC6;
	color: #F5F8FE;
}
#container > div > div.contBox.lastBox.lastBox02.crprtSelf > div.crprtInfoManageGrid > div > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords,
#container > div > div.contBox.lastBox.lastBox02.crprtUser > div.crprtInfoManageGrid > div > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
	justify-content: center;
}
</style>

<div class="subPage sub03">

    <!-- 콘텐츠 시작 -->
    <div id="container">
        <div class="wrap">

            <!-- title -->
            <div class="titBox">
                <div class="tit01">
                    <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit"/>
                   <h2><c:out value='${tableName}'/></h2>
                </div>
                <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">기업정보 관리</li>
                </ul>
            </div>
            
            <!-- 사용자/기업정보 탭 -->
			<div style="display: flex; align-items: center; margin-bottom:15px;">
				<div id="tab1" class="crprtTab tabCk" style="margin-right:5px;" onClick="javaScript:$crprtInfoManage.event.tabClick(event);">기업정보관리</div>
				<div id="tab2" class="crprtTab" onClick="javaScript:$crprtInfoManage.event.tabClick(event);">기업사용자관리</div>
			</div>

            <!-- 기업검색조건 -->
            <div class="search_top crprtSelf">
            	<form action="#" name="searchForm" id="searchForm" method="post">
					<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
					<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
					    <div class="selec_wr">
					        <div class="mo_flex">
					            <ul class="selec_box">
									<li class="li_slec">
										<input type="text" id=bzmnSeDrop class="bzmn_se" placeholder="전체">
									</li>
									<li class="li_slec">
										<input type="text" id="bsnSttsDrop" class="bsnSttsDrop" placeholder="전체">
									</li>
									<li class="li_slec">
			                            <label for="search_box"></label>
			                            <input style="width: 330px;" type="text" id="searchWrd" class="searchWrd input" 
			                            		placeholder="사업자번호(-제외) 또는 사업자명을 입력하세요." maxLength="80" />
		                            </li>
					            </ul>
					        </div>
					        <button class="yellow_btn crprtInfoManageSearchBtn" type="button" onclick="javascript:$crprtInfoManage.event.searchClick(event);">
					        	조회
					        	<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘" />
					        </button>
					    </div>
			    </form>
			</div>

			<!-- 기업정보관리 그리드 -->
			<div class="contBox lastBox lastBox02 crprtSelf">
			    <div class="nameBox nameBox-flex">
			        <h4 class="name">기업정보 관리</h4>
			        <button id="crprtExcel" class="download-btn excelDownBtn">
			            <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
			            엑셀
			        </button>
			    </div>
			    <div class="crprtInfoManageGrid">
				    <table id="crprtGrid" class="cmpnymanageInfo"></table>
			    </div>
			</div>
			<div id="insertBtnDiv" class="btn_flex crprtSelf" style="display:none;">
			    <button type="button" class="blue_btn insertPopup">영업소 등록</button>
<!-- 			    <button type="button" class="blue_btn updatePopup">내 기업정보 수정</button> -->
			</div>

            <!-- 사용자검색조건 -->
            <div class="search_top crprtUser" style="display:none;">
            	<form action="#" name="searchForm" id="searchUserForm" method="post">
					<input type="hidden" id="elxExcelDownReasonUser" name="excelDownReason" />
					<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
					    <div class="selec_wr">
					        <div class="mo_flex">
					            <ul class="selec_box">
									<li class="li_slec">
										<input type="text" id="userAcntStts" class="searchAprvStts" placeholder="전체">
									</li>
									<li class="li_slec">
										<input type="text" id="userAprvStts" class="searchAprvStts" placeholder="전체">
									</li>
									<li class="li_slec">
			                            <label for="search_box"></label>
			                            <input style="width: 300px;" type="text" id="searchWrdUser" class="searchWrd input"
			                            		placeholder="아이디 또는 성명을 입력하세요." maxLength="40" />
		                            </li>
					            </ul>
					        </div>
					        <button class="yellow_btn crprtInfoManageSearchBtn" type="button" onclick="javascript:$crprtInfoManage.event.searchClick(event);">
					        	조회
					        	<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘" />
					        </button>
					    </div>
			    </form>
			</div>
			
			<!-- 기업사용자관리 그리드 -->
			<div class="contBox lastBox lastBox02 crprtUser" style="display:none;">
			    <div class="nameBox nameBox-flex">
			        <h4 class="name">기업사용자 관리</h4>
			        <button id="crprtUsrExcel" class="download-btn excelDownBtn">
			            <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
			            엑셀
			        </button>
			    </div>
			    <div class="crprtInfoManageGrid">
				    <table id="grid" class="cmpnymanageInfo"></table>
			    </div>
			</div>
			
			<!-- 영업소 등록 팝업, 시작 -->
			<div class="popup register_popup popup_type02" style="z-index: 999">
		        <div id="insertPopup" class="box">
		            <div class="popup_top">
		                <h4>영업소 등록</h4>
		                <div class="close d_Close">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

		    		<div class="content">
						<div class="scrollBar02">
							<div class="info_wr">
								<div class="insert_popup top_info" style="display: none;">
                                    <p><span style="color: #57BEA2;">*</span>은 필수입력 입니다.</p>
                                </div>
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 기본 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업자명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="coNm">사업자명</label>
								                        <input type="text" id="coNm" name="coNm" class="input clear" maxLength="80" 
								                        	   aria-label="사업자명" oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업자번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="insertBrno">사업자번호</label>
								                        <input type="text" id="insertBrno" name="insertBrno" class="input clear" 
								                        	   maxLength="12" aria-label="사업자번호" oninput="brnoFormat(this)"/>
<!-- 								                        <button id="requestDuple" class="yellow_btn">중복확인</button> -->
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업자등록증</th>
								                <td class="input-width">
								                    <div class="tb_flex filebox">
								                        <label for="bzmnLicenseAtch">사업자등록증</label>
								                        <input id="bzmnLicenseAtch" name="bzmnLicenseAtch" class="input no_line" aria-label="사업자등록증" readonly />
								                        <input type="file" id="bzFileUpload" name="files" class="hidden" accept=".jpg, .jpeg, .gif, .png" />
    													<button class="yellow_btn bzmnFileUpload">파일첨부</button>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업소종류</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bzmnSeCd">사업소종류</label>
								                        <input type="text" id="bzmnSeCd" class="bzmnSeCd" placeholder="사업소종류(선택)">
								                    </div>
								                </td>
								            </tr>
								            <tr class="upCompanyNo" style="display: none;">
								                <th scope="col"><span class="asterisk">*</span>주사무소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="insertUpBrno">주사무소</label>
								                        <input type="text" id="insertUpBrno" class="insertUpBrno" aria-label="주사무소" placeholder="주사무소">
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>대표자명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="rprsvNm">대표자명</label>
								                        <input type="text" id="rprsvNm" name="rprsvNm" class="input clear" maxLength="20" 
								                        	   aria-label="대표자명" oninput="textOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">법인번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="insertCrno">법인번호</label>
								                        <input type="text" id="insertCrno" name="insertCrno" class="input clear" 
								                        	   maxLength="14" aria-label="법인번호" oninput="crnoFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">법인인감증명서</th>
								                <td class="input-width">
								                    <div class="tb_flex filebox">
								                        <label for="cocosAtch">법인인감증명서</label>
								                        <input id="cocosAtch" name="cocosAtch" class="input no_line" aria-label="법인인감증명서" readonly />
								                        <input type="file" id="coFileUpload" name="files" class="hidden" accept=".jpg, .jpeg, .gif, .png" />
    													<button class="yellow_btn coFileUpload">파일첨부</button>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">사업게시일</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bizStrtDay">사업게시일</label>
								                        <input type="text" id="bizStrtDay" class="bizStrtDay" >
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 소재지 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								    	<table class="tb rental_tb01">
								    		<tr>
								    			<th scope="col">시도</th>
								    			<td>
								    				<div class="tb_flex aprv">
									    				<label for="sggCdCtpvNm">시도</label>
									    				<input type="text" id="sggCdCtpvNm" class="sggCdCtpvNm disabledOn" placeholder="시도(선택)" readonly />
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								                <th scope="col">도로명주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="roadNmAddr">도로명주소</label>
								                        <input type="text" id="roadNmAddr" name="roadNmAddr" class="input clear" maxLength="200" aria-label="도로명주소" readonly />
								                        <button class="yellow_btn addrBtn01">주소찾기</button>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">지번주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="lotnoAddr">지번주소</label>
								                        <input type="text" id="lotnoAddr" name="lotnoAddr" class="input clear" maxLength="200" aria-label="지번주소" readonly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차고지 도로명주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="garageRoadNmAddr">차고지 도로명주소</label>
								                        <input type="text" id="garageRoadNmAddr" name="garageRoadNmAddr" class="input clear"
								                        	   maxLength="200" aria-label="차고지 도로명주소" readonly />
								                        <button class="yellow_btn addrGrgInsert">주소찾기</button>
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    	<table class="tb rental_tb01">
								    		<tr>
								    			<th scope="col">시군구</th>
								    			<td>
								    				<div class="tb_flex aprv">
									    				<label for="sggCdSggNm">시군구</label>
									    				<input type="text" id="sggCdSggNm" class="sggCdSggNm disabledOn" placeholder="시군구(선택)" readonly />
							    					</div>
							    				</td>
							    			</tr>
			                                <tr>
								                <th scope="col">위치정보</th>
								                <td>
								                    <div class="tb_flex ms">
								                    	<span style="margin-right: 5px">위도</span>
								                        <label for="locationLat">위도</label>
								                        <input type="text" id="locationLat" name="locationLat" class="input readOnly" placeholder="위도" maxLength="20"
								                        		aria-label="위도" oninput="locationOnly(this)" style="width:39%;" />
						                        		<span style="margin: 0px 5px">경도</span>
								                        <label for="locationLot">경도</label>
								                        <input type="text" id="locationLot" name="locationLot" class="input readOnly" placeholder="경도" maxLength="20"
								                        		aria-label="경도" oninput="locationOnly(this)" style="width:39%;" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">상세주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="roadNmDaddr">상세주소</label>
								                        <input type="text" id="roadNmDaddr" name="roadNmDaddr" class="input clear" placeholder="상세주소를 입력해주세요." 
								                        	   maxLength="200" aria-label="상세주소" oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차고지 도로명상세주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="garageRoadNmDaddr">차고지 도로명상세주소</label>
								                        <input type="text" id="garageRoadNmDaddr" name="garageRoadNmDaddr" placeholder="차고지 도로명상세주소를 입력해주세요." 
								                        	   class="input clear" maxLength="200" aria-label="차고지 도로명상세주소" oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
			                        <div class="cont">
							    		<div class="mapName cont-flex" style="margin-bottom: 10px;">
							    			<h3>기업 위치</h3>
<!-- 							    			<span class="locationNo" style="color: #ff3838">* 주소찾기를 선택 후에도 사업자 위치가 나오지 않을 경우 지도에서 우클릭해주세요</span> -->
							    		</div>
							    		<div id="crprtCoordMap" style="width: 100%; height: 300px;"></div>
							    	</div>									    
								</div>
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 상태 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">영업상태</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bsnStts">영업상태</label>
								                        <input type="text" id="bsnStts" class="bsnStts" placeholder="영업상태(선택)">
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">상태변경일시</th>
								                <td>
								                    <div class="tb_flex data">
								                        <label for="bsnSttsMdfcnDt">상태변경일시</label>
								                        <input style="background-color:#F5F8FE;" type="text" id="bsnSttsMdfcnDt" name="bsnSttsMdfcnDt" class="bsnSttsMdfcnDt" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">연락처</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="telNumber">연락처</label>
								                        <input type="text" id="telNumber" name="telNumber" class="input clear" maxLength="13" 
								                        	   aria-label="연락처" oninput="telFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차량등록대수</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="vhclRegCntom">차량등록대수</label>
								                        <input type="number" id="vhclRegCntom" name="vhclRegCntom" maxLength="7" class="input clear" 
								                        	   aria-label="차량등록대수" oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">승용차대수</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="sednCarNoh">승용차대수</label>
								                        <input type="number" id="sednCarNoh" name="sednCarNoh" maxLength="7" class="input clear" 
								                        	   aria-label="승용차대수" oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">승합차대수</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="passVhcleNoh">승합차대수</label>
								                        <input type="number" id="passVhcleNoh" name="passVhcleNoh" maxLength="7" class="input clear" 
								                        	   aria-label="차량등록대수" oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">평일운영시간</th>
								                <td>
								                    <ul class="hours">
								                        <li class="hour_input">
								                            <label for="operBgngDt">평일운영시간</label>
								                            <input id="operBgngDt" name="operBgngDt" maxLength="5" class="input clear" aria-label="평일운영시간" 
								                            	   placeholder="00:00" oninput="timeFormat(this)" />
								                        </li>
								                        <li class="bar">~</li>
								                        <li class="hour_input">
								                            <label for="operEndDt">평일운영시간</label>
								                            <input id="operEndDt" name="operEndDt" maxLength="5" class="input clear" aria-label="평일운영시간" 
								                            	   placeholder="00:00" oninput="timeFormat(this)" />
								                        </li>
								                    </ul>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">전기승용차</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="elecSednCarNoh">전기승용차</label>
								                        <input type="number" id="elecSednCarNoh" name="elecSednCarNoh" maxLength="7" class="input clear" 
								                        	   aria-label="전기승용차" oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">전기승합차</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="elecPassVhcleNoh">전기승합차</label>
								                        <input type="number" id="elecPassVhcleNoh" name="elecPassVhcleNoh" maxLength="7" class="input clear" 
								                        	   aria-label="전기승합차" oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col" class="note_name">비고</th>
								                <td class="textarea_wr">
								                    <label for="insertRmrk">비고</label>
								                    <textarea id="insertRmrk" name="insertRmrk" maxLength="1000" cols="30" rows="10" class="noteBox clear" 
								                			  style="height:130px !important;" aria-label="비고" oninput="charOnly(this)" ></textarea>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>
							</div>
						</div>

						<div class="btn_flex">
							<button class="blue_btn insertBtn" value="Insert">등록요청</button>
							<button class="gray_btn cancelBtn" value="Cancel">닫기</button>
						</div>
					</div>
		        </div>
		    </div>
		    <!-- 영업소 등록 팝업, 끝 -->
		    
		    <!-- 내 기업정보 수정요청, 시작-->
			<div id="updatePopup" class="popup detail_popup popup_type02" style="z-index: 999">
		        <div class="box">
		            <div class="popup_top">
		                <h4>내 기업정보 수정</h4>
		                <div class="close d_Close">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

					<div class="detail_popup content">
			            <div class="scrollBar02">
			                <div class="info_wr">
			                	<div class="insert_popup top_info" style="display: none;">
                                    <p><span style="color: #57BEA2;">*</span>은 필수입력 입니다.</p>
                                </div>
			                    <div class="contBox">
			                        <div class="nameBox nameBox-flex">
			                            <h4 class="name">회사 기본 정보</h4>
			                        </div>
			                        <div class="cont cont-flex">
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업자명</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="co_nm">사업자명</label>
				                                        <input type="text" id="co_nm" name="co_nm" maxLength="80" class="input readOnly s03auth" 
				                                        	   aria-label="사업자명" oninput="charOnly(this)" />
				                                        <input type="text" id="update_bzmn_sn" hidden=true />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업자번호</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="updateBrno">사업자번호</label>
				                                        <input type="text" id="updateBrno" name="updateBrno" maxLength="12" class="input readOnly s03auth" 
				                                        	   aria-label="사업자번호" oninput="brnoFormat(this)" />
<!-- 				                                        <button id="fixrequestDuple" class="yellow_btn detailDuplcChk noBtn">중복확인</button> -->
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업자등록증</th>
			                                    <td class="input-width">
			                                    	<div style="" class="tb_flex filebox ms">
														<label for="bzmnLicenseAtchNm">사업자등록증</label>
														<input style="display: none;" id="bzFileNo" class="hidden" aria-label="사업자등록증 파일 번호" readonly />
														<input id="bzmnLicenseAtchNm" name="bzmnLicenseAtchNm" class="input no_line readOnly" aria-label="사업자등록증" readonly />
														<input type="file" id="bzmnDetailFileUpload" name="files" class="hidden" accept=".jpg, .jpeg, .gif, .png" />
														<button class="yellow_btn bzmnDetailFileUpload noBtn s03authBtn">파일첨부</button>
													</div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업소종류</th>
			                                    <td>
				                                    <div class="tb_flex ms aprv1 aprv">
				                                    	<label for="bzmn_se_cd_nm">사업소종류</label>
				                                    	<input style="background-color:#F5F8FE;" type="text" id="bzmn_se_cd_nm" class="bzmn_se_cd_nm s03authDs" placeholder="사업소종류(선택)"/>
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr class="upCompanyNo" style="display: none;">
								                <th scope="col"><span class="asterisk">*</span>주사무소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="updateUpBrno">주사무소</label>
								                        <input type="text" id="updateUpBrno" class="updateUpBrno s03authDs" aria-label="주사무소" placeholder="주사무소">
								                    </div>
								                </td>
								            </tr>
			                            </table>
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>대표자명</th>
			                                    <td>
			                                    	<div style="" class="tb_flex rprsv_nm ms">
				                                        <label for="rprsv_nm">대표자명</label>
				                                        <input type="text" id="rprsv_nm" name="rprsv_nm" maxLength="20" class="input readOnly s03auth" 
				                                        	   aria-label="대표자명" oninput="textOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">법인번호</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="crno">법인번호</label>
				                                        <input type="text" id="crno" name="crno" class="input readOnly s03auth" maxLength="14" 
				                                        	   aria-label="법인번호" oninput="crnoFormat(this)" />
				                                    </div>
				                                </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">법인인감증명서</th>
		                                    	<td class="input-width">
		                                    		<div style="" class="tb_flex filebox ms">
														<label for="cocsAtchNm">법인인감증명서</label>
														<input style="display: none;" id="coFileNo" class="hidden" aria-label="법인인감증명서 파일 번호" readonly />
														<input id="cocsAtchNm" name="cocsAtchNm" class="input no_line readOnly" aria-label="법인인감증명서" readonly />
														<input type="file" id="coDetailFileUpload" name="files" class="hidden" accept=".jpg, .jpeg, .gif, .png" />
														<button class="yellow_btn coDetailFileUpload noBtn s03authBtn">파일첨부</button>
													</div>
		                                    	</td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">사업게시일</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms aprv2 data">
				                                        <label for="biz_strt_day">사업게시일</label>
				                                    	<input style="background-color:#F5F8FE;" type="text" id="biz_strt_day" class="biz_strt_day s03authDs" />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                        </div>
			                    </div>
			                    <div class="contBox">
			                        <div class="nameBox nameBox-flex">
			                            <h4 class="name">회사 소재지 정보</h4>
			                        </div>
			                        <div class="cont cont-flex">
			                        	<table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">시도</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms aprv">
				                                        <label for="ctpv_nm">시도</label>
				                                        <input type="text" id="ctpv_nm" class="ctpv_nm disabledOn s03authDs" placeholder="시도(선택)" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">도로명주소</th>
			                                    <td>
				                                   <div style="" class="tb_flex ms">
				                                        <label for="road_nm_addr">도로명주소</label>
				                                        <input type="text" id="road_nm_addr" name="road_nm_addr" class="input readOnly s03auth" maxLength="200" 
				                                        	   aria-label="도로명주소" readOnly />
				                                        <button class="yellow_btn addrBtn11 noBtn s03authBtn">주소찾기</button>
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">지번주소</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="lotno_addr">지번주소</label>
				                                        <input type="text" id="lotno_addr" name="lotno_addr" class="input readOnly s03auth" maxLength="200" 
				                                        	   aria-label="지번주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차고지 도로명주소</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="garage_road_nm_addr">차고지 도로명주소</label>
				                                        <input type="text" id="garage_road_nm_addr" name="garage_road_nm_addr" class="input readOnly s03auth" 
				                                        	   maxLength="200" aria-label="차고지 도로명주소" readOnly />
				                                        <button class="yellow_btn addrGrgUpdate noBtn s03authBtn">주소찾기</button>
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb01">
			                            	<tr>
			                                    <th scope="col">시군구</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms aprv">
				                                        <label for="sgg_nm">시군구</label>
				                                        <input type="text" id="sgg_nm" class="sgg_nm disabledOn s03authDs" placeholder="시군구(선택)" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
								                <th scope="col">위치정보</th>
								                <td>
								                    <div class="tb_flex ms">
								                    	<span style="margin-right: 5px">위도</span>
								                        <label for="location_lat">위도</label>
								                        <input type="text" id="location_lat" name="location_lat" class="input readOnly s03auth" placeholder="위도" maxLength="12"
								                        		aria-label="위도" oninput="locationOnly(this)" style="width:39%;" />
						                        		<span style="margin: 0px 5px">경도</span>
								                        <label for="location_lot">경도</label>
								                        <input type="text" id="location_lot" name="location_lot" class="input readOnly s03auth" placeholder="경도" maxLength="12"
								                        		aria-label="경도" oninput="locationOnly(this)" style="width:39%;" />
								                    </div>
								                </td>
								            </tr>
			                                <tr>
			                                    <th scope="col">상세주소</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="road_nm_daddr">상세주소</label>
				                                        <input type="text" id="road_nm_daddr" name="road_nm_daddr" class="input readOnly s03auth" 
				                                        	   maxLength="200" placeholder="상세주소를 입력해주세요." aria-label="상세주소" oninput="charOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차고지 도로명상세주소</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="garage_road_nm_daddr">차고지 도로명상세주소</label>
				                                        <input type="text" id="garage_road_nm_daddr" name="garage_road_nm_daddr" class="input readOnly s03auth" 
				                                        	   placeholder="차고지 도로명상세주소를 입력해주세요." maxLength="200" aria-label="차고지 도로명상세주소" oninput="charOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                        </div>
			                        <div class="cont">
							    		<div class="mapName cont-flex" style="margin-bottom: 10px;">
							    			<h3>기업 위치</h3>
<!-- 							    			<span class="locationNo" style="color: #ff3838">* 주소찾기를 선택 후에도 사업자 위치가 나오지 않을 경우 지도에서 우클릭해주세요</span> -->
							    		</div>
							    		<div id="crprt_coord_map" style="width: 100%; height: 300px;"></div>
							    	</div>			                        
			                    </div>
			                    <div class="contBox">
			                        <div class="nameBox nameBox-flex">
			                            <h4 class="name">회사 상태 정보</h4>
			                        </div>
			                        <div class="cont cont-flex flex-type02">
			                            <table class="tb rental_tb01 tb01">
			                                <tr>
			                                    <th scope="col">영업상태</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms aprv1 aprv">
				                                        <label for="bsn_stts_cd_nm">영업상태</label>
				                                        <input style="background-color:#F5F8FE;" type="text" id="bsn_stts_cd_nm" class="bsn_stts_cd_nm s03authDs" placeholder="영업상태(선택)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">상태변경일시</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms data">
				                                        <label for="bsn_stts_mdfcn_dt">상태변경일시</label>
				                                        <input type="text" id="bsn_stts_mdfcn_dt" name="bsn_stts_mdfcn_dt s03auth" class="s03authDs" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">연락처</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="telno">연락처</label>
				                                        <input type="text" id="telno" name="telno" class="input readOnly s03auth" maxLength="13" 
				                                        	   aria-label="연락처" oninput="telFormat(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차량등록대수</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="vhcl_reg_noh">차량등록대수</label>
				                                        <input type="number" id="vhcl_reg_noh" name="vhcl_reg_noh" class="input readOnly s03auth" 
				                                        	   maxLength="7" aria-label="차량등록대수" oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">승용차대수</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="sedn_car_noh">승용차대수</label>
				                                        <input type="number" id="sedn_car_noh" name="sedn_car_noh" class="input readOnly s03auth" 
				                                        	   maxLength="7" aria-label="승용차대수" oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">승합차대수</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="pass_vhcle_noh">승합차대수</label>
				                                        <input type="number" id="pass_vhcle_noh" name="pass_vhcle_noh" class="input readOnly s03auth" 
				                                        	   maxLength="7" aria-label="승합차대수" oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                            		<th scope="col" class="note_name">최근 수정사유</th>
			                                	<td class="textarea_wr">
				                                  	<div class="tb_flex">
					                                    <label for="mdfcn_rsn">최근 수정사유</label>
					                                    <textarea id="mdfcn_rsn" name="mdfcn_rsn" class="noteBox readOnlyGrayBtn s03auth" style="background-color: #f5f5f5;" cols="10" rows="5"
					                                    		aria-label="수정사유" oninput="content(this)" readOnly></textarea>
			                                  		</div>
			                                  	</td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb02 tb02">
			                                <tr>
			                                    <th scope="col">평일운영시간</th>
			                                    <td>
			                                    	<div style="" class="tb_flex ms">
				                                        <ul class="hours">
				                                            <li class="hour_input">
					                                            <label for="oper_bgng_dt">평일운영시간</label>
					                                            <input id="oper_bgng_dt" name="oper_bgng_dt" maxLength="5" class="input readOnly s03auth" 
					                                            	   aria-label="평일운영시간" placeholder="00:00" oninput="timeFormat(this)" />
				                                            </li>
				                                            <li class="bar">~</li>
				                                            <li class="hour_input">
					                                            <label for="oper_end_dt">평일운영시간</label>
					                                            <input id="oper_end_dt" name="oper_end_dt" maxLength="5" class="input readOnly s03auth" 
					                                            	   aria-label="평일운영시간" placeholder="00:00" oninput="timeFormat(this)" />
				                                            </li>
				                                        </ul>
			                                        </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">전기승용차</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="elec_sedn_car_noh">전기승용차</label>
				                                        <input type="number" id="elec_sedn_car_noh" name="elec_sedn_car_noh" class="input readOnly s03auth" 
				                                        	   maxLength="7" aria-label="전기승용차" oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">전기승합차</th>
			                                    <td>
				                                    <div style="" class="tb_flex ms">
				                                        <label for="elec_pass_vhcle_noh">전기승합차</label>
				                                        <input type="number" id="elec_pass_vhcle_noh" name="elec_pass_vhcle_noh" class="input readOnly s03auth" 
				                                        	   maxLength="7" aria-label="전기승합차" oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col" class="note_name">비고</th>
			                                    <td class="textarea_wr">
			                                    	<div style="" class="tb_flex ms">
				                                        <label for="rmrk">비고</label>
				                                        <textarea id="rmrk" name="rmrk" maxLength="1000" cols="30" rows="10" class="s03auth noteBox readOnly" 
				                                        		  style="height:130px !important;" oninput="charOnly(this)" aria-label="비고" ></textarea>
			                                    	</div>
			                                    </td>
			                                </tr>
			                                <tr id="mdfcnAuth" style="display: none;">
			                            		<th scope="col" class="note_name">수정사유 입력</th>
			                                	<td class="textarea_wr">
				                                  	<div class="tb_flex">
					                                    <label for="insert_mdfcn_rsn">수정사유 입력</label>
					                                    <textarea id="insert_mdfcn_rsn" name="insert_mdfcn_rsn" class="noteBox s03auth" maxLength="1000" 
					                                    		  cols="10" rows="5" aria-label="수정사유" oninput="content(this)" ></textarea>
			                                  		</div>
			                                  	</td>
			                                </tr>
			                            </table>
			                        </div>
			                    </div>
			                </div>
			            </div>
			            <div class='btn_flex'>
			            	<button style="margin-right: 10px; display: none;" class='blue_btn updateBtn_btn' value="Update">수정요청</button>
			                <button class='gray_btn cancelBtn' type="submit" value="Cancel">닫기</button>
			            </div>
			        </div>
		        </div>
		    </div>
		    <!-- 내 기업정보 수정요청, 끝-->
		    
		    <!-- 상세보기 팝업, 시작-->
			<div id="detailPopup" class="popup detail_popup popup_type02" style="z-index: 999">
		        <div class="box" style="max-width: 500px;">
		            <div class="popup_top"> 
		                <h4>기업사용자 상세</h4>
		                <div id="" class="close detailPop_close">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

					<div class="detail_popup content">
			        	<div class="info_wr" style="height:auto;">
			            	<div class="contBox">
			                	<div class="nameBox nameBox-flex">
			                    	<h4 class="name">상세 정보</h4>
			                    </div>
			                    <div class="cont cont-flex">
			                    	<table class="tb rental_tb01">
			                        	<tr>
			                            	<th scope="col" style="width:160px">아이디</th>
			                                <td>
				                            	<div class="tb_flex ms dMargin">
				                                	<span id="d_userId"></span>
				                                </div>
			                                </td>
			                            </tr>
			                            <tr>
			                            	<th scope="col" style="width:160px">성명</th>
			                                <td>
				                            	<div class="tb_flex ms dMargin">
				                            		<span id="d_userNm"></span>
				                                </div>
			                                </td>
			                            </tr>
			                            <tr>
			                            <th scope="col" style="width:160px">연락처</th>
			                            	<td>
				                            	<div class="tb_flex ms dMargin">
				                            		<span id="d_telno"></span>
				                                </div>
			                                </td>
			                            </tr>
			                            <tr>
			                            	<th scope="col" style="width:160px">이메일</th>
			                                <td>
			                                	<div class="tb_flex ms dMargin">
			                                		<span id="d_email"></span>
												</div>
			                                </td>
			                            </tr>
			                            <tr>
			                            	<th scope="col" style="width:160px">상태</th>
			                                <td>
				                            	<div class="tb_flex ms dMargin">
				                                	<span id="d_state"></span>
				                                </div>
			                                </td>
			                            </tr>
			                            <tr>
			                            	<th scope="col" style="width:160px">권한</th>
			                            	<td>
				                            	<div class="tb_flex ms dMargin">
				                                	<span id="d_author"></span>
				                                </div>
			                                </td>
			                            </tr>
			                            <tr>
			                            	<th scope="col" style="width:160px">승인자</th>
			                                <td>
				                            	<div class="tb_flex ms dMargin">
				                                	<span id="d_approve"></span>
				                                </div>
			                                </td>
			                            </tr>
			                        </table>
			                    </div>
			                </div>
			            </div>
			            <br />
			            <div id="rjrs_div" class="vOff" style="display:none;">
			            	반려사유 : 
			            	<input id="rejection_reason" class="input readOnly" aria-label="반려이유" maxLength="20" style="width:68%; height:25px;" placeholder="20자내로 작성해주세요" />
			            	<button id="reject_agree" class="rejectReasonAgree">확인</button>
			            </div>
			            <div class='btn_flex'>
<!-- 				            <button style="display:none;" class='blue_btn pause_btn' value="Pause">일시정지</button> -->
<!-- 				            <button style="display:none;" class='blue_btn pauseRelease_btn' value="pauseRelease">일시정지해제</button> -->
				            <button style="display:none;" class='blue_btn approve_btn' value="Approve">승인</button>
				            <button style="display:none;" class='blue_btn reject_btn' value="Reject">반려</button>
				            <button style="display:none;" class='blue_btn disconnect_btn' value="Disconnect">장기미접속해제</button>
				            <button style="display:none; margin-right: 0px;" class='blue_btn delete_btn' value="Delete">사용자 삭제</button>
			            </div>
			            <div class='btn_flex'>
			                <button class='gray_btn detailPop_close' type="submit" value="Cancel">닫기</button>
			            </div>
			        </div>
		        </div>
		    </div>
		    <!-- 상세보기 팝업, 끝 -->

		    <!-- 기업정보 관리 도로명/지번주소 다이얼로그 -->
		    <div id="dialog"></div>
        </div>
    </div>
</div>