<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />


<script src="${contextPath}/js/sys/inspectionHist.js"></script>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/inspectionHist.css" />
	
<script>
    var authrtCd = '${authrtCd}';
    var userCmptncZoneCd = '${userCmptncZoneCd}';
</script>

<div class="subPage sub03">
	<div id="container">
		<div class="wrap">
			
			<!-- title -->
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit"/>
                    <h2>지도점검이력</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">지도점검이력</li>
				</ul>
			</div>
			
			<!-- 조회조건 -->
            <div class="search_top">
	        	<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
				<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
                <div class="selec_wr">
                    <div class="mo_flex">
                        <ul class="selec_box">
                           <li class="li_slec">
                               <label for="searchCtpvNm" hidden> 시도(전체)</label>
                               <input id="searchCtpvNm">
                           </li>
                           <li class="li_slec">
                               <label for="searchSggNm" hidden> 시군구(전체)</label>
                               <input id="searchSggNm">
                           </li>
                           <li class="li_slec">
                               <label for="searchBzmnSeCd" hidden> 권한(전체)</label>
                               <input id="searchBzmnSeCd">
                           </li>
                           <li class="li_slec">
                               <label for="searchBsnSttsCd" hidden> 영업상태(전체)</label>
                               <input id="searchBsnSttsCd">
                           </li>
                           <li class="li_slec">
                               <label for="searchRslt" hidden> 지도점검결과(전체)</label>
                               <input id="searchRslt">
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
                    </div>
                    <button class="yellow_btn" id="searchBtn">
                        조회<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘">
                    </button>
                </div>
            </div>
            
            <!-- 지도점검이력 그리드 -->
			<div class="contBox lastBox02">
				<div class="nameBox nameBox-flex">
                    <h4 class="name">지도점검이력</h4>
                    <button class="download-btn excelDownBtn" type="button">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>
                
                <table id="inspectionHistGrid" style="width:2000px;">
                    <caption>지도점검이력</caption>
                </table>
            </div>
            
            <div class="btn_flex">
			    <button type="button" class="blue_btn insertPopupBtn">등록</button>
			</div>
			
			<!-- 지도점검이력 등록 팝업 -->
			<div class="popup register_popup popup_type02 popup" style="z-index: 999">
		        <div id="insertPopup" class="box">
		            <div class="popup_top">
		                <h4>지도점검이력 등록</h4>
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
								        <h4 class="name">지도원 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01 inspector"> 
								        	<tr>
								           	<th>
								           	순번
								           	</th>
								           	<th>
								           	<span class="asterisk">*</span>성명
								           	</th>
								           	<th>
								           	<span class="asterisk">*</span>직급
								           	</th>
								           	<th>
								           	<span class="asterisk">*</span>소속
								           	</th>
								           </tr>
								           <tr>
								           	<td>
								           	1
								           	</td>
								           	<td>
								           	<input id="regExmnr" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="regJbgd" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="regOgdp" class="input"type="text" oninput="charOnly(this)" />
								           	</td>
								           </tr>
								            <tr>
								           	<td>
								           	2
								           	</td>
								           	<td>
								           	<input id="regExmnr2" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="regJbgd2" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="regOgdp2" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           </tr>
								            <tr>
								           	<td>
								           	3
								           	</td>
								           	<td>
								           	<input id="regExmnr3" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="regJbgd3" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="regOgdp3" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           </tr>
								        </table>
								    </div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								       	 	<tr>
								                <th scope="col"><span class="asterisk">*</span>회사명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="">회사명</label>
								                        <input id="agencyNm" name="agencyNm" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">영업상태</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bsnSttsNm">영업상태</label>
								                        <input type="text" id="bsnSttsNm" name="bsnSttsNm" class="input readOnlyGrayBtn" maxLength="80" aria-label="영업상태"
								                               readOnly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">상태변경일시</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="bsnSttsMdfcnDt">상태변경일시</label>
								                        <input type="text" id="bsnSttsMdfcnDt" name="bsnSttsMdfcnDt" class="input readOnlyGrayBtn" maxlength="12" aria-label="상태변경일시"
								                              readOnly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">연락처</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="agencyTelno">연락처</label>
								                        <input type="text" id="agencyTelno" name="agencyTelno" class="input readOnlyGrayBtn" maxLength="80" aria-label="전화번호"
								                              readOnly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">대표자명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="rprsvNm">대표자명</label>
								                        <input type="text" id="rprsvNm" name="rprsvNm" class="input readOnlyGrayBtn" maxLength="80" aria-label="대표자명"
								                              readOnly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">사업자등록번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="brno">사업자등록번호</label>
								                        <input type="text" id="brno" name="brno" class="input readOnlyGrayBtn" maxLength="80" aria-label="사업자등록번호"
								                              readOnly />
								                    </div>
								                </td>
								            </tr>
								             <tr>
								                <th scope="col">소재지</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="locgov">소재지</label>
								                        <input type="text" id="locgov" name="locgov" class="input readOnlyGrayBtn" maxLength="80" aria-label="소재지"
								                               readOnly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>

							<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도점검 내용</h4>
								    </div>
								    <div class="cont cont-flex inspection01">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>점검항목</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regChckArtcl">점검항목</label>
								                        <input type="text" id="regChckArtcl" name="regChckArtcl" class="input" maxLength="80" aria-label="점검항목"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								           	<tr>
								                <th scope="col"><span class="asterisk">*</span>점검장소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regChckPlc">점검장소</label>
								                        <input type="text" id="regChckPlc" name="regChckPlc" class="input" maxLength="80" aria-label="점검장소"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">기타항목</th>
								               	<td>
								                    <div class="tb_flex">
								                        <label for="regEtcArtcl">기타항목</label>
								                        <input type="text" id="regEtcArtcl" name="regEtcArtcl" class="input" maxLength="80" aria-label="기타항목"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>점검일자</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regChckYmd">점검일자</label>
								                        <input type="text" id="regChckYmd" class="regChckYmd" aria-label="점검일자" />
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								    <div class="cont inspection02">
								    	<table class="tb rental_tb01">
								    	   <tr>
								                <th scope="col"><span class="asterisk">*</span>점검내용</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regChckCn"></label>
<!-- 								                        <input type="text" id="regChckCn" name="regChckCn" class="input" maxLength="80" aria-label="지도내용" -->
<!-- 								                               oninput="charOnly(this)" /> -->
								                        <textarea class="input chckCn" name="regChckCn" id="regChckCn" maxlength="1000" oninput="charOnly(this)"></textarea>
								                    </div>
								                </td>
								            </tr>
						            	</table>
								    </div>
								    <div class="cont inspection02">
								    	<table class="tb rental_tb01">
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>첨부파일</th>
								                <td>
								                    <div class="fileDiv">
<!-- 									                    <input id="fileNm" hidden type="text" placeholder="지도점검결과 파일을 등록해주세요" class="input inp filetype" disabled="disabled" readonly /> -->
														<input
															type="file" multiple id="fileUpload" name="files"
															onchange="fileAddCheck(this)" class="upload-hidden"
															style="display: none;" accept=".jpg, .jpeg, .png, .pdf" />
														<button class="yellow_btn" id="fileUploadBtn">파일첨부</button>
														<div class="file-list regFileList"></div>
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도점검 사실확인</h4>
								    </div>
								    <div class="cont cont-flex">
								    	<table class="tb rental_tb01">
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>점검결과</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regChckRslt">점검결과</label>
								                        <input type="text" id="regChckRslt" name="regChckRslt" maxLength="80" aria-label="점검결과"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
							    			<tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 직급</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regIdfrJbgd">확인자 직급</label>
								                        <input type="text" id="regIdfrJbgd" name="regIdfrJbgd" class="input" maxLength="80" aria-label="확인자 직급"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>서명여부</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regSignYn">서명여부</label>
								                        <input type="text" id="regSignYn" name="regSignYn" maxLength="80" aria-label="서명여부"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    	<table class="tb rental_tb01">
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 성명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regChckIdfr">확인자 성명</label>
								                        <input type="text" id="regChckIdfr" name="regChckIdfr" class="input" maxLength="80" aria-label="확인자 성명"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 소속</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regIdfrOgdp">확인자 소속</label>
								                        <input type="text" id="regIdfrOgdp" name="regIdfrOgdp" class="input" maxLength="80" aria-label="확인자 소속"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 연락처</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="regTelno">확인자 연락처</label>
								                        <input type="text" id="regTelno" name="regTelno" class="input" maxLength="80" aria-label="확인자 연락처"
								                                oninput="telFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
								</div>
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도점검 후속 처리 내용</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								       	 	<tr>
								                <th scope="col">후속처리내용</th>
								                <td>
								                    <div class="tb_flex regPrcsCnDiv">
								                        <label for="regPrcsCn">후속처리내용</label>
								                        <input type="text" id="regPrcsCn" name="regPrcsCn" maxLength="80" class="input readOnlyGrayBtn" aria-label="후속처리내용"
								                               readOnly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								       	 	<tr>
								                <td>
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
		    
		    <!-- 상세 팝업 -->
		    <div class="popup detail_popup popup_type02">
		        <div class="box">
		            <div class="popup_top">
		                <h4>지도점검이력 상세</h4>
		                <div class="close detailClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

					<div class="content">
			            <div class="scrollBar02">
			                <div class="info_wr">
			                    <div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도원 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01 inspector">
								        	<tr>
								           	<th>
								           	순번
								           	</th>
								           	<th>
								           	<span class="asterisk">*</span>성명
								           	</th>
								           	<th>
								           	<span class="asterisk">*</span>직급
								           	</th>
								           	<th>
								           	<span class="asterisk">*</span>소속
								           	</th>
								           </tr>
								           <tr>
								           	<td>
								           	1
								           	</td>
								           	<td>
								           	<input id="detailExmnr" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="detailJbgd" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="detailOgdp" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           </tr>
								            <tr>
								           	<td>
								           	2
								           	</td>
								           	<td>
								           	<input id="detailExmnr2" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="detailJbgd2" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="detailOgdp2" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           </tr>
								            <tr>
								           	<td>
								           	3
								           	</td>
								           	<td>
								           	<input id="detailExmnr3" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="detailJbgd3" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           	<td>
								           	<input id="detailOgdp3" class="input" type="text" oninput="charOnly(this)" />
								           	</td>
								           </tr>
								        </table>
								</div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">회사 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								        	<tr>
								                <th scope="col"><span class="asterisk">*</span>회사명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailCoNm">회사명</label>
								                        <input id="detailCoNm" name="detailCoNm" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">영업상태</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailBsnSttsNm">영업상태</label>
								                        <input type="text" id="detailBsnSttsNm" name="detailBsnSttsNm" class="input no_line" maxLength="80" aria-label="영업상태"
								                               readonly/>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">상태변경일시</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailBsnSttsMdfcnDt">상태변경일시</label>
								                        <input type="text" id="detailBsnSttsMdfcnDt" name="detailBsnSttsMdfcnDt" class="input no_line" maxlength="12" aria-label="상태변경일시"
								                               readonly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">연락처</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailAgencyTelno">연락처</label>
								                        <input type="text" id="detailAgencyTelno" name="detailAgencyTelno" class="input no_line" maxLength="80" aria-label="전화번호"
								                               readonly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">대표자명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailRprsvNm">대표자명</label>
								                        <input type="text" id="detailRprsvNm" name="detailRprsvNm" class="input no_line" maxLength="80" aria-label="대표자명"
								                               readonly />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">사업자등록번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailBrno">사업자등록번호</label>
								                        <input type="text" id="detailBrno" name="detailBrno" class="input no_line" maxLength="12" aria-label="사업자등록번호"
								                               readonly />
								                    </div>
								                </td>
								            </tr>
								             <tr>
								                <th scope="col">소재지</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailLocgov">소재지</label>
								                        <input type="text" id="detailLocgov" name="detailLocgov" class="input no_line" maxLength="80" aria-label="소재지"
								                               readonly />
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>
								
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도점검 내용</h4>
								    </div>
								    <div class="cont cont-flex inspection01">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>점검항목</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailChckArtcl">점검항목</label>
								                        <input type="text" id="detailChckArtcl" name="detailChckArtcl" class="input" maxLength="80" aria-label="점검항목"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>점검장소</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailChckPlc">점검장소</label>
								                        <input type="text" id="detailChckPlc" name="detailChckPlc" class="input" maxLength="80" aria-label="점검장소"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">기타항목</th>
								               	<td>
								                    <div class="tb_flex">
								                        <label for="detailEtcArtcl">기타항목</label>
								                        <input type="text" id="detailEtcArtcl" name="detailEtcArtcl" class="input" maxLength="80" aria-label="기타항목"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>점검일자</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailChckYmd">점검일자</label>
								                        <input type="text" id="detailChckYmd" class="detailChckYmd" aria-label="점검일자" />
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								    <div class="cont inspection02">
								    	<table class="tb rental_tb01">
								    	   <tr>
								                <th scope="col"><span class="asterisk">*</span>점검내용</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailChckCn">점검내용</label>
								                        <textarea class="input chckCn" name="detailChckCn" id="detailChckCn" maxlength="1000" oninput="charOnly(this)"></textarea>
								                    </div>
								                </td>
								            </tr>
						            	</table>
								    </div>
								    <div class="cont inspection02">
								    	<table class="tb rental_tb01">
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>첨부파일</th>
								                <td>
								                    <div class="fileDiv">
<!-- 									                    <input id="fileNm" hidden type="text" placeholder="지도점검결과 파일을 등록해주세요" class="input inp filetype" disabled="disabled" readonly /> -->
														<input
															type="file" multiple id="detailFileUpload" name="files"
															onchange="fileAddCheck(this)" class="upload-hidden"
															style="display: none;" accept=".jpg, .jpeg, .png, .pdf" />
<!-- 														<button id="fileBtn" class="yellow_btn"> -->
<%-- 															<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"> --%>
<!-- 														</button> -->
														<button class="yellow_btn" id="detailFileUploadBtn">파일첨부</button>
														<div class="file-list detailFileList"></div>
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도점검 사실확인</h4>
								    </div>
								    <div class="cont cont-flex">
								    	<table class="tb rental_tb01">
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>점검결과</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailChckRslt">점검결과</label>
								                        <input type="text" id="detailChckRslt" name="detailChckRslt"  maxLength="80" aria-label="점검결과"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
							    			<tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 직급</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailIdfrJbgd">확인자 직급</label>
								                        <input type="text" id="detailIdfrJbgd" name="detailIdfrJbgd" class="input" maxLength="80" aria-label="확인자 직급"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>서명여부</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailSignYn">서명여부</label>
								                        <input type="text" id="detailSignYn" name="detailSignYn" maxLength="80" aria-label="서명여부"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    	<table class="tb rental_tb01">
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 성명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailChckIdfr">확인자 성명</label>
								                        <input type="text" id="detailChckIdfr" name="detailChckIdfr" class="input" maxLength="80" aria-label="확인자 성명"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								    		<tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 소속</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailIdfrOgdp">확인자 소속</label>
								                        <input type="text" id="detailIdfrOgdp" name="detailIdfrOgdp" class="input" maxLength="80" aria-label="확인자 소속"
								                               oninput="charOnly(this)" />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col"><span class="asterisk">*</span>확인자 연락처</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailTelno">확인자 연락처</label>
								                        <input type="text" id="detailTelno" name="detailTelno" class="input" maxLength="80" aria-label="확인자 연락처"
								                               oninput="telFormat(this)" />
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
								</div>
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">지도점검 후속 처리 내용</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">후속처리내용</th>
								                <td>
								                    <div class="tb_flex detailPrcsCnDiv">
								                        <label for="detailPrcsCn">후속처리내용</label>
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								       	 	<tr>
								                <td>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>
			                </div>
			            </div>
			            <div class='btn_flex'>
			            	<button style="margin-right: 10px" class='blue_btn updateBtn' value="Update">수정</button>
			            	<button style="margin-right: 10px" class='red_btn deleteBtn' value="Delete">삭제</button>
			                <button class="gray_btn cancel_btn detailClose" value="Cancel">닫기</button>
			            </div>
			        </div>
		        </div>
		    </div>
		    
		</div>
	</div>
</div>