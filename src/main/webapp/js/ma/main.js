/**
 * mainPage
 *
 * history : 네이버시스템(주), 1.0, 2023/05/22  초기 작성
 * author : 최진호
 * version : 1.0
 *
 */
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$main = W.$main || {};
	var map
	var colorMap;
	var eventSource;

    $(document).ready(function() {
        $main.ui.pageLoad();		//최초 페이지 로드 시
        $main.event.setUIEvent();
        $main.event.popupLoad();
        if(busine){
        	$main.event.addYoutubeVideo();
		}else if(admstt){
			$main.event.addYoutubeAdmsttVideo();
//			$main.event.svrStatLoad();
		}
    });
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
    $main.ui = {
        pageLoad : function() {
			//console.log(guest);
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

			ajax(true, contextPath + '/ma/main/selectShpMap', 'body', '조회 중입니다', null, function(data) {
				if(data.features[0].properties.check !== 'Y'){
					$main.ui.creatPolygonMap(data);
					$main.ui.creatLegendRange(data);
					$main.ui.creatRegistraStatus(data);
//					console.log('N')
				} else {
					$main.ui.temporaryCreatPolygonMap(data);
					$main.ui.temporaryCreatLegendRange(data);
					$main.ui.temporaryCreatRegistraStatus(data);
//					console.log('Y')
				}
			});
			ajax(true, contextPath + '/ma/main/topNotice', 'body', '조회 중입니다', null, function(data) {
				$main.ui.creatTopNotice(data);
			});
			if(pcType == "MOBI" && !userTypeDetail && guest){
//				$('#myButton').removeAttr("hidden");  // 신규 앱 배포 시 주석 해제
			};

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
			document.getElementById('businessOffice').innerText = totalBusinessOffice;
			
			document.getElementById('dateM').innerText = currentDate + '기준';
			document.getElementById('totalM').innerText = totalMainOffice + totalBusinessOffice;
			document.getElementById('mainOfficeM').innerText = totalMainOffice;
			document.getElementById('businessOfficeM').innerText = totalBusinessOffice;
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
			document.querySelector("div.m_cont02 > table > tbody > tr:nth-child(1)").style.display = 'none';
			document.querySelector("div.m_cont02 > table > tbody > tr:nth-child(3)").style.display = 'none';
			document.querySelector("div.m_cont02.m_cont02_tablet > table > tbody > tr:nth-child(1) > th:nth-child(1)").style.display = 'none';
			document.querySelector("div.m_cont02.m_cont02_tablet > table > tbody > tr:nth-child(2) > td:nth-child(1)").style.display = 'none';
			document.querySelector("div.m_cont02.m_cont02_tablet > table > tbody > tr:nth-child(1) > th:nth-child(3)").style.display = 'none';
			document.querySelector("div.m_cont02.m_cont02_tablet > table > tbody > tr:nth-child(2) > td:nth-child(3)").style.display = 'none';
//			document.getElementById('totalM').style.display = 'none';
//			document.getElementById('businessOfficeM').style.display = 'none';
			
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
//			document.getElementById("more_btn").addEventListener("click", function() {
//			    window.location.href = `${contextPath}/sft/notice`;
//			});
			$('#myButton').on('click', function(){
				window.location.href = `${contextPath}/vfc/contactlessVfc`;
			});
			document.getElementById("Shortcuts01").addEventListener("click", function() {
				if(guest){
					alert('로그인 후 사용 가능한 메뉴 입니다.')					
				} else {
					window.location.href = `${contextPath}/vfc/drive`;
				}
//				let web = document.createElement('a');
//				web.href = contextPath+'/DQVuserguide/운전자격확인시스템_사용자지침서_대여사업자용_웹.pdf';
//				web.download = '운전자격확인시스템_사용자지침서_대여사업자용_웹.pdf';
//				document.body.appendChild(web);
//				web.click();
//				document.body.removeChild(web);
			});
			document.querySelector("#Shortcuts01 a").addEventListener('click', function(e) {
			    e.preventDefault();
			});
			document.getElementById("Shortcuts02").addEventListener("click", function() {
				window.location.href = `${contextPath}/ma/userManualWeb`;
				/*let app = document.createElement('a');
				app.href = contextPath+'/DQVuserguide/운전자격확인시스템_사용자지침서_대여사업자용_모바일.pdf';
				app.download = '운전자격확인시스템_사용자지침서_대여사업자용_모바일.pdf';
				document.body.appendChild(app);
				app.click();
				document.body.removeChild(app);*/
			});
			document.getElementById("Shortcuts03").addEventListener("click", function() {
				window.location.href = `${contextPath}/sft/faq`;
//			    alert("준비 중 입니다.");
			});
			document.querySelector('.more_btn').addEventListener('click', function(event) {
			    event.preventDefault();
			    window.location.href = `${contextPath}/sft/notice`;
			});

		/*	$('#moreBtn').on('click', function(e) {
			    e.preventDefault();
			    window.location.href = '/';
			});*/

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
			
			var popupSetTemplate = function() {
				var data = PopupData.getData();
				data.forEach(function(item, index){
					var sn = item.popupSn;
					var popupTemplate =`
						<div class="overlay" id="overlay-${sn}" style="display: none;">
		                   <div class="pop-wrap" id="pop-wrap-${sn}">
		                       <div class="pop-cont" id="pop-cont-${sn}">
		                           <div class="pop-ttl" id="pop-ttl-${sn}"></div>
		                           <div class="scrollBar02">
		                           		<div class="pop-ment" id="pop-ment-${sn}"></div>
		                           </div>
		                           <div class="pop-file" id="pop-file-${sn}" style="display: none;">
								      <img class="pop-file-ico" src="${contextPath}/images/icons/ico_file.png" alt="파일다운로드 아이콘">
								      <span class="pop-file-th" id="pop-file-th-${sn}">첨부파일 :</span>
								      <span class="pop-file-name" id="pop-file-name-${sn}"></span>
							      </div>
			                       <div class="pop-bottom" id="pop-bottom-${sn}">
			                           <button class="pop-close-btn" id="pop-close-btn-${sn}">닫기</button>
				                       <div class="pop-today-close" id="pop-today-close-${sn}">
				                           <input type="checkbox" class="pop-chk" id="pop-chk-${sn}">
				                       	   <label for="pop-chk-${sn}">&nbsp;오늘 이 창을 열지 않음</label>
				                       </div>
			                       </div>
		                       </div>
		                   </div>
	               		</div>`;
					$(".popupNotice").append(popupTemplate);
				});
			}
			
			var popupController = async function() {
				popupSetTemplate();
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
		addYoutubeVideo: function() {
			const background = $("#youtube-popup-background");
            background.css("display", "flex");

            const box = $("<div></div>", {"class": "youtube-popup-box"});
            background.append(box);

            const closeButton = $("<button></button>", {
                text: '✕',
                "class": 'close-button',
                click: function() {
//                    background.css("display", "none");
					$("#youtube-popup-background").remove();	
                }
            });
            box.append(closeButton);
            

            const iframe = $("<iframe></iframe>", {
                src: 'https://www.youtube.com/embed/AoA3xfjxiyo?enablejsapi=1',
                id: 'youtube-video',
                css: {
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px'
                },
                attr: {
                    frameborder: '0',
                    allowfullscreen: ''
                }
            });
            box.append(iframe);
            
//            var player = new YT.Player('player', {
//			    width: '100%',
//                height: '100%',
//                borderRadius: '15px',
//			    videoId: 'AoA3xfjxiyo', // 영상 ID 설정
//			     playerVars: {
//                    'autoplay': 0,
//                    'modestbranding': 1
//                },
//			    events: {
//			        'onReady': onPlayerReady,
//			        'onStateChange': onPlayerStateChange,
//			    }
//			});
//			function onPlayerReady(event) {
//	            // 비디오 플레이어가 준비되었을 때 실행할 코드
//	            // 예를 들어, 자동 재생을 시작하려면 event.target.playVideo(); 를 사용할 수 있습니다.
//	        }
            
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
//                    background.css("display", "none");
					$("#youtube-popup-background").remove();	
                }
            });
            box.append(closeButton);
            

            const iframe = $("<iframe></iframe>", {
                src: 'https://www.youtube.com/embed/G2E-qZLSxoI?enablejsapi=1',
                id: 'youtube-video',
                css: {
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px'
                },
                attr: {
                    frameborder: '0',
                    allowfullscreen: ''
                }
            });
            box.append(iframe);
            
//            var player = new YT.Player('player', {
//			    width: '100%',
//                height: '100%',
//                borderRadius: '15px',
//			    videoId: 'AoA3xfjxiyo', // 영상 ID 설정
//			     playerVars: {
//                    'autoplay': 0,
//                    'modestbranding': 1
//                },
//			    events: {
//			        'onReady': onPlayerReady,
//			        'onStateChange': onPlayerStateChange,
//			    }
//			});
//			function onPlayerReady(event) {
//	            // 비디오 플레이어가 준비되었을 때 실행할 코드
//	            // 예를 들어, 자동 재생을 시작하려면 event.target.playVideo(); 를 사용할 수 있습니다.
//	        }
            
		},

		/**
		 * api 상태 모니터링 상태창
		 * data:240712
		 */
		svrStatLoad : function(){
			const url = contextPath + "/ma/main/svrStat";
			eventSource = new EventSource(url);

			// 서버 상태 호출
			const authChk = $(".serverStatusBar");

			if(authChk) {
				$main.event.stVerfHourLoad();
				const eventSource = new EventSource(url);
				eventSource.onmessage = function(event){
					$main.event.sseCall(event)
				}
				/*eventSource.onerror = function () {
					$main.event.renderDefaultStatList(statList);
				};*/
			}

		},
		sseCall : function(event){
			const statList = [
				{"servNm" : "Rims", "tgServ" : "chck1", "servSt" : "", "servStVal" : ""},
				{"servNm" : "공단", "tgServ" : "chck2","servSt" : "", "servStVal" : ""},
				{"servNm" : "경찰청", "tgServ" : "chck3" ,"servSt" : "", "servStVal" : ""},
			]
			const data = JSON.parse(event.data);
			if (data.success) {
				const statDataList = data.svrStatList[0];
				const updatedStatList = statList.map(statItem => {
					const tgServ = statItem.tgServ;
					if (statDataList.hasOwnProperty(tgServ)) {
						statItem.servSt = statDataList[tgServ];
					}

					statItem.servStVal = statItem.servSt === "00" ? "정상" : "중단";
					return statItem;
				});
				$main.event.updateServStat(updatedStatList);
			} else {
				$main.event.renderDefaultStatTemplate(statList);
			}
		},
		updateServStat: function (dataList) {
			let errIs = false;

			dataList.forEach(function(item) {
				const tgElem = $(`#${item.tgServ}`);
				if (tgElem.length) {
					const elem = tgElem.find(".status_icon");
					const currentStatus = elem.attr("class")
						.split(' ')
						.filter(cls => cls !== 'status_icon')
						.join('');
					const newStatus = item.servSt === "00" ? "is_ok" : "is_error";

					if (currentStatus !== newStatus) {
						elem.removeClass("is_ok is_error").addClass(newStatus);
						tgElem.find(".status_text").text(item.servStVal);

						if (currentStatus !== "is_error" && newStatus === "is_error") {
							errIs = true;
						}
					}

					if (this.firstLoad && newStatus === "is_error") {
						errIs = true;
					}

				}
			}, this);
			if (errIs) {
				$main.event.playSiren();
			}

			this.firstLoad = false;
		},
		renderDefaultStatTemplate : function(statList){
			// 기본 템플렛
			var code = "";
			statList.forEach(function(idx, item){
				code += `<li class="server_list_item server_list_item${idx+1}" id="${item.tgServ}">`;
				code += `<div class="server_list_item_inner">`;
				code += `<div class="status_icon_wrap">`;
				code += `<div class="status_icon"></div></div>`;
				code += `<p class="server_name">${item.servNm} 서버</p>`;
				code += `<div class="status">`;
				code += `<p class="status_text">확인중</p>`;
				code += `</div>`;
				code += `</div>`;
				code += `</li>`;
			})
			$(".server_list").html(code);
		},
		playSiren : function(){
			const sirenTg = $("#sirenAd")[0];

			if ($main.event.chkServNoticeCookie()) {

				var agent = navigator.userAgent.toLowerCase();
				if (agent.indexOf("chrome") != -1 ) {
					const oldFrame = $('#if-siren').find('iframe');

					if (oldFrame.length > 0) {
						oldFrame[0].src = oldFrame[0].src;
					} else {
						var weaList = '<iframe style="width:0px; height:0px;" src="' + contextPath + '/audio/siren_01.mp3" allow="autoplay">'
						$('#if-siren').html(weaList);
					}
				}else {
					sirenTg.volume = 0.5;
					sirenTg.play();
				}
			}
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
		stVerfHourLoad : function(){
			let stVerfHourList;
			ajax(false, contextPath + '/ma/main/stVerfHour', 'body', '조회 중입니다', null, function(data) {
				if(data.success){
					stVerfHourList = data.stVerfHourList
					$main.event.generateStHourChart(stVerfHourList);
				}
			});
		},
		generateStHourChart : function(data){
			const month = data.map(function(elem){
				return elem.hr
			})
			const chartcontainer = $(".chart_wrap");
			const chartWidth = chartcontainer.width();
			const chartHeight = chartcontainer.height();

			$("#server_chart").kendoChart({
				dataSource : {
					data: data
				},
				title: {
					text: "시간별 API 요청 건수",
					color: "#fff",
				},
				legend: {
					visible: false,
				},
				series: [{
					name: "API 요청 건수",
					field: "total"
				}],
				categoryAxis: {
					categories: month,
					color: "#585858",
				},
				tooltip: {
					visible: true,
					template: "#: kendo.format('{0:N0}', value)#건 "
				},
				chartArea: {
					width: 840,
					height: chartHeight
				}
			});
		}

    };

}(window, document, jQuery));