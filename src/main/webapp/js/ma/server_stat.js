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

	$(document).ready(function() {
		if(admstt){
			$serverStat.ui.pageLoad();  // 관리자급만 표출
		}
		$serverStat.event.setUIEvent();
	});
	
	$serverStat.ui = {
		pageLoad: function() {
			// 시간별 API 요청 건수
			$serverStat.event.setHourApiCnt();
			var second = 1000;
			var min = second * 60;
			setInterval(function() {
				$serverStat.event.setHourApiCnt();
			}, 10*min);
			
			// 실시간 서버상태
			$serverStat.event.svrStatLoad(min);
		}
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
		 * 시간별 api 요청 건수
		 * 2024-11-04, 김경룡
		 */
		setHourApiCnt: function() {
			ajax(false, contextPath + '/ma/main/apiHourCnt', 'body', '조회 중입니다', {}, function(data) {
				$serverStat.event.generateStHourChart(data);
			});
		},

		/**
		 * api 상태 모니터링 상태창 수정
		 * 2024-11-04, 김경룡
		 */
		svrStatLoad: function(min) {
			$serverStat.event.RTData();
			setInterval(function() {
				$serverStat.event.RTData();
			}, min);
		},
		RTData: function() {
			ajax(false, contextPath + '/ma/main/svrStat', 'body', '조회 중입니다', {}, function(data) {
				const statList = [
					{ "servNm": "Rims", "tgServ": "chck1", "servSt": "", "servStVal": "" },
					{ "servNm": "공단", "tgServ": "chck2", "servSt": "", "servStVal": "" },
					{ "servNm": "경찰청", "tgServ": "chck3", "servSt": "", "servStVal": "" },
				]
					const updatedStatList = statList.map(statItem => {
						const tgServ = statItem.tgServ;
						if (data.hasOwnProperty(tgServ)) {
							statItem.servSt = data[tgServ];
						}
	
						statItem.servStVal = statItem.servSt === "00" ? "정상" : "중단";
						return statItem;
					});
					$serverStat.event.updateServStat(updatedStatList);
				});
		},
		updateServStat: function(dataList) {
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
					}
				}
			}, this);
			this.firstLoad = false;
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
					text: "일별 접속 통계",
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