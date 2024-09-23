<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="${contextPath}/js/stts/totStts.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/mainView.css" />
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>

<style>
#grid01 > tbody > tr.k-detail-row > td.k-detail-cell > div > div.k-grid-norecords, 
#gvAccGrid > tbody > tr.k-detail-row > td.k-detail-cell > div > div.k-grid-norecords,
#carShare > div.k-grid.k-widget.k-grid-display-block > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
	justify-content: center;
	font-size: 16px;
}
#areaGrid > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar,
#gvAccession > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar,
#carShare > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar  {
	display: none;
}
#grid01 > thead, 
#gvAccGrid > thead,
#carShareGrid > thead {
	font-weight: bold;
}
@media (max-width: 950px) {
	#zone1 {
		width: 100% !important;
	}
}
#areaGrid, #areaChart {
	height : 570px;;
}
.k-picker-solid {
	height: 30px;
}
.contBox .cont {
    padding: 11px 25px 12px;
}
table.rental_tb01 {
    margin-right: 50px;
}
/* .popup .k-picker-solid {
    width: 206.2px !important;
} */
button.red_btn {
    width: 152px;
    height: 54px;
    background-color: #ff3838;
    border-radius: 8px;
    font-size: 1.8rem;
    line-height: 26px;
    color: #fff;
    margin-right: 10px;
}
button.red_btn:hover {
    background-color: #fff;
    color: #ff3838;
    border: 1px solid #ff3838;
}
</style>

<script>
	var authrtCd        = "${authrtCd}";
	var cmptncZoneCd    = "${cmptncZoneCd}";
	var bzmnSn          = "${bzmnSn}";
	var upBzmnSn        = "${upBzmnSn}";
</script>

<div class="subPage sub03 sub05_01">
	<div id="container">
		<!-- 콘텐츠 시작 -->
	    <div class="wrap">
	    	<div class="titBox">
	        	<div class="tit01">
	            	<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	                <h2><c:out value='${tableName}'/></h2>
				</div>
	            <ul class="tit02">
	            	<li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>통계</li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">대여사업자 통계</li>
				</ul>
			</div>
			<br />
			
			<!-- 대여사업자 현황 -->
	        <div class="cont-flex">
	        	<div id="zone1" class="left-bx cmn-bx" style="width: 80%">
	            	<div id="areaGrid"  class="contBox flex-box">
	                	<div class="nameBox" style="display: flex; justify-content: space-between;">
	                    	<h4 class="name">대여사업자 현황</h4>
	                    	<div style="display: flex;  align-items: center;">
	                    		기준일자 ： <span id="nowTime"></span>&nbsp;
		                    	<button class="download-btn" onClick="javaScript:$statistics.event.excelDown(event);">
				                	<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
								</button>
	                    	</div>
						</div>
						<!-- 확장 하이라키 제거 때문에 table 사용 -->
			            <table id="grid01">
			            	<caption>대여사업자현황</caption>
						</table>
					</div>
				</div>
	            <div class="right-bx cmn-bx">
					<div id="areaChart" class="contBox flex-box">
	                	<div class="nameBox">
	                    	<h4 class="name">대여사업자 등록 현황</h4>
						</div>
	                    <div class="cont chart-flex chart-flex02" style="height: 100%; overflow: auto;">
	                    	<div id="multi-chart" class="multi-chart" style="width:100%; height:100%; margin:0px;"></div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<br />
			
			<!-- 지자체별 가입  사용자 현황 -->
			<div id="gvAccession" class="contBox tmCond">
	           	<div class="nameBox" style="display: flex; justify-content: space-between;">
	               	<h4 class="name">지자체별 가입 사용자 현황</h4>
	               	<div style="display: flex; align-items: center;">
		                <button class="download-btn excelDownBtn" type="button" onClick="javaScript:$statistics.event.excelDown(event);">
	                        <img src="/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
	                    </button>
	               	</div>
				</div>
				<div class="search_top">
					<div class="selec_wr" style="height: 50px; padding: 11px 10px 11px 24px;">
						<div class="mo_flex">
			            	<ul class="selec_box">
			                	<li class="li_slec" style="display: flex; align-items: center">
			                    	<label for="auth" style="width: 140px;">사용자 권한 : </label>
			                        <input type="text" id="auth"  aria-label="권한" placeholder="권한" />
								</li>
							</ul>
						</div>
						<button class="yellow_btn searchBtn" type="button" style="height: 30px;" onClick="javaScript:$statistics.event.gvAccSearch();">
							조회 <img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘" />
						</button>
					</div>
				</div>
	            <table id="gvAccGrid">
	            	<caption>지자체별 가입 사용자 현황</caption>
	            </table>
			</div>
			<br />
			<br />
			
			<!-- 카쉐어링 업체 현황 -->
			<div id="carShare" class="contBox tmCond">
	           	<div class="nameBox" style="display: flex; justify-content: space-between;">
	               	<h4 class="name">카쉐어링 업체 현황</h4>
	               	<div style="display: flex; align-items: center;">
		                <button class="download-btn excelDownBtn" type="button" onClick="javaScript:$statistics.event.excelDown(event);">
	                        <img src="/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
	                    </button>
	               	</div>
				</div>
				<div class="search_top">
					<div class="selec_wr" style="height: 50px; display: flex; justify-content: flex-end;">
						<button class="blue_btn insertBtn" type="button" style="height: 30px; width: 80px;">
							등록
						</button>
					</div>
				</div>
	            <table id="carShareGrid">
	            	<caption>카쉐어링 업체 현황</caption>
	            </table>
			</div>
			
			<!-- 카쉐어링 등록 팝업 -->
			<div class="popup insert_popup" style="z-index: 999">
		        <div id="insertPopup" class="box">
		            <div class="popup_top">
		                <h4>카쉐어링 업체 등록</h4>
		                <div class="close insertClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>
					<div class="info_wr">
						<div class="contBox" style="margin-top: 0px;">
						    <div class="cont cont-flex">
						        <table class="tb rental_tb01">
						            <tr>
						                <th scope="col" style="width: 100px;">지역</th>
						                <td>
						                    <div class="">
						                        <label for="areaDrop">지역</label>
						                        <input type="text" id="areaDrop" maxLength="80" class="input clear" oninput="charOnly(this)" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col" style="width: 100px;">차량등록대수</th>
						                <td>
						                    <div class="tb_flex">
						                        <label for="regCar">차량등록대수</label>
						                        <input type="number" id="regCar" class="input clear" min="0" max="10000000" value="0" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col" class="note_name" style="width: 100px;">영업소</th>
						                <td class="textarea_wr">
						                	<div class="tb_flex" style="display: flex; flex-direction: column;">
						                		<label for="bsnOffcCnt">영업소 수</label>
						                        <input type="number" id="bsnOffcCnt" class="input clear" min="0" max="10000" value="0" />
						                		<label for="bsnOffc">영업소</label>
						                		<textarea id="bsnOffc" maxLength="1000" cols="30" rows="5" class="noteBox" oninput="charOnly(this)"  placeholder="영업소 상세 입력" ></textarea>
							                </div>
						                </td>
						            </tr>
						        </table>
						        <table class="tb rental_tb01">
						            <tr>
						                <th scope="col" style="width: 100px;">업체명</th>
						                <td>
						                    <div class="tb_flex">
						                        <label for="cmpNm">업체명</label>
						                        <input type="text" id="cmpNm"  maxLength="80" class="input clear" oninput="charOnly(this)" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col" style="width: 100px;">회원수</th>
						                <td>
						                    <div class="tb_flex">
						                        <label for="userCnt">회원수</label>
							                        <input type="number" id="userCnt" class="input clear" min="0" max="10000000" value="0" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
										<th scope="col" class="note_name" style="width: 100px;">예약소</th>
						                <td class="textarea_wr">
						                	<div class="tb_flex" style="display: flex; flex-direction: column;">
						                		<label for="rsrvtnOffcCnt">예약소 수</label>
						                        <input type="number" id="rsrvtnOffcCnt" class="input clear" min="0" max="10000" value="0" />
						                		<label for="rsrvtnOffc">예약소</label>
						                		<textarea id="rsrvtnOffc" maxLength="1000" cols="30" rows="5" class="noteBox" oninput="charOnly(this)" placeholder="예약소 상세 입력" ></textarea>
							                </div>
						                </td>
						            </tr>
						        </table>
						    </div>
						    <div class="cont cont-flex">
						        <table class="tb rental_tb02">
						            <tr>
						                <th scope="col" class="note_name">비고</th>
						                <td class="textarea_wr">
						                	<div class="tb_flex">
						                		<label for="insertRmrk">비고</label>
						                		<textarea id="insertRmrk" maxLength="1000" cols="30" rows="5" class="noteBox" oninput="charOnly(this)"  style="height:100px !important;"></textarea>
							                </div>
						                </td>
						            </tr>
						        </table>
							</div>
						</div>
					</div>
					<div class="btn_flex">
						<button class="blue_btn insertConfirmBtn" value="Insert" onClick="javaScript:$statistics.event.insertCarShare();">등록</button>
						<button class="gray_btn insertClose" value="Cancel">닫기</button>
					</div>
	        	</div>
	    	</div>		
	    	
	    	<!-- 카쉐어링 상세팝업 -->
			<div class="popup update_popup" style="z-index: 999">
		        <div id="detailPopup" class="box">
		            <div class="popup_top">
		                <h4>카쉐어링 업체 상세 내용</h4>
		                <div class="close detailClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>
					<div class="info_wr">
						<div class="contBox" style="margin-top: 0px;">
						    <div class="cont cont-flex">
						        <table class="tb rental_tb01">
						            <tr>
						                <th scope="col" style="width: 100px;">지역</th>
						                <td>
						                    <div class="">
						                        <label for="areaDropDetail">지역</label>
						                        <input type="text" id="areaDropDetail" maxLength="80" class="input clear" oninput="charOnly(this)" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col" style="width: 100px;">차량등록대수</th>
						                <td>
						                    <div class="tb_flex">
						                        <label for="regCarDetail">차량등록대수</label>
						                        <input type="number" id="regCarDetail" class="input clear" min="0" max="10000000" value="0" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col" class="note_name" style="width: 100px;">영업소</th>
						                <td class="textarea_wr">
						                	<div class="tb_flex" style="display: flex; flex-direction: column;">
						                		<label for="bsnOffcCntDetail">영업소 수</label>
						                        <input type="number" id="bsnOffcCntDetail" class="input clear"  min="0" max="10000" value="0" />
						                		<label for="bsnOffcDetail">영업소</label>
						                		<textarea id="bsnOffcDetail" maxLength="1000" cols="30" rows="5" class="noteBox" oninput="charOnly(this)"  placeholder="영업소 상세 입력" ></textarea>
							                </div>
						                </td>
						            </tr>
						        </table>
						        <table class="tb rental_tb01">
						            <tr>
						                <th scope="col" style="width: 100px;">업체명</th>
						                <td>
						                    <div class="tb_flex">
						                        <label for="cmpNmDetail">업체명</label>
						                        <input type="text" id="cmpNmDetail"  maxLength="80" class="input clear" oninput="charOnly(this)" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
						                <th scope="col" style="width: 100px;">회원수</th>
						                <td>
						                    <div class="tb_flex">
						                        <label for="userCntDetail">회원수</label>
							                        <input type="number" id="userCntDetail" class="input clear"  min="0" max="10000000" value="0" />
						                    </div>
						                </td>
						            </tr>
						            <tr>
										<th scope="col" class="note_name" style="width: 100px;">예약소</th>
						                <td class="textarea_wr">
						                	<div class="tb_flex" style="display: flex; flex-direction: column;">
						                		<label for="rsrvtnOffcCntDetail">예약소 수</label>
						                        <input type="number" id="rsrvtnOffcCntDetail" class="input clear"  min="0" max="10000" value="0" />
						                		<label for="rsrvtnOffcDetail">예약소</label>
						                		<textarea id="rsrvtnOffcDetail" maxLength="1000" cols="30" rows="5" class="noteBox" oninput="charOnly(this)" placeholder="예약소 상세 입력" ></textarea>
							                </div>
						                </td>
						            </tr>
						        </table>
						    </div>
						    <div class="cont cont-flex">
						        <table class="tb rental_tb02">
						            <tr>
						                <th scope="col" class="note_name">비고</th>
						                <td class="textarea_wr">
						                	<div class="tb_flex">
						                		<label for="rmrkDetail">비고</label>
						                		<textarea id="rmrkDetail" maxLength="1000" cols="30" rows="5" class="noteBox" oninput="charOnly(this)"  style="height:100px !important;"></textarea>
							                </div>
						                </td>
						            </tr>
						        </table>
							</div>
						</div>
					</div>
					<div class="btn_flex">
						<button class="blue_btn updateConfirmBtn" value="Update" onClick="javaScript:$statistics.event.updateCarShare();">수정</button>
						<button class="red_btn deleteConfirmBtn" value="Delete" onClick="javaScript:$statistics.event.deleteCarShare();">삭제</button>
						<button class="gray_btn detailClose" value="Cancel">닫기</button>
					</div>
	        	</div>
	    	</div>			
		</div>
	</div>
</div>
			
