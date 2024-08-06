var code = 'EPSG:900913';
var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';

var options = {
    resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
    origin: [-20037508.34, 20037508.34],
    bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
};

// 새로 정의한 CRS 객체 생성.
var crs = new L.Proj.CRS(code, def, options);

var vworldBaseTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Base/{z}/{y}/{x}.png';
var vworldBaseTileOptions = {
    maxZoom: 19,
    minZoom: 6,
};
var vworldBaseTileLayer = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);

var vworldSatelliteTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Satellite/{z}/{y}/{x}.jpeg';
var vworldSatelliteTileOptions = {
    maxZoom: 18,
    minZoom: 6,
};
var vworldSatelliteTileLayer = new L.TileLayer(vworldSatelliteTileURL, vworldSatelliteTileOptions);

var vworldHybridTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Hybrid/{z}/{y}/{x}.png';
var vworldHybridTileOptions = {
    maxZoom: 18,
    minZoom: 6,
};
var vworldHybridTileLayer = new L.TileLayer(vworldHybridTileURL, vworldHybridTileOptions);

var openStreetTileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var openStreetTileOptions = {
    maxZoom: 19,
    minZoom: 6,
};
var openStreetTileLayer = new L.TileLayer(openStreetTileURL, openStreetTileOptions);

var baseMaps = {
        "기본지도": vworldBaseTileLayer,
        "위성지도": vworldSatelliteTileLayer,
        "하이브리드": vworldHybridTileLayer,
        "오픈스트리트": openStreetTileLayer,
};



/**
 * RIMS 서비스 지도 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function setRimsMap(map, mapDivId, mapOptions, maxBounds) {
    mapOptions = {
        renderer: L.canvas(),
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
		maxBounds : maxBounds,
		maxBoundsViscosity: 1.0,
		minZoom : 8,
        layers: [
            //vworldSatelliteTileLayer,
            vworldBaseTileLayer
        ],

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };

    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);
    //var layerControl = L.control.layers(baseMaps).addTo(map);

    return map;
}

/**
 * RIMS 서비스 지도 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function setRimsMap2(map, mapDivId, mapOptions, maxBounds) {

	var code = 'EPSG:900913';
	var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';

	var options = {
	    resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
	    origin: [-20037508.34, 20037508.34],
	    bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
	};

	// 새로 정의한 CRS 객체 생성.
	var crs = new L.Proj.CRS(code, def, options);

	var vworldBaseTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Base/{z}/{y}/{x}.png';
	var vworldBaseTileOptions = {
	    maxZoom: 19,
	    minZoom: 6,
	};
	var vworldBaseTileLayer2 = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);

    mapOptions = {
        renderer: L.canvas(),
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
		maxBounds : maxBounds,
		maxBoundsViscosity: 1.0,
		minZoom : 8,
        layers: [
            //vworldSatelliteTileLayer,
            vworldBaseTileLayer2
        ],

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };

    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);
    //var layerControl = L.control.layers(baseMaps).addTo(map);

    return map;
}

/**
 * RIMS 서비스 지도 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function setRimsMap3(map, mapDivId, mapOptions, maxBounds) {

	var code = 'EPSG:900913';
	var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';

	var options = {
	    resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
	    origin: [-20037508.34, 20037508.34],
	    bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
	};

	// 새로 정의한 CRS 객체 생성.
	var crs = new L.Proj.CRS(code, def, options);

	var vworldBaseTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Base/{z}/{y}/{x}.png';
	var vworldBaseTileOptions = {
	    maxZoom: 19,
	    minZoom: 6,
	};
	var vworldBaseTileLayer3 = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);

    mapOptions = {
        renderer: L.canvas(),
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
		maxBounds : maxBounds,
		maxBoundsViscosity: 1.0,
		minZoom : 8,
        layers: [
            //vworldSatelliteTileLayer,
            vworldBaseTileLayer3
        ],

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };

    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);
    //var layerControl = L.control.layers(baseMaps).addTo(map);

    return map;
}

/**
 * 기본 맵 레이어 교체
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function switchLayer(layerKey) {
	  if (layerKey in baseMaps) {
	    $.each(baseMaps, function(key, layer) {
	      if (key === layerKey) {
	        if (!map.hasLayer(layer)) {
	          map.addLayer(layer);
	        }
	      } else if (map.hasLayer(layer)) {
	        map.removeLayer(layer);
	      }
	    });
	  } else {
	    console.log('There is no layer key by the name "' + layerKey + '" in the specified object.');
	  }
	}

/**
 * 2D/위성하이브리드 전환
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function switchHMTSTileLayer(layerKey) {
	  if (layerKey == '기본지도') {
		  if (!map.hasLayer(vworldBaseTileLayer)) {
			  map.addLayer(vworldBaseTileLayer);
		  }

		  if (map.hasLayer(vworldSatelliteTileLayer)) {
	          map.removeLayer(vworldSatelliteTileLayer);
	      }

		  if (map.hasLayer(vworldHybridTileLayer)) {
	          map.removeLayer(vworldHybridTileLayer);
	      }

		  if (map.hasLayer(openStreetTileLayer)) {
	          map.removeLayer(openStreetTileLayer);
	      }
	  } else if (layerKey == '위성지도') {
		  if (map.hasLayer(vworldBaseTileLayer)) {
	          map.removeLayer(vworldBaseTileLayer);
	      }

		  if (!map.hasLayer(vworldSatelliteTileLayer)) {
			  map.addLayer(vworldSatelliteTileLayer);
		  }

		  if (!map.hasLayer(vworldHybridTileLayer)) {
	          map.addLayer(vworldHybridTileLayer);
	      }

		  if (map.hasLayer(openStreetTileLayer)) {
	          map.removeLayer(openStreetTileLayer);
	      }
	  } else if (layerKey == '오픈스트리트') {
		  if (map.hasLayer(vworldBaseTileLayer)) {
	          map.removeLayer(vworldBaseTileLayer);
	      }

		  if (map.hasLayer(vworldSatelliteTileLayer)) {
			  map.removeLayer(vworldSatelliteTileLayer);
		  }

		  if (map.hasLayer(vworldHybridTileLayer)) {
	          map.removeLayer(vworldHybridTileLayer);
	      }

		  if (!map.hasLayer(openStreetTileLayer)) {
	          map.addLayer(openStreetTileLayer);
	      }
	  }
}

/**
 * Vworld 지도로 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function _setVworldMap(map, mapDivId, mapOptions) {
    //map = L.map(mapDivId, mapOptions);
    var code = 'EPSG:900913';
    var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
    var options = {
        resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
        origin: [-20037508.34, 20037508.34],
        bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
    };

    // 새로 정의한 CRS 객체 생성.
    var crs = new L.Proj.CRS(code, def, options);

    // 지도 생성 옵션.
    mapOptions = {
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };

    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);

    //tlURL = 'http://xdworld.vworld.kr:8080/2d/Base/201612/{z}/{x}/{y}.png';
    tlURL = 'https://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png';
    tlOptions = {
        maxZoom: 18,
        minZoom: 6,
    };

    var tileLayer = new L.TileLayer(tlURL, tlOptions);
    tileLayer.addTo(map);

    map.on("overlayremove", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(false);
        }
    });

    map.addControl(new L.Control.Zoomslider({
        position: "topright",
    }));

    return map;
}

/**
 * Vworld TMS 서비스 지도 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function setVworldMap(map, mapDivId, mapOptions) {

    //map = L.map(mapDivId, mapOptions);
    var code = 'EPSG:900913';
    var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
    var options = {
        resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
        origin: [-20037508.34, 20037508.34],
        bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
    };
    // 새로 정의한 CRS 객체 생성.
    var crs = new L.Proj.CRS(code, def, options);

    //tlURL = 'http://xdworld.vworld.kr:8080/2d/Base/201310/{z}/{x}/{y}.png';

    var vworldBaseTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Base/{z}/{y}/{x}.png';
	/*
    if(location.hostname == "localhost"){
		//2018.07.26 jhjeon - 개발환경일 경우 로컬에서 타일서버 구동 후 개발 진행
		vworldBaseTileURL="http://localhost:7070/geoserver/gwc/service/wmts?layer=ws_mbtiles_test:vworld&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}";
	}
	*/

    //var vworldBaseTileURL = 'http://api.vworld.kr/req/tms/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Base/{z}/{y}/{x}.jpeg';


    var vworldBaseTileOptions = {
        maxZoom: 19,
        minZoom: 6,
    };

    var vworldBaseTileLayer = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);

    var vworldSatelliteTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Satellite/{z}/{y}/{x}.jpeg';
    var vworldSatelliteTileOptions = {
        maxZoom: 18,
        minZoom: 6,
    };
    var vworldSatelliteTileLayer = new L.TileLayer(vworldSatelliteTileURL, vworldSatelliteTileOptions);

    // 지도객체 생성
    //map = L.map(mapDivId, mapOptions);
    var vworldUsageZoneTileURL = 'https://api.vworld.kr/req/wms';
    var vworldUsageZoneTileOptions = {
        layers: 'LT_C_UQ111',
        styles: 'LT_C_UQ111',
        service: "wms",
        request: "getmap",
        crs: crs,
        transparent: 'true',
        version: '1.3.0',
        exceptions: 'text/xml',
        format: 'image/png',
        key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
        domain: 'http://localhost',
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldUsageZoneTileLayer = new L.TileLayer.WMS(vworldUsageZoneTileURL, vworldUsageZoneTileOptions);

    var vworldNodeLinkTileURL = 'https://api.vworld.kr/req/wms';
    var vworldNodeLinkTileOptions = {
        layers: 'LT_L_MOCTLINK',
        styles: 'LT_L_MOCTLINK',
        service: "wms",
        request: "getmap",
        crs: crs,
        transparent: 'true',
        version: '1.3.0',
        exceptions: 'text/xml',
        format: 'image/png',
        key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
        domain: 'http://localhost',
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldNodeLinkTileLayer = new L.TileLayer.WMS(vworldNodeLinkTileURL, vworldNodeLinkTileOptions);

    // 지도 생성 옵션.
    mapOptions = {
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
        layers: [
//            vworldSatelliteTileLayer,
            vworldBaseTileLayer,
            //vworldUsageZoneTileLayer
        ],

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };
    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);


    var baseMaps = {
        "기본지도": vworldBaseTileLayer,
        "위성지도": vworldSatelliteTileLayer,
    };
    /*
    var overlayMaps = {
        "용도구역": vworldUsageZoneTileLayer,
        "노드링크": vworldNodeLinkTileLayer,
    };*/
    var layerControl = L.control.layers(baseMaps).addTo(map);
    //layerControl.addOverlay(overlayMaps);
    /*
    map.on("overlayadd", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(true);
        }

    });

    map.on("overlayremove", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(false);
        }
    });

    //줌슬라이드 Control 추가
    map.addControl(new L.Control.Zoomslider({
        position: "topright",
    }));
    */
    /*

        //줌슬라이드 마우스 오버 이번트(시도, 시군구, 읍면동)
        $(".L-control-zoomslider-wrap").mouseover(function(){
           $(".zoom-label-area").show();
        });
        $(".L-control-zoomslider-wrap").mouseout(function(){
            $(".zoom-label-area").hide();
        });
        //시도, 시군구, 읍면동 ui
        $(".L-control-zoomslider").append("<div class='zoom-label-area'><dl class='label label-1'>읍면동</dl><dl class='label label-2'>시군구</dl><dl class='label label-3'>시도</dl></div>");
    */

    /*var drawnItems = L.featureGroup().addTo(map);
     map.addControl(new L.Control.Draw({
     position: "topright",
     draw: {
     polygon: {
     allowIntersection: false,
     showArea: true
     }
     },
     edit: {
     featureGroup: drawnItems,
     /!*poly: {
     allowIntersection: false
     }*!/
     },
     }));

     map.on(L.Draw.Event.CREATED, function (event) {
     var layer = event.layer;
     drawnItems.addLayer(layer);
     });*/

    //지도 Controller margin 설정
    //$(".leaflet-top.leaflet-right").css("margin-right", "40px");

/*
    if(location.hostname == "localhost"){
    	//2018.07.26 jhjeon - 개발환경일 경우 api 호출이 불가 -> 대전으로 고정
    	map.setView(new L.latLng(36.350468, 127.384826), 11);
    }
*/
    return map;
}

function setMapBoxMap(map, mapDivId, mapOptions){
    map = L.map(mapDivId);

    var gl = L.mapboxGL({
        /*accessToken: 'pk.eyJ1IjoiYW5na2sydSIsImEiOiJjamdjejF2OTI0MHppMzRsajRveWJqMWltIn0.jHCyzi4orPfRCuthGRdzMg',
        style: 'mapbox://styles/angkk2u/cjgczl73q00042rmxmu2jnwol',*/
        accessToken: 'pk.eyJ1IjoiamFlaG9iYWVrIiwiYSI6ImNqZ3B0ZWpqMzAzOGozM255em55Y2RibnMifQ.RB3-S0-qNl2EVOuN3f52dw',
        style: 'mapbox://styles/jaehobaek/cjgpugclz000g2smggwmk7wun',
    }).addTo(map);

    map.setMinZoom(6);
    map.setMaxZoom(19);

    return map;

}

/**
 * SGIS TMS 서비스 지도 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function setSgisMap(map, mapDivId, mapOptions) {
    var code = 'EPSG:5179';

    var def = '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43';
    //var def = '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs';

    var options = {
        //resolutions: [1058.33545000423, 449.792566251799, 224.8962831259, 55.5626111252223, 26.4583862501058, 13.2291931250529, 6.61459656252646, 3.1750063500127, 1.85208703750741, 1.32291931250529, .529167725002117],
        resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
        origin: [-5422500, 6293900]
    };

    // projection 영역 설정.

    // 새로 정의한 CRS 객체 생성.
    var crs = new L.Proj.CRS(code, def, options);
    /*crs.projection.bounds = L.bounds([[171162, 1214781], [1744026, 2787645]])*/

    /***기본지도 시작***/
    var vworldBaseTileURL = 'https://211.34.90.35/arcgis/rest/services/SGIS/SGIS/MapServer/tile/{z}/{y}/{x}';

    var vworldBaseTileOptions = {
        maxZoom: 16,
        minZoom: 0,
    };

    var vworldBaseTileLayer = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);
    /***기본지도 끝***/

    /***하이브리드 지도***/
    var vworldSatelliteTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Satellite/{z}/{y}/{x}.jpeg';
    var vworldSatelliteTileOptions = {
        maxZoom: 18,
        minZoom: 6,
    };
    var vworldSatelliteTileLayer = new L.TileLayer(vworldSatelliteTileURL, vworldSatelliteTileOptions); //

    // 지도객체 생성
    //map = L.map(mapDivId, mapOptions);
    var vworldUsageZoneTileURL = 'https://api.vworld.kr/req/wms';
    var vworldUsageZoneTileOptions = {
        layers: 'LT_C_UQ111',
        styles: 'LT_C_UQ111',
        service: "wms",
        request: "getmap",
        crs: crs,
        transparent: 'true',
        version: '1.3.0',
        exceptions: 'text/xml',
        format: 'image/png',
        key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
        domain: 'http://localhost',
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldUsageZoneTileLayer = new L.TileLayer.WMS(vworldUsageZoneTileURL, vworldUsageZoneTileOptions);

    var vworldNodeLinkTileURL = 'https://api.vworld.kr/req/wms';
    var vworldNodeLinkTileOptions = {
        layers: 'LT_L_MOCTLINK',
        styles: 'LT_L_MOCTLINK',
        service: "wms",
        request: "getmap",
        crs: crs,
        transparent: 'true',
        version: '1.3.0',
        exceptions: 'text/xml',
        format: 'image/png',
        key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
        domain: 'http://localhost',
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldNodeLinkTileLayer = new L.TileLayer.WMS(vworldNodeLinkTileURL, vworldNodeLinkTileOptions);

    // 지도 생성 옵션.
    mapOptions = {
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
        layers: [
            vworldBaseTileLayer,
            //vworldUsageZoneTileLayer
        ],

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };
    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);
    console.log(map);
    var baseMaps = {
        "기본지도": vworldBaseTileLayer,
        "위성지도": vworldSatelliteTileLayer,
    };
    var overlayMaps = {
        "용도구역": vworldUsageZoneTileLayer,
        "노드링크": vworldNodeLinkTileLayer,
    };
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    //layerControl.addOverlay(overlayMaps);

    map.on("overlayadd", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(true);
        }
    });

    map.on("overlayremove", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(false);
        }
    });

    map.addControl(new L.Control.Zoomslider({
        position: "topright",
    }));

    return map;
}


/**
 * OpenStreetMap TMS 서비스 지도 생성
 * @param map
 * @param mapDivId
 * @param mapOptions
 * @returns {*}
 */
function setOpenStreetMap(map, mapDivId, mapOptions) {

    //map = L.map(mapDivId, mapOptions);
    var code = 'EPSG:900913';
    var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
    var options = {
        resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.29858214168548586, 0.14929107084274293],
        origin: [-20037508.34, 20037508.34],
        bounds: L.bounds([13232210.28055642, 3584827.864295762], [15238748.249933105, 5575460.5658249445])
    };
    // 새로 정의한 CRS 객체 생성.
    var crs = new L.Proj.CRS(code, def, options);

    //tlURL = 'http://xdworld.vworld.kr:8080/2d/Base/201310/{z}/{x}/{y}.png';
    var vworldBaseTileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var vworldBaseTileOptions = {
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldBaseTileLayer = new L.TileLayer(vworldBaseTileURL, vworldBaseTileOptions);
    console.log(vworldBaseTileLayer);
    /*위성지도*/
    var vworldSatelliteTileURL = 'https://api.vworld.kr/req/wmts/1.0.0/ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0/Satellite/{z}/{y}/{x}.jpeg';
    var vworldSatelliteTileOptions = {
        maxZoom: 18,
        minZoom: 6,
    };
    var vworldSatelliteTileLayer = new L.TileLayer(vworldSatelliteTileURL, vworldSatelliteTileOptions); //

    // 지도객체 생성
    //map = L.map(mapDivId, mapOptions);
    var vworldUsageZoneTileURL = 'https://api.vworld.kr/req/wms';
    var vworldUsageZoneTileOptions = {
        layers: 'LT_C_UQ111',
        styles: 'LT_C_UQ111',
        service: "wms",
        request: "getmap",
        crs: crs,
        transparent: 'true',
        version: '1.3.0',
        exceptions: 'text/xml',
        format: 'image/png',
        key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
        domain: 'http://localhost',
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldUsageZoneTileLayer = new L.TileLayer.WMS(vworldUsageZoneTileURL, vworldUsageZoneTileOptions);

    var vworldNodeLinkTileURL = 'http://api.vworld.kr/req/wms';
    var vworldNodeLinkTileOptions = {
        layers: 'LT_L_MOCTLINK',
        styles: 'LT_L_MOCTLINK',
        service: "wms",
        request: "getmap",
        crs: crs,
        transparent: 'true',
        version: '1.3.0',
        exceptions: 'text/xml',
        format: 'image/png',
        key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
        domain: 'http://localhost',
        maxZoom: 19,
        minZoom: 6,
    };
    var vworldNodeLinkTileLayer = new L.TileLayer.WMS(vworldNodeLinkTileURL, vworldNodeLinkTileOptions);

    // 지도 생성 옵션.
    mapOptions = {
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false,
        ollehTileLayer: false,
        statisticTileLayer: false,
        scale: true,
        zoomControl: false,
        position: 'topleft',
        layers: [
            vworldBaseTileLayer,
            //vworldUsageZoneTileLayer
        ],

        // utmkBounds를 설정하여 해당영역 밖으로 벗어나면 지도 중심을 이동시켜 화면에 나타나게 함.
        //maxBounds: L.utmkBounds([[171162, 1214781], [1744026, 2787645]])
    };
    // 지도객체 생성
    map = L.map(mapDivId, mapOptions);

    var baseMaps = {
        "기본지도": vworldBaseTileLayer,
        "위성지도": vworldSatelliteTileLayer,
    };
    var overlayMaps = {
        "용도구역": vworldUsageZoneTileLayer,
        "노드링크": vworldNodeLinkTileLayer,
    };
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    //layerControl.addOverlay(overlayMaps);

    map.on("overlayadd", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(true);
        }
    });

    map.on("overlayremove", function (e) {
        if (e.name === "용도구역") {
            displayUageZoneLegend();
            $("#switchUsageZone").data("kendoMobileSwitch").check(false);
        }
    });

    map.addControl(new L.Control.Zoomslider({
        position: "topright",
    }));

    return map;
}


var infoCon;

/**
 * 용도구역 범례 표출
 */
function displayUageZoneLegend() {
    if (infoCon == undefined || infoCon._map == null) {
        var InfoControl = L.Control.extend({
            onAdd: function (map) {
                this._div = L.DomUtil.create('div', 'UageZoneInfo');
                this.showInfo();
                return this._div;
            },
            showInfo: function () {
                var content = "/html/tss/tss_usage_area.html";
                //this._div.innerHTML = content;
                $(this._div).load(content);
            }
        });

        infoCon = new InfoControl({position: 'bottomright'});
        infoCon.addTo(map);
    } else {
        infoCon.remove();
    }
}


/******************************************************************
 * 주소, 날씨 관련 시작
 *******************************************************************/

/**
 * 주소값 -> 좌표로 변환
 * @param addr
 */
function fnAddr2Coord(addr) {
    var deferred = $.Deferred();

    try {
        /*// 주소-좌표 변환 객체를 생성합니다
        var geocoder = new daum.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.addr2coord(addr, function (status, result) {
            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {
                deferred.resolve(new L.LatLng(result.addr[0].lat, result.addr[0].lng));
            } else {
                deferred.reject(status);
            }
        });*/

        var data = {
            service: 'address',
            request: 'getCoord',
            key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
            type: 'PARCEL',
            address: addr
        }

        $.ajax({
            url: "http://api.vworld.kr/req/address",
            cache: false,
            dataType: "jsonp",
            jsonp: "callback",
            contentType: "application/json",
            data: data,
            type: 'POST',
            beforeSend: function () {
            },
            complete: function (xhr, status) {
            },
            success: function (jsonObj) {
                if (jsonObj.response.status == 'OK') {
                    deferred.resolve(new L.LatLng(jsonObj.response.result.point.y, jsonObj.response.result.point.x));
                }
            },
            error: function (jxhr, textStatus) {
                deferred.reject(jxhr);
            }
        });
    } catch (err) {

    }

    return deferred.promise();
}


/**
 * 좌표값 -> 주소 변환
 * @param x
 * @param y
 */
function fnCoord2Addr(x, y) {
    var deferred = $.Deferred();
    //var coords = utmkToWgs84(x,y);
    //var daumLatLng = new daum.maps.LatLng(y, x);

    try {
        // 주소-좌표 변환 객체를 생성합니다
        /*var geocoder = new daum.maps.services.Geocoder();
        // 주소로 좌표를 검색합니다
        geocoder.coord2detailaddr(daumLatLng, function (status, result) {
            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {
                deferred.resolve(result[0].jibunAddress.name);
            } else {
                deferred.reject(status);
            }
        });*/

        var data = {
            service: 'address',
            request: 'getAddress',
            key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
            type: 'PARCEL',
            point: x + "," + y
        }

        $.ajax({
            url: "http://api.vworld.kr/req/address",
            cache: false,
            dataType: "jsonp",
            jsonp: "callback",
            contentType: "application/json",
            data: data,
            type: 'POST',
            beforeSend: function () {
            },
            complete: function (xhr, status) {
            },
            success: function (jsonObj) {
                deferred.resolve(jsonObj.response.result[0].text);
            },
            error: function (jxhr, textStatus) {
                deferred.reject(jxhr);
            }
        });

    } catch (err) {
        deferred.reject(err);
    }

    return deferred.promise();
}


/**
 * 지도 중심좌표 -> 시도,시군구,읍면동 매핑
 */
function mapAddrMapping() {
    $.ajax({
        url: "/tss/readTssCommonMapAddrMapping",
        cache: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(map.getCenter()),
        type: 'POST',
        beforeSend: function () {
        },
        complete: function (xhr, status) {
        },
        success: function (data) {
            $("#searchMapAddrSido").data("kendoDropDownList").value(data.sidoCd);
            $("#searchMapAddrSigngu").data("kendoDropDownList").value(data.signguCd);
            $("#searchMapAddrEmd").data("kendoDropDownList").value(data.emdCd);

            displaySyncAddrMap(data.sidoNm, data.signguNm, data.emdNm);
        },
        error: function (jxhr, textStatus) {
        }
    });
}


/**
 * 주소 지도 동기화
 */
function displaySyncAddrMap(searchMapAddrSido, searchMapAddrSigngu, searchMapAddrEmd) {
    if (searchMapAddrSido == "") {
        searchMapAddrSido = "경상북도";
        searchMapAddrSigngu = "김천시";
    }
    //시도, 시군구, 읍면동 선택 항목을 라벨에 표출
    setAddressToLabel(searchMapAddrSido, searchMapAddrSigngu, searchMapAddrEmd);

    if (searchMapAddrSigngu == "전체") searchMapAddrSigngu = "";
    if (searchMapAddrEmd == "전체") searchMapAddrEmd = "";
    //주소를 좌표로 변환하여 날씨정보 표출
    setWeatherInfo(searchMapAddrSido + " " + searchMapAddrSigngu + " " + searchMapAddrEmd);
}

/**
 * 시도, 시군구, 읍면동 DropdownList 선택 텍스트를 라벨에 합쳐서 표출
 */
function setAddressToLabel(searchMapAddrSido, searchMapAddrSigngu, searchMapAddrEmd) {
    //var searchMapAddrSido = $("#searchMapAddrSido").data("kendoDropDownList").text();
    //var searchMapAddrSigngu = $("#searchMapAddrSigngu").data("kendoDropDownList").text();
    //var searchMapAddrEmd = $("#searchMapAddrEmd").data("kendoDropDownList").text();

    if (searchMapAddrSigngu == "전체") searchMapAddrSigngu = "";
    if (searchMapAddrEmd == "전체") searchMapAddrEmd = "";
    $("#searchLocationLabel").text(searchMapAddrSido + " " + searchMapAddrSigngu + " " + searchMapAddrEmd);
}


function setWeatherInfo(address) {
    // 주소 to 좌표(UTM-K) 변환
    fnAddr2Coord(address).done(function (coord) {
        // 좌표에서 가장가까운 기상정보 호출
        getWeatherInfo(coord).done(function (weatherInfo) {
            diaplayWeatherInfo(weatherInfo);
        }).fail(function (error) {
            // TODO(jhjeon): 날씨정보 가져오는 중 오류 발생 Notification 처리
            //console.log(error);
            clearWeatherInfo();
        });
    }).fail(function (error) {
        //console.log(error);
        clearWeatherInfo();
        // TODO(jhjeon): 주소 to 좌표변환 오류 발생 Notification 처리
    });
}

/**
 * 날씨정보 화면에 표출
 * @param weatherInfo
 */
function diaplayWeatherInfo(weatherInfo) {
    if (weatherInfo.weatherCode.substring(0, 1) == "0") {
        $("#weather_icon").attr("src", "/images/weather/ico_weather_" + weatherInfo.weatherCode + ".png");
    } else if (weatherInfo.weatherCode.substring(0, 1) == "1") {
        $("#weather_icon").attr("src", "/images/weather/ico_weather_10.png");
    } else if (weatherInfo.weatherCode.substring(0, 1) == "2") {
        $("#weather_icon").attr("src", "/images/weather/ico_weather_20.png");
    } else if (weatherInfo.weatherCode.substring(0, 1) == "3") {
        $("#weather_icon").attr("src", "/images/weather/ico_weather_30.png");
    } else if (weatherInfo.weatherCode.substring(0, 1) == "4") {
        $("#weather_icon").attr("src", "/images/weather/ico_weather_40.png");
    }

    $("#weather_icon").attr("alt", weatherInfo.weatherDesc);
    $("#weather_tmprt").text(weatherInfo.tmprt + "℃");
}

/**
 * 날씨정보 표출 초기화
 */
function clearWeatherInfo() {
    $("#weather_icon").attr("src", null);
    $("#weather_icon").attr("alt", null);
    $("#weather_tmprt").text("");
}

/******************************************************************
 *********************************** 주소, 날씨 관련 끝
 *******************************************************************/
/*
 * 좌표변환 시작
 */
var utmk = "+proj=tmerc +lat_0=38 +lon_0=127.5 +x_0=1000000 +y_0=2000000 +k=0.9996 +ellps=GRS80 +towgs84=0,0,0,0,0,0, 0+units=m +no_defs";
var wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
var grs80 = "+proj=longlat +ellps=GRS80 +no_defs";

function utmkToWgs84(x, y) {
    return proj4(utmk, wgs84, [y, x])
}

function utmkToGrs80(x, y) {
    return proj4(utmk, grs80, [y, x])
}

function wgs84ToUtmk(x, y) {
    return proj4(wgs84, utmk, [y, x])
}

function wgs84ToGrs80(x, y) {
    return proj4(wgs84, grs80, [y, x])
}

function grs80ToWgs84(x, y) {
    return proj4(grs80, wgs84, [y, x])
}

function grs80ToUtmk(x, y) {
    return proj4(grs80, utmk, [y, x])
}

function customFitBound(map, polyline) {

    var boundPoint = polyline.getBounds();
    //boundPoint._southWest.lng = Number(boundPoint._southWest.lng) - 0.005;
    map.fitBounds(boundPoint);
    //boundPoint._southWest.lng = Number(boundPoint._southWest.lng) + 0.005;
    return polyline;
}

/*
L.Polyline.prototype.setFitBound = function () {
    var boundPoint = this.getBounds();
    boundPoint._southWest.lng = Number(boundPoint._southWest.lng) - 0.02;
    return boundPoint;
}
*/

Array.prototype.setFitBoundArray = function () {
    var rtnBoundPoint;
    var westPoint = 100000;
    for (var i = 0; i < this.length; i++) {
        var boundPoint = this[i].getBounds();
        boundPoint._southWest.lng = Number(boundPoint._southWest.lng) + 0.008;
        if (westPoint > boundPoint._southWest.lng) {
            westPoint = boundPoint._southWest.lng
            rtnBoundPoint = boundPoint;
        }
    }
    return rtnBoundPoint;
}


function setColDate(divColDate) {
    $.ajax({
        url: "/tss/readTssCommonMainColDate",
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (jsonObj) {
            divColDate.text("[ " + jsonObj.colDate + " ]");
        },
        error: function (jxhr, textStatus) {
        },
        complete: function (xhr, status) {
        }
    });
}

function mapUrlCheck(url) {
    /*
    * 배경지도 URL 접속 체크 (서버 체크)
    * */
    /*var rtn = true;
    $.ajax({
        url: "/common/readUrlConnectionCheck",
        type: 'POST',
        async: false,
        contentType: "application/json",
        data: JSON.stringify({"checkUrl": url}),
        dataType: "json",
        success: function (data) {
            rtn = data;
        },
        error: function (jxhr, textStatus) {
            rtn = false;
        },
    });
    return rtn;*/
    /*
    * 배경지도 URL 접속 체크 (클라이언트 체크)
    * */
    var rtn = true;

    $.ajax({
        url: url,
        dataType: "jsonp",
        async: false,
        callback: "myCallback",
        crossDomain: true,
        error: function (jxhr, textStatus) {
            if(jxhr.status != 200){
                rtn = false;
            }
        }
    });

    return rtn;
}



/******************************************************************/
/*                          그리드 관련                           */
/******************************************************************/
/* 그리드 */
//var gridLayer;
var gridLayer = new Array();

/**
 * 그리드 조회
 * @returns
 */
function getGridJSON() {
    var param = fn_getFormData($("#formSearch"));

    param.x1 = map.getBounds().getSouthWest().lng;
    param.y1 = map.getBounds().getSouthWest().lat;
    param.x2 = map.getBounds().getNorthEast().lng;
    param.y2 = map.getBounds().getNorthEast().lat;

    clearGridGeoJSON();

    //지도 10km (10~11)
    //지도 1km (12~14)
    //지도 100m (15~16)
    //지도 50m (17~19)

    //지도 레벨에 따라 격자 반경을 받아옴.
    var zoomLevel = map.getZoom();
    var levelType = getLevelTypeToZoom(zoomLevel);

    if (levelType != "") {
        param.levelTypeCd = levelType;
    } else {
        return false;
    }

    $.ajax({
        url: "/tss/readCommonGridGeoJSON",
        cache: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(param),
        type: 'POST',
        beforeSend: function () {
        },
        complete: function (xhr, status) {
        },
        success: function (data) {
            displayGridJSON(data);
        },
        error: function (jxhr, textStatus) {
        }
    });
}

/*
 * 그리드 표시
 */
function displayGridJSON(data) {
    clearGridGeoJSON();

    $.each(data.features, function (i, dataItem) {
        var grid = L.geoJSON(dataItem, {
            weight: 0.3,
            opacity: 1.7,
            color: "#565656",
            dashArray: "6",
            fillOpacity: 0
        }).addTo(map);
        /*그리드를 맨 뒤로 보내기*/
        grid.bringToBack();
        /*var infoWindow = "<div style='padding-top: 20px'>" + dataItem.properties["GRID_CD"] + "</div>";
        grid.bindPopup(infoWindow);*/
        gridLayer.push(grid);
    });
}

/*
 * 그리드 초기화
 */
function clearGridGeoJSON() {
    /*if (gridLayer != undefined) {
        map.removeLayer(gridLayer);
    }
    */
    $.each(gridLayer, function (i, grid) {
        map.removeLayer(grid);
    });
    gridLayer = new Array();
}

/*그리드 줌 레벨에 따른 테이블 구분자*/
function getLevelTypeToZoom(zoomLevel) {
    var levelTypeCd = "";
    if (zoomLevel >= 10 && zoomLevel <= 15) {
        levelTypeCd = "100m";
    } else if (zoomLevel >= 16 && zoomLevel <= 19) {
        levelTypeCd = "50m";
    } else {
        /*그 이외는 격자 표시 안함*/
        levelTypeCd = "";
    }
    return levelTypeCd;
}


function getPoiIcon(category_cd) {
    var vMap = new Map();

    if (category_cd == "01") { //정부기관
        vMap.icon = "building";
        vMap.color = "#red";
    } else if (category_cd == "02") {//소방서
        vMap.icon = "fire";
        vMap.color = "red";
    } else if (category_cd == "03") {//경찰서
        vMap.icon = "shield";
        vMap.color = "red";
    } else if (category_cd == "04") {//우체국
        vMap.icon = "envelope";
        vMap.color = "red";
    } else if (category_cd == "05") {//법원
        vMap.icon = "balance-scale";
        vMap.color = "red";
    } else if (category_cd == "06") {//행정기관
        vMap.icon = "building-o";
        vMap.color = "red";
    } else if (category_cd == "07") {//교육
        vMap.icon = "graduation-cap";
        vMap.color = "red";
    } else if (category_cd == "08") {//병원
        vMap.icon = "hospital-o";
        vMap.color = "red";
    } else if (category_cd == "09") {//백화점
        vMap.icon = "shopping-bag";
        vMap.color = "red";
    } else if (category_cd == "10") {//마트
        vMap.icon = "shopping-cart";
        vMap.color = "red";
    } else if (category_cd == "11") {//관광
        vMap.icon = "globe";
        vMap.color = "red";
    } else if (category_cd == "12") {//공연
        vMap.icon = "star";
        vMap.color = "red";
    } else if (category_cd == "13") {//스포츠
        vMap.icon = "futbol-o";
        vMap.color = "red";
    } else if (category_cd == "14") {//호텔
        vMap.icon = "hotel";
        vMap.color = "red";
    } else if (category_cd == "15") {//공항
        vMap.icon = "plane";
        vMap.color = "red";
    } else if (category_cd == "16") {//버스정류장
        vMap.icon = "bus";
        vMap.color = "red";
    } else if (category_cd == "17") {//철도
        vMap.icon = "train";
        vMap.color = "red";
    } else if (category_cd == "18") {//도시철도
        vMap.icon = "subway";
        vMap.color = "red";
    } else if (category_cd == "19") {//항구
        vMap.icon = "anchor";
        vMap.color = "red";
    }
    return vMap
}

/*notification 팝업*/
function notificationShow(text) {
    //팝업영역 동적 생성
    $("body").after("<span id=\"popupNotification\"></span>");
    var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
    popupNotification.show(text, "info");
}

function setMap(map, mapDivId, mapOptions) {
    var rtnMap;
    /*
    * 1.우선순위 배경지도 url을 다 불러온다.
    * */
    $.ajax({
        url: "/tss/readCommonTileMapSeqList",
        cache: false,
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({}),
        type: 'POST',
        beforeSend: function () {
        },
        complete: function (xhr, status) {
        },
        success: function (data) {
            var mapNm = "";
            $.each(data, function (i, dataItem) {
                var checkUrl = dataItem.urlAddr;
                /*
                * 2.해당 배경지도 URL 접속 체크
                * */
                var rtn = mapUrlCheck(checkUrl);
                /*
                * 3.return 값이 true이면 해당 URL을 사용하고 for문을 빠져나간다.
                */
                if (rtn) {
                    mapNm = dataItem.mapNm;
                    return false;
                }
            });

            if (mapNm == "VWorld") {
                rtnMap = setVworldMap(map, mapDivId, mapOptions);
                /*rtnMap = setMapBoxMap(map, mapDivId, mapOptions);*/
            } else if (mapNm == "OpenStreetMap") {
                rtnMap = setOpenStreetMap(map, mapDivId, mapOptions);
            } else if (mapNm == "MapBox") {
                rtnMap = setMapBoxMap(map, mapDivId, mapOptions);
            }
        },
        error: function (jxhr, textStatus) {
        }
    });
    return rtnMap;
}

//선택한 지역으로 이동
function ldongCdComboBox(map, mapDiv, ldongCd, defaultZoomLevel) {

    var loader = isLoading(mapDiv[0], {
        type: "overlay",
        text: "선택 지역으로 이동중입니다.",
    });

    if (ldongCd == "" || ldongCd == undefined || ldongCd == null) {
        ldongCd = "3000000000";
    }

    var params = new Object();

    params.ldongCd = ldongCd;

    $.ajax({
        url: "/tss/readTssCommonLdongCenter",
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(params),
        dataType: "json",
        beforeSend: function () {
            loader.loading();
        },
        success: function (jsonObj) {
            map.setView(new L.latLng(jsonObj.centerY, jsonObj.centerX), defaultZoomLevel);
        },
        complete: function (xhr, status) {
            loader.remove();
        }
    });
}