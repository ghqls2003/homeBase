/**
 * 고시대상차량조회 화면에 대한 클래스
 *
 * history : 네이버시스템(주), 1.0, 2020/03/30  초기 작성
 * author : 이우철
 * version : 1.0
 * see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
 *
 */ 

(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

	W.$main = W.$main || {};

	$(document).ready(function() {
		$main.ui.pageLoad();		//최초 페이지 로드 시
		$main.event.setUIEvent();
	});

	// jQuery custom function
	// 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
	// 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
	$main.ui = {
		/**
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시
		 * @date         : 2020. 03. 30. 
		 * @author	     : 이우철
		 */
	    pageLoad : function() {
	    	// 회사이름으로 검색 -> 차량명 검색으로 변경되면서 그리드 필요 없어짐
	    	/*
	    	ajaxExcludeCSRF(true, contextPath + '/mm/selectNtcnCmpnyList', 'body', '처리중입니다.', {}, function (data) {
		    	$("#cmbBizrno").kendoComboBox({
		            optionLabel: {
		            	cdNm: "전체",
		            	cdId: ""
		            },
		            autoWidth: true,
		            dataTextField: "cdNm",
		            dataValueField: "cdId",
		            dataSource: data,
		            filter: "contains",
                    suggest: true,
				});
	    	});
	    	*/
            $("#grid").kendoGrid({
			     autoBind: false,
			     height: 110,
                 dataSource: {
                     transport: {
                         read:{
                        	 url: contextPath + '/mm/selectNtcnCarList',
                             dataType: "json",
                             type: "POST",
                             contentType: "application/json; charset=utf-8"
                         },
                         parameterMap: function(options){
                             //options.bizrno = $('#cmbBizrno').val();
                        	 options.carRegNo = $('#txtCarRegNo').val();
                             return JSON.stringify(options);
                         }
                     },
                     schema: {
                         data: "data",
                         total: "total",
 						 model: {
 							fields: {
 								rnum		: { type: "string" },
 								cmpnyNm		: { type: "string" },
 								ntcnYn      : { type: "string" },
 								carRegNo	: { type: "string" }
 							}
 						}
                     },
                     page: 1,
 				     pageSize: 1,
 				     serverPaging: false,
 				     serverSorting:false,
                 },
 				navigatable : false,
                pageable: false,
				rowTemplate : kendo.template($("#rowTemplate").html()),
				noRecords: {
                    template: "2020년 고시차량에 해당하지 않습니다."
                },
				editable    : false,
				resizable   : true,
				selectable  : "row",
				sortable: {
                    mode: "multiple",
                    allowUnsort: true,
                    showIndexes: true
                },
                pagable     : false,
                columns: [
                	{
                        field: "rnum",
                        title: "행번호",
                        width: 50,
                        sortable: false
                    },
                    {
                        field: "carRegNo",
                        title: "차량번호",
                        width: 100,
                        sortable: false
                    },
                    {
                        field: "ntcnYn",
                        title: "대상여부",
                        width: 120,
                        sortable: false
                    },
                    {
                        field: "cmpnyNm",
                        title: "회사명",
                        width: 160,
                        sortable: false
                    },
                ]
             });

             $(window).resize(function(){
                 $("#grid").data("kendoGrid").resize();
             });

 		},
		
		/**
		 * @name         : search
		 * @description  : 데이터 조회
		 * @date         : 2020. 03. 30.  
		 * @author	     : 이우철
		 */
		search : function(param) {
			var grid = $('#grid').data('kendoGrid');
			$("#grid").data("kendoGrid").dataSource.read();
			//grid.dataSource.bind();
			/*
			var params = {};
			params.carRegNo = $("#txtCarRegNo").val();
			
			ajaxExcludeCSRF(true, contextPath + '/mm/selectNtcnCarList', 'body', '처리중입니다.', params, function (data) {

	    	});
			*/
		},
		
	};
	
	//이벤트 정의
	$main.event = {
		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2020. 03. 30. 
		 * @author	     : 이우철
		 */	
		setUIEvent : function() {
			// 검색버튼 클릭
			$("#btnSearch").on("click", $main.event.btnSearchClickHandler);
		},
		
		/**
		 * 
		 * @name         : btnSearchClickHandler
		 * @description  : 검색 버튼 클릭 이벤트 핸들러 
		 * @date         : 2020. 03. 30. 
		 * @author	     : 이우철
		 */	
		btnSearchClickHandler : function(e) { 
			$main.ui.search();
		},
	};
} (window, document, jQuery));