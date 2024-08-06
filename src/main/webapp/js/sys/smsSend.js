(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	var user_sn={};
	var excelDownArc = {};
	
	W.$smsSend = W.$smsSend || {};
	
	$(document).ready(function() {
		$smsSend.ui.pageLoad();		//최초 페이지 로드 시
		$smsSend.event.setUIEvent();
	});

	$smsSend.ui = {
		pageLoad: function() {
			$smsSend.ui.search(); // 검색옵셥
			$smsSend.ui.smsSendInfo();  // 문자 발송 이력 그리드
			$smsSend.ui.receiverListGrid();  // 개별 문자 그리드
			$smsSend.ui.crnoAutoComplete(); // 법인별 자동검색
		},
		
	    // 법인별 자동검색
		crnoAutoComplete: function(){
			var param = {};
			
			ajax(false, contextPath + '/sys/smsSend/selectCrno', 'body', '처리중입니다.', param, function(data) {
				$("#inc_selec_01").kendoAutoComplete({
	              filter: "contains",
					placeholder: '법인명을 입력하세요.',
					dataTextField: "co_nm",
			        dataSource: data,
					select: function(e) {
	                    var dataItem = this.dataItem(e.item.index());
	                    var crno = dataItem ? dataItem.crno : null;
	                    var co_nm = dataItem ? dataItem.co_nm : null;
	                    $("#inc_selec_01").data('value', crno);
						$("#inc_selec_01").val(co_nm);
						$smsSend.ui.incReceiverList();
                	}
				}).data("kendoAutoComplete");
			});
		}
		,
	
		// 검색옵션
		search: function() {
			var param = {};
			
			ajax(true, contextPath+'/sys/usermanage/selectCtpvNm.do', 'body', '처리중입니다.', param, function (data) {
				$('.sub04 #searchCtpvNm').kendoDropDownList({
		            optionLabel: "시도(전체)",
		            dataTextField: "ctpv_nm",
		            dataValueField: "ctpv_cd",
		            dataSource: data,
					value : "ctpv_cd",
					change: function() {
						if(this.value() == '') {
							$('.sub04 #searchSggNm').data("kendoDropDownList").setDataSource(null);
						} else {
						    param.ctpvCd = this.value();
							ajax(true, contextPath+'/sys/usermanage/selectSggNm.do', 'body', '처리중입니다.', param, function (data) {
								$('.sub04 #searchSggNm').kendoDropDownList({
						            optionLabel: "시군구(전체)",
						            dataTextField: "sgg_nm",
						            dataValueField: "sgg_cd",
						            dataSource: data,
									value : "sgg_cd"
						        });
							});
						}
					}
		        });
			});
			
			// 시구군
			$('.sub04 #searchSggNm').kendoDropDownList({
	            optionLabel: "시군구(전체)",
	            dataSource: {}
	        });

			// 계정상태
			ajax(false, contextPath + '/sys/usermanage/selectSttsCd.do', 'body', '처리중입니다.', param, function(data) {
				$(".sub04 #searchSttsCd").kendoDropDownList({
	              optionLabel: "계정상태(전체)",
	              dataTextField: "cd_nm",
	              dataValueField: "cd_nm",
	              dataSource: data,
	              value: "cd_nm"
				});
			});

			// 권한
			ajax(false, contextPath + '/sys/smsSend/selectAuth', 'body', '처리중입니다.', param, function(data) {
				$("#searchAuthrtCd").kendoDropDownList({
	              optionLabel: "권한(전체)",
	              dataTextField: "authrt_nm",
	              dataValueField: "authrt_cd",
	              dataSource: data,
	              value: "authrt_cd"
				});
			});
			
			// 수신자 검색조건
			var searchOtherCondition = [
		        {value : "user_id", text : "아이디"},
		        {value : "user_nm", text : "성명"},
		        {value : "co_nm", text : "회사명"},
		        {value : "telno", text : "연락처"},
	    	];

	    	$(".sub04 #searchOtherCondition").kendoDropDownList({
              optionLabel: "검색조건(전체)",
              dataTextField: "text",
              dataValueField: "value",
              dataSource: searchOtherCondition,
              value: "value"
			});
			
			// 기간 유형
			var dateType = [
				{ value: "send_date", text: "발송일"},
			   	{ value: "now_date", text: "발송요청일"},
			];
			
			$("#dateType").kendoDropDownList({
					dataTextField: "text",
					dataValueField: "value",
					dataSource: dateType,
					value: "value"
    		});
			
			// 기간 검색
			var oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
			
			$("#start-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(oneMonthAgo),
			});

			$("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(),
			});
			
			// 발송 유형
			var sendType = [
				{ cd: 0, sendType: "즉시 전송"},
				{ cd: 1, sendType: "예약 전송"},
			];
			
			$("#sendType").kendoDropDownList({
				optionLabel: '발송유형(전체)',
				dataTextField: "sendType",
				dataValueField: "cd",
				dataSource: sendType
			});
			
			// 발송 이력 검색 조건
			var searchType = [
				{ value: "msg", text: "내용"},
			   	{ value: "user_nm", text: "수신자명"},
				{ value: "telno", text: "연락처"}
			];
			
			 $("#searchType").kendoDropDownList({
					optionLabel: '전체',
					dataTextField: "text",
					dataValueField: "value",
					dataSource: searchType,
					value: "value"
    		});

		},
		
		// 개별 수신자 목록 선택 시 이벤트
		indivChange: function(e) {
			var grid = e.sender;
			var selectedRows = grid.select();
			var table = selectedRows.closest('table');
			
			user_sn = grid.selectedKeyNames();
			console.log(user_sn);
			
			var maximumRow = 50;
			$('thead input[type="checkbox"]').off('change').on('change', function(event) {
	                if ($(this).is(':checked')) {
						table.find('tr').addClass('select')
						if(user_sn.length>maximumRow){
							alert("최대 50건 선택 가능합니다.")
							$('.indivSelec_lists').find('thead input[type="checkbox"]').prop('checked', false);
							var totalRows = table.find('tr').length;
							var del = user_sn.length - maximumRow;
							var delRowIndex = totalRows-del;
							var start = delRowIndex;
							var end = delRowIndex+del;
							
							for (var i = start; i < end; i++) {
							   var delRow = table.find('tr').eq(i);
							   table.find('tr').eq(i).removeClass('k-selected');
							   table.find('tr').eq(i).removeClass('select');
							   table.find('tr').eq(i).find("input[type='checkbox']").prop("checked", false);
								var dataItem = grid.dataItem(delRow);
								if (dataItem) {
								    grid.clearSelection(); // 선택 상태 초기화
								    grid.select(grid.table.find('tr.select'));
								}
							}
							user_sn = grid.selectedKeyNames();
							console.log(user_sn);
							var totalReciverCnt = 0;
							console.log(totalReciverCnt);
							$('#totalRowCnt').text(totalReciverCnt);
						}
	                } else {
						table.find('tr').removeClass('select');
						var totalReciverCnt = user_sn.length;
						$('#totalRowCnt').text(totalReciverCnt);
	                }
					$('tbody input[type="checkbox"]').trigger('change');
	            });

				$('tbody input[type="checkbox"]').off('change').on('change', function(event) {
					var receiverListRn =[];
					$('.indivReceiver_lists .inc_receiver_list').each(function() {
					        var value = $(this).attr('id');
							receiverListRn.push(value);
					});
					var tr = $(this).closest('tr');
	                if ($(this).is(':checked')) {
						$(this).closest('tr').addClass('select')
						if(user_sn.length>maximumRow){
							alert("최대 50건 선택 가능합니다.")
							$('.indivSelec_lists').find('thead input[type="checkbox"]').prop('checked', false);
							
							tr.removeClass('k-selected');
							tr.removeClass('select');
							tr.find("input[type='checkbox']").prop("checked", false);
							var dataItem = grid.dataItem(tr);
							if (dataItem) {
								    grid.clearSelection(); 
								    grid.select(grid.table.find('tr.select'));
								}
							user_sn = grid.selectedKeyNames();
							console.log(user_sn);
							var totalReciverCnt = user_sn.length;
							$('#totalRowCnt').text(totalReciverCnt);
						}else{
							var tr = $(this).closest('tr');
		                    var secondTd = tr.find('td').eq(1); 
		                    var thirdTd = tr.find('td').eq(2); 
		                    var fourthTd = tr.find('td').eq(3); 
							var coRn = secondTd.text();
							var pCoNm = $('<p>', { class: 'com_nm', text: thirdTd.text() });
							var pCotel = $('<p>', { class: 'com_tel', text: fourthTd.text() });
							var divincReceiverList = $('<div>', { class: 'inc_receiver_list', id: coRn}).append(pCoNm, pCotel);
							
							receiverListRn.forEach(function(rn){
								if(rn==coRn){
									var removeDiv='#'+rn;
									$(removeDiv).remove();
								}
							});
							$('.indivReceiver_lists').append(divincReceiverList);
							$('.indivReceiver_lists').scrollTop($('.indivReceiver_lists')[0].scrollHeight);
							var totalReciverCnt = user_sn.length;
							$('#totalRowCnt').text(totalReciverCnt);
						}
	                }else{
						tr.removeClass('select');
						var unchecked = tr.find('td').eq(1);
						var unchk = '#' + unchecked.text(); 
						$(unchk).remove();
						var totalReciverCnt = user_sn.length;
						$('#totalRowCnt').text(totalReciverCnt);
					}
	            });
								

//			var grid = e.sender;
//    		var selectedRows = grid.select();
//			if (selectedRows.length > 9) {
//				var tr = selectedRows.closest('tr');
//            	var secondTd = tr.find('td').eq(1); 
//				var coRn = secondTd.text();
//				console.log(coRn);
//				var lastSelectedRow = selectedRows.last();
//                lastSelectedRow.removeClass("k-selected");
//				lastSelectedRow.find("input[type='checkbox']").prop("checked", false);
//                alert("50명까지 선택 가능합니다."); 
//            }else{
//				user_sn = grid.selectedKeyNames();
//				console.log(user_sn);
//				var receiverListRn =[];
//				$('.indivReceiver_lists .inc_receiver_list').each(function() {
//			        var value = $(this).attr('id');
//					receiverListRn.push(value);
//				});
//				$('thead input[type="checkbox"]').off('change').on('change', function(event) {
//	                $('tbody input[type="checkbox"]').trigger('change');
//	            });
//				$('tbody input[type="checkbox"]').off('change').on('change', function(event) {
//	                if ($(this).is(':checked')) {
//	                    var tr = $(this).closest('tr');
//	                    var secondTd = tr.find('td').eq(1); 
//	                    var thirdTd = tr.find('td').eq(2); 
//	                    var fourthTd = tr.find('td').eq(3); 
//						var coRn = secondTd.text();
//						var pCoNm = $('<p>', { class: 'com_nm', text: thirdTd.text() });
//						var pCotel = $('<p>', { class: 'com_tel', text: fourthTd.text() });
//						var divincReceiverList = $('<div>', { class: 'inc_receiver_list', id: coRn}).append(pCoNm, pCotel);
//						
//						receiverListRn.forEach(function(rn){
//							if(rn==coRn){
//								var removeDiv='#'+rn;
//								$(removeDiv).remove();
//							}
//						});
//						$('.indivReceiver_lists').append(divincReceiverList);
//						$('.indivReceiver_lists').scrollTop($('.indivReceiver_lists')[0].scrollHeight);
//	                }else{
//						var tr = $(this).closest('tr');
//						var unchecked = tr.find('td').eq(1);
//						var unchk = '#' + unchecked.text(); 
//						$(unchk).remove();
//					}
//	            });
//	
//			}
			
        },
		
		// 발송 이력 그리드
		smsSendInfo: function(){
			$("#smsSendGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/sys/smsSend/selectSmsSendInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options){
							var sd = $("#start-picker01").val();
							var ed = $("#end-picker01").val();
							var startDt = sd.replace(/-/g, "");
							var endDt = ed.replace(/-/g, "");
							options.dateType = $("#dateType").val();
							options.startDt = startDt;
							options.endDt = endDt;
							options.sendType = $("#sendType").val();
							options.searchType = $("#searchType").val();
							options.searchWrd = $("#searchWrd").val();
							
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true,
				},
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "rn", title: "순번", width: "50px", template: "#:rn #", sortable: false },
					{ field: "cn", title: "내용", width: "100px", template: "#= cn != null ? cn : '-' #", sortable: true },
					{ field: "sndng_dt", title: "발송요청일", width: "100px", template: "#= sndng_dt != null ? sndng_dt : '-' #", sortable: true },
					{ field: "sndng_rsvt_dt", title: "발송일", width: "100px", template: "#= sndng_rsvt_dt != null ? sndng_rsvt_dt : '-' #", sortable: true },
					{ field: "rcvr", title: "수신자명", width: "100px", template: "#= rcvr != null ? rcvr : '-' #", sortable: true },
					{ field: "rcvr_telno", title: "연락처", width: "100px", template: "#= rcvr_telno != null ? rcvr_telno : '-' #", sortable: true },
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				change: $smsSend.ui.rowClickEvent
			})
		},
		
		// row 상세팝업
		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var dataItem = null;
	
			rows.each(function(e) {
				var grid = $("#smsSendGrid").data("kendoGrid");
				dataItem = grid.dataItem(this);
			});
			$smsSend.event.detailInfoPopup(dataItem);
		 	//$(".viewMsg_popup").addClass("view");
			//$("body").css("overflow", "hidden");
			
		},

		// 개별 수신자 목록 그리드
		receiverListGrid: function(){
			var grid  = $("#receiverListGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/sys/smsSend/selectReceiverList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options){
							
							var sd = $("#searchCtpvNm").val();
							var sgg = $("#searchSggNm").val();
							options.cmptnc_zone_cd = sd+sgg;
							options.authrt_cd = $("#searchAuthrtCd").val();
							options.stts_cd = $("#searchSttsCd").val();
							options.search_other_condition = $("#searchOtherCondition").val();
							options.search_wrd = $("#searchBox").val();
							options.receiver_except_tel = $('#receiver_except_tel').data('value');
							
							return JSON.stringify(options);
						}
					},
					schema: {
						model: {
                            id: "user_sn"
                        },
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true,
				},
				navigatable: true,
				persistSelection: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ selectable: true, width: "50px"},
					{ field: "rn", title: "순번", width: "50px", template: "#:rn #"},
					{ field: "co_nm", title: "회사명", width: "150px", template: "#= co_nm != null ? co_nm : '-' #"},
					{ field: "telno", title: "연락처", width: "150px", template: "#= telno != null ? telno : '-' #"},
					{ field: "user_nm", title: "성명", width: "100px", template: "#= user_nm != null ? user_nm : '-' #" },
					{ field: "stts_cd", title: "계정상태", width: "70px", template: "#= stts_cd != null ? stts_cd : '-' #"},
					{ field: "api", title: "API 사용여부", width: "70px", template: "#: api #"},
					{ field: "authrt_nm", title: "권한명", width: "100px", template: "#= authrt_nm != null ? authrt_nm : '-' #" },
					{ field: "user_id", title: "아이디", width: "100px", template: "#= user_id != null ? user_id : '-' #"},
				],
				scrollable: true,
				editable: false,
				resizable: true,
				change: function(e){ 
					$smsSend.ui.indivChange(e)
				},
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
			}).data("kendoGrid");
			
			return grid;
		},
		
		
		// 그룹 발송전 확인 그리드
		groupReceiverList: function(){
			$("#receiver_grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/sys/smsSend/selectGroupReceiverList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options){
							options.except_tel = JSON.stringify($("#except_tel").is(':checked'));
							options.auth_01 = JSON.stringify($('#auth_01').is(':checked'));
							options.auth_02 = JSON.stringify($("#auth_02").is(':checked'));
							options.auth_03 = JSON.stringify($("#auth_03").is(':checked'));
							options.auth_04 = JSON.stringify($("#auth_04").is(':checked'));
							options.crno = $('#inc_selec_01').data('value');
							
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true,
				},
				navigatable: true,
				persistSelection: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "rn", title: "순번", width: "50px", template: "#:rn #"},
					{ field: "co_nm", title: "회사명", width: "150px", template: "#= co_nm != null ? co_nm : '-' #"},
				],
				scrollable: true,
				editable: false,
				resizable: true,
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
			})
			
		},
		
		// 개별 발송전 확인 그리드
		indivReceiverList: function(){
			$("#receiver_grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/sys/smsSend/selectIndivReceiverList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options){
							options.user_sn = user_sn;
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true,
				},
				navigatable: true,
				persistSelection: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "rn", title: "순번", width: "50px", template: "#:rn #"},
					{ field: "co_nm", title: "회사명", width: "150px", template: "#= co_nm != null ? co_nm : '-' #"},
				],
				scrollable: true,
				editable: false,
				resizable: true,
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
			})
			
		},
		
		// 법인별 수신자목록 리스트
		incReceiverList: function(){
			$('.inc_receiver_lists div').remove();
			//$('#inc_selec_01').data('value', '');
			var parameterMap={
						except_tel : JSON.stringify($("#except_tel").is(':checked')),
						auth_01 : JSON.stringify($('#auth_01').is(':checked')),
						auth_02 : JSON.stringify($("#auth_02").is(':checked')),
						auth_03 : JSON.stringify($("#auth_03").is(':checked')),
						auth_04 : JSON.stringify($("#auth_04").is(':checked')),
						crno : $('#inc_selec_01').data('value')
			};
			ajax(true, contextPath+'/sys/smsSend/selectGroupReceiverList', 'body', '처리중입니다.', parameterMap, function (data) {
				if($("#inc_selec_01").val() != ""){
					data.data.forEach(function(y){
						var co_rn = y.rn;
						var co_nm = y.co_nm;
						var co_tel = y.telno;
						var pCoNm = $('<p>', { class: 'com_nm', text: co_nm });
						var pCotel = $('<p>', { class: 'com_tel', text: co_tel });
						var inc_receiver_lists = $('<div>', { class: 'inc_receiver_list', id: co_rn}).append(pCoNm, pCotel);
						$('.inc_receiver_lists').append(inc_receiver_lists);
					})
				}
				
			})
		},
		
		
	};
	
	//이벤트 정의
	$smsSend.event = {
		
		// 켄도데이트타임 시간 설정
		sendDateSet: function() {
	        var currentDate = new Date();
	
	        var currentMinutes = currentDate.getMinutes();
	        var roundedMinutes = Math.ceil(currentMinutes / 30) * 30;
	        currentDate.setMinutes(roundedMinutes);
	        currentDate.setSeconds(0); // 초를 0으로 설정
	
			return currentDate;
   		 },

		parseKendoDateTime: function(dateTimeStr) {
		    // 예시: "2024-07-16 오전 09:00"
		    var parts = dateTimeStr.split(' '); // 공백을 기준으로 분리
		
		    // 날짜 부분을 나누어서 가져옴
		    var dateParts = parts[0].split('-');
		    var year = parseInt(dateParts[0], 10);
		    var month = parseInt(dateParts[1], 10) - 1; // 월은 0부터 시작하므로 -1
		    var day = parseInt(dateParts[2], 10);
		
		    // 시간 부분을 나누어서 가져옴
		    var timeParts = parts[2].split(':');
		    var hour = parseInt(timeParts[0], 10);
		    var minute = parseInt(timeParts[1], 10);
		
		    // 오전/오후 구분
		    if (parts[1] === '오후' && hour !== 12) {
		        hour += 12;
		    } else if (parts[1] === '오전' && hour === 12) {
		        hour = 0;
		    }
		
		    // Date 객체 생성
		    var date = new Date(year, month, day, hour, minute);
		    return date;
		},

		excelDownBtn: function() {
			var totalRowCount = $("#smsSendGrid").data("kendoGrid").dataSource.total();
			if(totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
			} else {
				if(Object.keys(excelDownArc).length === 0) {
					var sd = $("#start-picker01").val();
					var ed = $("#end-picker01").val();
					var startDt = sd.replace(/-/g, "");
					var endDt = ed.replace(/-/g, "");
					excelDownArc.dateType = $("#dateType").val();
					excelDownArc.startDt = startDt;
					excelDownArc.endDt = endDt;
					excelDownArc.sendType = $("#sendType").val();
					excelDownArc.searchType = $("#searchType").val();
					excelDownArc.searchWrd = $("#searchWrd").val();
				}
				excelDown("/sys/smsSend/excelDown", excelDownArc, "smsSendInfo", totalRowCount);
			}
        },

		setUIEvent: function() {
			
			// 그룹별 작동
			$('input[name="selec_target"]').on('change', function() {
                if (this.id === 'all') {
                	$('.auth_box, .inc_box').removeClass('show');
                } else if (this.id === 'auth') {
                	$('.auth_box').addClass('show');
                	$('.inc_box').removeClass('show');
                } else if (this.id === 'inc') {
               	 	$('.auth_box').removeClass('show');
                	$('.inc_box').addClass('show');
                }
            });

			// 등록 팝업 X, 닫기 버튼
			$("#close, .cancel_btn").on("click", function() {
				location.reload();
        	});
	
			// 전체, 권한별, 법인별 체크시 초기화
			$('#all, #auth, #inc').change(function() {
				if($('#inc_selec_01').data('value')){
					$('#inc_selec_01').data('value', '');
				}
		        $('.group_reciever_detail input').each(function() {
		            var type = $(this).attr('type');
		            if (type === 'checkbox' || type === 'radio') {
		                $(this).prop('checked', false);
		            } 
		        });
			});
			
			// 전체, 권한별 초기화 
		    $('#all, #auth').change(function() {
				$("#inc_selec_01").val('');
				$('.inc_receiver_lists div').remove();
		    });

			
			// 그룹 유선 번호 제외
			$("#except_tel").on("change", function() {
				$smsSend.ui.incReceiverList();
			});
			
//			$("#inc_selec_01").on("change", function() {
//				$('.inc_receiver_lists div').remove();
//				var parameterMap={
//							except_tel : JSON.stringify($("#except_tel").is(':checked')),
//							auth_01 : JSON.stringify($('#auth_01').is(':checked')),
//							auth_02 : JSON.stringify($("#auth_02").is(':checked')),
//							auth_03 : JSON.stringify($("#auth_03").is(':checked')),
//							auth_04 : JSON.stringify($("#auth_04").is(':checked')),
//							crno : $('#inc_selec_01').data('value')
//				};
//				if($("#inc_selec_01").val()!=''){
//					ajax(true, contextPath+'/sys/smsSend/selectGroupReceiverList', 'body', '처리중입니다.', parameterMap, function (data) {
//						data.data.forEach(function(y){
//								var co_rn = y.rn;
//								var co_nm = y.co_nm;
//								var co_tel = y.telno;
//								var pCoNm = $('<p>', { class: 'com_nm', text: co_nm });
//								var pCotel = $('<p>', { class: 'com_tel', text: co_tel });
//								var inc_receiver_lists = $('<div>', { class: 'inc_receiver_list', id: co_rn}).append(pCoNm, pCotel);
//								$('.inc_receiver_lists').append(inc_receiver_lists);
//							}
//								
//						)
//					})
//				}
//			});
			
			// 개별 유선번호 제외
			$("#receiver_except_tel").on("click", function() {
				var checked = $('#receiver_except_tel').is(':checked');
				if(checked){
					$('#receiver_except_tel').data('value', 'true');
				}else{
					$('#receiver_except_tel').data('value', 'false');
				}
        	});

			// 발송 이력 발송하기 버튼	
			$(".send_btn").on("click",function(){
					$("#send").addClass("view");
			});
			
			// 발송이력 조회 버튼
			$(".searchBtn").on("click",function(){
				var start = new Date($("#start-picker01").val());
				var end = new Date($("#end-picker01").val());
				if(end > new Date(new Date(start).setMonth(start.getMonth() + 1))){
					alert("한 달 이상으로 선택할 수 없습니다.");
					$('#start-picker01').data("kendoDatePicker").value(new Date(new Date(end).setMonth(end.getMonth() - 1)));
					return;
				}
				if(new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())){
					alert("시작일은 종료일보다 늦을 수 없습니다.");
					$('#end-picker01').data("kendoDatePicker").value(new Date($('#start-picker01').val()));
					return;
				}
				$smsSend.event.sendListSearch();
			});
			
			// 재전송 클릭
			$("#resendMsg").on("click",function(){
				var detail_msg = $('#detail_msg').text();
				$('#msg_val').text(detail_msg);
				$('#send').addClass("view");
			});
			
			// 개별 수신자 검색 버튼
			$("#receiverSearchBtn").on("click", function() {
				var searchReq3 = $("#searchOtherCondition").val();
				var searchReq4 = $("#searchBox").val();
				
				if(searchReq3 == '' && searchReq4 != '') {
	                alert("검색조건을 선택해주세요");
	            }
	            else if(searchReq3 != '' && searchReq4 == '' ){
					alert("검색조건을 입력해주세요");
				}
				else{
					var grid = $("#receiverListGrid").data("kendoGrid");
	                if (grid) {
						$("#receiverListGrid_box").empty();
						$(".indivReceiver_lists").empty();
		                $('#receiverListGrid_box').append('<table id="receiverListGrid"></table>');
	                }
					var totalReciverCnt = 0;
					$('#totalRowCnt').text(totalReciverCnt);
					$smsSend.ui.receiverListGrid();
				}
				console.log(user_sn);
            });
			
		    $(".msg_send01 .close, .msg_send01 .cancel_btn").on("click",function(){
		  	    $(".msg_send01").removeClass("view");
		    });
		 	 
		    $(".msg_send02 .close, .msg_send02 .cancel_btn").on("click",function(){
		      $(".msg_send02").removeClass("view");
		    });

			// 발송 확인 클로즈, 취소 버튼
		    $(".chkSend_popup #final_close, .chkSend_popup .final_cancel_btn").on("click",function(){
		      $(".chkSend_popup").removeClass("view");
		    });

		  	// 문자 발송 팝업(개별)
		    $(".indivSelec_btn").on("click",function(){
			  var totalReciverCnt = 0;
			  $('#totalRowCnt').text(totalReciverCnt);
			  var indiv_msg_val = $('#msg_val').text();
			  $('#indiv_msg_val').text(indiv_msg_val);
			  //$smsSend.ui.receiverListGrid();
		      $(".msg_send02").addClass("view");
		      $(".msg_send01").removeClass("view");
		    });
		    
		    // 문자 조회 팝업
		    $(".viewMsg_popup .close, .viewMsg_popup .cancel_btn").on("click",function(){
		      $(".viewMsg_popup").removeClass("view");
		    });
		
		    // 데이트타임 피커
		    $("#msg_reserv_time").kendoDateTimePicker({
				min: $smsSend.event.sendDateSet(),
		        dateInput: true,
				value: new Date()
		    });
			
		    $(".k-datetimepicker #msg_reserv_time ~ .k-button:first").insertAfter($(".k-datetimepicker .k-button:last"));

		    $("#indivMsg_reserv_time").kendoDateTimePicker({
				min: $smsSend.event.sendDateSet(),
			    dateInput: true,
				value: new Date()
		      });

		    $(".k-datetimepicker #indivMsg_reserv_time ~ .k-button:first").insertAfter($(".k-datetimepicker .k-button:last"));
			
			// 그룹별 발송 버튼 클릭
			$("#sendMsg").on("click", function() {
				var msg = $('#msg_val').val();
				if(msg==''){
					alert('내용을 입력해주세요');
				}else{
					if (!$smsSend.event.validMsg(msg)) {
						alert('한글, 영문, 숫자, \n허용된 특수문자\n( !@%^*(),.?:;{}|_~+=-○●◎◇◆□■△▲▽▼◁◀▷▶ )\n를 입력해 주세요.')
					}else{
						if ($('.group_reciever #auth').is(':checked')) {
	                		$smsSend.event.authValid();
		            	}else if($('.group_reciever #inc').is(':checked')){
							$smsSend.event.incValid();
						}else{
							$(".chkSend_popup").addClass("view");
								var grid = $("#receiver_grid").data("kendoGrid");
				                if (grid) {
									$("#grid_box").empty();
					                $('#grid_box').append('<table id="receiver_grid"></table>');
			                }
							$smsSend.ui.groupReceiverList();
							$smsSend.event.groupSendCheck();
						}
					}
				}
			});
			
			// 개별 발송 버튼 클릭
			$("#sendIndivMsg").on("click", function() {
				var msg = $('#indiv_msg_val').val();
				if(msg==''){
					alert('내용을 입력해주세요.')
				}else{
					if (!$smsSend.event.validMsg(msg)) {
						alert('한글, 영문, 숫자, \n허용된 특수문자\n( !@%^*(),.?:;{}|_~+=-○●◎◇◆□■△▲▽▼◁◀▷▶ )\n를 입력해 주세요.')
					}else{
						var target = $('.indivReceiver_lists .inc_receiver_list').length;
			            if (target===0) {
			                alert('수신자를 선택해주세요.');
			            } else {
							 $(".chkSend_popup").addClass("view");
							var grid = $("#receiver_grid").data("kendoGrid");
			                if (grid) {
								$("#grid_box").empty();
				                $('#grid_box').append('<table id="receiver_grid"></table>');
			                }
							$smsSend.ui.indivReceiverList();
							//console.log(user_sn)
							$smsSend.event.indivSendCheck();
			            }
					}
				}
			});
			
			// 최종 발송 버튼 클릭
			$("#realSendMsg").on("click",function(){
				var now = new Date();
				var target = $('.chkSend_popup .k-grid-norecords').length;
				if ($('#send').hasClass('view')) {//그룹
					if(target===0){
						var kendoDate = $smsSend.event.parseKendoDateTime($('#msg_reserv_time').val());
						if (kendoDate > now) {
							$smsSend.event.groupReceiver();
						} else {
							alert("발송 희망 시각을 다시 설정해주세요.");
						}
					} else {
						alert('수신자가 없습니다.');
					}
					
				} else {// 개별
					var kendoDate = $smsSend.event.parseKendoDateTime($('#indivMsg_reserv_time').val());
					if (kendoDate > now) {
						$smsSend.event.indivReceiver();
					} else {
						alert("발송 희망 시각을 다시 설정해주세요.");
					}
				}
				
		    });

			$(".excelDownBtn").on("click", function() {
            	$smsSend.event.excelDownBtn();
        	});

			$("#inc_selec_01").on("change",function(){
				var target = $("#inc_selec_01").val();
				 if(target==''){
					$("#inc_selec_01").data('value', '데이터없음');
					$smsSend.ui.incReceiverList();
				}
			});
		},
		
		authValid: function() {
            var checkboxes = $('.box_lists input[type="checkbox"]');
            let checked = false;

            for (var checkbox of checkboxes) {
                if (checkbox.checked) {
                    checked = true;
                    break; 
                }
            }

            if (!checked) {
                alert('하나 이상의 권한을 선택해주세요.');
            } else {
				$(".chkSend_popup").addClass("view");
				var grid = $("#receiver_grid").data("kendoGrid");
                if (grid) {
					$("#grid_box").empty();
	                $('#grid_box').append('<table id="receiver_grid"></table>');
                }
                $smsSend.ui.groupReceiverList();
				$smsSend.event.groupSendCheck();
            }
        },

		incValid: function() {
            var target = $('.inc_receiver_lists .inc_receiver_list').length;
            if (target===0) {
                alert('법인을 선택해주세요.');
            } else {
				$(".chkSend_popup").addClass("view");
				var grid = $("#receiver_grid").data("kendoGrid");
                if (grid) {
					$("#grid_box").empty();
	                $('#grid_box').append('<table id="receiver_grid"></table>');
                }
                $smsSend.ui.groupReceiverList();
				$smsSend.event.groupSendCheck();
            }
        },
		
		validMsg: function(msg){
			var msg = msg.trim();
			var regex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9~`!@#%^&*()_+\-=\[\]{}:;'\"<>,.?/\\|※○●◎◇◆□■△▲▽▼◁◀▷▶\s*]+$/;
			return regex.test(msg); 
		},
		
		sendListSearch: function() {
			var searchReq3 = $("#searchType").val();
			var searchReq4 = $("#searchWrd").val();

			if(searchReq3 == '' && searchReq4 != '') {
                alert("검색조건을 선택해주세요");
            }
            else if(searchReq3 != '' && searchReq4 == '' ){
				alert("검색조건을 입력해주세요");
			}
			else{
				var sd = $("#start-picker01").val();
				var ed = $("#end-picker01").val();
				var startDt = sd.replace(/-/g, "");
				var endDt = ed.replace(/-/g, "");
				excelDownArc.dateType = $("#dateType").val();
				excelDownArc.startDt = startDt;
				excelDownArc.endDt = endDt;
				excelDownArc.sendType = $("#sendType").val();
				excelDownArc.searchType = $("#searchType").val();
				excelDownArc.searchWrd = $("#searchWrd").val();
					
				var grid = $('#smsSendGrid').data('kendoGrid');
	            grid.dataSource.page(1);
			}
        },
		
		// 재전송 팝업
		detailInfoPopup: function(dataItem) {
			$("#detail_send_date").text(dataItem.sndng_rsvt_dt);
			$("#detail_user_nm").text(dataItem.rcvr);
			$("#detail_msg").text(dataItem.cn);

			$(".viewMsg_popup").addClass("view");
		},
		
		// 그룹 발송 전 확인창
		groupSendCheck: function(){
			$("#check_msg").text($("#msg_val").val());
			var msg_reserv_time = $('#msg_reserv_time').val();
            if ($('#sendReservation').is(':checked')) {
				$("#check_send_date").text(msg_reserv_time);
            } else {
				$("#check_send_date").text("즉시 전송");
            }
		},
		
		// 개별 발송 전 확인창
		indivSendCheck: function(){
			$("#check_msg").text($("#indiv_msg_val").val());
			
			var msg_reserv_time = $('#indivMsg_reserv_time').val();
			if ($('#sendIndiviReservation').is(':checked')) {
				$("#check_send_date").text(msg_reserv_time);
            } else {
				$("#check_send_date").text("즉시 전송");
            }
		},
		
		// 그룹 발송
		groupReceiver: function(e) {
			var params = {};
			params.except_tel = JSON.stringify($("#except_tel").is(':checked'));
			params.auth_01 = JSON.stringify($('#auth_01').is(':checked'));
			params.auth_02 = JSON.stringify($('#auth_02').is(':checked'));
			params.auth_03 = JSON.stringify($('#auth_03').is(':checked'));
			params.auth_04 = JSON.stringify($('#auth_04').is(':checked'));
			params.crno = $('#inc_selec_01').data('value');
			return ajax(true, contextPath+'/sys/smsSend/selectGroupReceiverList', 'body', '확인중입니다.', params, function(data) {
				return $smsSend.event.insertSms(data);
			});

		},
		
		// 개별 발송
		indivReceiver: function(e) {
			var params = {};
			var sd = $("#searchCtpvNm").val();
			var sgg = $("#searchSggNm").val();
			params.cmptnc_zone_cd = sd+sgg;
			params.authrt_cd = $("#searchAuthrtCd").val();
			params.stts_cd = $("#searchSttsCd").val();
			params.search_other_condition = $("#searchOtherCondition").val();
			params.search_wrd = $("#searchBox").val();
			params.receiver_except_tel = $('#receiver_except_tel').data('value');
			
			return ajax(true, contextPath+'/sys/smsSend/selectReceiverList', 'body', '확인중입니다.', params, function(data) {
				return $smsSend.event.insertSms(data);
			});
			
			
			
		},
		
		// 발송 처리
		insertSms: function(data) {
			var params = {};
			var msg = $('#check_msg').text();
			var dest_info = '';
			var send_date = ''
			var dest_count = 0;
			var rcvr = [];
			var rcvr_telno = [];
			var sndng_rsvt_dt = '';
			if ($('#send').hasClass('view')) {
				var num = 0;
				$.each(data.data, function(index, item) {
					num++;
					dest_count = num;
						dest_info += item.user_nm+"^"+item.telno
						rcvr.push(item.user_nm)
						rcvr_telno.push(item.telno)
						if (index < data.data.length - 1) {
					        dest_info += "|";
					    }
				});
            } else {
					var num = 0;
					$.each(user_sn, function(x, y) {
						$.each(data.data, function(index, item) {
							if(item.user_sn==y){
								num++;
								dest_count = num;
								dest_info += item.user_nm+"^"+item.telno
								rcvr.push(item.user_nm)
								rcvr_telno.push(item.telno)
								if (num < user_sn.length) {
							        dest_info += "|";
							    }
							}
						});
					});
            }
			var msg_reserv_time = $('#check_send_date').text();
			if(msg_reserv_time!="즉시 전송"){

				// 날짜와 시간 분리
				var parts = msg_reserv_time.split(' ');
				var datePart = parts[0];
				var timePart = parts[2]; // '오전' 또는 '오후'는 고려하지 않음
				var amPm = parts[1];
				
				// 날짜 분리
				var dateComponents = datePart.split('-');
				var year = dateComponents[0];
				var month = dateComponents[1];
				var day = dateComponents[2];
				
				// 시간 분리
				var timeComponents = timePart.split(':');
				var hours = parseInt(timeComponents[0]);
				var minutes = timeComponents[1];
				var seconds = '00';
				
				// 오전/오후 변환
				if (amPm === '오후' && hours !== 12) {
				    hours += 12;
				} else if (amPm === '오전' && hours === 12) {
				    hours = 0;
				}
				
				// 시간을 두 자리 숫자로 변환
				hours = hours.toString().padStart(2, '0');
				
				sndng_rsvt_dt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
				send_date = year + month + day + hours + minutes + seconds;
				
			}
			
			params.dest_info = dest_info;
			params.send_date = send_date;
			params.msg = msg;
			params.dest_count = dest_count;
			params.rcvr = rcvr;
			params.rcvr_telno = rcvr_telno;
			params.sndng_rsvt_dt = sndng_rsvt_dt;
			
			
			
			console.log(params);
				
			ajax(true, contextPath + '/sys/smsSend/insertSendMsg', 'body', '처리중입니다.', params, function(data) {
				//alert(data + "건 전송 되었습니다.");
				//$('#trmnlNoticePop').data("kendoDialog").close();
				alert(data.message);
				location.reload();
			});
			
		},
	};
}(window, document, jQuery));