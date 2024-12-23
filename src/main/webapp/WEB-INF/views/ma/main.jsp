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
                <script>
                    var guest = '${guest}' === 'true';
                    var admstt = '${admstt}' === 'true';
                    var busine = '${busine}' === 'true';
                    var pcType = '${type}'
                    var userTypeDetail = '${userTypeDetail}' === 'true';  /* 모바일 웹을 구분 - true(웹), false(앱) */
                    var old_new = '${old_new}';
                </script>
                
                <script>
                	console.log('${ipCheck}')
                </script>

                <div class="main">
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
                                                <strong class="tit">여행 지역 현황</strong>
                                                <table class="m_tb">
                                                    <caption>여행 지역 현황</caption>
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
                                                            <th scope="col">방문 지역</th>
                                                            <td><span class="bule" id="mainOffice"></span>곳</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div id="mapid" style="height: 400px; border-radius: 15px;"></div>
                                        </div>
                                    </div>
                                    <div class="m_cont02 m_cont02_tablet">
                                        <strong class="tit">여행 지역 현황</strong>
                                        <table class="m_tb">
                                            <caption>여행 지역 현황</caption>
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
                                                </tr>
                                                <tr>
                                                    <td><span class="bule" id="totalM"></span>개소</td>
                                                    <td><span class="bule" id="mainOfficeM"></span>개소</td>
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
                                                <span class="word point" data-word="모든" style="--word-index:0;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="모" style="--char-index:0; animation-delay: 0.1s;">모</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="든" style="--char-index:1; animation-delay: 0.14s;">든</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word point" data-word="추억을" style="--word-index:1;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="추" style="--char-index:3; animation-delay: 0.18s;">추</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="억" style="--char-index:4; animation-delay: 0.22s;">억</span>
                                                    </em>
                                                </span>
                                                <span class="word" data-word="을" style="--word-index:2;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="을" style="--char-index:5; animation-delay: 0.26s;">을</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word" data-word="위한" style="--word-index:3;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="위" style="--char-index:6; animation-delay: 0.30s;">위</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="한" style="--char-index:7; animation-delay: 0.34s;">한</span>
                                                    </em>
                                                </span>
                                            </p>

                                            <p class="main-visual-txt2 cm-word-split-JS words chars splitting"
                                                data-splitting="" data-css-property="animation" data-speed="0.04"
                                                data-speed-delay="0.1" style="--word-total:4; --char-total:10;">
                                                <span class="word" data-word="저장공간" style="--word-index:4;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="저" style="--char-index:8; animation-delay: 0.37s;">저</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="장" style="--char-index:9; animation-delay: 0.41s;">장</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="공" style="--char-index:10; animation-delay: 0.45s;">공</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="간" style="--char-index:11; animation-delay: 0.49s;">간</span>
                                                    </em>
                                                </span>

                                                <span class="whitespace"> </span>

                                                <span class="word point" data-word="해가득" style="--word-index:5;">
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="해" style="--char-index:15; animation-delay: 0.70s;">해</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="가" style="--char-index:16; animation-delay: 0.74s;">가</span>
                                                    </em>
                                                    <em class="char-wrap">
                                                        <span class="char" data-char="득" style="--char-index:16; animation-delay: 0.78s;">득</span>
                                                    </em>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
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
                            </div>
                        </div>
                    </div>
                </div>
