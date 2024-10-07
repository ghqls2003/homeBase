<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
            <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
                <c:set var="contextPath" value="${pageContext.request.contextPath }" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <script src="${contextPath}/ext-lib/eventsource.js"></script>
                <script src="${contextPath}/js/ma/main.js"></script>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/mainView.css" />
<!--                 <script src="https://www.youtube.com/iframe_api"></script> -->
				<style>
				#youtube-popup-background {
				    display: none; /* 초기에는 숨김 */
 				    position: absolute; 
/* 				    top: 0; */
/* 				    left: 0; */
 				    width: 100%; 
 				    height: 100%; 
/*  				    background-color: rgba(0, 0, 0, 0.5);  */
/* 				    justify-content: center; */
/* 				    align-items: center;* */
 				    border-radius: 15px;
				    z-index: 1001;
				    animation: borderAnimation 2s infinite;
				}
				
				@keyframes borderAnimation {
				    0% { border: solid 2px #000; }
				    50% { border: solid 2px #ccc; }
				    100% { border: solid 2px #000; }
				}
				
				.youtube-popup-box {
				    width: 781.5px;
				    height: 389px;
				    background-color: #fff;
				    border-radius: 15px;
				    position: relative;
				    padding: 7px;
/* 				    padding: 20px; */
				}
				
				.close-button {
				    position: absolute;
				    top: 10px;
				    right: 10px;
				    cursor: pointer;
				    border: 1px solid #ccc; /* 테두리 추가 */
				    background-color: #f5f5f5; /* 배경색 추가 */
				    font-size: 24px;
				    border-radius: 50%; /* 원형 테두리 */
				    width: 30px; /* 버튼 크기 조정 */
				    height: 30px; /* 버튼 크기 조정 */
				    display: flex;
				    align-items: center;
				    justify-content: center;
				    transition: background-color 0.3s, transform 0.3s; /* 부드러운 전환 효과 */
				}
				
				.close-button:hover {
				    background-color: #e0e0e0; /* 호버 시 배경색 변경 */
				    transform: scale(1.1); /* 호버 시 약간 확대 */
				}
				</style>
                <script>
                    var guest = '${guest}' === 'true';
                    var admstt = '${admstt}' === 'true';
                    var busine = '${busine}' === 'true';
                    var pcType = '${type}'
                </script>
                
                <script>
                	console.log('${ipCheck}')
//                 	console.log("busine", busine)
//                 	console.log("admstt", admstt)
                </script>

                <div class="main">
<%--                     <c:if test="false"> --%>
<!--                     Server Status Bar -->
<!--                     <div class="serverStatusBar wt_box"> -->
<!--                         <div class="bar_head"> -->
<!--                             <h4>서버 상태</h4> -->
<!--                         </div> -->
<!--                         <div class="bar_cont"> -->
<!--                             <ul class="server_list"> -->
<!--                                 <li class="server_list_item server_list_item1" id="chck1"> -->
<!--                                     <div class="server_list_item_inner"> -->
<!--                                         <div class="status_icon_wrap"> -->
<!--                                             <div class="status_icon"></div> -->
<!--                                         </div> -->
<!--                                         <p class="server_name">RIMS 서버</p> -->
<!--                                         <div class="status"> -->
<!--                                             <p class="status_text">확인중</p> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </li> -->
<!--                                 <li class="server_list_item server_list_item2" id="chck2"> -->
<!--                                     <div class="server_list_item_inner"> -->
<!--                                         <div class="status_icon_wrap"> -->
<!--                                             <div class="status_icon"></div> -->
<!--                                         </div> -->
<!--                                         <p class="server_name">공단 서버</p> -->
<!--                                         <div class="status"> -->
<!--                                             <p class="status_text">확인중</p> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </li> -->
<!--                                 <li class="server_list_item server_list_item3"  id="chck3"> -->
<!--                                     <div class="server_list_item_inner"> -->
<!--                                         <div class="status_icon_wrap"> -->
<!--                                             <div class="status_icon"></div> -->
<!--                                         </div> -->
<!--                                         <p class="server_name">경찰청 서버</p> -->
<!--                                         <div class="status"> -->
<!--                                             <p class="status_text">확인중</p> -->
<!--                                         </div> -->
<!--                                     </div> -->
<!--                                 </li> -->
<!--                             </ul> -->
<!--                             <div class="chart_wrap scrollBar"> -->
<!--                                 <div id="server_chart"></div> -->
<!--                             </div> -->
<!--                             <div class="server_btn_wrap"> -->
<%--                                 <a id="transfrom_btn" href="${contextPath}/ma/switchAuthForAdmin" aria-label="사용자 전환 페이지로 이동">사용자 전환</a> --%>
<!--                             </div> -->
<!--                     </div> -->
<!--                         <div class="server_alarm_wrap"> -->
<!--                             <div class="server_alarm_icon off"> -->
<%--                                 <audio id="sirenAd" src="${contextPath}/audio/siren_01.mp3"></audio> --%>
<!--                                 <div id="if-siren"></div> -->
<!--                             </div> -->
<!--                             <div class="switch_wrap"> -->
<!--                                 <p>알림설정</p> -->
<!--                                 <label class="switch" aria-label="서버 상태 알림 설정"> -->
<!--                                     <input type="checkbox"> -->
<!--                                     <span></span> -->
<!--                                 </label> -->
<!--                             </div> -->
<!--                         </div> -->
<!--                     </div> -->
<%--                     </c:if> --%>
                    <!-- 콘텐츠 시작 -->
                    <div id="container">

                        <img src="${contextPath}/images/main/ani_img01.png" alt="도형" class="ani_img01">
                        <img src="${contextPath}/images/main/ani_img02.png" alt="도형" class="ani_img02">
                        <img src="${contextPath}/images/main/ani_img03.png" alt="도형" class="ani_img03">

                        <div class="wrap" style="display: block;">

                            <!-- content 1 -->
                            <div class="cont_flex cont_flex01">
                                <div class="m_content wt_box" style="align-items: normal; justify-content: normal;">
                                    <div class="m_cont01" style="width: 100%;">
                                        <div class="m_legend" style="position: absolute; z-index: 99; width: 110px;">
                                            <span class="tit">범례</span>
                                            <ul class="legend_cont">
                                            </ul>
                                        </div>
                                        <div class="mapBox"
                                            style="width: 100%; height: 401px; overflow: hidden; margin-left: 0px;">
                                            <div id="youtube-popup-background"></div>
                                            <div class="m_cont02"
                                                style="z-index: 999; left: 64%; position: absolute; width: 285px;">
                                                <strong class="tit">대여사업자 등록 현황</strong>
                                                <table class="m_tb">
                                                    <caption>대여사업자 등록 현황</caption>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" colspan="2" id="date"
                                                                style="font-size: 2.4rem;"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="col">전체</th>
                                                            <td><span class="bule" id="total"></span>개소</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">주사무소</th>
                                                            <td><span class="bule" id="mainOffice"></span>개소</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col">영업소<br>(예약소)</th>
                                                            <td><span class="bule" id="businessOffice"></span>개소</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div id="mapid" style="height: 400px; border-radius: 15px;"></div>
                                            <!-- <div class="bubbleBox">
                                <span class="green">서울특별시</span>
                                <p class="p_info">주사업자 10건</p>
                                <p class="p_info">영업소 5건</p>
                            </div> -->
                                        </div>
                                    </div>
                                    <div class="m_cont02 m_cont02_tablet">
                                        <strong class="tit">대여사업자 등록 현황</strong>
                                        <table class="m_tb">
                                            <caption>대여사업자 등록 현황</caption>
                                            <thead>
                                                <tr>
                                                    <th scope="col" colspan="3" id="dateM" style="font-size: 2.4rem;">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="col">전체</th>
                                                    <th scope="col">주사무소</th>
                                                    <th scope="col">영업소(예약소)</th>
                                                </tr>
                                                <tr>
                                                    <td><span class="bule" id="totalM"></span>개소</td>
                                                    <td><span class="bule" id="mainOfficeM"></span>개소</td>
                                                    <td><span class="bule" id="businessOfficeM"></span>개소</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="txt_box">
                                    <div class="main_tit">
                                        <div class="main-visual-item active-item" data-slick-index="0"
                                            aria-hidden="false" tabindex="-1"
                                            style=" position: relative; left: 0px; top: 0px; z-index: 2; opacity: 1;">

                                            <p class="main-visual-txt2 cm-word-split-JS words chars splitting"
                                                data-splitting="" data-css-property="animation" data-speed="0.04"
                                                data-speed-delay="0.1" style="--word-total:4; --char-total:10;">
                                                <span class="word point" data-word="안전한" style="--word-index:0;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="안"
                                                            style="--char-index:0; animation-delay: 0.1s;">안</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="전"
                                                            style="--char-index:1; animation-delay: 0.14s;">전</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="한"
                                                            style="--char-index:2; animation-delay: 0.18s;">한</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word point" data-word="운전을" style="--word-index:1;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="운"
                                                            style="--char-index:3; animation-delay: 0.22s;">운</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="전"
                                                            style="--char-index:4; animation-delay: 0.26s;">전</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="을"
                                                            style="--char-index:5; animation-delay: 0.3s;">을</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word" data-word="위한" style="--word-index:2;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="위"
                                                            style="--char-index:6; animation-delay: 0.34s;">위</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="한"
                                                            style="--char-index:7; animation-delay: 0.38s;">한</span>
                                                    </em>
                                                </span>

                                            </p>

                                            <p class="main-visual-txt2 cm-word-split-JS words chars splitting"
                                                data-splitting="" data-css-property="animation" data-speed="0.04"
                                                data-speed-delay="0.1" style="--word-total:4; --char-total:10;">
                                                <span class="word" data-word="신속하고" style="--word-index:3;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="신"
                                                            style="--char-index:8; animation-delay: 0.41s;">신</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="속"
                                                            style="--char-index:9; animation-delay: 0.44s;">속</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="하"
                                                            style="--char-index:10; animation-delay: 0.48s;">하</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="고"
                                                            style="--char-index:11; animation-delay: 0.52s;">고</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word" data-word="편리한" style="--word-index:4;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="편"
                                                            style="--char-index:12; animation-delay: 0.56s;">편</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="리"
                                                            style="--char-index:13; animation-delay: 0.60s;">리</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="한"
                                                            style="--char-index:14; animation-delay: 0.64s;">한</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word point" data-word="확인" style="--word-index:5;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="확"
                                                            style="--char-index:15; animation-delay: 0.70s;">확</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="인"
                                                            style="--char-index:16; animation-delay: 0.74s;">인</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word point" data-word="시스템" style="--word-index:6;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="시"
                                                            style="--char-index:17; animation-delay: 0.78s;">시</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="스"
                                                            style="--char-index:18; animation-delay: 0.82s;">스</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="템"
                                                            style="--char-index:19; animation-delay: 0.86s;">템</span>
                                                    </em>
                                                </span>

                                            </p>
                                        </div>
                                    </div>
                                    <button class="m_btn" id="myButton" hidden>
                                        비대면 운전자격 검증
                                        <span class="arrow_box">
                                            <img src="${contextPath}/images/main/btn_arrow.png" alt="운전자격검증" class="ico_arrow">
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <!-- content 2 -->
                            <div class="cont_flex cont_flex02">
                                <div class="notice_wrap wt_box">
                                    <ul class="tit_top">
                                        <li><strong class="n_name">공지사항</strong></li>
                                        <li class="line"></li>
                                        <li><a href="" class="more_btn">더보기<img
                                                    src="${contextPath}/images/main/ico_more.png" alt="공지사항더보기"></a>
                                        </li>
                                    </ul>
                                    <ul class="cont_wrap">
                                        <li class="li_cont">
                                            <div class="notice_top">
                                                <div class="calender">
                                                    <span class="day"></span>
                                                    <span class="week"></span>
                                                </div>
                                                <ul class="info">
                                                    <li class="sticker"></li>
                                                    <li class="date"></li>
                                                </ul>
                                            </div>
                                            <div class="notice_tit">
                                                <a href=""></a>

                                            </div>
                                        </li>
                                        <li class="li_cont">
                                            <div class="notice_top">
                                                <div class="calender">
                                                    <span class="day"></span>
                                                    <span class="week"></span>
                                                </div>
                                                <ul class="info">
                                                    <!-- <li class="sticker">공지</li> -->
                                                    <li class="date"></li>
                                                </ul>
                                            </div>
                                            <div class="notice_tit">
                                                <a href=""></a>
                                            </div>
                                        </li>
                                        <li class="li_cont li_cont_tablet">
                                            <div class="notice_top">
                                                <div class="calender">
                                                    <span class="day"></span>
                                                    <span class="week"></span>
                                                </div>
                                                <ul class="info">
                                                    <!-- <li class="sticker">공지</li> -->
                                                    <li class="date"></li>
                                                </ul>
                                            </div>
                                            <div class="notice_tit">
                                                <a href=""></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="link_wrap">
                                    <div class="Shortcuts Shortcuts01" id="Shortcuts01">
                                        <img src="${contextPath}/images/main/link_img01.png" alt="운전자격확인">
                                        <div class="link_name">
                                            <a href="">
                                                운전자격확인
                                                <div class="arrow_box">
                                                    <img src="${contextPath}/images/main/btn_arrow.png" alt="운전자격확인">
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="Shortcuts Shortcuts02" id="Shortcuts02">
                                        <img src="${contextPath}/images/main/link_img02.png" alt="서비스이용안내">
                                        <div class="link_name">
                                            <a href="${contextPath}/ma/userManualWeb">
                                                서비스이용안내
                                                <div class="arrow_box">
                                                    <img src="${contextPath}/images/main/btn_arrow.png" alt="서비스이용안내">
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="Shortcuts Shortcuts03" id="Shortcuts03">
                                        <img src="${contextPath}/images/main/link_img03.png" alt="자주 묻는 질문">
                                        <div class="link_name">
                                            <a href="${contextPath}/sft/faq">
                                                자주 묻는 질문(FAQ)
                                                <div class="arrow_box">
                                                    <img src="${contextPath}/images/main/btn_arrow.png" alt="자주 묻는 질문">
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popupNotice"></div>