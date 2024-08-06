
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$file = W.$file || {};



    $(document).ready(function() {
       $file.ui.pageLoad();		//최초 페이지 로드 시
       $file.event.setUIEvent();

    });

    // jQuery custom function
    // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
    // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭

   $file.ui = {

         // 최초 페이지 로드 시 UI에 적용
        pageLoad : function() {
        	// 조회조건
			//날짜데이터 세팅
			var nowYear = new Date().getFullYear();
			var nowMonth = new Date().getMonth();
			var nowDate = new Date().getDate();


			var oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));

			$("#start-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(oneMonthAgo),
				change: function() {
					var start = new Date($("#start-picker01").val());
					var end = new Date($("#end-picker01").val());
				}
			});

            $("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(nowYear, nowMonth, nowDate),
			});

            // 컬럼값 클립보드 복사
			$(document).on('click', '.copy-key', function() {
				var keyToCopy = $(this).data('key');
                var tempInput = $("<input>");
                $("body").append(tempInput);
                tempInput.val(keyToCopy).select();
				document.execCommand("copy");
				tempInput.remove();

				alert(keyToCopy + "\n"+"복사되었습니다.");
			});


			var fileEncryYn = [{cd_id:'N', 'cd_nm':'비암호화 파일'}, {cd_id:'E', 'cd_nm':'암호화 파일'},{cd_id:'NE', 'cd_nm':'전체'}];


			$('#fileEncryYn').kendoDropDownList({
	            optionLabel: "비암호화 파일",
	            dataTextField: "cd_nm",
	            dataValueField: "cd_id",
	            dataSource: fileEncryYn,
				value : "cd_id"
			});



			// 그리드 생성
            $file.ui.kendoGridLoad();
		},

		// 데이터 조회
		search : function(param) {
    		var grid = $('#file_grid').data('kendoGrid');
    		 grid.dataSource.read();
		},

		// 시간 포맷 (공통 js 에 있는지 찾아보고 있으면 공통꺼 사용할 것)
		dateFomat: function(data) {
			var date = new Date(data);
			return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
		},

		// 확인이력목록
		kendoGridLoad: function() {
			var page = 1;
            var pageSize = 10;

			$("#file_grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/file/selectNomalFileList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap:function(options){
                            var param = $file.event.filter();
                            options.startDt = param.startDt;
                            options.endDt = param.endDt;
                            options.fileEncryYn = param.fileEncryYn;
                            options.actlFlnm = param.actlFlnm;
							return JSON.stringify(options);

						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					page: 1,
					pageSize: 10,
					serverPaging: true,
					serverSorting:false,
					autoBind: false,
				},
				scrollable:true,
				columns: [
					{ field: "rn",  title: "순번", width: "50px",  template: "#=rn #" },
					{
					  field: "actlFileNm", title: "실제파일명", width: "370px",
                      template: function(dataItem) {
                                return "<span class='cell-popup copy-key' data-key='" + dataItem.actlFileNm + "'>" + dataItem.actlFileNm + "</span>";
                      }
					},
					{
                      field: "atchFileNm", title: "첨부파일명", width: "190px",
                      template: function(dataItem) {
                                return "<span class='cell-popup copy-key' data-key='" + dataItem.atchFileNm + "'>" + dataItem.atchFileNm + "</span>";
                      }
					},
					{ field: "atchFileSz",  title: "첨부파일크기", width: "80px",
					   template: "#= atchFileSz != null ? atchFileSz : '-' #" },
					{
					  field: "atchFilePath",  title: "첨부파일경로", width: "150px",
                      template: function(dataItem) {
                                 return "<span class='cell-popup copy-key' data-key='" + dataItem.atchFilePath + "'>" + dataItem.atchFilePath + "</span>";
                      }
					},
					{ field: "regDt", title: "등록일시", width: "100px", template: "#= regDt != null ? regDt : '-' #"},
					{ field: "regIp",  title: "등록IP", width: "100px", template: "#= regIp != null ? regIp : '-' #"},
					{ field: "rgtrId",  title: "등록ID", width: "90px", template: "#= rgtrId != null ? rgtrId : '-' #"},
					{
                        field: "encryptYn",title: "파일첨부",width: "50px",
                        template: function(data) {
                            if (data.encryptYn) {
                                return '<div class = "detailFileIco" >'+
                                         '<img style="margin-inline: auto;" className="fileIco" src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>'+
                                       '</div>'
                            } else {
                                return '파일없음';
                            }
                        }
					},
					{ field: "fileSn", title: "파일일련번호", width: "100px",hidden:true},
				],
				navigatable: true,
				pageable: {
					pageSizes: [10, 20, 50, 100],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row",
//				change: $file.ui.rowClickEvent
				dataBound: $file.ui.attachmentEvent
			});

		},

		attachmentEvent : function(e){
			$('.detailFileIco').click(function(){
				var grid = $('#file_grid').data("kendoGrid");
				var dataItem = grid.dataItem($(this).closest("tr"));
				var data = dataItem;
				var selectedFileInfo = {};   // 다운로드 할 파일 정보

				selectedFileInfo.encryptYn = data.encryptYn;
				selectedFileInfo.atchFileSn = data.fileSn;
				selectedFileInfo.atchFileNm = data.atchFileNm;
				$file.event.fileDownloadEvent(selectedFileInfo);
			});
		},



		// 엑셀다운로드
		excelDown: function() {
			var fileNm = 'fileManage'
	        var params = {};
	        var data = $file.event.filter();
			var totalRowCount = $("#file_grid").data("kendoGrid").dataSource.total();
           	if(totalRowCount == 0) {
           		alert("데이터가 존재하지 않습니다.");
           	}else{
                params.startDt = data.startDt;
                params.endDt = data.endDt;
                params.fileEncryYn = data.fileEncryYn;
                params.actlFlnm = data.actlFlnm;
           	}
			excelDown("/sys/file/excelBySelectInfo", params, fileNm, totalRowCount);
		}

    };

    //이벤트 정의
   $file.event = {


        // 조회 버튼 클릭 핸들러
        setUIEvent : function() {
        	$(window).on('resize', $file.event.resizeGrid);
        	$('#btnSearch').on('click', function(e) {
					$file.event.btnApplyClickHandler();
              });

        	// 엑셀다운로드버튼
			$(".excelDownBtn").on("click", function() {
				$file.ui.excelDown();
			});

			$("#actlFlnm").on('keydown', function(e) {
				if (e.key === 'Enter') {
					$file.event.btnApplyClickHandler();
				}
        	});
//
        },

        filter: function() {
            var param = {}

            param.startDt = $("#start-picker01").val();
            param.endDt = $("#end-picker01").val();
            param.fileEncryYn = $("#fileEncryYn").val();
            var actlFlnm =  $("#actlFlnm").val();
            // 유효성 검사
            actlFlnm = actlFlnm.replace(/^[^0-9ㄱ-힣a-zA-Z().,_-]+|[^0-9ㄱ-힣a-zA-Z().,_-\s]+/g, '');
			actlFlnm = actlFlnm.trim();
			param.actlFlnm = actlFlnm;
            return param;
        },

        resizeGrid : function() {
			$("#grid").data("kendoGrid").resize();
		},

		btnApplyClickHandler : function(e) {
            var start = new Date($("#start-picker01").val());
            var end = new Date($("#end-picker01").val());

            if(end > new Date(new Date(start).setMonth(start.getMonth() + 1))){
                alert("한 달 이상으로 선택할 수 없습니다.");
                $('#end-picker01').data("kendoDatePicker").value(new Date(new Date(start).setMonth(start.getMonth() + 1)));
			}

            if(new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())){
              alert("시작일은 종료일보다 늦을 수 없습니다.\n종료일은 시작일보다 빠를 수 없습니다.");
               $('#start-picker01').data("kendoDatePicker").value(new Date($('#end-picker01').val()));
            }

			var param = fn_getFormData($("#searchForm"));

			$file.ui.search(param);
		},

		// 파일 다운로드
		fileDownloadEvent : function(selectedFileInfo){
		    var atchFileNm = selectedFileInfo.atchFileNm;
		    var atchFileSn = selectedFileInfo.atchFileSn;
		    var encryptYn = selectedFileInfo.encryptYn;


	        if(encryptYn ==='N'){
	         	fileDownloadget(atchFileSn,atchFileNm);
			}else if(encryptYn ==='E'){
				decryptFileDownload(atchFileSn, atchFileNm);
			}//파일이 없는 경우
			 else{
				$(".detailFileIco").off('mouseenter mouseleave');
				$(".detailFileIco").css("cursor", "default");
			}
	},


    };

}(window, document, jQuery));