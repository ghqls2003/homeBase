/**
 * mainPage
 *
 * history : 네이버시스템(주), 1.0, 2024/09/02  초기 작성
 * author : 김상훈
 * version : 1.0
 *
 */
(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$serverStat = W.$serverStat || {};
	var map
	var colorMap;
	var eventSource;

	$(document).ready(function() {
		$serverStat.ui.pageLoad();		//최초 페이지 로드 시
		$serverStat.event.setUIEvent();
		if(admstt){
		$serverStat.event.svrStatLoad(); 
		}
	});
	$serverStat.ui = {
		pageLoad: function() {

		},

	};

	//이벤트 정의
	$serverStat.event = {
		setUIEvent: function() {
			/* api 서버 모니터링 */
			$(".switch input[type='checkbox']").on('change', function() {
				if ($(this).is(':checked')) {
					$(".server_alarm_icon").removeClass('off').addClass('on');
					$serverStat.event.setServNoticeCookie();
				} else {
					$(".server_alarm_icon").removeClass('on').addClass('off');
					$serverStat.event.delNoticeCookie();
				}
			});

			const cookieYn = getCookie("servStatNoti");

			if (cookieYn) {
				$(".switch input[type='checkbox']").attr("checked", true);
				$(".server_alarm_icon").removeClass('off').addClass('on');
			} else {
				$(".switch input[type='checkbox']").attr("checked", false);
				$(".server_alarm_icon").removeClass('on').addClass('off');
			}

		},

		/**
		 * api 상태 모니터링 상태창
		 * data:240712
		 */
		svrStatLoad: function() {
			const url = contextPath + "/ma/main/svrStat";
			eventSource = new EventSource(url);

			// 서버 상태 호출
			const authChk = $(".serverStatusBar");

			if (authChk) {
				$serverStat.event.stVerfHourLoad();
				const eventSource = new EventSource(url);
				eventSource.onmessage = function(event) {
					$serverStat.event.sseCall(event)
				}
				/*eventSource.onerror = function () {
					$main.event.renderDefaultStatList(statList);
				};*/
			}

		},
		sseCall: function(event) {
			const statList = [
				{ "servNm": "Rims", "tgServ": "chck1", "servSt": "", "servStVal": "" },
				{ "servNm": "공단", "tgServ": "chck2", "servSt": "", "servStVal": "" },
				{ "servNm": "경찰청", "tgServ": "chck3", "servSt": "", "servStVal": "" },
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
				$serverStat.event.updateServStat(updatedStatList);
			} else {
				$serverStat.event.renderDefaultStatTemplate(statList);
			}
		},
		updateServStat: function(dataList) {
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
				$serverStat.event.playSiren();
			}

			this.firstLoad = false;
		},
		renderDefaultStatTemplate: function(statList) {
			// 기본 템플렛
			var code = "";
			statList.forEach(function(idx, item) {
				code += `<li class="server_list_item server_list_item${idx + 1}" id="${item.tgServ}">`;
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
		playSiren: function() {
			const sirenTg = $("#sirenAd")[0];

			if ($serverStat.event.chkServNoticeCookie()) {

				var agent = navigator.userAgent.toLowerCase();
				if (agent.indexOf("chrome") != -1) {
					const oldFrame = $('#if-siren').find('iframe');

					if (oldFrame.length > 0) {
						oldFrame[0].src = oldFrame[0].src;
					} else {
						var weaList = '<iframe style="width:0px; height:0px;" src="' + contextPath + '/audio/siren_01.mp3" allow="autoplay">'
						$('#if-siren').html(weaList);
					}
				} else {
					sirenTg.volume = 0.5;
					sirenTg.play();
				}
			}
		},
		chkServNoticeCookie: function() {
			return getCookie("servStatNoti") !== "";
		},
		delNoticeCookie: function() {
			const name = "servStatNoti";
			document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
		},
		setServNoticeCookie: function() {
			const name = "servStatNoti";
			const oldCookie = $serverStat.event.chkServNoticeCookie();
			if (oldCookie) {
				// 쿠키 만료
				document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
				// 새 쿠키 생성
				setCookieAt00(name, "true");
			} else {
				setCookieAt00(name, "true");
			}

		},
		stVerfHourLoad: function() {
			let stVerfHourList;
			ajax(false, contextPath + '/ma/main/stVerfHour', 'body', '조회 중입니다', null, function(data) {
				if (data.success) {
					stVerfHourList = data.stVerfHourList
					$serverStat.event.generateStHourChart(stVerfHourList);
				}
			});
		},
		generateStHourChart: function(data) {
			const month = data.map(function(elem) {
				return elem.hr
			})
			const chartcontainer = $(".chart_wrap");
			const chartWidth = chartcontainer.width();
			const chartHeight = chartcontainer.height();

			$("#server_chart").kendoChart({
				dataSource: {
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