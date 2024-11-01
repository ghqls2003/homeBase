<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/drive.css" />

<script src="${contextPath}/js/vfc/drive.js"></script>
<script src="${contextPath}/ext-lib/qrcode.js"></script>
<script>
var userType = '${userType}'
var userTypeDetail = '${userTypeDetail}' === 'true';  /* 모바일 웹을 구분 - true(웹), false(앱) */
var userTypeBool = '${userTypeBool}' === 'true';
var userOperSystemBool = '${userOperSystemBool}' === 'true';
var old_new = '${old_new}';
var authrtCd = '${authrtCd}'
</script>

<div class="subPage sub02_03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	                <img src="${contextPath}/images/mobile01.png" alt="모바일" style="display: none;">
	               <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">운전자격확인</li>
	            </ul>
	        </div>

	        <div class="contBox">
	            <div class="nameBox">
	                <h4 class="name">대여정보 입력</h4>
	            </div>

            	<div class="cont" style="padding-bottom: 0px;">
	            	<p class="tb_top">※ (*) 이 포함된 항목은 필수입력 항목입니다.</p>
            	</div>
	            <div class="cont cont-flex" style="padding-top: 0px;">
	                <table class="tb rental_tb01">
	                    <caption>대여정보입력</caption>
	                    <tr>
	                        <th scope="col">
	                            차량번호
	                            <span class="asterisk">*</span>
	                        </th>
	                        <td class="input-width">
	                            <div class="tb_flex">
	                                <label for="car_num">차량번호</label>
	                                <input id="car_num" class="input" aria-label="차량번호입력" placeholder="ex) 123가4567" style="width: 100%;" maxlength="16" >
	                                <input id="vin" placeholder="차대번호" style="display:none">
	                                <input id="carmdl" placeholder="차종" style="display:none">
	                                <input id="modelYear" placeholder="연식" style="display:none">
	                                <input id="vhclNm" placeholder="차량명" style="display:none">
	                                <input id="bzmnSn" placeholder="사업자일련번호" style="display:none">
	                                <input id="engineType" placeholder="엔진형식" style="display:none">
	                                <input id="useYn" placeholder="사용여부" style="display:none">
	                                <input id="signguCd" placeholder="시군구코드" style="display:none">
	                                <input id="regDt" placeholder="등록일" style="display:none">
	                                <input id="crno" placeholder="법인등록번호" style="display:none">
	                                <button class="yellow_btn carNum_btn">
	                                    검색<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘" class="basic_ico">
	                                </button>

	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th scope="col">
	                            대여시작일
	                            <span class="asterisk">*</span>
	                        </th>
	                        <td>
	                            <label for="start-picker02">대여시작일</label>
	                            <input id="start-picker02" class="datePicker" title="날짜"
	                                aria-label="시작기간검색">
	                        </td>
	                    </tr>
	                </table>
	                <!--  대여차량 찾기 팝업 -->
	                <div class="popup carNum_popup">
	                    <div class="box">
		                    <div class="popup_top">
		                        <h4> 대여차량 찾기</h4>
		                        <div class="close">
			                        <span></span>
			                        <span></span>
		                        </div>
		                    </div>
		                    <div class="content">
		                        <div class="search_wr">
		                            <div class="num_input">
		                                <label for="car_num_pop">차량번호</label>
		                                <input id="car_num_pop" class="input" aria-label="차량번호입력" placeholder="차량번호">
		                            </div>
		                            <button class="yellow_btn carSearch_btn">
		                                검색<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘" class="basic_ico">
		                            </button>
		                        </div>
		                        <div class="contBox">
		                            <div class="nameBox">
		                                <h4 class="name">대여차량 조회</h4>
		                            </div>
		                            <div class="cont">
		                                <table id="carNum_grid">
		                                    <caption>대여차량 조회</caption>
		                                </table>
		                            </div>
		                        </div>
		                        <div class="btn_flex">
			                        <button class="blue_btn">완료</button>
			                        <button class="gray_btn cancel_btn">취소</button>
		                        </div>
		                    </div>
	                    </div>
	                </div>

	                <table class="tb rental_tb02">
	                    <caption>대여정보입력</caption>
	                    <tr class="input no_line" >
	                    	<td></td>
	                    </tr>
	                    <tr>
	                        <th scope="col">
	                            대여종료일
	                            <span class="asterisk">*</span>
	                        </th>
	                        <td>
	                            <label for="end-picker02">대여종료일</label>
	                            <input id="end-picker02" class="datePicker"  title="datepicker"
	                                aria-label="시작기간검색">
	                        </td>
	                    </tr>
	                </table>
	            </div>
	        </div>
	        <div class="contBox lastBox">
	            <div class="nameBox">
	                <h4 class="name">면허정보 입력</h4>
	            </div>
	            <div class="cont">
	            	<div class="select">
                        <button class="select-btn license_btn">
                            <img src="../images/sub/ico_license.png" alt="모바일 면허증" class="basic_ico">
                            <img src="../images/sub/ico_license02.png" alt="모바일 면허증" class="hover_ico">
                            모바일 면허증
                        </button>
						<button class="select-btn photo_btn">
                            <img src="../images/sub/ico_photo.png" alt="면허증 촬영" class="basic_ico">
                            <img src="../images/sub/ico_photo02.png" alt="면허증 촬영" class="hover_ico">
                            면허증 촬영
                        </button>
						<button class="select-btn upload_btn">
                            <img src="../images/sub/ico_photo.png" alt="면허증 촬영" class="basic_ico">
                            <img src="../images/sub/ico_photo02.png" alt="면허증 촬영" class="hover_ico">
                            면허증 업로드
                        </button>
                        <!-- 모바일 면허증 팝업 -->
                        <div class="popup license_popup">
                            <div class="box" style="height:555px;">
                             	<div class="popup_top">
                                	<h4>모바일 면허증(QR)</h4>
                                	<div class="close">
                                  		<span></span>
                                  		<span></span>
                                	</div>
                              	</div>
                              	<div class="content">
                                	<div class="license_wr">
                                    	<div class="qr_code" id="qrCodeArea" style="width:200px; padding:10px; background-color:white;display:none">
                                    	</div>
                                    	<p class="qr_txt">
	                                        "서비스 이용에 대한 동의"를 하시면 <br>
	                                        QR 이미지가 발급 됩니다.
	                                    </p>
                                	</div>
	                                <div class="contBox">
	                                    <div class="nameBox">
	                                        <h4 class="name">서비스 이용에 대한 동의</h4>
	                                        <div class="all_chkBox">
	                                            <input id="all_chk" type="checkbox" name="agreeAll">
	                                            <label for="all_chk">전체동의</label>
	                                        </div>
	                                    </div>
	                                    <div class="cont">
	                                        <ul class="agreeInfo_wr">
	                                            <li>
	                                                <input id="agreeInfo_01" type="checkbox" name="agreeInfo">
	                                                <label for="agreeInfo_01">개인정보 이용 동의</label>
	                                                <button class="agree_view agree_view01">보기</button>
	                                            </li>
	                                            <li>
	                                                <input id="agreeInfo_02" type="checkbox" name="agreeInfo">
	                                                <label for="agreeInfo_02">고유식별정보처리동의</label>
	                                                <button class="agree_view agree_view02">보기</button>
	                                            </li>
	                                        </ul>
	                                    </div>
	                                </div>

	                                <div class="btn_flex">
    	                            	<button class="gray_btn qrCfm" disabled>완료</button>
                                  		<button class="gray_btn cancel_btn" id="qrCancle">취소</button>
                                	</div>
                              	</div>
                            </div>
                        </div>

                        <!-- 면허증 업로드 팝업 -->
                        <div class="popup upload_popup" style="display:none;">
                            <div class="box">
                             	<div class="popup_top">
                                	<h4>면허증 업로드</h4>
                                	<div class="close">
                                  		<span></span>
                                  		<span></span>
                                	</div>
                              	</div>
                              	<div class="content">
                              		<p class="qr_txt1">
                              			*인식률을 높이기 위해 정위치의 면허증 이미지를 업로드해주시기 바랍니다.<br/>
	                              		<br/>
                              			<span>&lt;예시&gt;</span>
                              		</p>
                              		<div class="license_box">
	                              		<div class="license_bg" >
					                        <div class="license_flex">
					                            <div class="upload_box">
					                                <div class="upload_bg">
					                                </div>
					                            </div>
					                        </div>
					                    </div>
				                    </div>
				                    <div></div>
                                	<div class="license_wr">
                                    	<div class="qr_code" id="qrCodeArea1" style="width:200px; padding:10px; background-color:white;display:none">
                                    	</div>
                                    	<p class="qr_txt1">
	                                        * JPG, JPEG 파일만 업로드 가능합니다.
	                                    </p>
                                	</div>
                                    <br />
                                	<table class="tb rental_tb01 wTable t01">
			                        	<tbody>
			                        	<tr>
											<th scope="col">파일</th>
												<td>
													<div class="contBox">
				                                    	<div class="nameBox">
															<div id="uploadFlex" class="tb_flex">
<!-- 																<label for="temp_co_nm">파일</label> -->
																<div class="inpSearch">
																	<label for="fileTypeCheckInput" style="display: none;"></label>
																	<input type="text" id="fileTypeCheckInput" class="inp filetype" disabled="disabled" style="border: none;"/>
																	<label for="findFile" style="display: none;"></label>
																	<input type="file" id="findFile" name="files" class="upload-hidden" accept="image/*" style="display: none;" />
																</div>
																<div class="fileDiv">
																	<img style="cursor: pointer;" id="searchFile" src="${contextPath}/images/ico_search.png" alt="검색 아이콘"/>
																</div>
															</div>
														</div>
													</div>
												</td>
											</tr>
			                        	</tbody>
			                        </table>

	                                <div class="btn_flex">
    	                            	<button id="fileSubmit" class="qrCfmUpload gray_btn">업로드</button>
                                  		<button class="gray_btn cancel_btn">취소</button>
                                	</div>
                              	</div>
                            </div>
                        </div>
                    </div>

                    <p class="tb_top " style="color:#6c24c9;" id="versionNotice">※ 유사도 검증 기능은 최신 버전의 애플리케이션을 통해 이용 가능합니다.</p>
                    <p class="tb_top">※ 외국인 : 성명란에 공백 없이 영어 대문자로 입력해주시기 바랍니다.</p>
                    <p class="tb_top" style="color:#FF7F50;">※ 면허증 촬영 시, 본인의 면허증 정보가 정확히 일치하는지 확인해 주시기 바랍니다.</p>
                    <p class="tb_top" id="similarity_tb_top" style="color:#509cff;">※ 면허증 촬영 시에만 유사도 검증이 가능합니다.</p>
                    <div class="license_wr">
	                    <div class="license_bg">
	                    	<button class="info-btn info-btn01">
                                <img src="${contextPath}/images/sub/ico_info.png" alt="운전면허번호규칙 설명">
                            </button>
	                        <div class="license_flex">
	                            <div class="upload_box">
	                                <div class="upload_bg">
	                                    <%-- <button class="upload_btn">
	                                        <img src="${contextPath}/images/sub/ico_upload.png" alt="업로드" class="basic_ico">
	                                        <img src="${contextPath}/images/sub/ico_upload02.png" alt="업로드" class="hover_ico">
	                                        업로드
	                                    </button> --%>
	                                </div>
	                            </div>
	                            <div class="input_form">
	                            <form>
	                                <ul class="input_num">
	                                    <li class="li_input">
	                                        <label for="num01"></label>
	                                        <input type="text" id="num01" class="license_input lc_input01" placeholder="00" style="width: 122px;">
	                                    </li>
	                                    <li class="line"></li>
	                                    <li class="li_input">
	                                        <label for="num02"></label>
	                                        <input type="text" id="num02" class="license_input lc_input01" placeholder="00" maxlength="2">
	                                    </li>
	                                    <li class="line"></li>
	                                    <li class="li_input">
	                                        <label for="num03"></label>
	                                        <input type="password" id="num03" class="license_input lc_input02" placeholder="000000" autocomplete="off" maxlength="6">
	                                    </li>
	                                    <li class="line"></li>
	                                    <li class="li_input">
	                                        <label for="num04"></label>
	                                        <input type="text" id="num04" class="license_input lc_input01" placeholder="00" maxlength="2">
	                                    </li>
	                                </ul>
	                                <ul class="name_box">
	                                    <li>
	                                        <div class="tit tit_flex">
	                                            <span>성</span>
	                                            <span>명</span>
	                                        </div>
	                                    </li>
	                                    <li>
	                                        <label for="name"></label>
	                                        <input type="text" id="name" class="license_input lc_input03" placeholder="성명을 기입하세요" maxlength="40">
	                                    </li>
	                                </ul>
	                                <div class="type_box">
	                                    <div class="tit tit01">면허종별</div>
	                                    <ul class="type_cont">
	                                        <li class="tit small_tit">1종</li>
	                                        <li class="chkBox">
	                                            <ul class="chk_flex">
	                                                <li>
	                                                    <input id="chk01-1" value="11" type="radio" name="category01">
	                                                    <label for="chk01-1">대형</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-2" value="12" type="radio" name="category01">
	                                                    <label for="chk01-2">보통</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-3" value="13" type="radio" name="category01">
	                                                    <label for="chk01-3">소형</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-4" value="14" type="radio" name="category01">
	                                                    <label for="chk01-4">대형견인</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-5" value="16" type="radio" name="category01">
	                                                    <label for="chk01-5">소형견인</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-6" value="15" type="radio" name="category01">
	                                                    <label for="chk01-6">구난차</label>
	                                                </li>
	                                            </ul>
	                                        </li>
	                                    </ul>
	                                    <ul class="type_cont">
	                                        <li class="tit small_tit">2종</li>
	                                        <li class="chkBox">
	                                            <ul class="chk_flex">
	                                                <li>
	                                                    <input id="chk02-1" value="32" type="radio" name="category01">
	                                                    <label for="chk02-1">보통</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk02-2" value="33" type="radio" name="category01">
	                                                    <label for="chk02-2">소형</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk02-3" value="38" type="radio" name="category01">
	                                                    <label for="chk02-3">원동기</label>
	                                                </li>
	                                            </ul>
	                                        </li>
	                                    </ul>
	                                    <ul class="name_box">
		                                    <li>
		                                        <label for="name"></label>
		                                        <span id="licenseCareer"></span>
		                                    </li>
		                                </ul>
	                                </div>
	                            </form>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="license_info">
	                         <button class="info-btn info-btn02">
	                             <img src="${contextPath}/images/sub/ico_info.png" alt="운전면허번호규칙 설명">
	                         </button>
	                         <!--  운전면허 번호 규칙 가이드 팝업 -->
	                         <div class="rule_pop">
	                             <div class="box">
	                                 <div class="popup_top">
	                                     <h4>운전면허 번호 규칙 설명 가이드</h4>
	                                     <div class="close">
	                                         <span></span>
	                                         <span></span>
	                                     </div>
	                                 </div>
	                                 <div class="content">
	                                     <img src="${contextPath}/images/sub/lc_info01.jpg" alt="운전면허 번호 규칙">
	                                 </div>
	                             </div>
	                         </div>
						</div>
					</div>
					<div class="similarityChkBox">
						<input type="checkbox" id="similarityChk" >
						<label for="similarityChk">유사도 검증</label>
					</div>
                </div>
	        </div>
	        <p class="info">※ 본 웹사이트에 게시된 정보는 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 사용할 수 없습니다.</p>
	        <div class="btn_flex">
	            <button class="blue_btn verify-btn" style="display: none;">운전자격 확인</button>
	            <button class="blue_btn verify-btn-app" style="display: none;">운전자격 확인</button>
	            <button class="gray_btn reset-btn">초기화</button>
	        </div>
	    </div>
	</div>
</div>

<%-- <div class="subPage sub02_04" style="display : none">
	<div class="container">
		<div class="wrap">
			<div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	                <h2>운전자격확인</h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">운전자격확인</li>
	            </ul>
	        </div>

   			<div class="content_result">
	            <div class="contBox">
	                <div class="nameBox">
	                    <h4 class="name">운전자격확인 결과</h4>
	                </div>
	                <div class="cont" id="result" style="flex-direction: column">
	                	<div class="grid_wr" style="display: none;">
		                	<table id="defectGrid">
	                            <caption>차량 결함 조회</caption>
	                        </table>
                        </div>
	                </div>
	            </div>
	            <p class="p_info">※ 본 웹사이트에 게시된 정보는 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 사용할 수 없습니다.</p>
	            <div class="btn_flex">
	                <button class="blue_btn" id="rentCfm">대여처리</button>
	                <button class="gray_btn" id="homeBtn">초기화면</button>
	            </div>
			</div>
		</div>
	</div>
</div> --%>

<!-- 모바일 면허증 팝업 -->
<div class="popup policy_popup drvie_popup" style="display : none">
    <div class="box">
    	<div class="popup_top">
        	<h4>팝업 제목</h4>
		        <div class="close">
			        <span></span>
			        <span></span>
		        </div>
    	</div>
      	<div class="content">
      		<div class="text" style="height: 423px;">
            </div>

	        <div class="btn_flex">
	          	<button class="blue_btn cancel_btn">확인</button>
	        </div>
		</div>
    </div>
</div>

<!-- 결과 팝업 -->
<div class="popup result_popup drvie_popup sub02_04" style="display : none">
    <div class="box">
    	<div class="popup_top">
        	<h4>운전자격확인 결과</h4>
		        <div class="close">
			        <span></span>
			        <span></span>
		        </div>
    	</div>
      	<div class="content">
      		<div class="contBox">
                <div class="nameBox">
                    <h4 class="name">운전자격확인 결과</h4>
                </div>
                <div class="cont" id="result" style="flex-direction: column">
                	<div class="grid_wr" style="display: none;">
	                	<table id="defectGrid">
                            <caption>차량 결함 조회</caption>
                        </table>
                       </div>
                </div>
            </div>
            <!-- 대여 미포함 -->
            <!-- <div class="contBox" id = "rentalTypeBox" style = "margin-top: 10px;display: none;" >-->
            <!-- 대여 포함 -->
            <div class="contBox" id = "rentalTypeBox" style = "margin-top: 10px;" >
                            <div class="nameBox nameTolltip" >
                                <h4 class="name"> 대여 유형 </h4>
                                <div class="tooltip" style ="margin-top: 3px;">
						            <button>
						                <img src="${contextPath}/images/sub/ico_tooltip.png" alt="" />
						            </button>
						            <span class="tooltiptext tooltip-right">
						            	편도: 서울-김천 <br />
										왕복: 서울-김천-서울 <br />
						            </span>
						        </div>
                            </div>
                            <div class="cont" id="result" style="height: auto; justify-content: flex-start;">
                                <ul class="" style ="align-self: flex-start; display: flex; align-items: center; gap: 24px;">
                                    <li>
                                        <input id="rentalType_1" value="Y" type="radio" name="category02">
                                        <label for="rentalType_1">편도</label>
                                    </li>
                                    <li>
                                        <input id="rentalType_2" value="N" type="radio" name="category02">
                                        <label for="rentalType_2">왕복</label>
                                    </li>
                                </ul>
                            </div>
            </div>
            <p class="p_info">※ 본 웹사이트에 게시된 정보는 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 사용할 수 없습니다.</p>
			<br/>
            <input id="resetChk" type="checkbox">
            <label for="resetChk">입력 정보 초기화</label>

            <div class="btn_flex">
                <button class="blue_btn" id="rentCfm">대여처리</button>
                <button class="gray_btn cancel_btn" id ="cancelAndInit">닫기</button>
            </div>
		</div>
    </div>
</div>

<!-- 유사도 검증 안내 팝업 -->
<div class="similarity_pop">
    <div class="box">
        <div class="popup_top">
            <h4>유사도 검증 안내</h4>
            <div class="close">
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="content">
        	 <img src="${contextPath}/images/sub/sv_info.png" alt="유사도 검증 안내">
        	 <p>운전자격 확인 버튼 클릭 시, 운전면허증 사진과의 유사도 검증을 위해 얼굴 인식 촬영이 시작됩니다.</p>
        </div>
    </div>
</div>

<!--  2024.07.31 jeonghyewon code add -->
<!-- 결과 팝업에 팝업 중 대여 이력 정보  -->
<div class="popup result_popup_in_popup drvie_popup sub02_04" id="popup_drvVfcHist_box" style="display : none"></div>
<!-- 결과 팝업에 팝업 중 차량 결함 정보  -->
<div class="popup result_popup_in_popup drvie_popup sub02_04" id="popup_mobiDefect_box" style="display : none"></div>

<!-- 대여이상 해당차량의 상세팝업 조회 링크   -->
<div class="subPage sub03">
    <div class="popup detail_popup popup_type02" id='detail_popup_mobiDefect_box'>
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
                                        <td><label for="detail_crno">법인등록번호</label> <input id="detail_crno"  class="input" aria-label="법인등록번호" maxlength="16" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">법인명</th>
                                        <td><label for="detail_coNm">법인명</label> <input id="detail_coNm"  class="input" aria-label="법인명" readonly></td>
                                    </tr>
                                    <tr>
                                        <th scope="col">소유자명</th>
                                        <td><label for="detail_ownrNm">소유자명</label> <input id="detail_ownrNm" class="input" aria-label="소유자명" readonly>
                                        </td>
                                    </tr>
                                </table>
                                <table class="tb rental_tb01">
                                    <tr>
                                        <th scope="col">주 사업자등록번호</th>
                                        <td><label for="detail_brno">주 사업자등록번호</label> <input  id="detail_brno" class="input" aria-label="주 사업자등록번호" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">지역</th>
                                        <td><label for="detail_ctpvSggNm">지역</label> <input  id="detail_ctpvSggNm" class="input" aria-label="시도 시군구" readonly>
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
                                        <td><label for="detail_vhclRegNo">차량등록번호</label> <input  id="detail_vhclRegNo" class="input" aria-label="차량등록번호"  maxlength="16" readonly></td>
                                    </tr>
                                    <tr>
                                        <th scope="col">차대번호</th>
                                        <td><label for="detail_vin">차대번호</label> <input id="detail_vin"  class="input" aria-label="차대번호" maxlength="16" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">차종</th>
                                        <td><label for="detail_carmdl">차종</label> <input id="detail_carmdl"  class="input" aria-label="차종" maxlength="16" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">차량명</th>
                                        <td><label for="detail_vhclNm">차량명</label> <input id="detail_vhclNm"   class="input" aria-label="차량명" maxlength="16" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">연식</th>
                                        <td><label for="detail_mdlyr">연식</label> <input id="detail_mdlyr" class="input" aria-label="연식" readonly></td>
                                    </tr>
                                    <tr>
                                        <th scope="col">엔진형식</th>
                                        <td><label for="detail_engineFom">엔진형식</label> <input id="detail_engineFom" class="input" aria-label="엔진형식" readonly>
                                        </td>
                                    </tr>
                                </table>
                                <table class="tb rental_tb01">
                                    <tr>
                                        <th scope="col">소재지</th>
                                        <td><label for="detail_sggNm">소재지</label> <input id="detail_sggNm" class="input" aria-label="소재지" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">최초등록일자</th>
                                        <td><label for="detail_frstRegYmd">최초등록일자</label> <input id="detail_frstRegYmd" class="input" aria-label="최초등록일자" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">만료일자</th>
                                        <td><label for="detail_expryYmd">만료일자</label> <input id="detail_expryYmd" class="input" aria-label="만료일자" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">자료연계등록일</th>
                                        <td><label for="detail_regDt">자료연계등록일</label> <input id="detail_regDt" class="input" aria-label="자료연계등록일" maxlength="4" readonly></td>
                                    </tr>
                                    <tr>
                                        <th scope="col">결함여부</th>
                                        <td><label for="detail_defectYn">결함여부</label> <input id="detail_defectYn" class="input" aria-label="결함여부" readonly>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="col">사용여부</th>
                                        <td><label for="detail_useYn">사용여부</label> <input id="detail_useYn" class="useYn input" aria-label="사용여부" readonly></td>
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
                                    <table id="detail_defectGrid">
                                        <caption>차량 결함 조회</caption>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn_flex">
                    <button class="gray_btn cancel_btn detailClose" onclick= $drive.event.popupClose()>닫기</button>
                </div>
            </div>
        </div>
    </div>
</div>


