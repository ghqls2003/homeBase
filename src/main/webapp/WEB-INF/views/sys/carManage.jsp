<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>
<script src="${contextPath}/js/sys/carManage.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/carManage.css" />
<script>
	var authrtCd = '${authrtCd}';
	var getCmptncZoneCd = '';
	var getBzmnSn = '';
	if (authrtCd === 'Z01' || authrtCd === 'M01' || authrtCd === 'K01' || authrtCd === 'D01') {
		getCmptncZoneCd = '';
	} else if (authrtCd === 'G01'||authrtCd === 'G02') {
		getCmptncZoneCd = '${getCmptncZoneCd}';
	} else if (authrtCd === 'S01' || authrtCd === 'S02' || authrtCd === 'S03') {
		getCmptncZoneCd = '${getCmptncZoneCd}';
		getBzmnSn = '${getBzmnSn}';
	}
</script>
<style>
.car_register02 .search_wr {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 33px;
}

@media ( max-width : 480px) {
	.sm_popup .sm_box .content {
		padding: 15px 20px;
	}
	.car_register02 .yellow_btn {
		width: 100%;
		margin-left: 0;
		margin-top: 6px;
	}
	.car_register02 .btn_flex {
		margin-top: 18px;
	}
	.car_register02 .search_wr {
		margin-bottom: 12px;
		flex-wrap: wrap;
	}
	.car_register02 .search_flex {
		display: flex;
	}
	.car_register02 .search_wr {
		margin-bottom: 0;
	}
}

</style>

<div class="subPage sub03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>
						<c:out value='${tableName}' />
					</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>지자체 관리</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">차량정보 관리</li>
				</ul>
			</div>

			<div class="search_top">
				<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
				<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
				<div class="selec_wr">
					<div class="mo_flex">
						<ul class="selec_box mSelect_box admin">
							<li class="li_slec">
								<input id="searchChk01" type="radio" name="searchChk" aria-label="관할지 체크" value="jurisdiction" checked /> 
								<label for="searchChk01" class="mSearchChk01">관할지</label>
								<input id="searchChk02" type="radio" name="searchChk" aria-label="소재지 체크" value="location" /> 
								<label for="searchChk02">소재지</label>
							</li>
						</ul>
						<ul class="selec_box admin" id="dropCtpv">
							<li class="li_slec">
								<label for="searchCtpvNm" style="display: none">시도(전체)</label> 
 								<input type="text" id="searchCtpvNm" class="searchCtpvNm" aria-label="시도(전체)" placeholder="시도(전체)">
							</li>
						</ul>
						<ul class="selec_box admin" id="dropSgg">
							<li class="li_slec">
								<label for="searchSggNm"style="display: none">시군구(전체)</label> 
								<input type="text" id="searchSggNm" class="searchSggNm" aria-label="시군구(전체)" placeholder="시군구(전체)">
							</li>
						</ul>
						<ul class="selec_box">
							<li class="li_slec">
								<label for="searchCol" style="display: none">조회조건</label> 
								<input id="searchCol" class="searchCol">
							</li>
						</ul>
						<ul>
							<li class="li_slec"><label for="searchWrd"
								style="display: none">검색입력</label> <input type="text"
								id="searchWrd" class="searchWrd input"
								placeholder="검색조건을 입력하세요."></li>
						</ul>
						<ul class="selec_box" id="searchSelectYn" style="display: none">
							<li class="li_slec">
								<label for="searchYn" style="display: none">사용여부, 결함여부</label> 
								<input id="searchYn" class="searchYn" aria-label="사용여부, 결함여부">
							</li>
						</ul>
						<ul class="selec_box" id="bookmarkOrderBox" style="display: none">
							<li class="li_slec">
                                <input type="checkbox" name="bookmarkOrder" id="bookmarkOrder" >
                                <label for="bookmarkOrder">즐겨찾기 우선 표시</label>
                            </li>
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn">
						조회
						<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘">
					</button>
				</div>
			</div>

			<div class="contBox lastBox02">
				<div class="nameBox nameBox-flex">
					<div style="display: flex; align-items: center;">
						<h4 class="name">차량현황</h4>
						&emsp;총&nbsp;<span id="totCnt" style="font-weight: bold;"></span>건
					</div>
					<%--  <button id="btnBatchReg" class="download-btn excelDownBtn" style="width: 90px; margin-right: 10px;">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        일괄등록
                    </button> --%>
					<%-- <button id="btnDownRegForm" class="download-btn excelDownBtn" style="width: 100px; margin-right: 10px;">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        일괄등록 양식
                    </button> --%>
                    <div>
						<%-- <button id="excelBtn" class="download-btn excelDownBtn">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
							엑셀
						</button> --%>
						<button id="excelBtnStream" class="download-btn excelDownBtn">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
							엑셀
						</button>
                    </div>
					<%-- <button id="excelBtnBothTest" class="download-btn excelDownBtn">
						<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
						poi + streaming
					</button> --%>
				</div>
				<table id="carGrid">
					<caption>차량현황</caption>
				</table>

				<div class="popup detail_popup popup_type02">
					<div class="box">
						<div class="popup_top">
							<h4>차량 상세</h4>
							<div class="close detailClose">
								<span></span> <span></span>
							</div>
						</div>
						<div class="content">
							<div class="scrollBar02">
								<div class="info_wr">
									<div class="contBox detail">
										<div class="nameBox nameBox-flex">
											<h4 class="name">소유자 상세 정보</h4>
										</div>
										<div class="cont cont-flex">
											<table class="tb rental_tb01">
												<tr>
													<th scope="col">법인등록번호</th>
													<td><label for="crno">법인등록번호</label> <input id="crno"
														class="input" aria-label="법인등록번호" maxlength="16" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">법인명</th>
													<td><label for="coNm">법인명</label> <input id="coNm"
														class="input" aria-label="법인명" readonly></td>
												</tr>
												<tr>
													<th scope="col">소유자명</th>
													<td><label for="ownrNm">소유자명</label> <input
														id="ownrNm" class="input" aria-label="소유자명" readonly>
													</td>
												</tr>
											</table>
											<table class="tb rental_tb01">
												<tr>
													<th scope="col">주 사업자등록번호</th>
													<td><label for="brno">주 사업자등록번호</label> <input
														id="brno" class="input" aria-label="주 사업자등록번호" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">지역</th>
													<td><label for="ctpvSggNm">지역</label> <input
														id="ctpvSggNm" class="input" aria-label="시도 시군구" readonly>
													</td>
												</tr>
											</table>
										</div>
									</div>

									<div class="contBox detail">
										<div class="nameBox nameBox-flex">
											<h4 class="name">차량 상세 정보</h4>
										</div>
										<div class="cont cont-flex">
											<table class="tb rental_tb01">
												<tr>
													<th scope="col">차량등록번호</th>
													<td><label for="vhclRegNo">차량등록번호</label> <input
														id="vhclRegNo" class="input" aria-label="차량등록번호"
														maxlength="16" readonly></td>
												</tr>
												<tr>
													<th scope="col">차대번호</th>
													<td><label for="vin">차대번호</label> <input id="vin"
														class="input" aria-label="차대번호" maxlength="16" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">차종</th>
													<td><label for="carmdl">차종</label> <input id="carmdl"
														class="input" aria-label="차종" maxlength="16" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">차량명</th>
													<td><label for="vhclNm">차량명</label> <input id="vhclNm"
														class="input" aria-label="차량명" maxlength="16" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">연식</th>
													<td><label for="mdlyr">연식</label> <input id="mdlyr"
														class="input" aria-label="연식" readonly></td>
												</tr>
												<tr>
													<th scope="col">엔진형식</th>
													<td><label for="engineFom">엔진형식</label> <input
														id="engineFom" class="input" aria-label="엔진형식" readonly>
													</td>
												</tr>
											</table>
											<table class="tb rental_tb01">
												<tr>
													<th scope="col">소재지</th>
													<td><label for="sggNm">소재지</label> <input
														id="sggNm" class="input" aria-label="소재지" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">최초등록일자</th>
													<td><label for="frstRegYmd">최초등록일자</label> <input
														id="frstRegYmd" class="input" aria-label="최초등록일자" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">만료일자</th>
													<td><label for="expryYmd">만료일자</label> <input
														id="expryYmd" class="input" aria-label="만료일자" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">자료연계등록일</th>
													<td><label for="regDt">자료연계등록일</label> <input
														id="regDt" class="input" aria-label="자료연계등록일"
														maxlength="4" readonly></td>
												</tr>
												<tr>
													<th scope="col">결함여부</th>
													<td><label for="defectYn">결함여부</label> <input
														id="defectYn" class="input" aria-label="결함여부" readonly>
													</td>
												</tr>
												<tr>
													<th scope="col">사용여부</th>
													<td><label for="useYn">사용여부</label> <input id="useYn"
														class="useYn input" aria-label="사용여부" readonly></td>
												</tr>
											</table>
										</div>
									</div>
									<div>
										<div class="contBox" id="defectInfo" style="display: none;">
											<div class="nameBox nameBox-flex">
												<h4 class="name">차량 결함 정보</h4>
											</div>
											<div class="grid_wr">
												<table id="defectGrid">
													<caption>차량 결함 조회</caption>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>



							<div class="btn_flex">
								<button class="blue_btn update_btn">수정</button>
								<button class="gray_btn cancel_btn detailClose" id="detailClose">닫기</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<%-- 등록 관련
			<div class="btn_flex">
                <button class="blue_btn register_btn">등록</button>
            </div>

            <div class="popup register_popup popup_type02">
                <div class="box">
                    <div class="popup_top">
                        <h4>차량 등록</h4>
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
                                        <h4 class="name">차량 등록 정보</h4>
                                    </div>
                                    <div class="cont cont-flex">
                                        <table class="tb rental_tb01">
                                            <tr>
                                                <th scope="col"><span class="asterisk">*</span>차량등록번호</th>
                                                <td class="input-width">
                                                 <div class="tb_flex">
                                                     <label for="insertVhclRegNo">차량등록번호</label>
                                                     <input id="insertVhclRegNo" class="input" aria-label="차량등록번호" maxlength="16">
                                                     <button class="yellow_btn insertNoDuplicChk">중복확인</button>
                                                 </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">사업자등록번호</th>
                                                <td class="input-width">
                                                 <div class="tb_flex">
                                                     <label for="insertBrno">사업자등록번호</label>
                                                     <input id="insertBzmnSn" aria-label="사업자일련번호" style="display: none">
                                                     <input id="insertCrno" aria-label="법인번호" style="display: none">
                                                     <input id="insertBrno" class="input" aria-label="사업자등록번호" readonly>
                                                     <button class="yellow_btn cmpnyBtn"><img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"></button>
                                                 </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">연식</th>
                                                <td>
                                                    <label for="insertModelYear">연식</label>
                                                    <input id="insertModelYear" class="input" aria-label="연식" maxlength="4">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">엔진형식</th>
                                                <td>
                                                    <label for="insertEngineType">엔진형식</label>
                                                    <input id="insertEngineType" class="input" aria-label="엔진형식" maxlength="80">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" class="lc_name"><span class="asterisk">*</span>지역</th>
                                                <td>
                                                 <div class="tb_flex tb_flex_mo">
                                                     <label for="insertCtpvNm">시/도</label>
                                                     <input id="insertCtpvNm" class="lc_01" aria-label="시/도">
                                                     <label for="insertSggNm">시군구</label>
                                                     <input id="insertSggNm" class="lc_02" aria-label="시군구">
                                                 </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <table class="tb rental_tb01">
                                            <tr>
                                                <th scope="col"><span class="asterisk">*</span>차대번호</th>
                                                <td class="input-width">
                                                 <div class="tb_flex">
                                                     <label for="insertVin">차대번호</label>
                                                     <input id="insertVin" class="input" aria-label="차대번호" maxlength="17">
                                                     <button class="yellow_btn insertVinDuplicChk">중복확인</button>
                                                 </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">차종</th>
                                                <td>
                                                    <label for="insertCarmdl">차종</label>
                                                    <input id="insertCarmdl" class="input" aria-label="차종" maxlength="256">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">차량명</th>
                                                <td>
                                                    <label for="insertVhclNm">차량명</label>
                                                    <input id="insertVhclNm" class="input" aria-label="차량명" maxlength="100">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col">사용여부</th>
                                                <td>
                                                    <label for="insertUseYn">사용여부</label>
                                                    <input id="insertUseYn" class="input useYn" aria-label="사용여부">
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn_flex">
                        <button class="blue_btn insertBtn">등록</button>
                        <button class="gray_btn cancel_btn detailClose">취소</button>
                    </div>
                </div>
            </div>
            --%>
		</div>
	</div>
</div>

<%--
	<!-- 일괄업로드 팝업 -->
	<div id="fileBox" class="popup popup_type02" style="z-index: 90">
	       <div class="box" style="width: auto; height: auto;">
	           <div class="popup_top">
	               <h4>일괄등록</h4>
	               <div class="close d_Close">
	                   <span></span>
	                   <span></span>
	               </div>
	           </div>
			<div class="detail_popup content">
	        	<div class="info_wr" style="height:auto;">
	            	<div class="contBox">
	                	<div class="nameBox nameBox-flex">
	                    	<h4 class="name">파일업로드</h4>
	                    </div>
	                    <div class="cont cont-flex">
	                    	<table class="tb rental_tb01 wTable t01">
	                        	<tbody>
	                        	<tr>
									<th scope="col">파일</th>
										<td>
											<div class="tb_flex">
												<label for="temp_co_nm">파일</label>
												<div class="inpSearch">
													<input type="text" class="inp filetype" disabled="disabled" style="border: none;"/>
													<input type="file" id="files" name="files" onchange="fileAddCheck(this)" class="upload-hidden" style="display: none;" accept=".xlsx"/>
												</div>
												<div>
														<img style="cursor: pointer;" id="filesClickBtn" src="${contextPath}/images/ico_search.png" alt="검색 아이콘"/>
												</div>
											</div>
										</td>
									</tr>
	                            <tr>
	                            	<th scope="col" style="width:160px">오류메세지</th>
	                                <td>
		                            	<div class="tb_flex ms dMargin">
		                            		<div id="excelErrMsg" style="height:200px; overflow:auto; overflow-x:hidden">
		                                </div>
		                                </div>
	                                </td>
	                            </tr>
	                            <tr>
	                        </tbody></table>
	                    </div>
	                </div>
	            </div>
	            <div class="btn_flex">
		            <button class="blue_btn pauseRelease_btn k-button k-primary" onclick="$car.event.btnExcelRegistSave()" value="save">저장</button>
					<button class="gray_btn cancelBtn" type="submit" onclick="$car.event.btnExcelRegistClose()" value="Cancel">닫기</button>
	            </div>
			</div>
		</div>
	</div>
	 --%>

<%-- 
<!-- 회사찾기 팝업 -->
<div class="authority_02" style="width:800px;">
	<div class="popup c_search_popup">
	  	<div class="box">
	    	<div class="popup_top">
				<h4>회사찾기</h4>
	      		<div class="close">
		          	<span></span>
		         	<span></span>
	      		</div>
			</div>
		<div class="content">
	       	<div class="search_wr">
	         	<div class="s_tit" style="width:42px;">검색</div>
	         	<div class="popup_flex">
<!-- 		          	<div class="dropdown"> -->
<!-- 		            	<label for="popupSearchCol" style="display: none">검색조건</label> -->
<!-- 		            	<input id="popupSearchCol"> -->
<!-- 		          	</div> -->
		          	<label for="popupSearchWrd" style="display: none">검색조건</label>
		          	<input id="popupSearchWrd" class="input pop_address" aria-label="검색조건 입력" placeholder="회사명또는 사업자번호">
	        	</div>
	         	<button class="yellow_btn" id="cmpnySearchBtn">
	           		검색
	           		<img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
	            </button>
	        </div>
	        	<div class="result scrollBar02">
	        		<table id="cmpnyGrid">
	                    <caption>회사리스트</caption>
	                </table>
				</div>
	            <div class="btn_flex">
	             	<button class="blue_btn cancel_btn">확인</button>
	            	<button class="gray_btn cancel_btn">취소</button>
	            </div>
			</div>
		</div>
	</div>
</div>
 --%>