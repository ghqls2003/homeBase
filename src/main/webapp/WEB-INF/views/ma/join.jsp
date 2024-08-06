<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<div class="subPage sub02_01 join">
        <div id="container">
            <div class="wrap">
                <div class="titBox">
                    <div>
                        <div class="tit01">
                            <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
                            <h2>
                                <span class="t_txt">회원가입</span>
                            </h2>
                        </div>
                        
                    </div>
                    <ul class="tit02">
                        <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
                        <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
                        <li class="current">회원가입</li>
                    </ul>
                </div>

                <div class="cont-flex">
                    <div class="contBox flex-box">
                        <div class="nameBox">
                            <h4 class="name">한국교통안전공단 통합 계정 발급을 시작합니다.</h4>
                        </div>
                        <div class="cont">
                            <div class="imgBox">
                                <img src="${contextPath}/images/sub/join_icon01.png" alt="공단 통합 계정">
                            </div>
                            <p class="cer_info">
                                운전자격확인시스템을 사용하기 위해서는 한국교통안전공단 통합 회원가입을 통해서 <br>
                                아이디를 발급 후 사용이 가능합니다.<br>
								<br>
								자동차 대여사업자(렌터카) 주사업소/영업소 관리자의 경우는 기업회원으로 가입해주시고,<br>
								영업소 일반 사용자(업무 담당자)의 경우에는 일반회원으로 <br>
								가입해주시면 인증 후 로그인이 가능합니다.<br>
								<br>
								진행이 원활하지 않는 경우 운전자격확인시스템 전용 상담센터 <br>
								<spen style="font-weight:700;">054-459-7565</spen>를 통해서 지원이 가능합니다.<br>
                            </p>
                            <button class="blue_btn cer_login_btn" onClick="location.href='https://www.kotsa.or.kr/tsum/mbs/insFrmMemberType.do?menuCode=08020000'">가입하기</button>
                        </div>
                    </div>
<!--                     <div class="contBox flex-box"> -->
<!--                         <div class="nameBox"> -->
<!--                             <h4 class="name">디지털 원패스</h4> -->
<!--                         </div> -->
<!--                         <div class="cont"> -->
<!--                             <div class="imgBox"> -->
<%--                                 <img src="${contextPath}/images/sub/join_icon02.png" alt="디지털 원패스"> --%>
<!--                             </div> -->
<!--                             <p class="cer_info"> -->
<!--                                 하나의 아이디로 <br> -->
<!--                                 여러 전자정부 서비스가 가능합니다. -->
<!--                             </p> -->
<!--                             <button class="blue_btn cer_login_btn">가입하기</button> -->
<!--                         </div> -->
<!--                     </div> -->
                </div>
            </div>
        </div>
<div></div>