(function(W, D, $) {
	
	W.$inspectionHist = W.$inspectionHist || {};
	
	$(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		
		$inspectionHist.ui.pageLoad();		//최초 페이지 로드 시
		$inspectionHist.event.setUIEvent();
	});
	
	$inspectionHist.ui = {
		pageLoad: function() {
			$inspectionHist.ui.inspectionHistInfo();
		},
		
		inspectionHistInfo: function() {
			$("#inspectionHistGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/inspectionHist/selectInspectionHistInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							//var param = $inspectionHist.event.filter();
//							if(param.regCmptncCd.substring(2, param.regCmptncCd.length) == '00000000') {
//								options.regCmptncCd = param.regCmptncCd.substring(0, 2);
//							} else {
//								options.regCmptncCd = param.regCmptncCd;
//							}
//							options.bzmnSn         = param.bzmnSn;
//							options.brno           = param.brno;
//							options.stdgCd         = param.regCmptncCd;
//							options.searchAprvStts = param.searchAprvStts;
//							options.searchBsnStts  = param.searchBsnStts;
//							options.authSelected   = param.authSelected;
//							options.selectCond     = param.selectCond;
//							options.searchWrd      = param.searchWrd;
//							options.searchChk      = param.searchChk;
//							options.authrtCd       = authrtCd;
//							options.delYn            = param.delYn;
							
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
					serverSorting: false,
					autoBind: false,
				},
				columns: [
					{ field: "rn", title: "순번", width: "30px", template: "#: rn #", sortable: false },
					{ field: "", title: "관할지역", width: "50px", sortable: true },
					{ field: "exmnr", title: "조사원", width: "30px", template: "#= exmnr != null ? exmnr : '-' #", sortable: true },
					{ field: "coNm", title: "회사명", width: "30px", template: "#= coNm != null ? coNm : '-' #", sortable: true },
					{ field: "bzmnSeCd", title: "권한", width: "30px", template: "#= bzmnSeCd != null ? bzmnSeCd : '-' #", sortable: true },
					{ field: "brno", title: "사업자번호", width: "50px", template: "#= brno != null ? brno : '-' #", sortable: true },
					{ field: "crno", title: "법인번호", width: "50px", template: "#= crno != null ? crno : '-' #", sortable: true },
					{ field: "rslt", title: "결과", width: "30px", template: "#= rslt != null ? rslt : '-' #", sortable: true },
					{ field: "roadNmAddr", title: "주소", width: "100px", template: "#= roadNmAddr != null ? roadNmAddr : '-' #", sortable: true },
					{ field: "", title: "결과서", width: "30px", sortable: true },
					{ field: "prcsYn", title: "후속처리여부", width: "30px", template: "#= prcsYn != null ? prcsYn : '-' #", sortable: true },
				],
				navigatable: true,
				scrollable: true,
				pageable: {
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				change: $inspectionHist.ui.rowClickEvent
			})
			
		},
		// row 상세팝업
		rowClickEvent : function(e) {
			var rows = e.sender.select();
			var data;
			
			rows.each(function(e) {
                var grid = $("#inspectionHistGrid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });
			$inspectionHist.event.detailInfoPopup(data);

//			var crno = !data.crno ? '-' : toCorporateNumFormat(data.crno);
//			$('#crno').val(crno);
//			$('#detailExmnr').val(data.exmnr);
//			$('#detailJbgd').val(data.jbgd);
//			$('#detailOgdp').val(data.ogdp);
			
//			$(".detail_popup").addClass("view");
		},
		
		// 등록팝업
		insertSearch: function() {
		},
	}
	
	$inspectionHist.event = {
		setUIEvent: function() {
			// 엑셀다운로드버튼
			$(".excelDownBtn").on("click", function() {
				$inspectionHist.ui.excelDown();
			});

			// 등록 팝업 X, 닫기 버튼
			$(".insertClose").on("click", function() {
				location.reload();
        	});

			// 상세 팝업 X, 닫기 버튼
			$(".detailClose").on("click",function(){
				var grid = $("#inspectionHistGrid").data("kendoGrid");
				grid.dataSource.read();
			});
			
			// 등록팝업 버튼
			$(".insertPopupBtn").on("click", function() {
				//$inspectionHist.ui.insertSearch(); // 등록팝업
				$(".file_register_popup").addClass("view");
//				$("body").css("overflow", "hidden");
//				if (authrtCd === 'G01') {
//					var params = { stdgCd: getCmptncZoneCd };
//					ajax(false, contextPath + '/sys/companyManage/area', 'body', '처리중입니다.', params, function(data) {
//						$('#cmptncZoneCdCtpvNm').val(data.ctpvNm);
//						$('#cmptncZoneCdSggNm').val(data.sggNm);
//					});
//				}
			});
			
			//직접입력 팝업
			$(".directInsertBtn").on("click", function() {
				$(".register_popup").addClass("view");
			});
		},
		
		detailInfoPopup: function(data) {
			var brno = !data.brno ? '-' : toCorporateNumFormat(data.brno);
			$('#detailBrno').val(brno);
			$('#detailExmnr').val(data.exmnr);
			$('#detailJbgd').val(data.jbgd);
			$('#detailOgdp').val(data.ogdp);
			$('#detailBsnSttsCd').val(data.bsnSttsCd);
			$('#detailBsnSttsMdfcnDt').val(data.bsnSttsMdfcnDt);
			$('#detailAgencyTelno').val(data.agencyTelno);
			$('#detailChckArtcl').val(data.chckArtcl);
			$('#detailEtcArtcl').val(data.etcArtcl);
			$('#detailRslt').val(data.rslt);
			$('#detailSignYn').val(data.signYn);
			$('#detailTelno').val(data.telno);
			$('#detailRprsvNm').val(data.rprsvNm);
			$('#detailChckCn').val(data.chckCn);
			
			
			
			
			
			$(".detail_popup").addClass("view");
//			var params = {};
//
//			ajax(true, contextPath + '/vfc/rntCnfCrtIsnHstr/selectDetailConfInfo', 'body', '확인인중입니다.', params, function(data) {
//				$("#detailRentNo").val(data[0].rentNo);
//				$("#detailVhclRegNo").val(data[0].vhclRegNo);
//				$("#detailRentSttsNm").val(data[0].rentSttsNm);
//				$("#detailRentHstryNo").val(data[0].rentHstryNo);
//				$("#startDt").val(data[0].rentBgngDt);
//				$("#endDt").val(data[0].rentEndDt);
//				$("#mdfcnDt").val(data[0].mdfcnDt);
//			});
//
//			$("#detailInfoPopup").addClass("view");
		},
	}
	
}(window, document, jQuery));