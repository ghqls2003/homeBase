<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<%--지도 엔진 및 플러그인 CSS--%>
<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/easymap.2.0.commercial/css/tsmap-1.0.3.css" media="all">
<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/easymap.2.0.commercial/css/tsmap.css" media="all">
<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/easymap.2.0.commercial/css/screen.css" media="all">
<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/draw/draw.css" media="all">

<%-- 지도 엔진 및 플러그인 호출 js --%>
<script type="text/javascript" src="${contextPath}/ext-lib/leaflet.1.7.1.version/leaflet-src.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/proj4/proj4-compressed.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/proj4/proj4leaflet.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/zoomslider/Zoomslider.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/draw/draw.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/MarkerCluster.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/MarkerClusterGroup.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/MarkerOpacity.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/DistanceGrid.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/MarkerCluster.QuickHull.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/MarkerCluster.Spiderfier.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/markercluster/MarkerClusterGroup.Refresh.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/HeatLayer/simpleheat.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/HeatLayer/HeatLayer.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/js/gisCommon.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/js/gisUtil.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/Polyline.encoded.js"></script>
<script type="text/javascript" src="${contextPath}/ext-lib/easymap.2.0.commercial/plugins/leaflet.smoothmarkerbouncing.js"></script>