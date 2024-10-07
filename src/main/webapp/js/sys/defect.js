(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$defect = W.$defect || {};

	var carListColmuns = [
		{ title: "순번", width: "40px", field: "rn", template: "#: rn #" },
		{ title: "차량등록번호", width: "130px", field: "vhclRegNo", template: "#: vhclRegNo #" },
		{ title: "차대번호", width: "180px", field: "vin", template: "#: vin #" },
		{ title: "차종", width: "80px", field: "carmdl", template: "#: carmdl != null ? carmdl : '-'#" },
		{ title: "연식", width: "100px", field: "mdlyr", template: "#: mdlyr #" },
		{ title: "소유자명", width: "130px", field: "ownrNm", template: "#: ownrNm #" },
		{ title: "사용여부", width: "100px", field: "useYn", template: "#: useYn #" },
		{ title: "등록일", width: "140px", field: "regDt", template: "#: regDt #" }
	];

	var vin;
	var defects_sn;
	
	var optVal = null;  // 차량 검색 조건
	
	var detailActnInfo = {
		/*
		detailActnSn : '시정조치 일련번호111',
		detailActnVin : 'KMJHG17GPNC003586',
		detailActnCarRegNo : '차량번호111',
		detailActnCn : 'Y', //시정조치 내용,
		detailActnDt : '2024-08-01',
		detailActnNm : '등록자111',
		detailActnTyCd: 'Y', //'시정조치 유형코드',
		detailActnRsCd: '시정조치 결과코드11',
		detailActnRegDt: '2024-08-01',
		detailActnRmrk: ' 비고11',
		detailActnYn: 'Y' //'조치여부'
		*/
	}
    

	//그리드 처음 로딩여부
	var firstLoad = true;
    var auth='';
	var excelParams = '';
    $(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		$defect.ui.pageLoad();		//최초 페이지 로드 시
		$defect.ui.defectInfo();  // 대여차량 결함정보 그리드
		$defect.event.setUIEvent();
    });

	$defect.ui = {
		
		pageLoad : function() {
			$defect.ui.search();
			$defect.ui.defectCarGrid();
		},
		
		defectInfo: function() {
			$("#defectGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/defect/selectDefectInfo',
							type: "POST",
							beforeSend: function(xhr) {
								kendo.ui.progress($(document.body), true); // 프로그레스 인디케이터 표시
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function() {
								kendo.ui.progress($(document.body), false); // 프로그레스 인디케이터 숨김
							}
						},
						parameterMap: function(options) {
							var sd = $("#start-picker01").val();
							var ed = $("#end-picker01").val();
							var startDt = sd.replace(/-/g, "");
							var endDt = ed.replace(/-/g, "");
							options.coNm = $("#searchCoNm").val();
							options.startDt = startDt;
							options.endDt = endDt;
							options.vhclRegNo = $("#searchCarNum").val();
							options.prcsSttsYn = $("#prcsSttsYn").val();

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
					//{ field: "co_nm", title: "회사명", width: "50px", template: "#:co_nm #", sortable: false },
					{ field: "vin", title: "차대번호", width: "100px", template: "#= vin != null ? vin : '-' #", sortable: true },
					{ field: "vhcl_reg_no", title: "차량번호", width: "100px", template: "#= vhcl_reg_no != null ? vhcl_reg_no : '-' #", sortable: true },
					{ field: "defects_sn", title: "결합일련번호", width: "100px", template: "#= defects_sn != null ? defects_sn : '-' #", sortable: true },
					{ field: "ocrn_dt", title: "발생일시", width: "100px", template: "#: $defect.event.dateFomat(ocrn_dt) #", sortable: true },
					{ field: "defects_type_cd", title: "결합유형", width: "100px", template: "#= defects_type_cd != null ? defects_type_cd : '-' #", sortable: true },
					{ field: "prcs_stts_cd", title: "처리상태코드", width: "100px", template: "#= prcs_stts_cd != null ? prcs_stts_cd : '-' #", sortable: true },
					{ field: "defects_cn", title: "결합내용", width: "100px", template: "#= defects_cn != null ? defects_cn : '-' #", sortable: true },
					{ field: "crrtvact_rslt", title: "시정조치 결과", width: "100px", template: "#= crrtvact_rslt != null ? crrtvact_rslt : '-' #", sortable: true },
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				//change: $defect.ui.rowClickEvent
			})

		},
		
		rowClickEvent: function(e) {
			//kendo.ui.progress($("#defectGrid"), true);
			var rows = e.sender.select();
			var dataItem = null;
			
			rows.each(function(e) {
				var grid = $("#defectGrid").data("kendoGrid");
				dataItem = grid.dataItem(this);
			});
			
			$defect.event.detailInfoPopup(dataItem);
		},
		
		decttGridrowClickEvent: function(e) {
			var rows = e.sender.select();
			var dataItem = null;

			rows.each(function(e) {
				var grid = $("#defectCarGrid").data("kendoGrid");
				dataItem = grid.dataItem(this);
				$("#insertDefectSn").val(dataItem.defects_sn);
			});			
		},
		
		
		search : function(){
			var param = {};
			
			//기간 검색
			var oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 13));
			
			$("#start-picker01").kendoDatePicker({
				dateInput: true,
				format: "yyyy-MM-dd",
				value: new Date(oneMonthAgo),
			});

			$("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(),
			});	
			
			$("#actnOcrnDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});	
			
			$("#insertRegDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});
			
			$("#detailActnRegDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});
			
			$("#detailActnDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});
			
			$("#insertActnDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});
			
		
			
		
			// 조치 여부
			var prcsSttsYn = [
				{ value: "조치", text: "조치" },
				{ value: "미조치", text: "미조치" },
			];
			
			//사용 여부
			var useYn = [
				{ value: "Y", text: "사용" },
				{ value: "N", text: "미사용" },
			];
			
			//조치 유형 코드
			var actnTyCd = [
				{ value: "Y", text: "수리" },
				{ value: "N", text: "미수리" },
			];
			
			//시정조치 내용
			var actnCn = [
				{ value: "Y", text: "성공" },
				{ value: "N", text: "실패" },
			];
			
			//시정조치 결과 코드
			var actnRs = [
				{ value: "Y", text: "결과 코드 1" },
				{ value: "N", text: "결과 코드 2" },
			];
			
			
			$("#prcsSttsYn").kendoDropDownList({
				optionLabel: '조치여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: prcsSttsYn
			});
			
			
			$("#useYn").kendoDropDownList({
				optionLabel: '사용여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: useYn
			});
			
		
			$("#insertActnYn").kendoDropDownList({
				optionLabel: '조치여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: prcsSttsYn
			});
			
			$("#insertActnTyCd").kendoDropDownList({
				optionLabel: '시정조치 유형코드(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnTyCd
			});

			$("#insertActnRsCd").kendoDropDownList({
				optionLabel: '시정조치 결과코드(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnRs
			});
			
			$("#detailActnCn").kendoDropDownList({
				optionLabel: '시정조치 내용(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnCn
			});
			
			$("#detailActnTyCd").kendoDropDownList({
				optionLabel: '시정조치 유형코드(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnTyCd
			});
			
			$("#detailActnYn").kendoDropDownList({
				optionLabel: '조치여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: prcsSttsYn
			});

					
		
			
			
			
			ajax(true, contextPath + '/sys/defect/selectCtpvNm', 'body', '처리중입니다.', param, function(data) {
				$('#ctpvNm').kendoDropDownList({
					optionLabel: "시도",
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_cd",
					change: function() {
						if (this.value() == '') {
							$('#sggNm').data("kendoDropDownList").setDataSource(null);
						} else {
							param.ctpvCd = this.value();
							ajax(true, contextPath + '/sys/defect/selectSggNm', 'body', '처리중입니다.', param, function(data) {
								$('#sggNm').kendoDropDownList({
									optionLabel: "시군구",
									dataTextField: "sgg_nm",
									dataValueField: "full_sgg_cd",
									dataSource: data,
									value: "sgg_cd"
								});
							});
						}
					}
				});
			});
			
		
			ajax(true, contextPath + '/sys/defect/selectSggNm', 'body', '처리중입니다.', param, function(data) {
				$('#sggNm').kendoDropDownList({
					optionLabel: "시군구",
					dataTextField: "sgg_nm",
					dataValueField: "full_sgg_cd",
					dataSource: data,
					value: "sgg_cd"
				});
			});
			
		},
		
		defectCarGrid: function() {
			$("#defectCarGrid").kendoGrid({
				dataSource: null,
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ title: "발생일자", width: "40px", field: "ocrn_dt", template: "#: $defect.event.dateFomat(ocrn_dt) #" },
					{ title: "결함유형", width: "60px", field: "defects_type_cd", template: "#: defects_type_cd #" },
					{ title: "처리상태", width: "150px", field: "prcs_stts_cd", template: "#: prcs_stts_cd #" }
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				change: $defect.ui.decttGridrowClickEvent
			});
		},
		
				carGrid: function() {
			var gridId = "#carGrid";
			optVal = $("#carSearchWrd").val();
			$defect.ui.carGridModule(gridId);
		},
		
		carGridModule: function(gridId) {
			$(gridId).kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/defect/selectCarList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options) {
							options.searchWrd = optVal;
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 5,
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
				columns: carListColmuns,
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				change: function(e) {
					var rows = e.sender.select();
					var data = null;

					rows.each(function(e) {
						var grid = $(gridId).data("kendoGrid");
						var item = grid.dataItem(this);
						data = item;
					})

					if (gridId == "#carGrid") {
						$("#carVhclRegNoVal").val(data.vhclRegNo);
						$("#regRentNo").val(data.rentNo);
						$("#regRgtrSn").val(data.rgtrSn);
						$("#regVin").val(data.vin);
						$("#regCarmdl").val(data.carmdl);
						$("#regVhclNm").val(data.vhclNm);
						$("#regBzmnSn").val(data.bzmnSn);
						$("#regCrno").val(data.crno);
						$("#regEngineType").val(data.engineFom);
						$("#regModelYear").val(data.mdlyr);
					} else {
						$("#detailVhclRegNo").val(data.vhclRegNo);
						$("#detailRgtrSn").val(data.rgtrSn);
						$("#detailVin").val(data.vin);
						$("#detailCarmdl").val(data.carmdl);
						$("#detailVhclNm").val(data.vhclNm);
						$("#detailBzmnSn").val(data.bzmnSn);
						$("#detailCrno").val(data.crno);
						$("#detailEngineType").val(data.engineFom);
						$("#detailModelYear").val(data.mdlyr);
					}
				}
			});
		},
		
		
		
	};

    //이벤트 정의
	$defect.event = {
		setUIEvent: function() {
			
			// 등록하기 버튼
			$(".reg_btn").on("click", function() {
				$(".directInputPopup").addClass("view");				
			});
			
			// 등록 실행
			$(".insertBtn").on("click", function() {
				$defect.event.executeInsert();	
			});
			
			// 등록 팝업 X, 닫기 버튼
			$("#close, .cancle_btn").on("click", function() {
				location.reload();
			});
			
			$("#btnDirectInput").on("click", function() {
				$(".directInputPopup").addClass("view");
				$(".regPopup").removeClass("view");
			});
			
			// 대여차량 결함정보 조회 버튼
			$(".searchBtn").on("click", function() {
				var start = new Date($("#start-picker01").val());
				var end = new Date($("#end-picker01").val());


				if (new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())) {
					alert("시작일은 종료일보다 늦을 수 없습니다.");
					$('#end-picker01').data("kendoDatePicker").value(new Date($('#start-picker01').val()));
					return;
				}
				
				$defect.event.sendListSearch();
			});
			
			//차량등록번호 중복확인 버튼
			$("#valiDuplicate").on("click", function() {
				$defect.event.executeValidDuplicate();	
			});
			
			//  수정 버튼
			$(".updateBtn").on("click", function(){
				$defect.event.executeUpdate();
			})
			
			//  삭제 버튼
			$(".deleteBtn").on("click", function(){
				$defect.event.executeDelete();
			})
			
			//시정조치 결과 첨부파일 등록
			$(".actnResultFileUploadBtn").on("click", function() {
				$defect.event.actnFileUpload();
			});
			
			// 엑셀다운로드 버튼
			$(".exel_down").on("click", function() {
				$defect.event.excelDown();
			});
	
			//차량 목록			
			$("#carBtn").on("click", function() {
				$defect.event.carGridPopup();
			});
			
			$("#carPopupSearchBtn").on("click", function() {
				$defect.event.carPopupSearch();
			});
			
			$("#carVhclRegNoVal").on("click", function() {
				$defect.event.carNoval();
			});
			
			$(".carClose").on("click", function() {
				$("#carTa").empty();
				if ($("#carTa")[0].children.length == 0) {
					$("#carSearchWrd").val('');
					$("#carTa").append("<table id='carGrid'><caption>자동차리스트</caption></table>");
				}

			});
			
			$(".sm_popup .cancel_btn").on("click", function() {
				$(".sm_popup").removeClass("view");
			});
		},
		
		dateFomat: function(data) {
			var date = new Date(data);

			var year = date.getFullYear();
			var month = String(date.getMonth() + 1).padStart(2, '0');
			var day = String(date.getDate()).padStart(2, '0');

			return year + '-' + month + '-' + day
		},

		sendListSearch: function() {
			var grid = $('#defectGrid').data('kendoGrid');
			grid.dataSource.page(1);
		},
		
		executeValidDuplicate: function() {
			var vhclRegNo = $("#vhclRegNo").val();
			var param = {};
			param.vhclRegNo = vhclRegNo; //194호2737
			ajax(true, contextPath + '/sys/defect/selectValidDuplicate', 'body', '처리중입니다.', param, function(data) {
				if (data.dataCarInfoList.length > 0) {
					// data.dataCarInfoList[0].sgg_cd = 3117000000; //울산광역시 동구
						
					$("#brno").val(toBizrnoNumFormat(data.dataCarInfoList[0].brno));
					$("#mdlyr").val(data.dataCarInfoList[0].mdlyr);
					$("#engineFom").val(data.dataCarInfoList[0].engine_fom);
					$('#ctpvNm').data("kendoDropDownList").value(data.dataCarInfoList[0].sgg_cd.toString().substring(0,2));
					$('#sggNm').data("kendoDropDownList").value(data.dataCarInfoList[0].sgg_cd.toString().substring(0,4));
					
					$("#vin").val(data.dataCarInfoList[0].vin);
					$("#carmdl").val(data.dataCarInfoList[0].carmdl);
					$("#vhclNm").val(data.dataCarInfoList[0].vhcl_nm);
					$('#useYn').data("kendoDropDownList").value(data.dataCarInfoList[0].use_yn);
					$('#rmrk').val(data.dataCarInfoList[0].rmrk);
					
					$("#insertCoNm").val(data.dataCarInfoList[0].co_nm);
					$("#insertRegCarNo").val(data.dataCarInfoList[0].vhcl_reg_no);
					
				}
				if(data.dataDefectList.length >0){
					$("#defectCarGrid").data("kendoGrid").setDataSource(data.dataDefectList);					
				}
			});
			
			
		},
		
		detailInfoPopup: function(dataItem) {
			var params = {
				vin : dataItem.vin,
				defects_sn : dataItem.defects_sn, 
			};
			vin = dataItem.vin;
			defects_sn = dataItem.defects_sn;
			
	
			$("#actnVin").val(dataItem.vin);
			$("#actnDefectsSn").val(dataItem.defects_sn);
			$("#actnPrcsSttsCd").val(dataItem.prcs_stts_cd);
			$("#actnDefectsCn").val(dataItem.defects_cn);
			$("#actnDefectsTypeCd").val(dataItem.defects_type_cd);
			$("#actnOcrnDt").data("kendoDatePicker").value(new Date(dataItem.ocrn_dt));
			
			ajax(true, contextPath + '/sys/defect/selectDetailDefectInfo', 'body', '확인중입니다.', params, function(data) {

				$("#detailActnSn").val(detailActnInfo.detailActnSn);
				$("#detailActnVin").val(detailActnInfo.detailActnVin);
				$("#detailActnCarRegNo").val(detailActnInfo.detailActnCarRegNo);
				$("#detailActnNm").val(detailActnInfo.detailActnNm);

				$("#detailActnRsCd").val(detailActnInfo.detailActnRsCd);
				$("#detailActnRmrk").val(detailActnInfo.detailActnRmrk);

				$("#detailActnDefectSn").val(dataItem.defects_sn);


				$('#detailActnTyCd').data("kendoDropDownList").value(detailActnInfo.detailActnTyCd);
				$('#detailActnCn').data("kendoDropDownList").value(detailActnInfo.detailActnCn);
				$('#detailActnYn').data("kendoDropDownList").value(detailActnInfo.detailActnYn);
				$("#detailActnDt").data("kendoDatePicker").value(new Date(detailActnInfo.detailActnDt ? detailActnInfo.detailActnDt : ''));
				$("#detailActnRegDt").data("kendoDatePicker").value(new Date(detailActnInfo.detailActnRegDt));


				$(".viewDefect_popup").addClass("view");
			});
		},
		
		//팝업 - params에 set
		setUpdateParams: function() {
			var params = {};
			params.vin = vin;
			params.defects_sn = defects_sn;
			
			params.prcs_stts_cd = $("#actnPrcsSttsCd").val();
			params.defects_cn = $("#actnDefectsCn").val();
			params.defects_type_cd = $("#actnDefectsTypeCd").val(); 
			params.ocrn_dt = new Date($("#actnOcrnDt").val());
			
			return params;
		},
		
		executeInsert: function() {
			
			// 시정조치 일련번호
			var insertActnSn = $("#insertActnSn").val();
			var actnSn = insertActnSn.replace(/[^0-9]/g, "");

			//시정조치 유형코드
			var actnTyCd = $("#insertActnTyCd").val();

			//시정조치 결과코드
			var actnRsCd = $("#insertActnRsCd").val();

			//시정조치 내용
			var actnCn = $("#insertActnCn").val();

			//시정조치일
//			var actnDt = new Date($("#insertActnDt").val());
			var actnDt = $("#insertActnDt").val();
			
			//시정조치여부
			var actnYn = $("#insertActnYn").val();
			
			//회사명
			var coNm = $('#insertCoNm').val();
			coNm = coNm.trim();
			
			//차량번호
			var regCarNo = $('#insertRegCarNo').val();
			regCarNo = regCarNo.trim();

			//결함일련번호
			var insertDefectSn = $("#insertDefectSn").val();
			var defectSn = insertDefectSn.replace(/[^0-9]/g, "");

			//등록자
			var regNm = $('#insertRegNm').val();
			regNm = regNm.trim();


			//비고
			var rmrk = $('#insertRmrk').val();
			rmrk = rmrk.trim();

			//시정조치 결과파일
			var resultAtch = $("#actnResultAtch").val();


			var params = {

				vin: $("#vin").val(),
				actnSn: nvl(actnSn, null),
				actnTyCd: nvl(actnTyCd, null),
				actnRsCd: nvl(actnRsCd, null),
				actnCn: nvl(actnCn, null),
				actnDt: nvl(actnDt, null),
				actnYn: nvl(actnYn, null),
				coNm: nvl(coNm, null),
				regCarNo: nvl(regCarNo, null),
				defectSn: nvl(defectSn, null),
				regNm: nvl(regNm, null),
				rmrk: nvl(rmrk, null),
			}

			if (params.actnSn == null || params.actnSn == "") {
				alert('시정조치 일련번호 입력은 필수입니다');
				return;
			} else if (params.actnTyCd == null || params.actnTyCd == "") {
				alert('시정조치 유형코드 입력은 필수입니다');
				return;
			} else if (params.actnRsCd == null || params.actnRsCd == "") {
				alert('시정조치 결과코드 입력은 필수입니다');
				return;
			} else if (params.actnCn == null || params.actnCn == "") {
				alert('시정조치 내용 입력은 필수입니다');
				return;
			}else if (params.actnDt == null || params.actnDt == "") {
				alert('시정조치일 입력은 필수입니다');
				return;
			}else if (params.actnYn == null || params.actnYn == "") {
				alert('조치여부 입력은 필수입니다');
				return;
			}else if (params.coNm == null || params.coNm == "") {
				alert('소속 입력은 필수입니다');
				return;
			}else if (params.regCarNo == null || params.regCarNo == "") {
				alert('차량번호 입력은 필수입니다');
				return;
			}else if (params.defectSn == null || params.defectSn == "") {
				alert('결함일련번호 입력은 필수입니다');
				return;
			}else if (params.regNm == null || params.regNm == "") {
				alert('등록자 입력은 필수입니다');
				return;
			}else if (params.rmrk == null || params.rmrk == "") {
//				alert('비고 입력은 필수입니다');
//				return;
			}
						
			if(resultAtch != ''){
				var formData = new FormData();
				formData.append('files', document.getElementById('actnFileUpload').files[0]);
				fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
					if (response != null) {
						params.actnFileAtchSn = nvl(response.fileSn, 0);
						$defect.event.insertDefect(params);
					}
				});
			} else {
				if (confirm("등록 하시겠습니까?")) {
					$defect.event.insertDefect(params);
				}
			}

		},
		
		executeUpdate : function(){
			var params = $defect.event.setUpdateParams();
			
			ajax(true, contextPath + '/sys/defect/updateDefect', 'body', '등록중입니다.', params, function(data) {
				if (data != null) {
					// 완료or실패
					alert("수정을 " + data.resultMsg + "했습니다.");
				}
			});	
		},
		
		executeDelete: function() {
			var params = {};
			params.vin = vin;
			params.defects_sn = defects_sn;
			
			if (confirm("삭제하시겠습니까?")) {
				ajax(true, contextPath + '/sys/defect/deleteDefect', 'body', '등록중입니다.', params, function(response) {
					if (response != null) {
						// 완료or실패
						alert("삭제를 " + response.resultMsg + "했습니다.");
					}
				});
			}
		},
		
		insertDefect: function(params) {
			ajax(true, contextPath + '/sys/defect/insertDefect', 'body', '등록중입니다.', params, function(response) {
				if (response.resultMsg == "완료" || response.resultMsg == "실패") {
					// 완료or실패
					alert("등록을 " + response.resultMsg + "했습니다.");
				} else {

				}
			});
		},
		
		carGridPopup: function() {
			$defect.ui.carGrid();
			$("#carPopup").addClass("view");
		},
				
		actnFileUpload: function() {
			$("#actnFileUpload").click();
			$("#actnFileUpload").change(function() {
				var ext = $("#actnFileUpload").val().split(".").pop().toLowerCase();
				var files = ["jpg", "jpeg", "gif", "png", "pdf"];

				if (ext.length > 0) {
					if ($.inArray(ext, files) == -1) {
						alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
						$("#actnFileUpload").val("");
						$("#actnResultAtch").val("");
						return false;
					} else {
						var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
						var fileName = file.name; // 파일명 가져오기
						$("#actnResultAtch").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
					}
				}
			});
		},
		
		carPopupSearch: function() {
			optVal = $("#carSearchWrd").val();
			var grid = $('#carGrid').data('kendoGrid');
			grid.dataSource.page(1);
		},
		
		carNoval: function() {
			var carRegNoVal = $("#carVhclRegNoVal").val();
			$("#insertRegCarNo").val(carRegNoVal);
		},
		
		excelDown1: function() {
			var fileNm = 'defect'
			var params = {};

			params.coNm = $("#searchCoNm").val();
			params.vhclRegNo = $("#searchCarNum").val();
			params.sttsYn = $("#prcsSttsYn").val();
			
			params.regStDt = $("#start-picker01").val();
			// 등록 종료일 검색 조건: 날짜 + 23:59:59 
			params.regEdDt = $("#end-picker01").val() ? $("#end-picker01").val() + ' 23:59:59' : $("#end-picker01").val();
			params._csrf = $('._csrf').val();

			excelDown("/sys/defect/excelDown", params, fileNm);
		},
		
		excelDown: function() {
			var excelDownArc = {};
			var totalRowCount = $("#defectGrid").data("kendoGrid").dataSource.total();
			if (totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
			} else {
				if (Object.keys(excelDownArc).length === 0) {
					var sd = $("#start-picker01").val();
					var ed = $("#end-picker01").val();
					var startDt = sd.replace(/-/g, "");
					var endDt = ed.replace(/-/g, "");

					excelDownArc.coNm = $("#searchCoNm").val();
					excelDownArc.vhclRegNo = $("#searchCarNum").val();
					excelDownArc.sttsYn = $("#prcsSttsYn").val();
					excelDownArc.startDt = startDt;
					excelDownArc.endDt = endDt;
				}
				excelDown("/sys/defect/excelDown", excelDownArc, "defectInfo", totalRowCount);
			}
		},
		
		

			
	};
   
   

}(window, document, jQuery));