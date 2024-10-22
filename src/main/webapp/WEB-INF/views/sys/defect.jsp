<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="${contextPath}/js/sys/defect.js"></script>
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

<script>
    var authrtCd = '${authrtCd}';
</script>

<style>
.popup .k-picker-solid {
	width: 100% !important;
	padding-left: 0px;
}

button.red_btn:hover {
	background-color: #fff;
	color: #364BC6;
	border: 1px solid #364BC6;
}

.btn_flex button.red_btn {
	margin-right: 10px;
}

button.red_btn {
	width: 152px;
	height: 54px;
	background-color: red;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
}

.readOnlyGrayBtn {
	background-color: #f5f5f5;
}

.sm_popup .sm_box {
	width: 1100px;
	height: 500px;
}

.noteBox {
	height: 142px !important;
	border-radius: 8px;
	border: 1px solid #DBE0EC;
	padding: 15px;
}

.note_name {
	vertical-align: top;
	padding-top: 10px;
}

.regiBox {
	width: 1000px;
	height: 370px;
}

@media ( max-width :1500px) {
	.popup .box {
		width: 800px;
		height: 720px;
	}
}

@media ( max-width :1024px) {
	.popup .box {
		width: 800px;
		height: 770px;
	}
}

@media ( max-width :1023px) {
	.popup .box {
		width: 550px;
		height: 700px;
	}
	.sm_popup .sm_box {
		width: 320px;
		height: 500px;
	}
}

@media ( max-width :764px) {
	.popup .box {
		width: 410px;
		height: 500px;
	}
}

@media ( max-width :539px) {
	#carPopupBox {
		width: 320px;
		height: 500px;
	}
	.regiBox {
		width: 320px;
		height: 500px;
	}
	.popup .box {
		width: 320px;
		height: 500px;
	}
}
</style>

<div class="subPage sub04">

	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	    
	    	<!-- title -->
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit"/>
	                <h2>대여차량 결함정보</h2>
	            </div>
	            <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">대여차량 결합정보</li>
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
			                            <label for="searchCoNm" hidden>회사명</label>
			                            <input type="text" id="searchCoNm" class="searchCoNm input" aria-label="회사명" placeholder="회사명을 입력하세요" maxLength="80" oninput="charOnly(this)" />
		                            </li>
		                        </ul>
		                        <ul class="selec_box">
		                            <li class="li_slec">
			                            <label for="searchCarNum" hidden>차량번호</label>
			                            <input type="text" id="searchCarNum" class="searchCarNum input" aria-label="차량번호"  placeholder="차량번호를 입력하세요" maxLength="80" oninput="charOnly(this)" />
		                            </li>
		                        </ul>
			                    <div class="year_picker">
		                            <ul class="yearBox">
		                                <li class="mo_li">
		                                    <label for="start-picker01">발생시작기간</label>
		                                    <input id="start-picker01" title="datepicker"
		                                    	aria-label="시작기간조회">
		                                </li>
		                                <li class="bar">-</li>
		                                <li class="mo_li">
		                                    <label for="end-picker01">발생종료기간</label>
		                                    <input id="end-picker01" title="datepicker"
		                                        aria-label="종료기간조회">
		                                </li>
		                            </ul>
		                        </div>
			                    <ul class="selec_box">
			                        <li class="li_slec">
			                            <label for="send_slec_01" hidden>조치여부</label>
			                            <input type="text" id="crrtvactRslt" class="sendType" aria-label="조치여부" placeholder="조치여부">
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
			        <p class="info"><span>※</span> 시정조치 결과의 반영은 최대 3개월 가량 소요 될 수 있습니다.</p>
			    </div>
	        </div>
	        
	        <!-- 대여차량 결함정보 그리드 -->
	        <div class="contBox grid_wr">
	            <div class="nameBox nameBox-flex">
                    <h4 class="name">대여차량 결합정보</h4>
                    <button class="download-btn exel_down" type="button">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>
                
	            <table id="defectGrid">
	            </table>
	        </div>
	        
	        <div class="btn_flex">
<!-- 			    <button type="button" class="blue_btn reg_btn" style="margin-top: 60px;">등록하기</button> -->
			</div>
	
	        <!-- 팝업 -->
			<!-- 시정조치 결과 등록 팝업 -->
		 <div class="regPopup popup sub04_popup  popup_type02">
			            <div class="box regiBox" >
			                <div class="popup_top">
			                    <h4>시정조치 결과 등록</h4>
			                    <div class="close" id="close">
			                        <span></span>
			                        <span></span>
			                    </div>
			                </div>
 			               <div class="contBox" style="border:0px"> 
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								            <tr>
								                <td class="input-width">
								                    <div class="tb_flex filebox">
								                        <label for="bzmnLicenseAtch">시정조치결과등록</label>
								                        <input id="bzmnLicenseAtch" name="bzmnLicenseAtch" class="input clear" aria-label="시정조치결과등록" readonly />
								                        <label for="bzFileUpload" class="hidden">시정조치결과 파일</label>
								                        <input type="file" id="bzFileUpload" name="files" class="hidden" aria-label="시정조치결과 파일" onchange='fileAddCheck(this)' accept=".jpg, .jpeg, .gif, .png, .pdf">
    													<button class="yellow_btn bzmnFileUpload">불러오기</button>
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>
			                <div class="btn_flex" style="margin-top:45px;">
			                    <button class="blue_btn" id="prcsSttsReg">등록</button>
			                    <button class="blue_btn" id="btnDirectInput">직접입력</button>
			                    <button class="gray_btn cancle_btn">닫기</button>
			                </div>
			            </div>
			        </div>
			
	        <!-- 등록 팝업 -->
	        <div class="popup directInputPopup msg_send popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>결함 시정조치 결과 입력(수기)</h4>
	                    <div class="close" id="close">
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
								        <h4 class="name">대여차량 정보</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								    		 <tr>
								                <th scope="col">차량등록번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="vhclRegNo">차량등록번호</label>
								                        <input type="text" id="vhclRegNo" class="input" maxLength="200"/>
								                        <button id="valiDuplicate" class="yellow_btn")">중복확인</button>
								                    </div>
								                </td>
								            </tr>
								         	<tr>
								                <th scope="col">사업자등록번호</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="brno">차량등록번호</label>
								                        <input type="text" id="brno" name="brno"
																class="input clear" aria-label="사업자등록번호" placeholder='사업자등록번호' />
								                    </div>
								                </td>
								            </tr>
								          	<tr>
								                <th scope="col">연식</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="mdlyr">연식</label>
								                        <input type="text" id="mdlyr" name="mdlyr"
																class="input clear" aria-label="연식" placeholder='연식' />
								                    </div>
								                </td>
								            </tr>
								         	<tr>
								                <th scope="col">엔진형식</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="engineFom">차량등록번호</label>
								                        <input type="text" id="engineFom" name="engineFom"
																class="input clear" aria-label="엔진형식" placeholder='엔진형식' />
								                    </div>
								                </td>
								            </tr>
								           	<tr>
								                <th scope="col">지역</th>
								                <td style="display:flex;justify-content: space-between;">
								                	<div  class="tb_flex admin" style="width:45%">
								                        <label for="CtpvNm" hidden>지역</label>
								                        <input type="text" id="ctpvNm" name="ctpvNm"/>
								                    </div>
													<div  class="tb_flex admin" style="width:45%">
								                        <label for="sggNm" hidden>지역</label>
								                        <input type="text" id="sggNm" name="sggNm" />
									                </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">차대번호</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="vin">차대번호</label>
								                        <input type="text" id="vin" name="vin"
																class="input clear" aria-label="차대번호" placeholder='차대번호' />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차종</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="carmdl">차종</label>
								                        <input type="text" id="carmdl" name="carmdl"
																class="input clear" aria-label="차종" placeholder='차종' />
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">차량명</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="vhcl_nm">차량명</label>
								                        <input type="text" id="vhclNm" name="vhclNm"
																class="input clear" aria-label="차량명" placeholder='차량명' />
								                    </div>
								                </td>
								            </tr>
								           	<tr>
								                <th scope="col">사용여부</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="useYn">사용여부</label>
								                        <input type="text" id="useYn" name="useYn"
																class="input clear" aria-label="사용여부" placeholder='사용여부' />
								                    </div>
								                </td>
								            </tr>
											<tr>
								                <th scope="col">비고</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="rmrk ">비고</label>
								                        <input type="text" id="rmrk" name="remarks"
																class="input clear" aria-label="비고" placeholder='비고' />
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>

								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">차량 결함 정보</h4>
<!-- 								         carmange.jsp L309참고 -->
								    </div>
					    			<div class="grid_wr">
									<table id="defectCarGrid">
										<caption>차량 결함 조회</caption>
									</table>
								</div>
								    
								</div>

								<div class="contBox" style="margin-top: 45px;">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">시정조치 결과</h4>
								    </div>
								    <div class="cont cont-flex">
								    	<table class="tb rental_tb01">
								    		<tr>
								    			<th scope="col">시정조치 일련번호</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="">시정조치 일련번호</label>
								    				<input type="text" id="insertActnSn" class="input" aria-label="시정조치 일련번호"/>
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">시정조치 유형코드</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="">시정조치 유형코드</label>
								    				<input type="text" id="insertActnTyCd" class="input" aria-label="시정조치 유형코드"/>
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">시정조치 결과코드</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="">시정조치 결과코드</label>
								    				<input type="text" id="insertActnRsCd" name="" class="input" aria-label="시정조치 결과코드" />
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">시정조치 내용</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="">시정조치 내용</label>
								    				<input type="text" id="insertActnCn" class="input" aria-label="시정조치 내용" />
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">시정조치일</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="">시정조치일</label>
								    				<input type="text" id="insertActnDt" name="" class="" aria-label="시정조치일"/>
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">조치여부</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="">조치여부</label>
								    				<input type="text" id="insertActnYn" class="input" aria-label="시도" />
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								                <th scope="col">시정조치 결과</th>
								                <td class="input-width">
								                    <div class="tb_flex filebox">
								                        <label for="actnResultAtch">시정조치 결과</label>
								                        <input id="actnResultAtch" name="actnResultAtch" class="input no_line" aria-label="시정조치 결과" readonly />
								                        <label for="actnFileUpload" class="hidden">시정조치 결과 파일</label>
								                        <input type="file" id="actnFileUpload" name="files" class="hidden" aria-label="시정조치 결과 파일" onchange='fileAddCheck(this)' accept=".jpg, .jpeg, .gif, .png, .pdf">
    													<button class="yellow_btn actnResultFileUploadBtn">파일첨부</button>
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    	<table class="tb rental_tb01">
								    		 <tr>
								                <th scope="col">회사명</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="">회사명</label>
								                        <input type="text" id="insertCoNm" class="input readOnlyGrayBtn" maxLength="200"/>
<!-- 								                        <button id="" class="yellow_btn">중복확인</button> -->
								                        <button id="coNmBtn" class="yellow_btn coNmBtn "><img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"></button>
								                    </div>
								                </td>
								            </tr>
								           <tr>
								                <th scope="col">차량번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="garageRoadNmAddr">차량번호</label>
								                        <input type="text" id="insertRegCarNo" class="input readOnlyGrayBtn" maxLength="200" aria-label="차량번호"/>
								                        <button id="carBtn" class="yellow_btn carBtn "><img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"></button>
								                    </div>
								                </td>
								            </tr>
								    		<tr>
								    			<th scope="col">결함일련번호</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="defectSn">결함일련번호</label>
								    				<input type="text" id="insertDefectSn" name="defectSn" class="input readOnlyGrayBtn" aria-label="결함일련번호" readonly="readonly"/>
								    				<input type="hidden" id="" name="" class="input "  />
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								                <th scope="col">등록자</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="">등록자</label>
								                        <input type="text" id="insertRegNm"  class="input clear" maxLength="200" aria-label="상세주소"/>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">등록일자</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="">시정조치 결과 등록일자 등록</label>
								                        <input type="text" id="insertRegDt"  title="datepicker" aria-label="시정조치 결과 등록일자 등록" />
								                    </div>
								                </td>
								            </tr>
								           	<tr>
								                <th scope="col">비고</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="">비고</label>
								                        <input type="text" id="insertRmrk"  class="input clear" maxLength="200" aria-label="차고지 도로명상세주소"  />
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
							<button class="gray_btn cancle_btn insertClose" value="Cancel">닫기</button>
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
							<div class="search_flex" style="display: flex; align-items: center;margin-bottom:13px;">
								<span style="font-size: 1.4rem;margin-right:13px;">차량번호</span>
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
	        
	        <!-- 결합정보 상세보기 팝업 -->
	        <div class="popup viewDefect_popup msg_send  popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>결함정보 및 조치내용 상세</h4>
	                    <div class="close" id="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
						<div class="scrollBar02">
							<div class="info_wr">
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">결함정보 상세</h4>
								    </div>
								    <div class="cont cont-flex">
								        <table class="tb rental_tb01">
								    		 <tr>
								                <th scope="col">차대번호</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="">차대번호</label>
								                        <input type="text" id="actnVin" class="input " maxLength="200" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								         	<tr>
								                <th scope="col">결함일련번호</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="actnDefectsSn">결함일련번호</label>
								                        <input type="text" id="actnDefectsSn" class="input " aria-label="결함일련번호" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								          	<tr>
								                <th scope="col">처리상태코드</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="actnPrcsSttsCd">처리상태코드</label>
								                        <input type="text" id="actnPrcsSttsCd" class="input clear" aria-label="처리상태코드" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								        </table>
								        <table class="tb rental_tb01">
								            <tr>
								                <th scope="col">결함유형코드</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="actnDefectsTypeCd">결함유형코드</label>
								                        <input type="text" id="actnDefectsTypeCd" class="input clear" aria-label="결함유형코드" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								            <tr>
								                <th scope="col">발생일시</th>
								                <td>
								                	<div  class="tb_flex ">
								                        <label for="actnOcrnDt">발생일시</label>
								                        <input type="text" id="actnOcrnDt" class="input clear"  aria-label="발생일시"  title="datepicker" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								         	<tr>
								                <th scope="col" class="note_name">결함내용</th>
								                <td>
								                	<div  class="tb_flex admin">
								                        <label for="actnDefectsCn">결함내용</label>
								                        <textarea id="actnDefectsCn" name="actnDefectsCn" class="input clear noteBox" maxlength="1000" cols="10" rows="5" aria-label="결함내용" oninput="content(this)" readonly=""></textarea>
								                    </div>
								                </td>
								            </tr>
								        </table>
								    </div>
								</div>
								<div class="contBox">
								    <div class="nameBox nameBox-flex">
								        <h4 class="name">조치내용 상세</h4>
								    </div>
								    <div class="cont cont-flex">
								    	<table class="tb rental_tb01">
								    		<tr>
								    			<th scope="col">시정조치 일련번호</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="detailActnSn">시정조치 일련번호</label>
								    				<input type="text" id="detaildefectsRegNo" class="input" aria-label="시정조치 일련번호" readonly="readonly"/>
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">차대번호</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="detailActnVin">차대번호</label>
								    				<input type="text" id="detailVin" class="input" aria-label="차대번호" readonly="readonly"/>
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								    			<th scope="col">차량번호</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="detailActnCarRegNo">차량번호</label>
								    				<input type="text" id="detailCarRegNo"  class="input" aria-label="차량번호" readonly="readonly"/>
							    					</div>
							    				</td>
							    			</tr>
<!-- 							    			<tr> -->
<!-- 								    			<th scope="col">시정조치 내용</th> -->
<!-- 								    			<td> -->
<!-- 								    				<div class="tb_flex aprv"> -->
<!-- 								    				<label for="detailActnCn">시정조치 내용</label> -->
<!-- 								    				<input type="text" id="detailActnCn" class="input" aria-label="시정조치 내용" /> -->
<!-- 							    					</div> -->
<!-- 							    				</td> -->
<!-- 							    			</tr> -->
							    			<tr>
								    			<th scope="col">시정조치일</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="detailActnDt">시정조치일</label>
								    				<input type="text" id="detailActnCrrTvActStrtDay"  class="input" aria-label="시정조치일" readonly="readonly"/>
							    					</div>
							    				</td>
							    			</tr>
							    			<tr>
								                <th scope="col">등록일자</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailActnRegDt">등록일자</label>
								                        <input type="text" id="detailActnRegDt"  class="input" maxLength="200" aria-label="등록일자" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
<!-- 							    			<tr> -->
<!-- 								    			<th scope="col">등록자</th> -->
<!-- 								    			<td> -->
<!-- 								    				<div class="tb_flex aprv"> -->
<!-- 								    				<label for="detailActnNm">등록자</label> -->
<!-- 								    				<input type="text" id="detailActnNm" class="input" aria-label="등록자" /> -->
<!-- 							    					</div> -->
<!-- 							    				</td> -->
<!-- 							    			</tr> -->
							    			
								    	</table>
								    	<table class="tb rental_tb01">
								    		 <tr>
								                <th scope="col">시정조치 유형</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailActnTyCd">시정조치 유형</label>
								                        <input type="text" id="detailActnCrrtvActTtl" class="input" maxLength="200" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								           <tr>
								                <th scope="col">시정조치 결과</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailActnRsCd">시정조치 결과</label>
								                        <input type="text" id="detailCmptnYnNm" class="input" maxLength="200" aria-label="시정조치 결과코드" readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								    		<tr>
								    			<th scope="col">결함일련번호</th>
								    			<td>
								    				<div class="tb_flex aprv">
								    				<label for="detailActnDefectSn">결함일련번호</label>
								    				<input type="text" id="detailActnDefectSn"  class="input " aria-label="결함일련번호" readonly="readonly"/>
							    					</div>
							    				</td>
							    			</tr>
<!-- 								            <tr> -->
<!-- 								                <th scope="col">비고</th> -->
<!-- 								                <td> -->
<!-- 								                    <div class="tb_flex"> -->
<!-- 								                        <label for="detailActnRmrk">비고</label> -->
<!-- 								                        <input type="text" id="detailActnRmrk"  class="input clear" aria-label="비고" /> -->
<!-- 								                    </div> -->
<!-- 								                </td> -->
<!-- 								            </tr> -->
								           	<tr>
								                <th scope="col">조치여부</th>
								                <td>
								                    <div class="tb_flex">
								                        <label for="detailActnYn">조치여부</label>
								                        <input type="text" id="detailActnCrrtvActYnNm"  class="input clear" maxLength="200" aria-label="조치여부"  readonly="readonly"/>
								                    </div>
								                </td>
								            </tr>
								    	</table>
								    </div>
								</div>
							</div>
						</div>

						<div class="btn_flex">
<!-- 							<button class="blue_btn updateBtn" value="update">수정</button> -->
<!-- 							<button class="red_btn deleteBtn" id="">삭제</button> -->
							<button class="gray_btn cancle_btn" value="Cancel">닫기</button>
						</div>
					</div>
	            </div>
	        </div>
	    </div>
	</div>
</div>