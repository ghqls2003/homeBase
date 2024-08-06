/**
 * 운전자격 검증 통계
 *
 * date : 2024/01/30
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
    var dayColumns = [];
    var verfCountData = [];
    
    var excelDate = null,
    	excelMthd = null,
    	excelDateResult = null;
    
    var resultExcelDrop = null,
    	resultExcelcmpNm = null, 
    	resultExcelcarReg = null, 
    	resultExcelMonth = null;
    	
    var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var toMonth = year+"-"+(month < 10 ? "0"+month : month);
    
    $(document).ready(function() {
		$statistics.ui.verfDropdown();
		
		$statistics.datePicker.verfDatePick();
		$statistics.event.verfCountData();
		$statistics.datePicker.verfResultDatePick();
		
		$statistics.event.searchBtn();
		$statistics.event.tmTabBtn();
		$statistics.event.rmTabBtn();
		$statistics.event.enterKey();
		
		// 테스트중
		$(".rmDv").click();
    });
    
    $statistics.ui = {
		/**
		 * @name         : verfCountGrid
		 * @description  : 자격검증 시간별 통계
		 * @date         : 2024. 01. 31
		 * @author       : 김경룡
		 */
		verfCountGrid: function() {
			$("#verf-grid").kendoGrid({
				dataSource : null,
				columns: dayColumns,
				navigatable: true,
				scrollable: true,
				noRecords: {
					template: "데이터가 생성되고 있습니다."
				},
				height: 800,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					if($("#verf-grid").data("kendoGrid").dataSource.total() != 0) {
						kendo.ui.progress($("#verf-grid"), false);
						$(".excelDownBtn").attr("disabled", false);
	//					$(".grayDiv").parent().css("background-color", "lightgray");
					}
				},
                excel: { allPages: true },
                excelExport : function(e){
					
					if($("#verf-grid").data("kendoGrid").dataSource.total() == 0) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
						var sheet = e.workbook.sheets[0];
						var columnVal = sheet.rows[0].cells;
						
				        // 엑셀에 HTML태그가 표시되어서 모든 열 타이틀에서 HTML 태그 제거
				        for(var i=0; i<columnVal.length; i++) {
							columnVal[i].value = columnVal[i].value.replace(/<[^>]+>/g, '');
						}
						// 엑셀에 천자리 콤마. 쿼리에서 처리할 수도 있겠지만 불안함
						for(var i=0; i<sheet.rows.length; i++) {
							for(var j=0; j<sheet.rows[i].cells.length; j++) {
								if(sheet.rows[i].cells[j].value > 999) {
									sheet.rows[i].cells[j].value = FormatNumber(sheet.rows[i].cells[j].value);
								} else {
									sheet.rows[i].cells[j].value = sheet.rows[i].cells[j].value.toString();
								}
							}
						}
						
						e.workbook.fileName = "운전자격확인 시간별 통계("+excelDate+")-"+excelMthd+".xlsx";
						e.workbook.sheets[0].title = "운전자격확인결과("+excelMthd+")";
						
					}
				}
			});
		},
		
		/**
		 * @name         : verfResutlGrid
		 * @description  : 자격검증 사업자별 통계
		 * @date         : 2024. 02. 07
		 * @author       : 김경룡
		 */
		verfResutlGrid: function() {
			resultExcelDrop   = $("#verfResultDrop").val();
			resultExcelcmpNm  = $("#verfOfCompany").val();
			resultExcelcarReg = $("#temporaryNum").val();
			resultExcelMonth  = $("#verfResultDatePick").val();
			
			$("#verfResult-grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/stts/verfStts/verfResult',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.resultType   = resultExcelDrop;
							options.companyNm    = resultExcelcmpNm;
							options.carReg       = resultExcelcarReg;
							options.monthDt      = resultExcelMonth;
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
				/* crosstab으로 c00~c51까지 컬럼 표현 */
				columns: [
					{"field": "sn", "title": "순번", locked: true, "template": "#: sn#", "width": "60px;"},
					{"field": "coNm", "title": "사업자명", locked: true, "template": "#= coNm#", "width": "270px;"},
					{"field": "cd00", "title": "정상", "template": "#if(cd00 == 0){#<div class='grayRDiv'>#= FormatNumber(cd00)#</div>#}"
																+"else {##= FormatNumber(cd00)##}#", "width": "120px;"},
					{"field": "cd01", "title": "면허정보없음", "template": "#if(cd01 == 0){#<div class='grayRDiv'>#= FormatNumber(cd01)#</div>#}"
																+"else {##= FormatNumber(cd01)##}#", "width": "120px;"},
					{"field": "cd02", "title": "재발급된면허", "template": "#if(cd02 == 0){#<div class='grayRDiv'>#= FormatNumber(cd02)#</div>#}"
																+"else {##= FormatNumber(cd02)##}#", "width": "120px;"},
					{"field": "cd03", "title": "분실된면허", "template": "#if(cd03 == 0){#<div class='grayRDiv'>#= FormatNumber(cd03)#</div>#}"
																+"else {##= FormatNumber(cd03)##}#", "width": "120px;"},
					{"field": "cd04", "title": "사망취소된면허", "template": "#if(cd04 == 0){#<div class='grayRDiv'>#= FormatNumber(cd04)#</div>#}"
																+"else {##= FormatNumber(cd04)##}#", "width": "120px;"},
					{"field": "cd11", "title": "취소된면허", "template": "#if(cd11 == 0){#<div class='grayRDiv'>#= FormatNumber(cd11)#</div>#}"
																+"else {##= FormatNumber(cd11)##}#", "width": "120px;"},
					{"field": "cd12", "title": "정지된면허", "template": "#if(cd12 == 0){#<div class='grayRDiv'>#= FormatNumber(cd12)#</div>#}"
																+"else {##= FormatNumber(cd12)##}#", "width": "120px;"},
					{"field": "cd13", "title": "기간중취소면허", "template": "#if(cd13 == 0){#<div class='grayRDiv'>#= FormatNumber(cd13)#</div>#}"
																+"else {##= FormatNumber(cd13)##}#", "width": "120px;"},
					{"field": "cd14", "title": "기간중정지면허", "template": "#if(cd14 == 0){#<div class='grayRDiv'>#= FormatNumber(cd14)#</div>#}"
																+"else {##= FormatNumber(cd14)##}#", "width": "120px;"},
					{"field": "cd21", "title": "정보불일치(이름)", "template": "#if(cd21 == 0){#<div class='grayRDiv'>#= FormatNumber(cd21)#</div>#}"
																+"else {##= FormatNumber(cd21)##}#", "width": "120px;"},
					{"field": "cd22", "title": "정보불일치(생년월일)", "template": "#if(cd22 == 0){#<div class='grayRDiv'>#= FormatNumber(cd22)#</div>#}"
																+"else {##= FormatNumber(cd22)##}#", "width": "160px;"},
					{"field": "cd23", "title": "정보불일치(암호일련번호)", "template": "#if(cd23 == 0){#<div class='grayRDiv'>#= FormatNumber(cd23)#</div>#}"
																+"else {##= FormatNumber(cd23)##}#", "width": "170px;"},
					{"field": "cd24", "title": "정보불일치(종별)", "template": "#if(cd24 == 0){#<div class='grayRDiv'>#= FormatNumber(cd24)#</div>#}"
																+"else {##= FormatNumber(cd24)##}#", "width": "120px;"},
					{"field": "cd25", "title": "필수값누락(대여기간)", "template": "#if(cd25 == 0){#<div class='grayRDiv'>#= FormatNumber(cd25)#</div>#}"
																+"else {##= FormatNumber(cd25)##}#", "width": "150px;"},
					{"field": "cd31", "title": "암호화안된면허", "template": "#if(cd31 == 0){#<div class='grayRDiv'>#= FormatNumber(cd31)#</div>#}"
																+"else {##= FormatNumber(cd31)##}#", "width": "120px;"},
					{"field": "cd51", "title": "검증실패", "template": "#if(cd51 == 0){#<div class='grayRDiv'>#= FormatNumber(cd51)#</div>#}"
																+"else {##= FormatNumber(cd51)##}#", "width": "120px;"},
					{"field": "tot", "title": "<span style='font-weight: bold;'>합계</span>", "template": "#if(tot == 0){#<div class='grayRDiv'>#= FormatNumber(tot)#</div>#}"
																+"else {##= FormatNumber(tot)##}#", "width": "120px;"},
				],
				navigatable: true,
				scrollable: true,
				pageable: {
					pageSizes: [5, 10, 20],
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
//					kendo.ui.progress($(document.body), false);  
//					$(".grayRDiv").parent().css("background-color", "lightgray");
					$(".excelDownBtn").attr("disabled", false);
				},
                excel: { allPages: true },
                excelExport : function(e){
					if($("#verfResult-grid").data("kendoGrid").dataSource.total() == 1) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
						var sheet = e.workbook.sheets[0];
						var columnVal = sheet.rows[0].cells;
						
						// 엑셀에 HTML태그가 표시되어서 모든 열 타이틀에서 HTML 태그 제거
				        for(var i=0; i<columnVal.length; i++) {
							columnVal[i].value = columnVal[i].value.replace(/<[^>]+>/g, '');
						}
						// 엑셀에 천자리 콤마. 쿼리에서 처리할 수도 있음
						for(var i=0; i<sheet.rows.length; i++) {
							for(var j=0; j<sheet.rows[i].cells.length; j++) {
								if(sheet.rows[i].cells[j].value > 999) {
									sheet.rows[i].cells[j].value = FormatNumber(sheet.rows[i].cells[j].value);
								} else {
									sheet.rows[i].cells[j].value = sheet.rows[i].cells[j].value.toString();
								}
							}
						}
						
						e.workbook.fileName = "운전자격확인 사업자별 통계("+excelDateResult+").xlsx";
						e.workbook.sheets[0].title = "운전자격확인결과";
					}
				}
			});
		},
		
		/**
		 * @name         : verfDropdown
		 * @description  : 운전자격 검증 드롭다운
		 * @date         : 2024. 02. 05
		 * @author       : 김경룡
		 */
		verfDropdown: function() {
			// 시간별 검증수단
			$("#checkMthd").kendoDropDownList({
				optionLabel: "전체",
				dataTextField: "cd_nm",
				dataValueField: "cd",
				dataSource: [
					{"cd": "4", "cd_nm": "API"},
					{"cd": "123", "cd_nm": "웹, 모바일 등"}
				],
				value: "cd"
			});
			
			// 년월일
			$("#verfResultDateType").kendoDropDownList({
				dataTextField: "cd_nm",
				dataValueField: "cd",
				dataSource: [
					{"cd": "1", "cd_nm": "연"},
					{"cd": "2", "cd_nm": "월"},
					{"cd": "3", "cd_nm": "일"}
				],
				value: "cd",
				change: function() {
					var val = this.value();
					if(val == '1') {
						$("#verfResultDatePick").kendoDatePicker({
							value: new Date(),
							format: "yyyy",
							parseFormats: ["yyyy"],
							min: new Date('2023-01-01'),
							max: new Date(),
							start: "decade",
			    			depth: "decade"
						});
					} else if(val == '2') {
						$("#verfResultDatePick").kendoDatePicker({}).setOptions({
							format: "yyyy-MM",
							parseFormats: ["yyyy-MM"],
							start: "year",
			    			depth: "year"
						});
					} else if(val == '3') {
						
					}
				}	
			});
			
			// 결과별 검증결과
			ajax(false, contextPath+'/stts/verfStts/verfResultDrop', 'body', '처리중입니다.', {}, function (data) {
				$("#verfResultDrop").kendoDropDownList({
					optionLabel: "전체",
					dataTextField: "cdNm",
					dataValueField: "cd",
					dataSource: data,
					value: "cd"
				});
			});
			
			// 임시번호판 유무
			$("#temporaryNum").kendoDropDownList({
				optionLabel: "(임시번호포함)전체",
				dataTextField: "cd_nm",
				dataValueField: "cd",
				dataSource: [
					{"cd": 1, "cd_nm": "99임9999 조회 "},
					{"cd": 0, "cd_nm": "99임9999 미포함"}
				],
				value: "cd"
			});
		}
    };
    
    $statistics.datePicker = {
		/**
		 * @name         : verfDatePick
		 * @description  : 자격검증 시간별 통계 dataPicker
		 * @date         : 2024. 01. 31
		 * @author       : 김경룡
		 */	
		verfDatePick: function() {
			$("#verfDatePick").kendoDatePicker({
				value: new Date(),
				format: "yyyy-MM",
				parseFormats: ["yyyy-MM"],
				min: new Date('2023-01-01'),
				max: new Date(),
				start: "year",
    			depth: "year"
			}).width(10);

			excelDate = $("#verfDatePick").val();	
			excelMthd = $("#checkMthd").data("kendoDropDownList").text();
		},
		
		/**
		 * @name         : verfResultDatePick
		 * @description  : 자격검증 결과별 통계 dataPicker
		 * @date         : 2024. 01. 31
		 * @author       : 김경룡
		 */	
		verfResultDatePick: function() {
			$("#verfResultDatePick").kendoDatePicker({
				value: new Date(),
				format: "yyyy",
				parseFormats: ["yyyy"],
				min: new Date('2023-01-01'),
				max: new Date(),
				start: "decade",
    			depth: "decade"
			}).width(10);

			excelDateResult = $("#verfResultDatePick").val();	
		}
	};
	
	$statistics.event = {
		
		/**
		 * @name         : excelDown
		 * @description  : 엑셀 다운로드
		 * @date         : 2024. 02. 01
		 * @author       : 김경룡
		 */
		excelDown: function(event) {
			if(event.target.closest("#timeMonth") != null) {
				$("#verf-grid").data("kendoGrid").saveAsExcel();
			} else if(event.target.closest("#resultCmp") != null) {
				if($("#verfResult-grid").data("kendoGrid").dataSource.total() == 1) {
					alert("데이터가 없어 다운로드를 할 수 없습니다.");
				} else {
					$("#verfResult-grid").data("kendoGrid").saveAsExcel();
				}
			}
		},
		
		/**
		 * @name         : verfCountData
		 * @description  : 운전자격검증 통계 데이터
		 * @date         : 2024. 02. 01
		 * @author       : 김경룡
		 */			
		verfCountData: function() {
			$(".excelDownBtn").attr("disabled", true);
			
			var param ={
				"bsM"  : $("#verfDatePick").val(),
				"mthd" : $("#checkMthd").val()
			};

			$statistics.event.verfColumn();
			$statistics.ui.verfCountGrid();
			
			kendo.ui.progress($("#verf-grid"), true);
			
			ajax(true, contextPath + '/stts/verfStts/verfCount', 'body', '조회중입니다', param, function(data) {
				if(data != null) {
					verfCountData = [];
					
					var dayTotalObj = {};
					
					for(var t=0; t<24; t++) {
						var obj = {"str": (t < 10 ? "0"+t : t)+":00", "end": ((t+1) < 10 ? "0"+(t+1) : (t+1))+":00" == "24:00" ? "00:00" : ((t+1) < 10 ? "0"+(t+1) : (t+1))+":00"};
						if(data.length == 28) {
							for(var i=0; i<28; i++) {obj[i+1] = data[i][t];}
						} else if(data.length == 29) {
							for(var i=0; i<29; i++) {obj[i+1] = data[i][t];}
						} else if(data.length == 30) {
							for(var i=0; i<30; i++) {obj[i+1] = data[i][t];}
						} else {
							for(var i=0; i<31; i++) {obj[i+1] = data[i][t];}
						}
						
						// 시간별 토탈 값 더하기
						var objSum = 0;
						for(var i in obj) {
							if(i != 'str' && i != 'end') {
								objSum += obj[i];
							}
						}
						obj.hourTotal = objSum;
						
						verfCountData.push(obj);
					}
					
					// 일별 토탈 값 더하기
					for(var i in verfCountData[0]) {
					var daySum = 0;
						if(i != 'str' && i != 'end') {
							for(var j=0; j<verfCountData.length; j++) {
								daySum += verfCountData[j][i];
							}
						}
						dayTotalObj[i] = daySum;
					}
					dayTotalObj.str = "일별";
					dayTotalObj.end = "합계";
					
					verfCountData.push(dayTotalObj);
				
					$("#verf-grid").data("kendoGrid").setDataSource(verfCountData);
				}
			});
		},
		
		/**
		 * @name         : verfColumn
		 * @description  : 운전자격 검증 통계 title 생성
		 * @date         : 2024. 01. 31
		 * @author       : 김경룡
		 */
		verfColumn: function() {
			dayColumns = [
				{"field": "str", "title": "시작시각", "locked": true, "template": "<span style='color: black;'>#:str #</span>", "width": "70px;"},
				{"field": "end", "title": "종료시각", "locked": true, "template": "<span style='color: black;'>#:end #</span>", "width": "70px;"}
			];
			var dayList = [];
			var day = null;
			var currentDate = new Date($("#verfDatePick").val());
			var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
			var lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
			
			for (var d = firstDayOfMonth; d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
			    
			    switch (d.getDay()) {
					case 0: day = '(일)'; break;
					case 1: day = '(월)'; break;
					case 2: day = '(화)'; break;
					case 3: day = '(수)'; break;
					case 4: day = '(목)'; break;
					case 5: day = '(금)'; break;
					default : day = '(토)'; break;
				}
				
				dayList.push(d.getDate()+"일"+day);
			}
			
			for(var i=0; i<dayList.length; i++) {
				var colorTitle = "";
				if(dayList[i].includes("(일)") || dayList[i].includes("(토)")) {
					colorTitle = "<span style='color:red;'>"+dayList[i]+"</span>";
				} else {
					colorTitle = dayList[i];
				}
				dayColumns.push({"field": (i+1).toString(), "title": colorTitle,
								 "template": "#if(data["+(i+1)+"] == 0) {#<div class='grayDiv'>#= FormatNumber(data["+(i+1)+"])#</div>#}"
								 			+ "else {##= FormatNumber(data["+(i+1)+"])##}#", "width": "100px;"});
			}
			
			dayColumns.push({"field": "hourTotal", "title": "<span style='font-weight: bold;'>시간별 합계</span>", 
							 "template": "#if(hourTotal == 0) {#<div class='grayDiv'>#= FormatNumber(hourTotal)#</div>#}"
							 			+ "else {##= FormatNumber(hourTotal)##}#", "width": "120px;"})
		},
		
		/**
		 * @name         : searchBtn
		 * @description  : 조회버튼
		 * @date         : 2024. 02. 05
		 * @author       : 김경룡
		 */
		searchBtn: function() {
			// 시간별
			$("#searchTimeBtn").on("click", function() {
				excelDate = $("#verfDatePick").val();
				excelMthd = $("#checkMthd").data("kendoDropDownList").text();
				
				$("#verf-grid").empty();
				$statistics.event.verfCountData();
			});
			
			// 결과별
			$("#searchResultBtn").on("click", function() {
				resultExcelDrop   = $("#verfResultDrop").val();
				resultExcelcmpNm  = $("#verfOfCompany").val();
				resultExcelcarReg = $("#temporaryNum").val();
				resultExcelMonth  = $("#verfResultDatePick").val();
				
				excelDateResult = $("#verfResultDatePick").val();
				
				$(".excelDownBtn").attr("disabled", true);
				
				$("#verfResult-grid").data("kendoGrid").dataSource.page(1);
			});
		},
		
		/**
		 * @name         : tmTabBtn
		 * @description  : 시간/월별 버튼
		 * @date         : 2024. 02. 06
		 * @author       : 김경룡
		 */
		tmTabBtn: function() {
			$(".tmDv").click(function() {
				if(!$(this).hasClass("selected")) {
					$(this).addClass("selected");
					$(".rmDv").removeClass("selected");
					$(".rmCond").hide();
					$(".tmCond").show();
					
					$("#verfResult-grid").empty();
					
					// 결과별 조건 초기화
					$("#verfResultDatePick").val(toMonth);
					$("#verfResultDrop").data("kendoDropDownList").select(0);
					$("#temporaryNum").data("kendoDropDownList").select(0);
					$("#verfOfCompany").val('');
					
					$statistics.event.verfCountData();
				}
			});
		},
		
		/**
		 * @name         : rmTabBtn
		 * @description  : 결과/방법별 버튼
		 * @date         : 2024. 02. 06
		 * @author       : 김경룡
		 */
		rmTabBtn: function() {
			$(".rmDv").click(function() {
				if(!$(this).hasClass("selected")) {
//					kendo.ui.progress($(document.body), true);  그리드꺼랑 중복됨
					
					$(this).addClass("selected");
					$(".tmDv").removeClass("selected");
					$(".tmCond").hide();
					$(".rmCond").show();
					
					$(".excelDownBtn").attr("disabled", true);
					
					$statistics.ui.verfResutlGrid();
					
					$("#verf-grid").empty();
					
					$("#verfDatePick").val(toMonth);
					$("#checkMthd").data("kendoDropDownList").select(0);
				}
			});
		},
		
		/**
		 * @name         : enterKey
		 * @description  : 사업자명 작성 후, 엔터키
		 * @date         : 2024. 02. 08
		 * @author       : 김경룡
		 */
		enterKey: function() {		
		// 엔터키 검색 함수
			$("#verfOfCompany").on("keydown", function(e) {
				if(e.key === "Enter") {$("#searchResultBtn").click();}
			});
		}
	};

}(window, document, jQuery));