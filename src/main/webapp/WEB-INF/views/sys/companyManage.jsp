<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<%@ include file="../cmm/include_gis.jsp" %>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="${contextPath}/js/sys/companyManage.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/companyManage.css" />

<!-- 다음 주소검색 API -->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>

<script>
    var authrtCd = '${authrtCd}';
    var getCmptncZoneCd = '';
    var getBzmnSn = '';
    if (authrtCd == 'Z01' || authrtCd == 'M01' || authrtCd == 'K01') {
    	getCmptncZoneCd = '';
	} else if (authrtCd == 'G01' || authrtCd == 'G02') {
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
#container > div > div.contBox.lastBox02 > div.k-grid.k-widget.k-grid-display-block > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
	justify-content: center;
}
#compCar > div > div.content > div > div > div > div.k-grid-norecords {
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
                    <h2>사업자 관리</h2>
                </div>
                <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">사업자 관리</li>
                </ul>
            </div>

            <!-- 조회조건 -->
            <div class="search_top">
            	<form action="#" name="searchForm" id="searchForm" method="post">
					<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
					<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
					    <div class="selec_wr">
					        <div class="mo_flex">
						        <ul class="selec_box">
		                            <li class="li_slec">
		                                <label for="searchCtpvNm" hidden>시도(전체)</label>
		                                <input type="text" id="searchCtpvNm" class="searchCtpvNm" aria-label="시도(전체)" placeholder="시도(전체)">
		                            </li>
		                        </ul>
		                        <ul class="selec_box">
		                            <li class="li_slec">
		                                <label for="searchSggNm" hidden>시군구(전체)</label>
		                                <input type="text" id="searchSggNm" class="searchSggNm" aria-label="시군구(전체)" placeholder="시군구(전체)">
		                            </li>
		                        </ul>
		                        <ul class="selec_box">
		                            <li class="li_slec">
		                                <label for="searchAprvStts" hidden>승인상태(전체)</label>
		                                <input type="text" id="searchAprvStts" class="searchAprvStts" aria-label="승인상태(전체)" placeholder="승인상태(전체)">
		                            </li>
		                        </ul>
		                        <ul class="selec_box">
		                            <li class="li_slec">
		                                <label for="searchBsnStts" hidden>영업상태(전체)</label>
		                                <input type="text" id="searchBsnStts" class="searchBsnStts" aria-label="영업상태(전체)" placeholder="영업상태(전체)">
		                            </li>
		                        </ul>
		                        <ul class="selec_box">
		                            <li class="li_slec">
		                                <label for="authSelected" hidden>권한(전체)</label>
		                                <input type="text" id="authSelected" class="authSelected" aria-label="권한(전체)" placeholder="권한(전체)">
		                            </li>
		                        </ul>
		                        <ul class="selec_box">
		                            <li class="li_slec">
		                                <label for="delYn" hidden>삭제여부(전체)</label>
		                                <input type="text" id="delYn" class="authSelected" aria-label="삭제여부(전체)" placeholder="삭제여부(전체)">
		                            </li>
		                        </ul>
						        <ul class="selec_box">
		                            <li class="li_slec">
			                            <label for="selectCond" hidden>조건선택</label>
			                            <input type="text" id="selectCond" class="selectCond" aria-label="조건선택"  placeholder="조건선택" />
		                            </li>
		                        </ul>
						        <ul class="selec_box">
		                            <li class="li_slec">
			                            <label for="searchWrd" hidden>조회조건</label>
			                            <input type="text" id="searchWrd" class="searchWrd input" aria-label="조건 선택 후,검색어를 입력하세요."  placeholder="조건 선택 후, 검색어를 입력하세요." maxLength="80" oninput="charOnly(this)" />
		                            </li>
		                        </ul>
		                        <ul class="selec_box mSelect_box">
									<li class="li_slec">
										<input id="searchChk01" type="radio" name="searchChk" aria-label="관할지 체크" value="jurisdiction" checked />
		 			                    <label for="searchChk01" class="mSearchChk01">관할지</label>
		 			                    <input id="searchChk02" type="radio" name="searchChk" aria-label="소재지 체크" value="location"/>
		 			                    <label for="searchChk02">소재지</label>
									</li>
		                        </ul>
					        </div>
					        <button class="yellow_btn searchBtn" type="button">
					        	조회
					        	<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘" />
					        </button>
					    </div>
			    	</form>

			    <div class="tooltop_wr">
			        <p class="info"><span>※</span> 렌터카 업체에 대한 관할지 변경 안내</p>
			        <div class="tooltip">
			            <button>
			                <img src="${contextPath}/images/sub/ico_tooltip.png" alt="" />
			            </button>
			            <span class="tooltiptext tooltip-right">
			            	렌터카 업체 주사무소의 관할 지역 변경 및 관련 업무 처리 시 중복 입력이나 오류가 발생하는 경우 아래 연락처로 문의해 주시기 바랍니다. <br />
							지자체 내 렌터카 업체의 영업 상태에 변동이 있는 경우 즉시 업데이트 부탁드리며, 다른 지자체로 이관이 필요할 경우에는 해당 지자체의 이관 요청 절차를 진행해 주시기 바랍니다. <br />
							기타 문의사항이 있을 경우, 모빌리티처 이유라 선임연구원에게 연락 주십시오. 연락처: 054-459-7461 <br />
			            </span>
			        </div>
			    </div>
			</div>

			<!-- 사업자관리 그리드 -->
			<div class="contBox lastBox02">
                <div class="nameBox nameBox-flex">
                    <h4 class="name">사업자 관리</h4>
                    <button class="download-btn excelDownBtn" type="button">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>

                <table id="cmpnymanageGrid" style="width:2000px;">
                    <caption>사업자 관리</caption>
                </table>
            </div>

			<div class="btn_flex">
			    <button style="display: none" type="button" class="blue_btn insertPopupBtn">등록</button>
			</div>

			<!-- 사업자관리 등록 팝업 -->
			<div class="popup register_popup popup_type02 popup" style="z-index: 999">
		        <div id="insertPopup" class="box">
		            <div class="popup_top">
		                <h4>사업자 관리 등록</h4>
		                <div class="close insertClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

		    		<div class="content">
						<div class="scrollBar02">
							<div class="info_wr">
								<div class="insert_popup top_info">
                                    <p>(<span style="color: #57BEA2;">*</span>)은 필수입력 입니다.</p>
                                </div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 기본 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">등록지역</th>
								                <td>
								                	<div style="display: none;" class="tb_flex admin">
								                        <label for="adminCmptncZoneCdCtpvNm">등록지역</label>
								                        <input type="text" id="adminCmptncZoneCdCtpvNm" name="adminCmptncZoneCdCtpvNm"
																class="input no_line" aria-label="등록지역" placeholder='등록지역' />
								                    </div>
								                    <div style="display: none;" class="tb_flex g01">
								                        <label for="cmptncZoneCdCtpvNm">등록지역</label>
								                        <input type="text" id="cmptncZoneCdCtpvNm" name="cmptncZoneCdCtpvNm"
																class="input no_line" aria-label="등록지역" placeholder='등록지역' readOnly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">등록지자체</th>
								                <td>
								                	<div style="display: none;" class="tb_flex admin">
								                        <label for="adminCmptncZoneCdSggNm">등록지자체</label>
								                        <input type="text" id="adminCmptncZoneCdSggNm" name="adminCmptncZoneCdSggNm"
																class="input no_line" aria-label="등록지자체" placeholder='등록지자체' />
								                    </div>
								                    <div style="display: none;" class="tb_flex g01">
								                        <label for="cmptncZoneCdSggNm">등록지자체</label>
								                        <input type="text" id="cmptncZoneCdSggNm" name="cmptncZoneCdSggNm"
																class="input no_line" aria-label="등록지자체" placeholder='등록지자체' readOnly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 기본 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>회사명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="coNm">회사명</label>
								                        <input type="text" id="coNm" name="coNm" class="input clear" maxLength="80" aria-label="회사명"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업자등록번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="insertBrno">사업자등록번호</label>
								                        <input type="text" id="insertBrno" name="insertBrno" class="input clear" maxlength="12" aria-label="사업자등록번호"
								                               oninput="brnoFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업자등록증</th>
								                <td class="input-width">
								                    <div class="tb_flex filebox">
								                        <label for="bzmnLicenseAtch">사업자등록증</label>
								                        <input id="bzmnLicenseAtch" name="bzmnLicenseAtch" class="input no_line" aria-label="사업자등록증" readonly />
								                        <label for="bzFileUpload" class="hidden">사업자등록증 파일</label>
								                        <input type="file" id="bzFileUpload" name="files" class="hidden" aria-label="사업자등록증 파일" onchange='fileAddCheck(this)' accept=".jpg, .jpeg, .gif, .png, .pdf">
    													<button class="yellow_btn bzmnFileUpload">파일첨부</button>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>사업소종류</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bzmnSeCd">사업소종류</label>
								                        <input type="text" id="bzmnSeCd" class="bzmnSeCd" aria-label="사업소종류(선택)" placeholder="사업소종류(선택)">
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
								                        <input type="text" id="rprsvNm" name="rprsvNm" class="input clear" maxLength="20" aria-label="대표자명"
								                               oninput="textOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">법인등록번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="insertCrno">법인등록번호</label>
								                        <input type="text" id="insertCrno" name="insertCrno" class="input clear" maxLength="14" aria-label="법인등록번호"
								                               oninput="crnoFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">법인인감증명서</th>
								                <td class="input-width">
								                    <div class="tb_flex filebox">
								                        <label for="cocosAtch">법인인감증명서</label>
								                        <input id="cocosAtch" name="cocosAtch" class="input no_line" aria-label="법인인감증명서" readonly />
								                        <label for="coFileUpload" class="hidden">법인인감증명서 파일</label>
								                        <input type="file" id="coFileUpload" name="files" class="hidden" aria-label="법인인감증명서 파일" onchange='fileAddCheck(this)' accept=".jpg, .jpeg, .gif, .png, .pdf">
    													<button class="yellow_btn coFileUpload">파일첨부</button>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">사업게시일</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bizStrtDay">사업게시일</label>
								                        <input type="text" id="bizStrtDay" class="bizStrtDay" aria-label="사업게시일" />
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
								    				<label for="ctpvNm">시도</label>
								    				<input type="text" id="ctpvNm" name="ctpvNm" class="input readOnlyGrayBtn" aria-label="시도" placeholder="시도" readonly />
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								                <th scope="col">도로명주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="roadNmAddr">도로명주소</label>
								                        <input type="text" id="roadNmAddr" name="roadNmAddr" class="input readOnlyGrayBtn" maxLength="200" aria-label="도로명주소" readonly />
								                        <button id="addrBtn01" class="yellow_btn" onClick="javaScript:$cmpnymanage.event.addr('insert', 'office');">주소찾기</button>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">지번주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="lotnoAddr">지번주소</label>
								                        <input type="text" id="lotnoAddr" name="lotnoAddr" class="input readOnlyGrayBtn" maxLength="200" aria-label="지번주소" readonly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차고지 도로명주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="garageRoadNmAddr">차고지 도로명주소</label>
								                        <input type="text" id="garageRoadNmAddr" name="garageRoadNmAddr"
								                        		class="input readOnlyGrayBtn" maxLength="200" aria-label="차고지 도로명주소" readonly />
								                        <button id="addrBtn02" class="yellow_btn" onClick="javaScript:$cmpnymanage.event.addr('insert', 'garage');">주소찾기</button>
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    	<table class="tb rental_tb01">
								    		<tr>
								    			<th scope="col">시군구</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="sggNm">시군구</label>
								    				<input type="text" id="sggNm" name="sggNm" class="input readOnlyGrayBtn" aria-label="시군구" placeholder="시군구" readonly />
								    				<input type="hidden" id="sggNm_hide" name="sggNm_hide" class="input readOnlyGrayBtn"  />
							    					</div>
							    				</td>
							    			</tr>
								            <tr>
								                <th scope="col">위치정보</th>
								                <td>
								                    <div class="tb_flex">
								                    	<span style="margin-right: 5px">위도</span>
								                        <label for="lat">위도</label>
								                        <input type="text" id="lat" name="lat" class="input clear" placeholder="위도" maxLength="20"
								                        	   aria-label="위도" oninput="locationOnly(this)" style="width:39%;" />
						                        		<span style="margin: 0px 5px">경도</span>
								                        <label for="lot">경도</label>
								                        <input type="text" id="lot" name="lot" class="input clear" placeholder="경도" maxLength="20" 
								                        	   aria-label="경도" oninput="locationOnly(this)" style="width:39%;" />
								                    </div>
								                </td>
								            </tr>
							    			<tr>
								                <th scope="col">상세주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="roadNmDaddr">상세주소</label>
								                        <input type="text" id="roadNmDaddr" name="roadNmDaddr" class="input clear" placeholder="상세주소를 입력해주세요." maxLength="200"
								                               aria-label="상세주소" oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차고지 도로명상세주소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="garageRoadNmDaddr">차고지 도로명상세주소</label>
								                        <input type="text" id="garageRoadNmDaddr" name="garageRoadNmDaddr" placeholder="차고지 도로명상세주소를 입력해주세요." class="input clear"
								                               maxLength="200" aria-label="차고지 도로명상세주소" oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
								    <div class="cont">
							    		<div class="mapName cont-flex" style="margin-bottom: 10px;">
							    			<h3>사업자 위치</h3>
							    			<span class="locationNo" style="color: #ff3838">※ 주소찾기를 선택 후에도 사업자 위치가 나오지 않을 경우 지도에서 위치를 클릭하세요</span>
							    		</div>
							    		<div id="insertMap" class="insertPopupMap" style="width: 100%; height: 300px;"></div>
							    	</div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 상태 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>영업상태</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bsnStts">영업상태</label>
								                        <input type="text" id="bsnStts" class="bsnStts" aria-label="영업상태(선택)" placeholder="영업상태(선택)">
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">상태변경일시</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bsnSttsMdfcnDt">상태변경일시</label>
								                        <input type="text" id="bsnSttsMdfcnDt" name="bsnSttsMdfcnDt" class="bsnSttsMdfcnDt" aria-label="상태변경일시" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">연락처</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="telNumber">연락처</label>
								                        <input type="text" id="telNumber" name="telNumber" class="input clear" maxLength="13" aria-label="연락처"
								                               oninput="telFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차량등록대수</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="vhclRegCntom">차량등록대수</label>
								                        <input type="text" id="vhclRegCntom" name="vhclRegCntom" maxLength="7" class="input clear" aria-label="차량등록대수"
								                               oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">승용차대수</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="sednCarNoh">승용차대수</label>
								                        <input type="text" id="sednCarNoh" name="sednCarNoh" maxLength="7" class="input clear" aria-label="승용차대수"
								                               oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">승합차대수</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="passVhcleNoh">승합차대수</label>
								                        <input type="text" id="passVhcleNoh" name="passVhcleNoh" maxLength="7" class="input clear" aria-label="차량등록대수"
								                               oninput="numberOnly(this)" />
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
								                            <input type="text" id="operBgngDt" name="operBgngDt" maxLength="5" class="input clear" aria-label="평일운영시간"
								                            	   placeholder="00:00" oninput="timeFormat(this)"/>
								                        </li>
								                        <li class="bar">~</li>
								                        <li class="hour_input">
								                            <label for="operEndDt">평일운영시간</label>
								                            <input type="text" id="operEndDt" name="operEndDt" maxLength="5" class="input clear" aria-label="평일운영시간"
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
								                        <input type="text" id="elecSednCarNoh" name="elecSednCarNoh" maxLength="7" class="input clear" aria-label="전기승용차"
								                               oninput="numberOnly(this)"/>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">전기승합차</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="elecPassVhcleNoh">전기승합차</label>
								                        <input type="text" id="elecPassVhcleNoh" name="elecPassVhcleNoh" maxLength="7" class="input clear" aria-label="전기승합차"
								                               oninput="numberOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col" class="note_name">비고</th>
								                <td class="textarea_wr">
								                	<div class="tb_flex">
								                		<label for="insertRmrk">비고</label>
								                		<textarea id="insertRmrk" name="insertRmrk" maxLength="1000" cols="30" rows="5" class="noteBox" 
								                				  aria-label="비고" oninput="charOnly(this)" ></textarea>
									                </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>
							</div>
						</div>

						<div class="btn_flex">
							<button class="blue_btn insertBtn" value="Insert">등록</button>
							<button class="gray_btn cancelBtn insertClose" value="Cancel">닫기</button>
						</div>
					</div>
		        </div>
		    </div>

			<!-- 사업자관리 상세 팝업 (수정가능) -->
			<div class="popup detail_popup popup_type02 modifiable popup" style="display:none; z-index: 999">
		        <div class="box">
		            <div class="popup_top">
		                <h4>사업자 관리 상세</h4>
		                <div class="close detailClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

					<div class="detail_popup content">
			            <div class="scrollBar02">
			                <div class="info_wr">
			                	<div style="display: none;" class="top_info legend update_top_info">
	                                <p> 기입된 내용은</p>
	                                	<div class="circle"></div>
                                       	<span style="color: black;">현재 내용정보</span>
	                                	<div class="apCircle"></div>
                                       	<span class="count">수정 요청된 내용정보</span>
								</div>								
			                	<div style="display: none;" class="insert_popup top_info insert_top_info">
                                    <p>(<span style="color: #57BEA2;">*</span>)은 필수입력 입니다.</p>
                                </div>
                                <div id = "businessStatus" style ="color: #364BC6;"></div>
                                <div class="contBox">
                                	<div class="nameBox nameBox-flex">
			                            <h4 class="name">사업자 일련번호</h4>
			                        </div>
			                        <div class="cont cont-flex">
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">사업자 일련번호</th>
		                                    	<td>
		                                    		<div class="tb_flex">
				                                    	<label for="company_no">사업자 일련번호</label>
				                                    	<input type="text" id="company_no" name="company_no" class="input no_line" aria-label="사업자 일련번호" readOnly/>
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table style="display: none;" class="tb rental_tb01 g01Arv" >
			                                <tr>
			                                    <th scope="col">요청상태</th>
		                                    	<td>
		                                    		<div class="tb_flex">
		                                    			<button style="width: 100%;" id="transferBtn" name="transferBtn" class="transferBtn ap_btn">지자체 이관요청</button>
		                                    			<button style="width: 100%;" id="transferBtn2" name="transferBtn2" class="transferBtn2 rejectChkBtn ap_btn">지자체 이관요청 반려 상태</button>
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                    	</div>
                                </div>
			                    <div class="contBox">
			                        <div class="nameBox nameBox-flex">
			                            <h4 class="name">지자체 및 회사 기본 정보</h4>
			                        </div>
			                        <div class="cont cont-flex">
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">지역</th>
			                                    <td>
			                                    	<!-- 관리자 -->
			                                    	<div style="display: none;" class="tb_flex admin">
				                                        <label for="cmptncCtpvnm_admin">지역</label>
				                                        <input type="text" id="cmptncCtpvnm_admin" name="cmptncCtpvnm" class="input" aria-label="지역" placeholder="지역" />
				                                    </div>
				                                    <!-- 지자체 -->
				                                    <div style="display: none;" class="tb_flex g01">
				                                        <label for="cmptncCtpvnm">지역</label>
				                                        <input type="text" id="cmptncCtpvnm" name="cmptncCtpvnm2" class="input readOnlyGrayBtn" aria-label="지역" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>회사명</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="co_nm">회사명</label>
				                                        <input type="text" id="co_nm" name="co_nm" class="input" maxLength="80" aria-label="회사명" oninput="charOnly(this)"/>
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업자등록번호</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="brno">사업자등록번호</label>
				                                        <input type="text" id="brno" name="brno" class="input" maxLength="12" aria-label="사업자등록번호" oninput="brnoFormat(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업자등록증</th>
			                                    <td class="input-width">
			                                    	<div class="tb_flex filebox">
														<label for="bzmnLicenseAtchNm">사업자등록증</label>
														<input style="display: none;" id="bzFileNo" name ="bzFileNo" class="hidden" aria-label="사업자등록증 파일 번호" readonly />
														<input id="bzmnLicenseAtchNm" name="bzmnLicenseAtchNm" class="input no_line" aria-label="사업자등록증" readonly />
														<label for="bzmnDetailFileUpload" class="hidden">사업자등록증 파일</label>
														<input type="file" id="bzmnDetailFileUpload" name="files" class="hidden" aria-label="사업자등록증 파일"  onchange='fileAddCheck(this)' accept=".jpg, .jpeg, .gif, .png, .pdf">
														<button class="yellow_btn bzmnDetailFileUpload">파일첨부</button>
													</div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>사업소종류</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                    	<label for="bzmn_se_cd_nm">사업소종류</label>
				                                    	<input type="text" id="bzmn_se_cd_nm" name="bzmn_se_cd_nm" class="bzmn_se_cd_nm" aria-label="사업소종류" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr class="upCompanyNo up_brno1" style="display: none;">
								                <th scope="col"><span class="asterisk">*</span>주사무소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="up_brno">주사무소</label>
								                        <input type="text" id="up_brno" name="up_brno" class="up_brno" aria-label="주사무소">
								                    </div>
								                </td>
								            </tr>
			                            </table>
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">지자체</th>
			                                    <td>
			                                    	<!-- 관리자 -->
			                                    	<div style="display: none;" class="tb_flex admin">
				                                        <label for="cmptncSggnm_admin">지자체</label>
				                                        <input type="text" id="cmptncSggnm_admin" name="cmptncSggnm" class="input" aria-label="지자체" placeholder="지자체" />
				                                    </div>
				                                    <!-- 지자체 -->
			                                    	<div style="display: none;" class="tb_flex g01">
				                                        <label for="cmptncSggnm">지자체</label>
				                                        <input type="text" id="cmptncSggnm" name="cmptncSggnm2" class="input readOnlyGrayBtn" aria-label="지자체" readOnly />
				                                        <input type="hidden" id="cmptncSggnm_hide" name="cmptncSggnm_hide" class="input readOnlyGrayBtn"  />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>대표자명</th>
			                                    <td>
			                                    	
			                                    	<div class="tb_flex">
				                                        <label for="rprsv_nm">대표자명</label>
				                                        <input type="text" id="rprsv_nm" name="rprsv_nm" class="input" maxLength="20" aria-label="대표자명" oninput="textOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">법인등록번호</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="crno">법인등록번호</label>
				                                        <input type="text" id="crno" name="crno" class="input" maxLength="14" aria-label="법인등록번호" oninput="crnoFormat(this)"/>
				                                    </div>
				                                </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">법인인감증명서</th>
		                                    	<td class="input-width">
		                                    		<div class="tb_flex filebox">
														<label for="cocsAtchNm">법인인감증명서</label>
														<input style="display: none;" id="coFileNo" name="coFileNo" class="hidden" aria-label="법인인감증명서 파일 번호" readonly />
														<input id="cocsAtchNm" name="cocsAtchNm" class="input no_line" aria-label="법인인감증명서" readonly />
														<label for="coDetailFileUpload" class="hidden">법인인감증명서 파일</label>
														<input type="file" id="coDetailFileUpload" name="files" class="hidden" onchange='fileAddCheck(this)' aria-label="법인인감증명서 파일" accept=".jpg, .jpeg, .gif, .png, .pdf">
														<button class="yellow_btn coDetailFileUpload">파일첨부</button>
													</div>
		                                    	</td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">사업게시일</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="biz_strt_day">사업게시일</label>
				                                    	<input type="text" id="biz_strt_day" name="biz_strt_day" class="input readOnlyGrayBtn" aria-label="사업게시일" readOnly/>
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
				                                    <div class="tb_flex">
				                                        <label for="ctpv_nm">시도</label>
				                                        <input type="text" id="ctpv_nm" name="ctpv_nm" class="input readOnlyGrayBtn" aria-label="시도" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">도로명주소</th>
			                                    <td>
				                                   <div class="tb_flex">
				                                        <label for="road_nm_addr">도로명주소</label>
				                                        <input type="text" id="road_nm_addr" name="road_nm_addr" class="input readOnlyGrayBtn" maxLength="200" aria-label="도로명주소" readOnly />
				                                        <button id="addrBtn11" class="yellow_btn" onClick="javaScript:$cmpnymanage.event.addr('update', 'office');">주소찾기</button>
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">지번주소</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="lotno_addr">지번주소</label>
				                                        <input type="text" id="lotno_addr" name="lotno_addr" class="input readOnlyGrayBtn" maxLength="200" aria-label="지번주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                
			                                    <th scope="col">차고지 도로명주소</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="garage_road_nm_addr">차고지 도로명주소</label>
				                                        <input type="text" id="garage_road_nm_addr" name="garage_road_nm_addr" class="input readOnlyGrayBtn" maxLength="200"
				                                        		aria-label="차고지 도로명주소" readOnly />
				                                        <button id="addrBtn12" class="yellow_btn" onClick="javaScript:$cmpnymanage.event.addr('update', 'garage');">주소찾기</button>
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb01">
			                            	<tr>
			                                    <th scope="col">시군구</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="sgg_nm">시군구</label>
				                                        <input type="text" id="sgg_nm" name="sgg_nm" class="input readOnlyGrayBtn" aria-label="시군구" readOnly />
				                                        <input type="hidden" id="sgg_nm_hide" name="sgg_nm_hide" class="input readOnlyGrayBtn" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
								                <th scope="col">위치정보</th>
								                <td>
								                    <div class="tb_flex">
								                    	<span style="margin-right: 5px">위도</span>
								                        <label for="location_lat">위도</label>
								                        <input type="text" id="location_lat" name="location_lat" class="input" placeholder="위도" maxLength="20"
								                        		aria-label="위도" oninput="locationOnly(this)" style="width:39%;" />
						                        		<span style="margin: 0px 5px">경도</span>
								                        <label for="location_lot">경도</label>
								                        <input type="text" id="location_lot" name="location_lot" class="input" placeholder="경도" maxLength="20"
								                        		aria-label="경도" oninput="locationOnly(this)" style="width:39%;" />
								                    </div>
								                </td>
								            </tr>
			                                <tr>
			                                    <th scope="col">상세주소</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="road_nm_daddr">상세주소</label>
				                                        <input type="text" id="road_nm_daddr" name="road_nm_daddr" class="input" placeholder="상세주소를 입력해주세요."
				                                        		maxLength="200" aria-label="상세주소" oninput="charOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차고지 도로명상세주소</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="garage_road_nm_daddr">차고지 도로명상세주소</label>
				                                        <input type="text" id="garage_road_nm_daddr" name="garage_road_nm_daddr" class="input" maxLength="200"
				                                        	   aria-label="차고지 도로명상세주소" placeholder="차고지 도로명상세주소를 입력해주세요." oninput="charOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                        </div>
			                        <div class="cont">
							    		<div class="mapName cont-flex" style="margin-bottom: 10px;">
							    			<h3>사업자 위치</h3>
							    			<span class="locationNo" style="color: #ff3838">※ 주소찾기를 선택 후에도 사업자 위치가 나오지 않을 경우 지도에서 위치를 클릭하세요</span>
							    		</div>
							    		<div id="detailMap1" class="detailPopupMap1" style="width: 100%; height: 300px;"></div>
							    	</div>
			                    </div>
			                    <div class="contBox">
			                        <div class="nameBox nameBox-flex">
			                            <h4 class="name">회사 상태 정보</h4>
			                        </div>
			                        <div class="cont cont-flex flex-type02">
			                            <table class="tb rental_tb01 tb01">
			                                <tr>
			                                    <th scope="col"><span class="asterisk">*</span>영업상태</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="bsn_stts_cd_nm">영업상태</label>
				                                        <input type="text" id="bsn_stts_cd_nm" name="bsn_stts_cd_nm" aria-label="영업상태(선택)" placeholder="영업상태(선택)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">상태변경일시</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="bsn_stts_mdfcn_dt">상태변경일시</label>
				                                        <input type="text" id="bsn_stts_mdfcn_dt" name="bsn_stts_mdfcn_dt" class="readOnlyGrayBtn" aria-label="상태변경일시(선택)" placeholder="상태변경일시(선택)" readonly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">연락처</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="telno">연락처</label>
				                                        <input type="text" id="telno" name="telno" class="input" maxLength="13" aria-label="연락처" oninput="telFormat(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차량등록대수</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="vhcl_reg_cntom">차량등록대수</label>
				                                        <input type="text" id="vhcl_reg_cntom" name="vhcl_reg_cntom" class="input" maxLength="7" aria-label="차량등록대수"
				                                        		oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">승용차대수</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="sedn_car_noh">승용차대수</label>
				                                        <input type="text" id="sedn_car_noh" name="sedn_car_noh" class="input" maxLength="7" aria-label="승용차대수"
				                                        		oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">승합차대수</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="pass_vhcle_noh">승합차대수</label>
				                                        <input type="text" id="pass_vhcle_noh" name="pass_vhcle_noh" class="input" maxLength="7" aria-label="승합차대수"
				                                        		oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                            		<th scope="col" class="note_name">최근 수정사유</th>
			                                	<td class="textarea_wr">
				                                  	<div class="tb_flex">
					                                    <label for="mdfcn_rsn">최근 수정사유</label>
					                                    <textarea id="mdfcn_rsn" name="mdfcn_rsn" class="noteBox readOnlyGrayBtn" maxLength="1000" cols="10" rows="5" 
					                                    		aria-label="수정사유" oninput="content(this)" readonly></textarea>
			                                  		</div>
			                                  	</td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb02 tb02">
			                                <tr>
			                                    <th scope="col">평일운영시간</th>
			                                    <td>
			                                    	<div class="tb_flex">
				                                        <ul class="hours">
				                                            <li class="hour_input">
					                                            <label for="oper_bgng_dt">평일오픈시간</label>
					                                            <input id="oper_bgng_dt" name="oper_bgng_dt" class="input" maxLength="5" aria-label="평일오픈시간"
					                                            		placeholder="00:00" oninput="timeFormat(this)"/>
				                                            </li>
				                                            <li class="bar">~</li>
				                                            <li class="hour_input">
					                                            <label for="oper_end_dt">평일마감시간</label>
					                                            <input id="oper_end_dt" name="oper_end_dt" class="input" maxLength="5" aria-label="평일마감시간"
					                                            		placeholder="00:00" oninput="timeFormat(this)" />
				                                            </li>
				                                        </ul>
			                                        </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">전기승용차</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="elec_sedn_car_noh">전기승용차</label>
				                                        <input type="text" id="elec_sedn_car_noh" name="elec_sedn_car_noh" class="input" maxLength="7"
				                                        		aria-label="전기승용차" oninput="numberOnly(this)"/>
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">전기승합차</th>
			                                    <td>
				                                    <div class="tb_flex">
				                                        <label for="elec_pass_vhcle_noh">전기승합차</label>
				                                        <input type="text" id="elec_pass_vhcle_noh" name="elec_pass_vhcle_noh" class="input" maxLength="7"
				                                        		aria-label="전기승합차" oninput="numberOnly(this)" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col" class="note_name">비고</th>
			                                    <td class="textarea_wr">
			                                    	<div class="tb_flex">
				                                        <label for="rmrk">비고</label>
				                                        <textarea id="rmrk" name="rmrk" class="noteBox" maxLength="1000" cols="30" rows="5" aria-label="비고" oninput="charOnly(this)" ></textarea>
			                                    	</div>
			                                    </td>
			                                </tr>
			                                <tr>
			                            		<th scope="col" class="note_name">수정사유 입력</th>
			                                	<td class="textarea_wr">
				                                  	<div class="tb_flex">
					                                    <label for="insert_mdfcn_rsn">수정사유 입력</label>
					                                    <textarea id="insert_mdfcn_rsn" name="insert_mdfcn_rsn" class="noteBox" maxLength="1000" cols="10" rows="5" 
					                                    		aria-label="수정사유" oninput="content(this)" ></textarea>
			                                  		</div>
			                                  	</td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb01 tb03">
			                                <tr>
			                                	<th scope="col" class="aprv_stts_cd">승인상태</th>
			                                	<td>
                                                    <div class="tb_flex">
                                                    	<label for="aprv_stts_cd">승인상태</label>
                                                        <input style="width: 80px;" id="aprv_stts_cd" name="aprv_stts_cd" class="input no_line" aria-label="승인상태" readonly />
													</div>
                                                </td>
			                                </tr>
			                              </table>
			                        </div>
			                    </div>
			                </div>
			            </div>
			            <div class='btn_flex'>
			            	<button style="margin-right: 10px" class='blue_btn updateBtn country' value="Update">수정</button>
			            	<button style="margin-right: 10px" class='red_btn deleteBtn admin' value="Delete">삭제</button>
			                <button class="gray_btn cancel_btn detailClose" value="Cancel">닫기</button>
			            </div>
			        </div>
		        </div>
		    </div>
		    <!-- 사업자관리 상세 내용 (끝) -->
		    
		    <!-- 사업자관리 상세 팝업 (수정불가능) -->
			<div class="popup detail_popup popup_type02 uncorrectable popup" style="display:none; z-index: 999">
		        <div class="box">
		            <div class="popup_top">
		                <h4>사업자 관리 상세</h4>
		                <div class="close detailClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

					<div class="detail_popup content">
			            <div class="scrollBar02">
			                <div class="info_wr">
			                	<div style="display: none;" class="top_info legend update_top_info">
	                                <p> 기입된 내용은</p>
	                                	<div class="circle"></div>
                                       	<span style="color: black;">현재 내용정보</span>
	                                	<div class="apCircle"></div>
                                       	<span class="count">수정 요청된 내용정보</span>
								</div>								
                                <div class="contBox">
                                	<div class="nameBox nameBox-flex">
			                            <h4 class="name">사업자 일련번호</h4>
			                        </div>
			                        <div class="cont cont-flex">
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">사업자 일련번호</th>
		                                    	<td>
		                                    		<div class="tb_flex">
				                                    	<label for="company_no2">사업자 일련번호</label>
				                                    	<input type="text" id="company_no2" name="company_no" class="input no_line" aria-label="사업자 일련번호" placeholder="사업자 일련번호" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table style="display: none;" class="tb rental_tb01 requestInfo">
			                                <tr>
			                                    <th scope="col">요청상태</th>
		                                    	<td>
		                                    		<div style="display: none;" class="tb_flex insertInfo">
		                                    			<label for="insertInfo">등록요청 건</label>
				                                    	<input type="text" id="insertInfo" name="insertInfo" class="input no_line readOnlyRedBtn" aria-label="등록요청 건" placeholder="등록요청 건" value="등록요청 건" readOnly />
				                                    </div>
				                                    <div style="display: none;" class="tb_flex updateInfo">
		                                    			<label for="updateInfo">수정요청 건</label>
				                                    	<input type="text" id="updateInfo" name="updateInfo" class="input no_line readOnlyRedBtn" aria-label="수정요청 건" placeholder="수정요청 건" value="수정요청 건" readOnly />
				                                    </div>
				                                    <div style="display: none;" class="tb_flex transferInfo">
		                                    			<label for="transferInfo">지자체 이관요청 건</label>
				                                    	<input type="text" id="transferInfo" name="transferInfo" class="input no_line readOnlyRedBtn" aria-label="지자체 이관요청 건" placeholder="지자체 이관요청건" value="지자체 이관요청건" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                    	</div>
                                </div>
			                    <div class="contBox">
			                        <div class="nameBox nameBox-flex">
			                            <h4 class="name">지자체 및 회사 기본 정보</h4>
			                        </div>
			                        <div class="cont cont-flex">
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">지역</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="cmptncCtpvnm_update">지역</label>
				                                        <input type="text" id="cmptncCtpvnm_update" name="cmptncCtpvnm_update" class="input no_line" aria-label="지역" readOnly />
				                                    </div>
			                                    	<div class="tb_flex">
				                                        <label for="cmptncCtpvnm2">지역</label>
				                                        <input type="text" id="cmptncCtpvnm2" name="cmptncCtpvnm2" class="input no_line redText" aria-label="지역" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">회사명</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="co_nm_update">지역</label>
				                                        <input type="text" id="co_nm_update" name="co_nm_update" class="input no_line" maxLength="80" aria-label="회사명" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="co_nm2">회사명</label>
				                                        <input type="text" id="co_nm2" name="co_nm" class="input no_line redText" maxLength="80" aria-label="회사명" readonly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">사업자등록번호</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="brno_update">지역</label>
				                                        <input type="text" id="brno_update" name="brno_update" class="input no_line" maxLength="12" aria-label="사업자등록번호" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="brno2">사업자등록번호</label>
				                                        <input type="text" id="brno2" name="brno" class="input no_line redText" maxLength="12" aria-label="사업자등록번호" readonly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">사업자등록증</th>
			                                    <td class="input-width">
			                                    	<div style="display: none;" class="tb_flex filebox updateInfo">
														<label for="bzmnLicenseAtchNm_update">사업자등록증</label>
														<input style="display: none;" id="bzFileNo_update" name ="bzFileNo_update" class="hidden" aria-label="사업자등록증 파일 번호" readonly />
														<input id="bzmnLicenseAtchNm_update" name="bzmnLicenseAtchNm_update" class="input no_line" aria-label="사업자등록증" readonly />
													</div>
			                                    	<div class="tb_flex filebox">
														<label for="bzmnLicenseAtchNm2">사업자등록증</label>
														<input style="display: none;" id="bzFileNo2" name ="bzFileNo" class="hidden" aria-label="사업자등록증 파일 번호" readonly />
														<input id="bzmnLicenseAtchNm2" name="bzmnLicenseAtchNm" class="input no_line redText" aria-label="사업자등록증" readonly />
													</div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">사업소종류</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="bzmn_se_cd_nm_update">사업소종류</label>
				                                        <input type="text" id="bzmn_se_cd_nm_update" name="bzmn_se_cd_nm_update" class="input no_line" aria-label="사업소종류" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                    	<label for="bzmn_se_cd_nm2">사업소종류</label>
				                                    	<input type="text" id="bzmn_se_cd_nm2" name="bzmn_se_cd_nm2" class="input no_line redText" aria-label="사업소종류" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr class="upCompanyNo up_brno1" style="display: none;">
								                <th scope="col">주사무소</th>
								                <td>
								                	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="up_brno_update">주사무소</label>
				                                        <input type="text" id="up_brno_update" name="up_brno_update" class="input no_line" aria-label="주사무소" readOnly />
				                                    </div>
								                    <div class="tb_flex">
								                        <label for="up_brno2">주사무소</label>
								                        <input type="text" id="up_brno2" name="up_brno2" class="up_brno input no_line redText" aria-label="주사무소" readOnly />
								                    </div>
								                </td>
								            </tr>
			                            </table>
			                            <table class="tb rental_tb01">
			                                <tr>
			                                    <th scope="col">지자체</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="cmptncSggnm_update">지자체</label>
				                                        <input type="text" id="cmptncSggnm_update" name="cmptncSggnm_update" class="input no_line" aria-label="지자체" readOnly />
				                                    </div>
			                                    	<div class="tb_flex">
				                                        <label for="cmptncSggnm2">지자체</label>
				                                        <input type="text" id="cmptncSggnm2" name="cmptncSggnm2" class="input no_line redText" aria-label="지자체" readOnly/>
				                                        <input type="hidden" id="cmptncSggnm_hide2" name="cmptncSggnm_hide" class="input no_line" />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">대표자명</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="rprsv_nm_update">대표자명</label>
				                                        <input type="text" id="rprsv_nm_update" name="rprsv_nm_update" class="input no_line"  maxLength="20" aria-label="대표자명" readOnly />
				                                    </div>
			                                    	<div class="tb_flex">
				                                        <label for="rprsv_nm2">대표자명</label>
				                                        <input type="text" id="rprsv_nm2" name="rprsv_nm" class="input no_line redText" maxLength="20" aria-label="대표자명" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">법인등록번호</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="crno_update">법인등록번호</label>
				                                        <input type="text" id="crno_update" name="crno_update" class="input no_line" maxLength="14" aria-label="법인등록번호" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="crno2">법인등록번호</label>
				                                        <input type="text" id="crno2" name="crno" class="input no_line redText" maxLength="14" aria-label="법인등록번호" readOnly />
				                                    </div>
				                                </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">법인인감증명서</th>
		                                    	<td class="input-width">
		                                    		<div style="display: none;" class="tb_flex updateInfo">
														<label for="cocsAtchNm_update">법인인감증명서</label>
														<input style="display: none;" id="coFileNo_update" name ="coFileNo_update" class="hidden" aria-label="법인인감증명서 파일 번호" readonly />
														<input id="cocsAtchNm_update" name="cocsAtchNm_update" class="input no_line" aria-label="법인인감증명서" readonly />
													</div>
		                                    		<div class="tb_flex filebox">
														<label for="cocsAtchNm2">법인인감증명서</label>
														<input style="display: none;" id="coFileNo2" name="coFileNo" class="hidden" aria-label="법인인감증명서 파일 번호" readonly />
														<input id="cocsAtchNm2" name="cocsAtchNm" class="input no_line redText" aria-label="법인인감증명서" readonly />
													</div>
		                                    	</td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">사업게시일</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="biz_strt_day_update">사업게시일</label>
				                                    	<input type="text" id="biz_strt_day_update" name="biz_strt_day_update" class="input no_line" aria-label="사업게시일" readOnly/>
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="biz_strt_day2">사업게시일</label>
				                                    	<input type="text" id="biz_strt_day2" name="biz_strt_day" class="input no_line redText" aria-label="사업게시일" readOnly/>
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
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="ctpv_nm_update">시도</label>
				                                        <input type="text" id="ctpv_nm_update" name="ctpv_nm_update" class="input no_line" aria-label="시도" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="ctpv_nm2">시도</label>
				                                        <input type="text" id="ctpv_nm2" name="ctpv_nm" class="input no_line redText" aria-label="시도" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">도로명주소</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="road_nm_addr_update">도로명주소</label>
				                                        <input type="text" id="road_nm_addr_update" name="road_nm_addr_update" class="input no_line" maxLength="200" aria-label="도로명주소" readOnly />
				                                   	</div>
				                                   	<div class="tb_flex">
				                                        <label for="road_nm_addr2">도로명주소</label>
				                                        <input type="text" id="road_nm_addr2" name="road_nm_addr" class="input no_line redText" maxLength="200" aria-label="도로명주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">지번주소</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="lotno_addr_update">지번주소</label>
				                                        <input type="text" id="lotno_addr_update" name="lotno_addr_update" class="input no_line" maxLength="200" aria-label="지번주소" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="lotno_addr2">지번주소</label>
				                                        <input type="text" id="lotno_addr2" name="lotno_addr" class="input no_line redText" maxLength="200" aria-label="지번주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차고지 도로명주소</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="garage_road_nm_addr_update">차고지 도로명주소</label>
				                                        <input type="text" id="garage_road_nm_addr_update" name="garage_road_nm_addr_update" class="input no_line" maxLength="200"
				                                        		aria-label="차고지 도로명주소" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="garage_road_nm_addr2">차고지 도로명주소</label>
				                                        <input type="text" id="garage_road_nm_addr2" name="garage_road_nm_addr" class="input no_line redText" maxLength="200"
				                                        		aria-label="차고지 도로명주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb01">
			                            	<tr>
			                                    <th scope="col">시군구</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="sgg_nm_update">시군구</label>
				                                        <input type="text" id="sgg_nm_update" name="sgg_nm_update" class="input no_line" aria-label="시군구" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="sgg_nm2">시군구</label>
				                                        <input type="text" id="sgg_nm2" name="sgg_nm" class="input no_line redText" aria-label="시군구" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
								                <th scope="col">위치정보</th>
								                <td>
								                	<div style="display: none;" class="tb_flex updateInfo">
								                    	<span style="margin-right: 5px">위도</span>
								                        <label for="location_lat_update">위도</label>
								                        <input type="text" id="location_lat_update" name="location_lat_update" class="input no_line"
								                        	   placeholder="위도" maxLength="20" aria-label="위도" readOnly style="width:39%;" />
						                        		<span style="margin: 0px 5px">경도</span>
								                        <label for="location_lot_update">경도</label>
								                        <input type="text" id="location_lot_update" name="location_lot_update" class="input no_line" 
								                        	   placeholder="경도" maxLength="20" aria-label="경도" readOnly style="width:39%;" />
								                    </div>
								                    <div class="tb_flex">
								                    	<span style="margin-right: 5px">위도</span>
								                        <label for="location_lat2">위도</label>
								                        <input type="text" id="location_lat2" name="location_lat" class="input no_line redText" 
								                        	   placeholder="위도" maxLength="20" aria-label="위도" readOnly style="width:39%;" />
						                        		<span style="margin: 0px 5px">경도</span>
								                        <label for="location_lot2">경도</label>
								                        <input type="text" id="location_lot2" name="location_lot" class="input no_line redText" 
								                        	   placeholder="경도" maxLength="20" aria-label="경도" readOnly style="width:39%;" />
								                    </div>
								                </td>
								            </tr>
			                                <tr>
			                                    <th scope="col">상세주소</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="road_nm_daddr_update">상세주소</label>
				                                        <input type="text" id="road_nm_daddr_update" name="road_nm_daddr_update" class="input no_line" placeholder="상세주소"
				                                        		maxLength="200" aria-label="상세주소" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="road_nm_daddr2">상세주소</label>
				                                        <input type="text" id="road_nm_daddr2" name="road_nm_daddr" class="input no_line redText" placeholder="상세주소"
				                                        		maxLength="200" aria-label="상세주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차고지 도로명상세주소</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="garage_road_nm_daddr_update">차고지 도로명상세주소</label>
				                                        <input type="text" id="garage_road_nm_daddr_update" name="garage_road_nm_daddr_update" class="input no_line" placeholder="차고지 도로명상세주소"
				                                        		maxLength="200" aria-label="차고지 도로명상세주소" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="garage_road_nm_daddr2">차고지 도로명상세주소</label>
				                                        <input type="text" id="garage_road_nm_daddr2" name="garage_road_nm_daddr" class="input no_line redText" placeholder="차고지 도로명상세주소"
				                                        		maxLength="200" aria-label="차고지 도로명상세주소" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                        </div>
			                        <div class="cont">
							    		<div class="mapName cont-flex" style="margin-bottom: 10px;">
							    			<h3>사업자 위치</h3>
							    			<span class="locationNo" style="color: #ff3838">※ 주소찾기를 선택 후에도 사업자 위치가 나오지 않을 경우 지도에서 위치를 클릭하세요</span>
							    		</div>
							    		<div id="detailMap2" class="detailPopupMap2" style="width: 100%; height: 300px;"></div>
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
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="bsn_stts_cd_nm_update">영업상태</label>
				                                        <input type="text" id="bsn_stts_cd_nm_update" name="bsn_stts_cd_nm_update" class="input no_line" aria-label="영업상태" readOnly/>
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="bsn_stts_cd_nm2">영업상태</label>
				                                        <input type="text" id="bsn_stts_cd_nm2" name="bsn_stts_cd_nm2" class="input no_line redText" aria-label="영업상태" readOnly/>
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">상태변경일시</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="bsn_stts_mdfcn_dt_update">상태변경일시</label>
				                                        <input type="text" id="bsn_stts_mdfcn_dt_update" name="bsn_stts_mdfcn_dt_update" class="input no_line" aria-label="상태변경일시" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="bsn_stts_mdfcn_dt2">상태변경일시</label>
				                                        <input type="text" id="bsn_stts_mdfcn_dt2" name="bsn_stts_mdfcn_dt" class="input no_line redText" aria-label="상태변경일시" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">연락처</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="telno_update">연락처</label>
				                                        <input type="text" id="telno_update" name="telno_update" class="input no_line" maxLength="13" aria-label="연락처" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="telno2">연락처</label>
				                                        <input type="text" id="telno2" name="telno" class="input no_line redText" maxLength="13" aria-label="연락처" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">차량등록대수</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="vhcl_reg_cntom_update">차량등록대수</label>
				                                        <input type="text" id="vhcl_reg_cntom_update" name="vhcl_reg_cntom_update" class="input no_line" maxLength="7" aria-label="차량등록대수" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="vhcl_reg_cntom2">차량등록대수</label>
				                                        <input type="text" id="vhcl_reg_cntom2" name="vhcl_reg_cntom" class="input no_line redText" maxLength="7" aria-label="차량등록대수" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">승용차대수</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="sedn_car_noh_update">승용차대수</label>
				                                        <input type="text" id="sedn_car_noh_update" name="sedn_car_noh_update" class="input no_line" maxLength="7" aria-label="승용차대수" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="sedn_car_noh2">승용차대수</label>
				                                        <input type="text" id="sedn_car_noh2" name="sedn_car_noh" class="input no_line redText" maxLength="7" aria-label="승용차대수" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">승합차대수</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="pass_vhcle_noh_update">승합차대수</label>
				                                        <input type="text" id="pass_vhcle_noh_update" name="pass_vhcle_noh_update" class="input no_line" maxLength="7" aria-label="승합차대수" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="pass_vhcle_noh2">승합차대수</label>
				                                        <input type="text" id="pass_vhcle_noh2" name="pass_vhcle_noh" class="input no_line redText" maxLength="7" aria-label="승합차대수" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb02 tb02">
			                                <tr>
			                                    <th scope="col">평일운영시간</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <ul class="hours">
				                                            <li class="hour_input">
					                                            <label for="oper_bgng_dt_update">평일오픈시간</label>
					                                            <input id="oper_bgng_dt_update" name="oper_bgng_dt_update" maxLength="5" class="input no_line" aria-label="평일오픈시간"
					                                            		placeholder="00:00" readOnly />
				                                            </li>
				                                            <li class="bar">~</li>
				                                            <li class="hour_input">
					                                            <label for="oper_end_dt_update">평일마감시간</label>
					                                            <input id="oper_end_dt_update" name="oper_end_dt_update" maxLength="5" class="input no_line" aria-label="평일마감시간"
					                                            		placeholder="00:00" readOnly />
				                                            </li>
				                                        </ul>
			                                        </div>
			                                    	<div class="tb_flex">
				                                        <ul class="hours">
				                                            <li class="hour_input">
					                                            <label for="oper_bgng_dt2">평일오픈시간</label>
					                                            <input id="oper_bgng_dt2" name="oper_bgng_dt" maxLength="5" class="input no_line redText" aria-label="평일오픈시간"
					                                            		placeholder="00:00" readOnly />
				                                            </li>
				                                            <li class="bar">~</li>
				                                            <li class="hour_input">
					                                            <label for="oper_end_dt2">평일마감시간</label>
					                                            <input id="oper_end_dt2" name="oper_end_dt" maxLength="5" class="input no_line redText" aria-label="평일마감시간"
					                                            		placeholder="00:00" readOnly />
				                                            </li>
				                                        </ul>
			                                        </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">전기승용차</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="elec_sedn_car_noh_update">전기승용차</label>
				                                        <input type="text" id="elec_sedn_car_noh_update" name="elec_sedn_car_noh_update" class="input no_line" maxLength="7"
				                                        		aria-label="전기승용차" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="elec_sedn_car_noh2">전기승용차</label>
				                                        <input type="text" id="elec_sedn_car_noh2" name="elec_sedn_car_noh" class="input no_line redText" maxLength="7"
				                                        		aria-label="전기승용차" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">전기승합차</th>
			                                    <td>
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="elec_pass_vhcle_noh_update">전기승합차</label>
				                                        <input type="text" id="elec_pass_vhcle_noh_update" name="elec_pass_vhcle_noh_update" class="input no_line" maxLength="7"
				                                        		aria-label="전기승합차" readOnly />
				                                    </div>
				                                    <div class="tb_flex">
				                                        <label for="elec_pass_vhcle_noh2">전기승합차</label>
				                                        <input type="text" id="elec_pass_vhcle_noh2" name="elec_pass_vhcle_noh" class="input no_line redText" maxLength="7"
				                                        		aria-label="전기승합차" readOnly />
				                                    </div>
			                                    </td>
			                                </tr>
			                                <tr>
			                                    <th scope="col">비고</th>
			                                    <td class="textarea_wr">
			                                    	<div style="display: none;" class="tb_flex updateInfo">
				                                        <label for="rmrk_update">비고</label>
				                                        <textarea id="rmrk_update" name="rmrk_update" maxLength="1000" 
				                                        		  cols="30" rows="5" class="noteBox textareaNone" aria-label="비고" placeholder="비고" readOnly ></textarea>
			                                    	</div>
			                                    	<div class="tb_flex">
				                                        <label for="rmrk2">비고</label>
				                                        <textarea id="rmrk2" name="rmrk" maxLength="1000" 
				                                        		  cols="30" rows="5" class="noteBox redText textareaNone" aria-label="비고" placeholder="비고" readOnly ></textarea>
			                                    	</div>
			                                    </td>
			                                </tr>
			                            </table>
			                            <table class="tb rental_tb01 tb03">
			                            	<tr style="display: none;" class="aprvStatus updateInfo">
			                            		<th scope="col">수정사유</th>
			                                	<td class="textarea_wr">
				                                  	<div class="tb_flex">
					                                    <label for="mdfcn_rsn2">수정사유</label>
					                                    <textarea id="mdfcn_rsn2" maxLength="1000" cols="30" rows="5" class="noteBox textareaNone" aria-label="수정사유" readOnly ></textarea>
			                                  		</div>
			                                  	</td>
			                                </tr>
			                                
			                                <!-- 승인상태  -->
			                                <tr style="display: none;" class="m_info1">
			                                	<th scope="col">승인상태</th>
			                                	<td>
                                                    <div class="tb_flex">
                                                    	<label for="aprv_stts_cd2">승인상태</label>
                                                        <input style="width: 80px;" id="aprv_stts_cd2" name="aprv_stts_cd" class="input no_line" aria-label="승인상태" readOnly>
													</div>
                                                </td>
			                                </tr>
			                                
			                                <!-- 요청반려상태  -->
			                                <tr style="display: none;" class="m_info2">
			                                	<th scope="col">승인상태</th>
			                                	<td>
                                                    <div style="display: none;" class="rejectStatus">
                                                    	<label for="req_aprv_stts_cd_update">승인상태</label>
                                                        <input style="width: 80px; display: none;" id="req_aprv_stts_cd_update" name="aprv_stts_cd" class="input no_line rejectStatus data" aria-label="승인상태" readOnly>
                                                        <input style="width: 80px; display: none;" id="req_aprv_stts_cd_update2" name="aprv_stts_cd_update" class="input no_line rejectStatus update" aria-label="승인상태" readOnly>
                                                        <button id="rejectChkBtn" class="rejectChkBtn ap_btn">확인</button>
													</div>
													<div style="display: none;" class="requestStatus">
													    <button style="margin-right: 10px;" id="approvalBtn" class="approvalBtn ap_btn">승인</button>
													    <button id="rejectBtn" class="rejectBtn ap_btn">반려</button>

													</div>
													<div style="display: none;" class="requestStatus">
													    <label for="rejectionReason">반려사유</label>
													    <input style="width:100%; margin-top: 10px" maxLength="1000" id="rejectionReason"  name="rejectionReason"
													    		class="input" aria-label="반려상유 입력" placeholder="반려사유를 입력하세요" oninput="charOnly(this)" />
													</div>
                                                </td>
			                                </tr>
			                                
			                              </table>
			                        </div>
			                    </div>
			                </div>
			            </div>
			            <div class='btn_flex'>
			                <button class="gray_btn cancel_btn detailClose" type="submit" value="Cancel">닫기</button>
			            </div>
			        </div>
		        </div>
		    </div>
		    <!-- 사업자관리 상세 내용 (끝) -->
		    

		    <!-- 사업자관리 주사업소인 경우 영업소(예약소) 확인 -->
			<div class="popup detail_popup popup_type02 office" style="display: none; z-index: 999">
		        <div class="box">
		            <div class="popup_top">
		                <h4><span id="includeComp"></span></h4>
		                <div class="close subcontract">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

		    		<div class="content">
			    		<div id="brnoCnt" style="color:black; font-weight: 700; font-size:1.8rem; margin-bottom:5px;"></div>
						<div class="scroll">
							<div class="info_wr">
								<div id="officeContent"></div>
							</div>
						</div>
					</div>

					<div class="btn_flex">
						<button class="gray_btn cancel_btn subcontract" value="Cancel">닫기</button>
					</div>
				</div>
	        </div>
		    <!-- 사업자관리 주사업소인 경우 영업소(예약소) 확인(끝) -->

		    <!-- 사업자관리 사용자 현황 -->
			<div id="compUser" class="popup detail_popup popup_type02" style="display: none; z-index: 999; height: 100%">
		        <div class="box">
		            <div class="popup_top">
		                <h4>사용자 현황</h4>
		                <div class="close subcontract">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

		    		<div class="content">
						<div class="scroll">
							<div class="info_wr" style="overflow: auto;">
								<table id="compUserTable" style="width:1046px">
									<caption>사용자 현황</caption>
								</table>
							</div>
						</div>
					</div>

					<div class="btn_flex">
						<button class="gray_btn cancel_btn subcontract" value="Cancel">닫기</button>
					</div>
				</div>
	        </div>
		    <!-- 사업자관리 사용자 현황 -->

		    <!-- 사업자관리 차량 현황 -->
			<div id="compCar" class="popup detail_popup popup_type02" style="display: none; z-index: 999">
		        <div class="box">
		            <div class="popup_top">
		                <h4>차량 현황</h4>
		                <div class="close subcontract">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

		    		<div class="content">
		    			<div id="carCnt" style="color:black; font-weight: 700; font-size:1.8rem; margin-bottom:5px;"></div>
						<div class="scroll">
							<div class="info_wr" style="overflow: auto;">
								<table id="compCarTable" style="width:1046px">
									<caption>차량 현황</caption>
								</table>
							</div>
						</div>
					</div>

					<div class="btn_flex">
						<button class="gray_btn cancel_btn subcontract" value="Cancel">닫기</button>
					</div>
				</div>
	        </div>
		    <!-- 사업자관리 차량 현황 -->

		    <!-- 사업자관리 도로명/지번주소 다이얼로그 -->
			<div class="popup com_address01 addr_popup" style="display: none; z-index: 999;">
				<div class="box">
					<div class="popup_top">
						<h4>주소 검색</h4>
						<div class="close">
					        <span></span>
					        <span></span>
						</div>
					</div>

					<div class="content" id="addr-wrap">
					</div>
				</div>
			 </div>
		    <!-- 사업자관리 도로명/지번주소 다이얼로그 (끝) -->

		    <!-- 사업자관리 지자체 이관 다이얼로그 -->
			<div class="popup transfer_popup" style="display: none; z-index: 999;">
				<div class="box">
					<div class="popup_top">
		                <h4>사업자관리 지자체 이관</h4>
		            </div>

		            <div class="content">
						<div class="contBox">
						    <div class="nameBox nameBox-flex">
						        <h4 class="name">회사 지자체 이관 정보</h4>
						    </div>
						    <div class="cont cont-flex">
						        <table class="tb rental_tb01">
						        	<tr>
						                <th scope="col">현재지역</th>
						                <td>
						                	<div class="tb_flex">
						                        <label for="presentCtpv">현재지역</label>
						                        <input type="text" id="presentCtpv" name="presentCtpv" class="input no_line" aria-label="현재지역" placeholder='현재지역' readonly="readonly"/>
						                    </div>

						                </td>
						            </tr>
						            <tr>
						                <th scope="col">현재 지자체</th>
						                <td>
						                	<div class="tb_flex">
						                        <label for="presentSgg">현재지자체</label>
						                        <input type="text" id="presentSgg" name="presentSgg" class="input no_line" aria-label="현재지자체" placeholder='현재지자체' readonly="readonly"/>
						                    </div>
						                </td>
						            </tr>
						       	</table>
					            <table class="tb rental_tb01">
						            <tr>
						                <th scope="col">이관 할 지역</th>
						                <td>
						                	<div class="tb_flex">
						                        <label for="ctpv">이관 할 지역</label>
						                        <input type="text" id="ctpv" name="ctpv" class="input no_line" aria-label="지역" placeholder='지역' />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col">이관 할 지자체</th>
						                <td>
						                	<div class="tb_flex">
						                        <label for="sgg">이관 할 지자체</label>
						                        <input type="text" id="sgg" name="sgg" class="input no_line" aria-label="지자체" placeholder='지자체' />
						                    </div>
						                </td>
						            </tr>
						        </table>
						    </div>
						</div>
					</div>

					<div class="btn_flex">
						<button style="margin-right: 10px;" class="gray_btn transferRequestBtn" value="Cancel">요청</button>
						<button class="gray_btn transferCancelBtn" value="Cancel">닫기</button>
					</div>
				</div>
			 </div>
		    <!-- 사업자관리 도로명/지번주소 다이얼로그 (끝) -->

        </div>
    </div>
</div>