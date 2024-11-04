<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/vfc/rentalHistManage.js"></script>
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/rentalHistManage.css" />

<script>
	var authrtCd = "${authrtCd}";
	var userTypeBool = '${userTypeBool}' === 'true';
</script>

<style>
    #rentalHistGrid table {
		min-width:100%;
    }
    #container > div > div.contBox.lastBox.lastBox02 > div.k-grid.k-widget.k-grid-display-block > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
        justify-content: center;
    }
</style>

<div class="subPage sub03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	               <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">대여정보 관리</li>
	            </ul>
	        </div>
	        <div class="search_top">
	        	<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
				<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
                <div class="selec_wr">
                    <div class="mo_flex">
                        <div class="year_picker">
                            <ul class="yearBox">
                                <li class="mo_li">
                                	<label for="start-picker01">등록일자시작</label>
                                    <input id="start-picker01" title="datepicker"
                                    	aria-label="시작기간조회">
                                </li>
                                <li class="bar">-</li>
                                <li class="mo_li">
                                    <label for="end-picker01">등록일자종료</label>
                                    <input id="end-picker01" title="datepicker"
                                        aria-label="종료기간조회">
                                </li>
                            </ul>
                            <ul class="yearBox">
                                <li class="mo_li" >
                                	<label for="rent-picker">대여일자</label>
                                    <input id="rent-picker" title="datepicker"
                                    	aria-label="대여일자조회">
                                </li>
                            </ul>
                        </div>
                        <ul class="selec_box" >
                            <li class="li_slec">
                                <label for="searchRentSttsCd" style="display: none">대여상태(선택)</label>
                                <input type="text" id="searchRentSttsCd" aria-label="대여상태(선택)">
                            </li>
                            <li class="li_slec">
	                            <label for="searchWrd" style="display: none">차량번호</label>
	                            <input type="text" id="searchWrd" class="searchWrd input" aria-label="차량번호를 입력하세요"
	                            		placeholder="차량번호를 입력하세요" maxLength="16" oninput="charOnly(this)" />
                            </li>
                            <li class="li_slec">
	                            <label for="searchCoNm" style="display: none">회사명</label>
	                            <input type="text" id="searchCoNm" class="input" aria-label="회사명을 입력하세요"
	                            		placeholder="회사명을 입력하세요" maxLength="16" oninput="charOnly(this)" />
                            </li>
                            <li class="li_slec">
	                            <label for="searchDln" style="display: none">회사명</label>
	                            <input type="text" id="searchDln" class="input" aria-label="운전면허번호를 입력하세요"
	                            		placeholder="운전면허번호를 입력하세요" maxLength="16" oninput="charOnly(this)" />
                            </li>
                        </ul>
                    </div>
                    <button class="yellow_btn" id="searchBtn">
                        조회<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘">
                    </button>
                </div>
            </div>
            <div class="contBox lastBox lastBox02">
                <div class="nameBox nameBox-flex">
                    <div style="display: flex; align-items: center;">
                    	<h4 class="name">대여이력 관리 현황</h4>&emsp;
                    	총&nbsp;<span id="totCnt" style="font-weight: bold;"></span>건
                    </div>
                    <button class="download-btn excelDownBtn" onClick="javaScript:$rentalHistManage.event.excelDownBtn();">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>
                <table id="rentalHistGrid">
                    <caption>대여이력 현황</caption>
                </table>
            </div>

			<div class="btn_flex">
                <button class="blue_btn register_btn">등록</button>
            </div>

            <!-- 대여이력 등록 팝업 -->
				<div id="regi" class="popup detail_popup popup_type02">
					<div class="box">
                    	<div class="popup_top">
                        	<h4>대여이력 등록</h4>
                        	<div class="close regPopupClose">
                            	<span></span>
                            	<span></span>
                      		</div>
                      </div>
                      <div class="content">
                      	<div class="scrollBar02">
                        	<div class="info_wr">
                            	<div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">대여이력 등록</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                       		<tr>
				                                 <th scope="col">
				                                 	면허 종류
				                                 	<span class="asterisk">*</span>
				                                 </th>
				                                 <td>
				                                 <div class="tb_flex">
				                                 <ul class="selec_box mSelect_box">
													<li class="li_slec">
														<div id="checkBox01">
															<input id="regChk01" class="regChk" type="radio" name="regChk" value="domLic" checked />
															<label for="regChk01" style="display:inline-block;width:100px;">국내 면허</label>
						 			                    </div>
													</li>
						                         </ul>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">
                                               		차량번호
                                               		<span class="asterisk">*</span>
                                               </th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regVhclRegNo">차량번호</label>
                                                   <input type="text" id="regVhclRegNo" name="regVhclRegNo" class="input"
                                                       placeholder="차량번호를 등록해주세요" readonly/>
                                                   <input id="regBzmnSn" placeholder="사업자등록번호" style="display:none">
                                                   <input id="regCrno" placeholder="법인등록번호" style="display:none">
                                                   <button id="carBtn" class="yellow_btn carBtn"><img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"></button>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">대여번호</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regRentNo">대여번호</label>
                                                   <input type="text" id="regRentNo" name="regRentNo" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">차대번호</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regVin">차대번호</label>
                                                   <input type="text" id="regVin" name="regVin" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">사용자일련번호</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regRgtrSn">사용자일련번호</label>
                                                   <input type="text" id="regRgtrSn" name="regRgtrSn" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">차종</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regCarmdl">차종</label>
                                                   <input type="text" id="regCarmdl" name="regCarmdl" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">차량명</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regVhclNm">차량명</label>
                                                   <input type="text" id="regVhclNm" name="regVhclNm" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">엔진형식</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regEngineType">엔진형식</label>
                                                   <input type="text" id="regEngineType" name="regEngineType" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">연식</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="regModelYear">연식</label>
                                                   <input type="text" id="regModelYear" name="regModelYear" class="input"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>

                                       </table>
                                       <table class="tb rental_tb01">
<!--                                            <tr id="licenseView"> -->
<!--                                                <th scope="col"> -->
<!-- 	                                               면허증사본 -->
<!-- 	                                               <span class="asterisk">*</span> -->
<!--                                                </th> -->
<!--                                                <td> -->
<!--                                                <div class="tb_flex"> -->
<!--                                                    <label for="files">면허증사본</label> -->
<!--                                                    <input type="text" placeholder="면허증을 등록해주세요" class="input inp filetype" disabled="disabled" style="border: none;" readonly/> -->
<!-- 												   <input type="file" id="files" name="files" onchange="fileAddCheck(this)" class="upload-hidden" style="display: none;" accept=".jpg, .jpeg, .png, .pdf"/> -->
<%--                                                    <button id="internationalLicenseBtn" class="yellow_btn carBtn"><img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"></button> --%>
<!--                                                </div> -->
<!--                                                </td> -->
<!--                                            </tr> -->
                                           <tr>
                                               <th scope="col">
	                                               대여시작일시
	                                               <span class="asterisk">*</span>
                                               </th>
                                               <td>
                                               <div class="tb_flex">
													<label for="start-picker02">시작기간</label>
													<input id="start-picker02" class="date" title="datepicker"
														aria-label="시작기간검색">
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">
	                                               대여종료일시
	                                               <span class="asterisk">*</span>
                                               </th>
                                               <td>
                                               <div class="tb_flex">
													<label for="end-picker02">종료기간</label>
													<input id="end-picker02" class="date" title="datepicker"
														aria-label="종료기간검색">
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class='btn_flex'>
                           <button id='rentRegInsertBtn' class='blue_btn'>등록</button>
                           <button class='gray_btn cancel_btn regPopupClose' type="submit" style="margin-right: 10px" value="Cancel">닫기</button>
                       </div>
               		</div>
            	</div>
			</div>

			<!-- 상세 팝업 -->
				<div id="detailInfoPopup" class="popup detail_popup popup_type02">
					<div class="box">
                    	<div class="popup_top">
                        	<h4>대여이력 상세</h4>
                        	<div class="close detailPopupClose">
                            	<span></span>
                            	<span></span>
                      		</div>
                        </div>
                        <div class="content">
                            <div class="scrollBar02">
                            	<div class="info_wr">
                                    <div id="detailContent" class="contBox">
                                       <div class="nameBox nameBox-flex">
                                           <h4 class="name">대여이력 상세</h4>
                                       </div>
                                       <div class="cont cont-flex">
                                           <table class="tb rental_tb01">
                                               <tr>
                                                   <th scope="col">대여번호</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="detailRentNo">대여번호</label>
                                                       <input type="text" id="detailRentNo" name="detailRentNo" class="input no_line"
                                                           readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <th scope="col">대여시작일</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                        <label for="start-picker03">시작기간</label>
                                                        <input id="start-picker03" class="date" title="datepicker"
                                                            aria-label="시작기간검색">
                                                   </div>
                                                   </td>
                                               </tr>
                                               <tr id="delYn" style="display: none;">
                                                   <th scope="col">삭제여부</th>
                                                   <td>
                                                       <div class="tb_flex">
                                                           <label for="delYnVal">삭제여부</label>
                                                           <input type="text" id="delYnVal" name="delYnVal" class="input no_line"
                                                                  readonly/>
                                                       </div>
                                                   </td>
                                               </tr>
                                           </table>
                                           <table class="tb rental_tb01">
                                               <tr>
                                                   <th scope="col">차량번호</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="detailVhclRegNo">차량번호</label>
                                                       <input type="text" id="detailVhclRegNo" name="detailVhclRegNo" class="input"
                                                           placeholder="차량번호를 등록해주세요" readonly/>
                                                       <input id="detailBzmnSn" placeholder="사업자등록번호" style="display:none">
                                                       <input id="detailCrno" placeholder="법인등록번호" style="display:none">
                                                       <button id="detailCarBtn" class="yellow_btn carBtn"><img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"></button>
                                                   </div>

                                                   </td>
                                               </tr>
                                               <tr>
                                                   <th scope="col">대여종료일</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                        <label for="end-picker03">종료기간</label>
                                                        <input id="end-picker03" class="date" title="datepicker"
                                                            aria-label="종료기간검색">
                                                   </div>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <th scope="col">대여 상태</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="detailRentSttsNm">대여 상태</label>
                                                       <input type="text" id="detailRentSttsNm" name="detailRentSttsNm" class="input no_line"
                                                          maxlength="11" readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
<!--                                                <tr id="detailFileDownView"> -->
<!--                                                    <th scope="col">면허증 파일</th> -->
<!--                                                    <td> -->
<!--                                                    <div class="tb_flex"> -->
<!--                                                        <label for="detailFileDown">파일 다운로드</label> -->
<!--                                                        <input type="text" id="detailFileDown" name="detailFileDown" class="input no_line"> -->
<!--                                                    </div> -->
<!--                                                    </td> -->
<!--                                                </tr> -->
                                               <tr style="display: none;">
                                                   <th scope="col">차대번호</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="detailVin">차대번호</label>
                                                       <input type="text" id="detailVin" name="detailVin" class="input"
                                                           readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                               <tr style="display: none;">
                                                   <th scope="col">사용자일련번호</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="detailRgtrSn">사용자일련번호</label>
                                                       <input type="text" id="detailRgtrSn" name="detailRgtrSn" class="input"
                                                           readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                           </table>
                                       </div>
                                       <div class="nameBox nameBox-flex">
                                           <h4 class="name">자격확인 정보</h4>
                                       </div>
                                       <div class="cont cont-flex">
                                           <table class="tb rental_tb01">
                                               <tr>
                                                   <th scope="col">면허번호</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="verfDln">면허번호</label>
                                                       <input type="text" id="verfDln" name="verfDln" class="input no_line" readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <th scope="col">자격확인요청일시</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="verfDmnd">자격확인요청일시</label>
                                                       <input type="text" id="verfDmnd" name="verfDmnd" class="input no_line" readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                           </table>
                                           <table class="tb rental_tb01">
                                               <tr>
                                                   <th scope="col">자격확인방법</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="verfMthd">자격확인방법</label>
                                                       <input type="text" id="verfMthd" name="verfMthd" class="input no_line" readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <th scope="col">자격확인결과</th>
                                                   <td>
                                                   <div class="tb_flex">
                                                       <label for="verfRslt">자격확인결과</label>
                                                       <input type="text" id="verfRslt" name="verfRslt" class="input no_line" readonly/>
                                                   </div>
                                                   </td>
                                               </tr>
                                           </table>
                                       </div>
                                   </div>
                                   <div id="rentalHistDetailGrid"></div>
                           </div>
                       </div>

                       <div class="btn_flex"  id="btn_bottom" style="margin-top: 10px">
                           <button id="rentUpdateBtn" class='blue_btn'>수정</button>
                           <button style="margin-right: 10px" class='red_btn' value="Delete">삭제</button>
                           <button class='gray_btn cancel_btn detailPopupClose' type="submit" style="margin-right: 10px" value="Cancel">닫기</button>
                       </div>
               		</div>
            	</div>
			</div>



				<!-- 대여 확인증 팝업 -->
				<div id="confInfoPopup" class="popup detail_popup popup_type02">
					<div class="box">
                    	<div class="popup_top">
                        	<h4>대여확인증</h4>
                        	<div class="close detailPopupClose">
                            	<span></span>
                            	<span></span>
                      		</div>
                      </div>
                      <div class="content">
                      	<div class="scrollBar02">
                        	<div class="info_wr">
                            	<div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">차량정보</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">차량모델</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="confVhclNm">차량모델</label>
                                                   <input type="text" id="confVhclNm" name="confVhclNm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">차량번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="start-picker03">차량번호</label>
													<input type="text" id="" name="confVhclNm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">차량 등록 번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confVin">차량 등록 번호</label>
													<input type="text" id="confVin" name="confVin" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                               <div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">회사정보</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">회사 이름</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="confCoNm">대여번호</label>
                                                   <input type="text" id="confCoNm" name="confCoNm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">회사 주소</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confAddr">회사 주소</label>
													<input type="text" id="confAddr" name="confAddr" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">회사 연락처</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confTelno">회사 연락처</label>
													<input type="text" id="confTelno" name="confTelno" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                               <div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">대여자 정보</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">운전면허증 번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confDln">운전면허증 번호</label>
													<input type="text" id="confDln" name="confDln" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                               <div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">대여기간</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">대여시작일시</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="confRentBgngDt">대여시작일시</label>
                                                   <input type="text" id="confRentBgngDt" name="confRentBgngDt" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">대여종료일시</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confRentEndDt">대여종료일시</label>
													<input type="text" id="confRentEndDt" name="confRentEndDt" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">총 대여기간</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confDiffddhhmm">총 대여기간</label>
													<input type="text" id="confDiffddhhmm" name="confDiffddhhmm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">대여번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confRentNo">대여번호</label>
													<input type="text" id="confRentNo" name="confRentNo" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">대여이력번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confRentHstryNo">대여이력번호</label>
													<input type="text" id="confRentHstryNo" name="confRentHstryNo" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">면허 유형</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confAtchFileSn">대여이력번호</label>
													<input type="text" id="confAtchFileSn" name="confAtchFileSn" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                            </div>
                        </div>

                       <div class='btn_flex'>
                           <button class='blue_btn confPrintAndInsert'>출력하기</button>
                           <button class='gray_btn cancel_btn detailPopupClose' type="submit" style="margin-right: 10px" value="Cancel">닫기</button>
                       </div>
               		</div>
            	</div>
			</div>
		</div>
	</div>
</div>



<!-- 대여이력등록 팝업 -->
<div id="carPopup" class="sm_popup car_register02">
	<div id="carPopupBox" class="sm_box" >
		<div class="popup_top">
			<h4>차량 찾기</h4>
			<div class="sm_close sm_close_btn carClose">
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="content">
			<div class="search_wr">
				<div class="search_flex" style="display: flex; align-items: center;">
					<span style="font-size: 1.4rem;">차량번호</span>
					<label for="carSearchWrd" style="display: none">검색조건</label>
					<input id="carSearchWrd" class="input com_input" aria-label="검색조건 입력" placeholder="차량등록 번호를 입력하세요">
					<button class="yellow_btn" id="carPopupSearchBtn">
						  검색 <img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
					</button>
				</div>
			</div>

			<div id="carTa" class="result">
				<table id="carGrid">
					<caption>자동차리스트</caption>
				</table>
			</div>
			<div class="btn_flex">
				<button id="carVhclRegNoVal" class="blue_btn cancel_btn resizeBox carClose">확인</button>
				<button class="gray_btn cancel_btn resizeBox carClose">취소</button>
			</div>
		</div>
	</div>
</div>

<!-- 차량상세 팝업 -->
<div id="detailCarPopup" class="sm_popup car_register01">
	<div class="sm_box">
		<div class="popup_top">
			<h4>차량 찾기</h4>
			<div id="closeException" class="sm_close sm_close_btn dt_carClose">
		        <span></span>
		        <span></span>
      		</div>
    	</div>
	    <div class="content">
		    <div class="search_wr">
	        	<div class="search_flex" style="display: flex; align-items: center;">
		         	<span style="font-size: 1.4rem;">차량번호</span>
		          	<label for="popupSearchWrd" style="display: none">검색조건</label>
		          	<input id="popupSearchWrd" class="input com_input" aria-label="검색조건 입력" placeholder="차량등록 번호를 입력하세요">
		          	<button class="yellow_btn" id="popupSsearchBtn">
			          검색 <img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
			        </button>
		        </div>
	      	</div>
	      	<div id="dt_carTa" class="result scrollBar02">
		        <table id="detailCarGrid">
                    <caption>자동차리스트</caption>
                </table>
			</div>
			<div class="btn_flex">
				<button class="blue_btn cancel_btn resizeBox dt_carClose">확인</button>
		        <button class="gray_btn cancel_btn resizeBox dt_carClose">취소</button>
	      	</div>
		</div>
	</div>
</div>


<div id="globalLicense" class="sm_popup global_lc">
    <div class="sm_box global_lc_box">
        <div class="popup_top">
            <h4>국제운전면허증 확인 시 유의사항</h4>
            <div class="sm_close close sm_close_btn carClose">
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="content">
	        <div class="scrollBar02">
	            <img alt="국제운전면허증 확인 시 유의사항" src="${contextPath}/images/sub/global_license.png">
	        	<div>
	        		국내에서 인정되는 국제운전면허증은 International Driving permit으로 정식발급된 국제운전면허증이며, 미국 IAA 등 정식 발급기관이 아닌 곳에서 발급받은 유사 국제운전면허증은 사용이 불가함을 안내드립니다.(유사 국제면허 표지 앞면에 International Driving License로 기재되어 있음으로 착오 주의)
				</div>
	        </div>
        	<div class="btn_flex">
		        <button class="gray_btn cancel_btn resizeBox">닫기</button>
	      	</div>
        </div>
    </div>
</div>


