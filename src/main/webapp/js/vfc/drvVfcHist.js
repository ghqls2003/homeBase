/**
 * 확인이력조회
 *
 * history : 네이버시스템(주), 1.0, 2023/06/07  초기 작성
 * author : 이우철
 * version : 1.0
 * see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
 * 
 * history : 2024/11/19 리팩토링
 * modifier : 김경룡
 *
 */
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$drvfc = W.$drvfc || {};
    
    $(document).ready(function() {
       $drvfc.ui.pageLoad();      //최초 페이지 로드 시
       $drvfc.event.setUIEvent();
    });

	$drvfc.ui = {
		pageLoad : function() {
        	/* 날짜데이터 세팅 */
			// 날짜
			var weekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
			$("#start-picker01").kendoDatePicker({
        		format: "yyyy-MM-dd",
            	value:  new Date(weekAgo)
			});
        	$("#end-picker01").kendoDatePicker({
            	format: "yyyy-MM-dd",
            	value: new Date()
        	});
			// 시간
        	var setStrtTm = "00:00";
        	$("#start-timePicker01").kendoTimePicker({
	            value: setStrtTm,
            	interval: 10,
            	format: "HH:mm"
        	});
        	var setEndTm = "23:59";
        	$("#end-timePicker01").kendoTimePicker({
            	value: setEndTm,
            	interval: 10,
            	format: "HH:mm"
        	});
        	$("#start-picker01").attr("readonly", true);
        	$("#end-picker01").attr("readonly", true);
        	$("#start-timePicker01").attr("readonly", true);
        	$("#end-timePicker01").attr("readonly", true);
		
			// timePicker 달력 표시 제거
        	$('button.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button:eq(1),button.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button:eq(3)').removeClass("k-input-button");

			// 자격확인 드롭다운
        	var mthd = [{cd_id:'1', 'cd_nm':'직접입력'}, {cd_id:'2', 'cd_nm':'OCR'}, {cd_id:'3', 'cd_nm':'모바일면허증'}, {cd_id:'4', 'cd_nm':'API'}];
         	$('#searchMthd').kendoDropDownList({
				optionLabel: "확인방법 (전체)",
               	dataTextField: "cd_nm",
               	dataValueField: "cd_id",
               	dataSource: mthd
         	});
		
			// 확인결과 드롭다운
        	ajax(true, contextPath+'/vfc/drvVfcHist/ckResultsList.do', 'body', '처리중입니다.', {}, function (data) {
            	var ckResults = data.ckResults;
	            $('#ckResults').kendoDropDownList({
	               	optionLabel: "확인결과 (전체)",
	               	dataTextField: "cdNm",
	               	dataValueField: "cd",
	               	dataSource: ckResults,
	               	value : "cd"
				});
			});

			// 그리드 생성
			$drvfc.ui.kendoGridLoad();
		},

		dateFomat: function(data) {
			var date = new Date(data);
			return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
		},

		// 확인이력목록
		kendoGridLoad: function() {
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/vfc/drvVfcHist/listView.do',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap:function(options){
							var param = $drvfc.event.filter();
                            	options.vrfcMthd = param.vrfcMthd;
                            	options.bzmnSnKwd = param.bzmnSnKwd;
                            	options.startDtTm = param.startDtTm;
                            	options.endDtTm = param.endDtTm;
                            	options.rqstrNm = param.rqstrNm;
                            	options.cmpnyName = param.cmpnyName;
                            	options.codeType = param.codeType;
                            	options.cd = param.cd;
                            	return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total"
					},
					serverPaging: true
				},
				columns: [
					{ field: "sn",          title: "순번",         width: "65px",  template: "#=sn #" },
					{ field: "dln",         title: "면허번호",     width: "160px", template: "#= dln != null ? dln : '-' #"},
					{ field: "lcnsType",    title: "면허종별",     width: "80px",  template: "#= lcnsType != null ? lcnsType : '-' #"},
					{ field: "vrfcDmndDt",  title: "확인요청일시", width: "150px", template: "#= vrfcDmndDt != null ? $drvfc.ui.dateFomat(vrfcDmndDt) : '-' #"},
					{ field: "vrfcMthd",    title: "확인방법",     width: "120px", template: "#= vrfcMthd != null ? vrfcMthd : '-' #"},
					{ field: "resNm",       title: "확인결과",     width: "150px", template: "#= verifyNm != null ? verifyNm : '-' #"},
					{ field: "rqstrNm",     title: "요청자",       width: "150px", template: "#= rqstrNm != null ? rqstrNm : '-' #"},
					{ field: "coNm",        title: "소속사업자명",   width: "150px", template: "#= coNm != null ? coNm : '-' #"}
				],
				dataBound: function(){
					var formatTotal = FormatNumber(this.dataSource.total());
                	$('#totalRowCnt').text(formatTotal);
            	},
            	navigatable: true,
            	pageable: {
					pageSize: 10,
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row",
			});
		},

		// 엑셀다운로드
		excelDown: function() {
			var fileNm = 'drvVfcHist'
            var params = {};
            var data = $drvfc.event.filter();
            var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();
            if(totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
            } else {
				params.vrfcMthd = data.vrfcMthd;
                params.bzmnSnKwd = data.bzmnSnKwd;
                params.startDtTm = data.startDtTm;
                params.endDtTm = data.endDtTm;
                params.rqstrNm = data.rqstrNm;
                params.cmpnyName = data.cmpnyName;
                params.cd = data.cd;
                params.codeType = data.codeType;
            }
			excelDown("/vfc/drvVfcHist/excelBySelectInfo", params, fileNm, totalRowCount);
		}
    };

	//이벤트 정의
	$drvfc.event = {
		// 조회 버튼 클릭 핸들러
        setUIEvent : function() {
			$(window).on('resize', $drvfc.event.resizeGrid);
			$('#btnSearch').on('click', $drvfc.event.btnApplyClickHandler);

            // 엑셀다운로드버튼
            $(".excelDownBtn").on("click", function() {
				$drvfc.ui.excelDown();
            });

            $("#searchOwn").on('keydown', function(e) {
                if (e.key === 'Enter') {
					$drvfc.event.btnApplyClickHandler();
				}
            });
            $("#searchCoNm").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $drvfc.event.btnApplyClickHandler();
                }
            });

            $("#rqstrNm").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $drvfc.event.btnApplyClickHandler();
                }
            });
            $("#cmpnyName").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $drvfc.event.btnApplyClickHandler();
                }
            });
        },

        filter: function() {
            var param = {}
            var startDt =  $("#start-picker01").val();
            var endDt = $("#end-picker01").val();
            var startTime = $("#start-timePicker01").val();
            var endTime = $("#end-timePicker01").val();
            var endDtTm = endDt +" "+ endTime+":59";
            var startDtTm = startDt +" "+ startTime+":00";
            var rqstrNm =  $("#rqstrNm").val();
            var cmpnyName =  $("#cmpnyName").val();
            //예 cd = "verify_cd_test"
            var ckResults = $("#ckResults").val();
            var parts = ckResults.split("_");
            var codeType = parts[0];
            var cd = parts[parts.length - 1]; // "99"
            param.vrfcMthd = $("#searchMthd").val();
            param.bzmnSnKwd = $("#searchCoNm").val();
            param.startDtTm = startDtTm;
            param.endDtTm = endDtTm;
            param.rqstrNm = rqstrNm;
            param.cmpnyName = cmpnyName;
            param.codeType = codeType;
            param.cd = cd;
            return param;
        },

        resizeGrid : function() {
			$("#grid").data("kendoGrid").resize();
		},

		// 검색 조회
		btnApplyClickHandler : function(e) {
			var param = $drvfc.event.filter();
			var start = new Date($("#start-picker01").val());
            var end = new Date($("#end-picker01").val());
            
			if(new Date($("#end-picker01").val()) > new Date(new Date(start).setDate(start.getDate() + 7))){  // 최대 7일 제한
                 alert("7일 이상 으로 선택할 수 없습니다.");
                 $('#end-picker01').data("kendoDatePicker").value(new Date(start.setDate(start.getDate() + 7)));
            } else if(new Date(param.startDtTm) > new Date(param.endDtTm)){  // 종료일 역치 제한
              alert("종료일시가 시작일시보다 빠를 수 없습니다.");
               $("#start-picker01").data("kendoDatePicker").value(new Date(end));
               $("#start-timePicker01").data("kendoTimePicker").value($("#end-timePicker01").val())
            } else {
	            var grid = $('#grid').data('kendoGrid');
	            grid.dataSource.page(1);
			}
		}
    };

}(window, document, jQuery));