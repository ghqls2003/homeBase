/**
 * mainPage
 *
 * history : 2024.12.23
 * author : 김경룡
 * version : 1.0
 *
 */
(function (W, D, $) {
    'use strict';

    W.$main = W.$main || {};
	var map
	var colorMap;

    $(document).ready(function() {
        $main.ui.pageLoad();		//최초 페이지 로드 시
        $main.event.setUIEvent();
        $main.event.popupLoad();
        if(busine || admstt){
			$main.event.addYoutubeAdmsttVideo();
		}
    });
    $main.ui = {
        pageLoad : function() {
			map = L.map('mapid', {
			    zoomControl: false,
			    dragging: false,
			    touchZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
			    boxZoom: false,
			    keyboard: false
			});
			map.setView([36.1665, 128.999], 6);

			colorMap = {
	            "Level1": "#64d7f4",
	            "Level2": "#5781dd",
	            "Level3": "#9854c2",
	            "Level4": "#44c596",
	        };

//			ajax(true, contextPath + '/ma/main/selectShpMap', 'body', '조회 중입니다', null, function(data) {
//				if(data.features[0].properties.check !== 'Y'){
//					$main.ui.creatPolygonMap(data);
//					$main.ui.creatLegendRange(data);
//					$main.ui.creatRegistraStatus(data);
//				} else {
//					$main.ui.temporaryCreatPolygonMap(data);
//					$main.ui.temporaryCreatLegendRange(data);
//					$main.ui.temporaryCreatRegistraStatus(data);
//				}
//			});
			ajax(true, contextPath + '/ma/main/topNotice', 'body', '조회 중입니다', null, function(data) {
				$main.ui.creatTopNotice(data);
			});
        },
	
		//폴리곤 맵 그림
		creatPolygonMap : function(data){
			var popup;
			L.geoJSON(data, {
                    onEachFeature: function(feature, layer) {
	                const color = colorMap[feature.properties.officeTotalLevel];
	                layer.setStyle({
	                    fillColor: color,
	                    color: color,
	                });

	                const showTooltip = (e) => {
	                    layer.setStyle({
	                        fillOpacity: 1,
	                    });

                        const bounds = layer.getBounds();
				        const center = bounds.getCenter();
				        let position = [bounds._southWest.lat, center.lng];
				        let offset = [0, 80];
				        let bubbleBoxClass = "bubbleBox";

				        // 새로운 조건 추가
				        if (["50", "48", "46"].includes(feature.properties.ctpvCd)) {
				            offset = [0, -20];
				            bubbleBoxClass += " rotated";
				            position = [bounds._northEast.lat, center.lng];
				        }
				        if (["28"].includes(feature.properties.ctpvCd)) {
				            offset = [30, 70];
				        }

	                    const popupContent = `
	                        <div class="${bubbleBoxClass}">
	                            <span class="green">${feature.properties.ctpvNm}</span>
	                            <p class="p_info">주사무소 ${feature.properties.mainOffice}개소</p>
	                            <p class="p_info">영업소(예약소) ${feature.properties.businessOffice}개소</p>
	                        </div>
	                    `;

	                    if (popup) {
	                        map.closePopup(popup);
	                    }

	                    popup = L.popup({
	                        offset
	                    })
	                    .setLatLng(position)
	                    .setContent(popupContent)
	                    .openOn(map);

	                    const wrapperElement = document.querySelector('.leaflet-popup-content-wrapper');
	                    if (wrapperElement) {
	                        wrapperElement.style.visibility = 'hidden';
	                    }
	                };

	                const hideTooltip = (e) => {
	                    layer.setStyle({
	                        fillOpacity: 0.7,
	                    });
	                    if (popup) {
	                        map.closePopup(popup);
	                        popup = null;
	                    }
	                };

	                layer.on({
	                    mouseover: showTooltip,
	                    mouseout: hideTooltip,
	                    click: showTooltip,
	                });
	            },
                style: function(feature) {
                    var color = colorMap[feature.properties.officeTotalLevel];
                    return {
                        color: color,
                        weight: 2,
                        opacity: 1,
                        fillColor: color,
                        fillOpacity: 0.7,
                    };
                }
            }).addTo(map);
		},
		creatLegendRange : function(data){
			var maxValues = [];
			var legendRange = [];

			if (data.features && data.features.length > 0) {
			    for (var i = 4; i >= 1; i--) {
			        var levelMaxValue = Math.max.apply(null,
			            $.map(data.features, function(feature) {
			                return feature.properties.officeTotalLevel === "Level" + i ? parseInt(feature.properties.officeTotal) : -Infinity;
			            })
			        );
			        maxValues.unshift(levelMaxValue);
			    }

			    for (var i = 3; i >= 0; i--) {
			        legendRange.unshift({
			            level: "Level" + (i + 1),
			            range: [i === 3 ? 1 : maxValues[i + 1] + 1, maxValues[i]]
			        });
			    }
			    legendRange = legendRange.reverse();
			}

			// 동적으로 범례 항목 생성
			$(".legend_cont").empty(); // 기존의 범례 항목을 모두 삭제
			$.each(legendRange, function(index, item) {
			    $(".legend_cont").append('<li><span class="colorBox color0' + (index + 1) + '"></span>' + item.range[0] + ' ~ ' + item.range[1] + '</li>');
			});
		},
		
		creatRegistraStatus : function(data){
			let totalMain = 0;
		    let totalBusiness = 0;
		    let totalMainOffice;
		    let totalBusinessOffice;

		    if (data.features && data.features.length > 0) {
		        // 주사업자 및 영업소 총합 계산
		        data.features.forEach((feature) => {
		            totalMain += parseInt(feature.properties.mainOffice);
		            totalBusiness += parseInt(feature.properties.businessOffice);
		        });

		        // 상태 업데이트
		        totalMainOffice = totalMain;
		        totalBusinessOffice = totalBusiness;
		    }
			let currentDate = new Date();
			let day = String(currentDate.getDate()).padStart(2, '0');
			let month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
			let year = currentDate.getFullYear();

			currentDate = year + '.' + month + '.' + day;


			document.getElementById('date').innerText = currentDate + '기준';
			document.getElementById('total').innerText = totalMainOffice + totalBusinessOffice;
			document.getElementById('mainOffice').innerText = totalMainOffice;
			
			document.getElementById('dateM').innerText = currentDate + '기준';
			document.getElementById('totalM').innerText = totalMainOffice + totalBusinessOffice;
			document.getElementById('mainOfficeM').innerText = totalMainOffice;
		},
		
		//폴리곤 맵 그림 임시 
		temporaryCreatPolygonMap : function(data){
			var popup;
			L.geoJSON(data, {
                    onEachFeature: function(feature, layer) {
	                const color = colorMap[feature.properties.officeTotalLevel];
	                layer.setStyle({
	                    fillColor: color,
	                    color: color,
	                });

	                const showTooltip = (e) => {
	                    layer.setStyle({
	                        fillOpacity: 1,
	                    });

                        const bounds = layer.getBounds();
				        const center = bounds.getCenter();
				        let position = [bounds._southWest.lat, center.lng];
				        let offset = [0, 70];
				        let bubbleBoxClass = "bubbleBoxAlpha";

				        // 새로운 조건 추가
				        if (["50", "48", "46"].includes(feature.properties.ctpvCd)) {
				            offset = [0, -20];
				            bubbleBoxClass += " rotated";
				            position = [bounds._northEast.lat, center.lng];
				        }
				        if (["28"].includes(feature.properties.ctpvCd)) {
				            offset = [30, 70];
				        }

	                    const popupContent = `
	                        <div class="${bubbleBoxClass}">
	                        	<span class="green">${feature.properties.ctpvNm}</span>
	                            <p class="p_info">주사무소 ${feature.properties.mainOffice}개소</p>
	                        </div>
	                    `;

	                    if (popup) {
	                        map.closePopup(popup);
	                    }

	                    popup = L.popup({
	                        offset
	                    })
	                    .setLatLng(position)
	                    .setContent(popupContent)
	                    .openOn(map);

	                    const wrapperElement = document.querySelector('.leaflet-popup-content-wrapper');
	                    if (wrapperElement) {
	                        wrapperElement.style.visibility = 'hidden';
	                    }
	                };

	                const hideTooltip = (e) => {
	                    layer.setStyle({
	                        fillOpacity: 0.7,
	                    });
	                    if (popup) {
	                        map.closePopup(popup);
	                        popup = null;
	                    }
	                };

	                layer.on({
	                    mouseover: showTooltip,
	                    mouseout: hideTooltip,
	                    click: showTooltip,
	                });
	            },
                style: function(feature) {
                    var color = colorMap[feature.properties.officeTotalLevel];
                    return {
                        color: color,
                        weight: 2,
                        opacity: 1,
                        fillColor: color,
                        fillOpacity: 0.7,
                    };
                }
            }).addTo(map);
		},
		temporaryCreatLegendRange : function(data){
			var maxValues = [];
			var legendRange = [];

			if (data.features && data.features.length > 0) {
			    for (var i = 4; i >= 1; i--) {
			        var levelMaxValue = Math.max.apply(null,
			            $.map(data.features, function(feature) {
			                return feature.properties.officeTotalLevel === "Level" + i? parseInt(feature.properties.mainOffice) : -Infinity;
			            })
			        );
			        maxValues.unshift(levelMaxValue);
			    }

			    for (var i = 3; i >= 0; i--) {
			        legendRange.unshift({
			            level: "Level" + (i + 1),
			            range: [i === 3 ? 1 : maxValues[i + 1] + 1, maxValues[i]]
			        });
			    }
			    legendRange = legendRange.reverse();
			}

			// 동적으로 범례 항목 생성
			$(".legend_cont").empty(); // 기존의 범례 항목을 모두 삭제
			$.each(legendRange, function(index, item) {
			    $(".legend_cont").append('<li><span class="colorBox color0' + (index + 1) + '"></span>' + item.range[0] + ' ~ ' + item.range[1] + '</li>');
			});
		},
		
		temporaryCreatRegistraStatus : function(data){
			document.querySelector("div.m_cont02 > table > tbody > tr:nth-child(2) > th").style.borderRadius = '0 0 0 10px';
			
			let totalMain = 0;
		    let totalMainOffice;

		    if (data.features && data.features.length > 0) {
		        // 주사업자 및 영업소 총합 계산
		        data.features.forEach((feature) => {
		            totalMain += parseInt(feature.properties.mainOffice);
		        });

		        // 상태 업데이트
		        totalMainOffice = totalMain - 89;
		    }
			let currentDate = new Date();
			let day = String(currentDate.getDate()).padStart(2, '0');
			let month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
			let year = currentDate.getFullYear();

			currentDate = year + '.' + month + '.' + day;


			document.getElementById('date').innerText = currentDate + '기준';
			document.getElementById('mainOffice').innerText = totalMainOffice;
			
			document.getElementById('dateM').innerText = currentDate + '기준';
			document.getElementById('mainOfficeM').innerText = totalMainOffice;
		},

		creatTopNotice : function(data){
		    const noticeList = $('.cont_wrap');
		    noticeList.empty(); // 기존 목록을 비우고 다시 생성

		    data.forEach(function(notice, index) {
		      	const date = new Date(notice.reg_dt);
				const now = new Date();
		        const diffTime = Math.abs(now - date);
		        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
		      	const day = date.getDate();
			    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			    const week = dayOfWeek[date.getDay()];
			    const fullDate = date.toISOString().split('T')[0];

		      	const listItem = $('<li>')
				.addClass(`li_cont ${notice.rn === 2 ? 'li_cont_tablet' : ''}`)
				.append(
					$('<div>').addClass('notice_top').append(
					    $('<div>').addClass('calender').append(
					      	$('<span>').addClass('day').text(day < 10 ? '0' + day : day),
					      	$('<span>').addClass('week').text(week)
					    ),
					    $('<ul>').addClass('info').append(
					      	$('<li>').addClass('sticker').text('공지'),
					      	$('<li>').addClass('date').text(fullDate)
					    )
					),
					$('<div>').addClass('notice_tit').append(
					    $('<a>').attr('href', '#').text(notice.pst_ttl).css({
					      	textOverflow: 'ellipsis',
					      	display: 'block',
					      	overflow: 'hidden'
					    }).on('click', function(e) {
					        e.preventDefault();
							
							var param = { pstSn: notice.pst_sn };
							tapReport(contextPath + '/sft/noticeDetail', param);
					    }),diffDays <= 7 ? $('<img>').attr('src',  contextPath + '/images/main/ico_new.png').attr('alt', '새글').addClass('new') : null
					)
				);
		      	noticeList.append(listItem);
		    });
		},
    };

    //이벤트 정의
    $main.event = {
        setUIEvent : function() {
			document.querySelector('.more_btn').addEventListener('click', function(event) {
			    event.preventDefault();
			    window.location.href = `${contextPath}/sft/notice`;
			});

			/* api 서버 모니터링 */
			$(".switch input[type='checkbox']").on('change', function() {
				if ($(this).is(':checked')) {
					$(".server_alarm_icon").removeClass('off').addClass('on');
					$main.event.setServNoticeCookie();
				} else {
					$(".server_alarm_icon").removeClass('on').addClass('off');
					$main.event.delNoticeCookie();
				}
			});

			const cookieYn = getCookie("servStatNoti");

			if(cookieYn){
				$(".switch input[type='checkbox']").attr("checked", true);
				$(".server_alarm_icon").removeClass('off').addClass('on');
			}else {
				$(".switch input[type='checkbox']").attr("checked", false);
				$(".server_alarm_icon").removeClass('on').addClass('off');
			}

	    },
		notification: function(){
			var time1 = new Date();
			var month1 = time1.getMonth()+1;
			var day1 = time1.getDate();
			var hours1 = time1.getHours(); // 시
			var nowTime = (("00" + month1.toString()).slice(-2)) + (("00" + day1.toString()).slice(-2)) + hours1;
			if(nowTime >= '08148'){
				$('.dlv-pop-wrap').css("display", "none");
				$('.overlay').css("display", "none");
			}
			/*let today = new Date();
			let month = today.getMonth() + 1
			let date = today.getDate(); // 일
			let hours = today.getHours();
			let minutes = today.getMinutes();
			
			let nowTime = month + '' + date + '' + hours + '' + minutes*/
		},
		
		/**
		 * 메인화면 팝업 공지
		 * author: 정영훈
		 * date:240405
		 * 팝업공지 CSS변경 시 JS동적 처리부분 유의
		 */
		popupLoad : function(){
			var PopupData = {
				totalCnt: 0,
			    totalHeight: 0,
				bottomMostHeight: 0,
			    screenStatus: null,
			    data: null,
			    arrayBottom:null,
			    
			    setData: function(data){ this.data = data; },
				getData: function(){return this.data; },
				
				setTotalCnt: function(totalCnt){ this.totalCnt = totalCnt },
				getTotalCnt: function(){ return this.totalCnt },
				
			    setTotalHeight: function(height) { this.totalHeight = height; },
			    getTotalHeight: function() { return this.totalHeight; },
			    
			    setScreenStatus: function(screenWidth){
					this.screenStatus = screenWidth <= 1440 ? "mobile" : "monitor";
				},
				getScreenStatus: function(){ return this.screenStatus; },
				
				setBottomMostHeight: function(bottomMostHeight){ this.bottomMostHeight = bottomMostHeight; },
				getBottomMostHeight: function(){ return this.bottomMostHeight; },
				
				setArrayOverflowBottom: function(arrayBottom){ this.arrayBottom = arrayBottom; },
				getArrayOverflowBottom: function(){ return this.arrayBottom; },
			};
			
			var popupCloseWithCookie = function(){
				var data = PopupData.getData();
				data.forEach(function(item, index){
			        var sn = item.popupSn;
			        $('#pop-close-btn-'+sn).on('click', function(){
						$('#overlay-'+sn).css("display", "none");
						$('#pop-wrap-'+sn).css("display", "none");
						var chk = $('#pop-chk-'+sn).prop("checked")
						if (chk) {
							setCookieAt00('pop'+sn, "done");
						}
					});
		        });
			};
			
			var setMentHeight = function() {
				return new Promise(function(resolve, reject){
					
				    var data = PopupData.getData();
				    data.forEach(function(item){
				        var sn = item.popupSn;
				        var popWrapHeight= $('#pop-wrap-'+sn).height();
				        var $popWrap = $('#pop-wrap-' + sn);
				        var $popCont = $('#pop-cont-'+sn);
				        var $popTtl = $('#pop-ttl-'+sn);
				        var $popBottom = $('#pop-bottom-'+sn);
				        var $popFile = $('#pop-file-'+sn);
				        
						var wrapTopPadding = parseInt($popWrap.css('padding-top').replace('px', ''));
						var wrapBottomPadding = parseInt($popWrap.css('padding-bottom').replace('px', ''));
						var contTopPadding = parseInt($popCont.css('padding-top').replace('px', ''));
						var contBottomPadding = parseInt($popCont.css('padding-bottom').replace('px', ''));
						var titleHeight = $popTtl.outerHeight();
						var titleMarginBottom = parseInt($popTtl.css('margin-bottom').replace('px', ''));
						var bottomHeight = $popBottom.outerHeight();
						var bottomBottomPadding = parseInt($popBottom.css('padding-bottom').replace('px', ''));
						
						var nonMent = wrapTopPadding + wrapBottomPadding + contTopPadding + contBottomPadding + titleHeight + bottomHeight;
						var mentMaxHeight = popWrapHeight - nonMent + titleMarginBottom + bottomBottomPadding;
						
				        var fileHeight = $popFile.outerHeight();
				        if(item.atchFileSn){
				            $('#pop-ment-'+sn).css('max-height', mentMaxHeight - fileHeight);
				        } else {
				            $('#pop-ment-'+sn).css('max-height', mentMaxHeight);
				        }
					});
					resolve(); 
			    });
			};
			
			var calcHeight = async function(){
				return new Promise(function(resolve, reject) {
				    var screenHeight = $(window).height();
				    var topMost = null;
				    var bottomMost = null;
				    var bottomMostHeight = null;
				
					var arrayBottom=[];
					
					var data = PopupData.getData();
			    	data.forEach(function(item, index){
						var sn = item.popupSn;
						var $popWrap = $('#pop-wrap-'+sn);
						var top = $popWrap.offset().top;
						var bottom = top + $popWrap.outerHeight();
						
						if (topMost === null || bottomMost === null) {
					        topMost = top;
					        bottomMost = bottom;
					    } else {
					        if (top < topMost) {
					          topMost = top;
					        }
					        if (bottom > bottomMost) {
					          bottomMost = bottom;
					          bottomMostHeight = $popWrap.outerHeight();
					        }
					        if (bottom > screenHeight ){
								arrayBottom.push({"sn": sn, "bottom": bottom});
							}
			            }
					});
					
					PopupData.setTotalHeight(bottomMost);
				    PopupData.setArrayOverflowBottom(arrayBottom);
				    PopupData.setBottomMostHeight(bottomMostHeight);
				    
				    resolve(); 
			    });
			};
			
			var setWrapHeight = async function() {
				var screenHeight = $(window).height();
				if(PopupData.getTotalCnt() === 1 && screenHeight <= 800){
					$('.pop-wrap').css('max-height', '90%');
					return;
				}
				
				await new Promise(async function(resolve, reject){
					await calcHeight();
					var arrayOverflowBottom = PopupData.getArrayOverflowBottom();
					
				 	arrayOverflowBottom.forEach(function(item){
						 var sn = item.sn;
						 var bottom = item.bottom;
						 
						 var $popWrap = $('#pop-wrap-' + sn);
						 var before_height = parseInt($popWrap.css('height'));
						 var overflowHeight = bottom - screenHeight;
						 var maxHeightContorll = 0.95; //화면을 넘칠 때, 넘치는 부분을 제외한 뒤 5% 더 줄임.
						 var maxHeight = (before_height - overflowHeight) * maxHeightContorll;
						 
					     $popWrap.css('max-height', maxHeight);
					});
					resolve();
				});
			};
			
			var monitorPosition = function(sn, index){
				var popupWrap = $('#pop-wrap-' + sn);
				var titleHeight = $('#pop-ttl-'+sn).outerHeight();
				var totalCnt = PopupData.getTotalCnt();
				var contTopPadding = parseInt($('.pop-cont').css('padding-top').replace('px', ''));
				var wrapTopPadding = parseInt($('.pop-wrap').css('padding-top').replace('px', ''));
				var popupCntControll = 5;  // 팝업을 계단식으로 나열할 개수. 초과하면 left 간격을 좁힘. 
				var popupTopControll = 10; // 여러개 출력 시 top시작점 정하는 상수.
				var popupGapControll = 2;  // 여러개 출력 시 제목 밑줄 안 보이는 높이로 지정하기 위한 상수.
				var popupGap = titleHeight + contTopPadding + wrapTopPadding - popupGapControll; 
				var baseMoveLeft = totalCnt - index - 1;
				var baseMoveTop = index;
				
				var LEFT_CONSTANT = totalCnt <= popupCntControll ? 1 : 0.5;
				var leftCalc = 50 - baseMoveLeft * LEFT_CONSTANT;
				
				var topCalcGreaterThanOne = popupTopControll + baseMoveTop * popupGap +'px';
				var topCalcOne = "50%";
				
				var transformOriginGreaterThanOne = "top center";
				var transformOriginOne = "center";
				
				var transformGreaterThanOne = 0; 
				var transformOne = "-50%";
				
				var topCalc;
				var transformOrigin;
				var transform;
				
				if(totalCnt === 1){
					topCalc = topCalcOne;
					transformOrigin = transformOriginOne; 
					transform = transformOne;
				} else {
					topCalc = topCalcGreaterThanOne; 
					transformOrigin = transformOriginGreaterThanOne; 
					transform = transformGreaterThanOne;
				}
				
		        popupWrap.css({
		            'left': leftCalc + '%',
		            'top': topCalc,
		            'transfrom-origin': transformOrigin,
		            'transform': 'translate(-50%, '+ transform +')'
		        });
			}
			
			var mobilePosition = function(sn, index){
				monitorPosition(sn, index);
				var popupWrap = $('#pop-wrap-' + sn);
				 
				popupWrap.css({
				    'width': '95%',
				    'left': '50%',
				});
			}
			
			var adjustPosition = function() {
				var screenStatus = PopupData.getScreenStatus();
				var data = PopupData.getData();
				
				data.forEach(function(item, index) {
		            var sn = item.popupSn;
		            if (screenStatus === "monitor") {
		                monitorPosition(sn, index);
		            } else if (screenStatus === "mobile") {
		                mobilePosition(sn, index);
		            }
		        });
			}
			
			var checkView = function(){
				var screenWidth = $(window).width();
				PopupData.setScreenStatus(screenWidth);
			}
			
			var popupBindData = function() {
		        var data = PopupData.getData();
		        var promises = [];
		        data.forEach(function(item, index) {
		            var sn = item.popupSn;
	                // 팝업 제목 바인딩 : 타입([]부분)은 노란색 출력
	                var title = item.popupTtl;
	                var titleMatch = title.match(/\[.*?\]/);
	                var titleType = titleMatch ? titleMatch[0] : '';
	                var titleCont = titleMatch ? title.replace(titleType, '') : title;
	                $('#pop-ttl-' + sn).html(`<span style="color: #fffd04;">${titleType}</span>${titleCont}`);
	
	                // 팝업 내용 바인딩
	                var popupCn = $('<div/>').html(item.popupCn).text();
	                $('#pop-ment-' + sn).html(popupCn);
	
	                // 첨부 파일 바인딩 & 다운로드
	                if (item.atchFileSn) {
	                    $('#pop-file-' + sn).show();
	                    $('#pop-file-name-' + sn).text(item.atchFileNm);
	                    $("#pop-file-name-" + sn).click(function() {
	                        fileDownloadget(item.atchFileSn, item.atchFileNm);
	                    });
	                } else {
	                    $('#pop-file-' + sn).hide();
	                    $('#pop-file-name-' + sn).text('');
	                    $("#pop-file-name-" + sn).off('click');
	                }
	
	                $('#pop-chk-' + sn).kendoCheckBox({
	                    size: "medium",
	                    rounded: "medium"
	                });
		        });
			}
			
			var checkCookie =  function() {
				var data = PopupData.getData();
				data.forEach(function(item, index){
					var sn = item.popupSn;
					var popupCookie = getCookie('pop'+sn);
						
					if(popupCookie === "done"){
						//기본 display: none
					} else {
						$('#overlay-'+sn).show();
					}
				});
			}
			
			var popupController = async function() {
				checkCookie();
				checkView();
				popupBindData();
				adjustPosition();
				await setWrapHeight();
				await setMentHeight();
				popupCloseWithCookie();
			}
			
			var popupData = function() {
				ajax(false, contextPath + '/ma/main/popup', 'body', '공지사항을 조회 중입니다.', null, function (response) {
					if(response.length === 0) {
						// 팝업 실행하지 않음
					} else {
						PopupData.setData(response);
						var totalCnt= response.length;
						PopupData.setTotalCnt(totalCnt);
						popupController();
					}
				});
			}
			popupData();
		},
		
		addYoutubeAdmsttVideo: function() {
			const background = $("#youtube-popup-background");
            background.css("display", "flex");

            const box = $("<div></div>", {"class": "youtube-popup-box"});
            background.append(box);

            const closeButton = $("<button></button>", {
                text: '✕',
                "class": 'close-button',
                click: function() {
					$("#youtube-popup-background").remove();	
                }
            });
            box.append(closeButton);
            

            const iframe = $("<iframe></iframe>", {
                src: 'https://www.youtube.com/embed/G-8JJE99pks?si=h19r8ketsnQ6S9Pc',
                id: 'youtube-video',
                css: {
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px'
                },
                attr: {
                    frameborder: '0',
                    allowfullscreen: '',
					title : 'youtubeVideo'
                }
            });
            box.append(iframe);
		},
		chkServNoticeCookie: function() {
			return getCookie("servStatNoti") !== "";
		},
		delNoticeCookie: function(){
			const name = "servStatNoti";
			document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
		},
		setServNoticeCookie : function(){
			const name = "servStatNoti";
			const oldCookie = $main.event.chkServNoticeCookie();
			if(oldCookie){
				// 쿠키 만료
				document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
				// 새 쿠키 생성
				setCookieAt00(name, "true");
			}else {
				setCookieAt00(name, "true");
			}

		},
    };

}(window, document, jQuery));