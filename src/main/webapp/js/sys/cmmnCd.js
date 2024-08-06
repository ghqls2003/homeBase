(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$code = W.$code || {};

    $(document).ready(function() {
       $code.ui.pageLoad();		//최초 페이지 로드 시
       $code.event.setUIEvent();
    });

	$code.ui = {
		pageLoad : function() {
			$code.ui.kendoGrid();

			$("#searchCol").kendoDropDownList({
				dataSource: {
					data: [
						{name: "코드", value: "cd"},
						{name: "코드명", value: "cdNm"},
					 	{name: "그룹코드", value: "cdGroup"},
						{name: "그룹명", value: "cdGroupNm"}
					]
				},
				optionLabel: "검색조건(선택)",
		        dataTextField: "name",
		        dataValueField: "value"
			});

			$(".useYn").kendoDropDownList({
				dataSource: {
					data: ["Y", "N"]
				},
				optionLabel: "사용여부(전체)"
			});

			ajax(false, contextPath+'/sys/cmmnCd/selectCdGroupNm', 'body', '처리중입니다.', {}, function (data) {
				$(".cdGroupNm").kendoDropDownList({
		            dataTextField: "cd_group_nm",
		            dataValueField: "cd_group",
					optionLabel: "그룹명(선택)",
		            dataSource: data,
					change: function(e) {
						if(e.sender.element[0].id == "cdGroupNm"){
							$('#cdGroup').val($("#cdGroupNm").val());
							$('#sortOrdr').val(this.dataItem(this.selectedIndex).sort_ordr);
						}
						else{
							$('#insertCdGroup').val($("#insertCdGroupNm").val());
							$('#insertSortOrdr').val(this.dataItem(this.selectedIndex).sort_ordr);
						}
					}
		        });
			});
		},

		kendoGrid : function() {
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/sys/cmmnCd/selectCmmnCdList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete : function(xhr, status) {
								if(xhr.status != 200) {
									if (xhr.status == 401) {
										alert("권한이 없습니다. 사용자 인증이 필요합니다.");
									} else if (xhr.status == 403) {
										alert("세션이 만료되었습니다. 로그인페이지로 이동합니다.");
										location.href = "/rims";
									} else {
										alert("처리 중 에러가 발생하였습니다.");
									}
								}
							},
						},
						parameterMap: function(options){
							options.searchCol = $("#searchCol").val();
							options.searchWrd = $("#searchWrd").val();
							options.searchUseYn = $("#searchUseYn").val();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true
				},
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
                     {
                        title: "순번",
						width: "40px",
                        field: "rn",
						template: "#: rn #"
                    },
                    {
                        title: "코드",
						width: "100px",
                        field: "cd",
						template: "#: cd #"
                    },
                    {
                        title: "코드명",
						width: "150px",
                        field: "cdNm",
						template: "#: cdNm #"
                    },
                    {
                        title: "그룹코드",
						width: "100px",
                        field: "cdGroup",
						template: "#: cdGroup #"
                    },
                    {
                        title: "그룹명",
						width: "150px",
                        field: "cdGroupNm",
						template: "#: cdGroupNm #"
                    },
					{
                        title: "정렬순서",
						width: "60px",
                        field: "sortOrdr",
						template: "#: sortOrdr #"
                    },
                    {
                        title: "사용여부",
						width: "60px",
                        field: "useYn",
						template: "#: useYn #"
                    }
                ],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $code.ui.rowClickEvent
			});
		},

		rowClickEvent : function(e) {
			var rows = e.sender.select();
            var data;

            rows.each(function(e) {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });

			$('#cd').val(data.cd);
			$('#cdNm').val(data.cdNm);
			$('#cdGroup').val(data.cdGroup);
			$('#cdGroupNm').data("kendoDropDownList").value(data.cdGroup);
			$('#cdExpln').val(data.cdExpln);
			$('#sortOrdr').val(data.sortOrdr);
			$('#useYn').data("kendoDropDownList").value(data.useYn);

			$(".detail_popup").addClass("view");
		},
	};

    //이벤트 정의
   $code.event = {
        setUIEvent : function() {
			$(".excelDownBtn").on("click", function() {
            	$code.event.excelDown();
        	});

			$('.search_btn').click(function(){
				if($("#searchCol").val() != "" && $("#searchWrd").val() == "")
					alert("검색조건을 입력해 주십시오.")
				else if($("#searchWrd").val() != "" && $("#searchCol").val() == "")
					alert("검색조건을 선택해 주십시오.")
				else
					$("#grid").data("kendoGrid").dataSource.page(1);
			});

			$('.adm_btn').click(function(){
				$(".register_popup").addClass("view");
				$code.event.resetInsertInfo();
			});

			$('.insert_btn').click(function(){
				$code.event.insertCmmnCd();
			});

			$('.update_btn').click(function(){
				$code.event.updateCmmnCd();
			});

			$('.delete_btn').click(function(){
				$code.event.deleteCmmnCd();
			});

			$('.register_popup .cancel_btn').click(function(){
				$(".register_popup").removeClass("view");
			});

			$('.detail_popup .cancel_btn').click(function(){
				$(".detail_popup").removeClass("view");
				$("#grid").data("kendoGrid").dataSource.page(1);
			});

			$("#insertCd").on("input", function() {
            	$(this).val($(this).val().replace(/[^a-zA-Z0-9]/gi, ""));
        	});

			$(".cdNm_input").on("input", function() {
            	$(this).val($(this).val().replace(/^[_()]|[^ㄱ-힣a-zA-Z0-9()_\s]/gi, ""));
        	});

			$("#searchWrd").on("input", function() {
            	$(this).val($(this).val().replace(/^[_()]|[^ㄱ-힣a-zA-Z0-9()_\s]/gi, ""));
        	});
        },

		insertCmmnCd : function() {
			var param = {
				cd: $('#insertCd').val(),
				cdNm: $("#insertCdNm").val(),
				cdGroup: $('#insertCdGroup').val(),
				cdGroupNm: $('#insertCdGroupNm').data("kendoDropDownList").text(),
				cdExpln: $("#insertCdExpln").val(),
				sortOrdr: $("#insertSortOrdr").val(),
				useYn: $('#insertUseYn').val()
			};

			if($("#insertCd").val() == '')
				alert("코드를 입력해 주십시오.")
			else if($("#insertCdGroup").val() == '')
				alert("그룹명을 선택해 주십시오.")
			else if($("#insertSortOrdr").val() == '')
				alert("정렬순서를 입력해 주십시오.")
			else{
				ajax(false, contextPath+"/sys/cmmnCd/insertCmmnCd", "", "", param, function(result) {
		            if (result != null && result=="success"){
						alert("공통코드 등록이 완료되었습니다.");
						$('.register_popup .cancel_btn').click();
						$("#grid").data("kendoGrid").dataSource.page(1);
					} else{
						alert(result);
					}
				});
			}
		},

		updateCmmnCd : function() {
			var param = {
				cd: $('#cd').val(),
				cdNm: $("#cdNm").val(),
				cdGroup: $('#cdGroup').val(),
				cdGroupNm: $('#cdGroupNm').data("kendoDropDownList").text(),
				cdExpln: $("#cdExpln").val(),
				sortOrdr: $("#sortOrdr").val(),
				useYn: $('#useYn').val()
			};

			if($("#cdGroup").val() == '')
				alert("그룹명을 선택해 주십시오.")
			else if($("#sortOrdr").val() == '')
				alert("정렬순서를 입력해 주십시오.")
			else{
				ajax(false, contextPath+"/sys/cmmnCd/updateCmmnCd", "", "", param, function(result) {
		            if (result != null && result=="success"){
						alert("공통코드 수정이 완료되었습니다.");
						$('.detail_popup .cancel_btn').click();
						$("#grid").data("kendoGrid").dataSource.page(1);
					}
				});
			}
		},

		deleteCmmnCd : function() {
			var param = {
				cd: $('#cd').val(),
				cdGroup: $('#cdGroup').val(),
			};

			ajax(false, contextPath+"/sys/cmmnCd/updateDeleteCmmnCd", "", "", param, function(result) {
	            if (result != null && result=="success"){
					alert("공통코드 삭제가 완료되었습니다.");
					$('.detail_popup .cancel_btn').click();
					$("#grid").data("kendoGrid").dataSource.page(1);
				}
			});
		},

		excelDown: function() {
			var params = {};

			params.searchCol = $("#searchCol").val();
			params.searchWrd = $("#searchWrd").val();
			params.searchUseYn = $("#searchUseYn").val();
			params._csrf = $('._csrf').val();

			var fileNm = '공통코드관리'
			var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();
			excelDown("/sys/cmmnCd/excelDown", params, fileNm, totalRowCount);
		},

		resetInsertInfo : function() {
			$('#insertCd').val('');
			$('#insertCdNm').val('');
			$('#insertCdGroup').val('');
			$('#insertCdGroupNm').data("kendoDropDownList").value('');
			$('#insertCdExpln').val('');
			$('#insertSortOrdr').val('');
			$('#insertUseYn').data("kendoDropDownList").value('');
		}
    };

}(window, document, jQuery));