(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$car = W.$car || {};
    
	//그리드 처음 로딩여부
	var firstLoad = true;
    var auth='';
	var excelParams = '';
    $(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		$car.ui.pageLoad();		//최초 페이지 로드 시
		$car.event.setUIEvent();
    });

	$car.ui = {
		
		pageLoad : function() {
			
			 var detailUseYn = function() {
				$("#useYn").prop("readonly", false);
				$("#useYn").kendoDropDownList({
					dataSource: {
						data: ["Y", "N"]
					}
				});
			 } 
			
			 if(/^(M01|K01|Z01|D01)$/.test(authrtCd)){
				 $car.ui.searchCtpvSgg();
				 $(".update_btn").remove();
				 auth = 'mkzd';
			 } else if(/^(G01|G02)$/.test(authrtCd)) {
				 $car.ui.searchCtpvSggG012();
				 $(".update_btn").remove();
				 auth = 'g01';
			 } else if(/^(S01|S02|S03)$/.test(authrtCd)) {
				 detailUseYn();
				 $('.admin').remove();
				 $("#bookmarkOrderBox").show();
				 auth = 's0123';
			 }
			 
			 $("#searchWrd").on('focus keyup', function() {
				var regex =
				/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
				$(this).val($(this).val().replace(regex,''));
			 });
			 
			 $car.ui.searchInfo();
			 $car.ui.defectGrid();
			 if(auth=='s0123'){
			 	$car.ui.agencyGrid();
			 }else{
			 	$car.ui.kendoGrid();
			 }
		},
		
		/** 조회조건 설정*/
		searchCtpvSgg : function(){
			var param = {};
			var screenWidth = D.documentElement.clientWidth;
		
			var fnCtpvNm = function () {
				var dropdown1;
		        $car.comm.syncAjax(true, true, contextPath+'/sys/carManage/selectCtpvNm', 'body', '처리중입니다.', param, function (data) {
			 		$('#searchCtpvNm').kendoDropDownList({
			            optionLabel: "시도(전체)",
			            dataTextField: "ctpv_nm",
			            dataValueField: "ctpv_cd",
			            dataSource: data,
						value:"ctpv_cd",
						change: function(){
							if(this.value == ''){
								$('#searchSggNm').data("kendoDropDownList").setDataSource(null);
							} else {
								param.ctpvCd = this.value();
								fnSggNm(param);
							}
						}
					});
					
				    dropdown1 = $('#searchCtpvNm').data("kendoDropDownList");
					dropdown1.select(1);
					if(screenWidth <= 640){
						dropdown1.wrapper.width("100%");
					} else {
						dropdown1.wrapper.width(160);
					} 
					
					// change 아닐 때: 초기값에 따라 시구군 DropdownList에 데이터 로드
				    if ($('#searchCtpvNm').data("kendoDropDownList").value() !== '') {
					   var initialParam = {
						   ctpvCd: $('#searchCtpvNm').data("kendoDropDownList").value()
					   };
			           fnSggNm(initialParam);
				    }
				});
	       }
		   
		   var selectFirstLoad = true;
		   var fnSggNm = function(param) {
				var dropdown2;
			    // 최초 로드 '종로구(11)'. 이후엔 optionLabel 선택.
			    var selectOne = selectFirstLoad ? 1 : 0;
		    	$car.comm.syncAjax(true, true, contextPath+'/sys/carManage/selectSggNm', 'body', '처리중입니다.', param, function (data) {
					$('#searchSggNm').kendoDropDownList({
			            optionLabel: "시구군(전체)",
			            dataTextField: "sgg_nm",
			            dataValueField: "sgg_cd",
			            dataSource: param.ctpvCd !== '' ? data : {},
						value :"sgg_cd"
			        });
					
			        
			        dropdown2 = $('#searchSggNm').data("kendoDropDownList");
					dropdown2.select(selectOne);
					if(screenWidth <= 640){
						dropdown2.wrapper.width("100%");
					} else {
						dropdown2.wrapper.width(180);
					}
					   
					selectFirstLoad = false; 
				});
			}
			
		    fnCtpvNm();
		},
		/** 조회조건 설정 G01, G02*/
		searchCtpvSggG012 : function(){
			var param = {
				regCmptncCd: getCmptncZoneCd
			};
			var ctpvCd  = param.regCmptncCd.substring(0,2);
			var sggCd = param.regCmptncCd.substring(2,5);
			var ctpvDivisionCd = param.regCmptncCd.substring(2,4);
			
			// 시도
			$car.comm.syncAjax(false, true, contextPath + '/sys/carManage/selectCtpvNm', 'body', '처리중입니다.', param, function(data) {
				$('#searchCtpvNm').kendoDropDownList({
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_cd"
				});
			});
			
			// 시군구
			if (param.regCmptncCd == '3611000000') {
				// '세종특별자차시'는 sgg_nm: null 이어서 별도 설정
				$('#searchSggNm').kendoDropDownList({
					optionLabel: "시구군(전체)",
				});
			} else if(ctpvDivisionCd === "00") {
				//'광역시', '도' 권한 접속 시 하위 지역 및 옵션라벨 설정
				$car.comm.syncAjax(false, true, contextPath + '/sys/carManage/selectSggNm', 'body', '처리중입니다.', param, function(data) {
					$('#searchSggNm').kendoDropDownList({
						optionLabel: "시구군(전체)",
						dataTextField: "sgg_nm",
						dataValueField: "sgg_cd",
						dataSource: data,
						value: "sgg_cd"
					});
				});
			} else {
				$car.comm.syncAjax(false, true, contextPath + '/sys/carManage/selectSggNm', 'body', '처리중입니다.', param, function(data) {
					$('#searchSggNm').kendoDropDownList({
						dataTextField: "sgg_nm",
						dataValueField: "sgg_cd",
						dataSource: data,
						value: "sgg_cd"
					});
				});
			}
			
			var dropDown1 = $("#searchCtpvNm").data("kendoDropDownList");
			var dropDown2 = $('#searchSggNm').data("kendoDropDownList");
			var screenWidth = D.documentElement.clientWidth;
	        if(screenWidth <= 640){
				dropDown1.wrapper.width("100%");								
				dropDown2.wrapper.width("100%");								
			} else {
				dropDown1.wrapper.width(160);
				dropDown2.wrapper.width(180);
			}
		},
		
		searchInfo : function() {
			var dataForMKZD = [
				{name: "차량등록번호", value: "vhclRegNo"},
			 	{name: "법인등록번호", value: "crno"},
			 	{name: "사업자등록번호", value: "brno"},
				{name: "차대번호", value: "vin"},
				{name: "차종", value: "carmdl"},
				{name: "차량명", value: "vhclNm"},
			 	{name: "연식", value: "modelYear"},
			 	{name: "사용여부", value: "useYn"},
			 	{name: "결함여부", value: "defectYn"}
			];
			var dataForG012 = [
				{name: "차량등록번호(관할 내)", value: "vhclRegNo"},
				{name: "차량등록번호(전체)", value: "vhclRegNoFull"},
			 	{name: "법인등록번호", value: "crno"},
			 	{name: "사업자등록번호", value: "brno"},
				{name: "차대번호", value: "vin"},
				{name: "차종", value: "carmdl"},
				{name: "차량명", value: "vhclNm"},
			 	{name: "연식", value: "modelYear"},
			 	{name: "사용여부", value: "useYn"},
			 	{name: "결함여부", value: "defectYn"}
			];
			var dataForS123 = [
				{name: "차량등록번호", value: "vhclRegNo"},
			 	{name: "사업자등록번호", value: "brno"},
				{name: "차대번호", value: "vin"},
				{name: "차종", value: "carmdl"},
				{name: "차량명", value: "vhclNm"},
			 	{name: "연식", value: "modelYear"},
			 	{name: "사용여부", value: "useYn"},
			 	{name: "결함여부", value: "defectYn"}
			];
			//권한에 따라 dropdown3목록 지정
			var data;
			if(auth === "mkzd"){
				data = dataForMKZD;
			} else if( auth === "g01"){
				data = dataForG012;
			} else if( auth === "s0123"){
				data = dataForS123;
			}
			
			var dropdown3= $("#searchCol").kendoDropDownList({
				dataSource: data,
		        dataTextField: "name",
		        dataValueField: "value",
			}).data("kendoDropDownList");
	        //너비 지정
	        var screenWidth = D.documentElement.clientWidth;
	        if(screenWidth <= 640){
				dropdown3.wrapper.width("100%");
		    } else {
				dropdown3.wrapper.width(199);
			}
			
			// 사용여부, 결함여부
			$("#searchYn").kendoDropDownList({
				optionLabel: "선택",
				dataSource: {
						data: ["Y", "N"]
					}
			});
			
			$car.ui.selectInfo();
		},
		
		selectInfo : function() {
			
			//드랍다운3 선택값 변경할 때:
			$("#searchCol").on('change', function(){
				$("#searchWrd").off('focus keyup');
				var eventId = $(this).val();
				
				if(auth ==="mkzd"){
					
				}else if(auth === "g01"){
					g012_select_vhclRegNoFull(eventId);
				}else if(auth === "s0123"){
					
				}
				
				//공통
				searchWrd_placeholder(eventId);
				select_useYn(eventId);
			});
			
			var select_useYn = function(eventId) {
				if(eventId === "useYn" || eventId === "defectYn" ){
					$("#searchSelectYn").show();
					$("#searchYn").data("kendoDropDownList").value("");
					$("#searchWrd").val("").hide();
				} else {
					$("#searchSelectYn").hide();
					$("#searchYn").data("kendoDropDownList").value("");
					$("#searchWrd").val("").show();
				}
			}
			
			var searchWrd_placeholder = function(eventId) {
				var placeholderText = "";
				switch(eventId) {
					case "vhclRegNoFull":
						placeholderText = "정확한 번호를 입력해 주세요.";
				       	break;
					case "crno" :
					case "brno" :
						placeholderText = "'-'을 제외하고 입력해주세요.";
						$("#searchWrd").on('focus keyup', function() {
						  $(this).val($(this).val().replace(/[^0-9]/g, ""));
						});						    
						break;
					default:
						placeholderText = "검색조건을 입력하세요.";
				}
				$("#searchWrd").attr("placeholder", placeholderText);
			}
			
			var g012_select_vhclRegNoFull = function(eventId) {
				/** G012가 차량전체 조회할 때 지역(dropdown1,2) 설정 */
				var ctpvDivisionCd = getCmptncZoneCd.substring(2, 4)
				
				var dropdown1 = $('#searchCtpvNm').data("kendoDropDownList");
				var dropdown2 = $('#searchSggNm').data("kendoDropDownList");
				
				if(ctpvDivisionCd ==="00" && eventId === "vhclRegNoFull"){
					var ctpvNewObject = { ctpv_cd: "", ctpv_nm: "시도(전체)", code: "a1" };
					dropdown1.dataSource.insert(0, ctpvNewObject);
				    dropdown1.select(0);
					dropdown2.select(0);
				} else if(ctpvDivisionCd ==="00" && eventId !== "vhclRegNoFull") {
					var deleteData1 = dropdown1.dataSource.data().find(function(item) {
    					return item.code === "a1";
					});
					if(deleteData1){
						dropdown1.dataSource.remove(deleteData1);
						dropdown1.select(0);
						dropdown2.select(0);
					}
				} 
				
				if(ctpvDivisionCd !=="00" && eventId === "vhclRegNoFull") {
					var ctpvNewObject = { ctpv_cd: "", ctpv_nm: "시도(전체)", code: "a1" };
					var sggNewObject = { sgg_cd: "", sgg_nm: "시구군(전체)", code: "a2" };
					
					if(dropdown2.dataSource.data()[0]){
						dropdown1.dataSource.insert(0, ctpvNewObject);
					    dropdown1.select(0);
						dropdown2.dataSource.insert(0, sggNewObject);
					    dropdown2.select(0);
					}else {
						dropdown1.dataSource.insert(0, ctpvNewObject);
					    dropdown1.select(0);
					}
				} else if(ctpvDivisionCd !=="00" && eventId !== "vhclRegNoFull") {
					var deleteData1 = dropdown1.dataSource.data().find(function(item) {
    					return item.code === "a1";
					});
					var deleteData2 = dropdown2.dataSource.data().find(function(item) {
    					return item.code === "a2";
					});
					if(deleteData1 && deleteData2){
						dropdown1.dataSource.remove(deleteData1);
						dropdown1.select(0);
						dropdown2.dataSource.remove(deleteData2);
						dropdown2.select(0);
					} else if(deleteData1){
						dropdown1.dataSource.remove(deleteData1);
						dropdown1.select(0);
					}
				}
			}
		},
			
		kendoGrid : function() {
			$("#carGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/carManage/selectCarList',
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
								var responseData = JSON.parse(xhr.responseText);
								if (responseData.errorMsg) {
			                        alert(responseData.errorMsg);
								}
							}
						},
						parameterMap: function(gridOptions){
							var options = $car.event.getParams({});
							excelParams = options;
                            searchFilterForExcelStream.setData(options);
							Object.assign(gridOptions, options);
                            return JSON.stringify(gridOptions);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					page: 1,
					pageSize: 10,
					serverPaging: true,
					serverSorting: true,
					autoBind: false,
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
                    { field: "rn", title: "순번", width:"60px", template: "#= !rn ? '' : rn #" },
                    { field: "vhclRegNo", title: "차량등록번호", width: "80px", template: "#= !vhclRegNo ? '-' : vhclRegNo #"},
                    { field: "vin", title: "차대번호", width: "101px", template: "#= !vin ? '-' : vin #" },
                    { field: "carmdl", title: "차종", width: "60px", template: "#= !carmdl ? '-' : carmdl #" },
                    { field: "mdlyr", title: "연식", width: "50px", template: "#= !mdlyr ? '-' : mdlyr #" },
                    { field: "regNm", title: "관할지", width: "100px", template: "#= !regNm ? '-' : regNm #" },
                    { field: "locationNm", title: "소재지", width: "100px", template: "#= !locationNm ? '-' : locationNm #" },
                    { field: "crno", title: "법인등록번호", width: "100px", template: "#= !crno ? '-' : toCorporateNumFormat(crno) #" },
                    { field: "coNm", title: "법인명", width: "100px", template: "#= !coNm ? '-': coNm #" },
                    { field: "ownrNm", title: "소유자명", width: "100px", template: "#= !ownrNm ? '-' : ownrNm #" },
                    { field: "useYn", title: "사용여부", width: "40px", template: "#= !useYn ? '-' : useYn #" },
					{ field: "defectYn", title: "결함여부", width: "40px", template: "#= !defectYn ? '-' : defectYn #"},
					{ field: "expryYmd", title: "만료일자", width: "80px", template: "#= !expryYmd ? '-' : expryYmd #"}
                ],
                
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					var formatTotal = FormatNumber(this.dataSource.total());
					$("#totCnt").text(formatTotal);
					kendo.ui.progress($(document.body), false);
				},
                change: $car.ui.rowClickEvent
			});
		},
		
		agencyGrid : function() {
			$("#carGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/carManage/selectCarList',
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
								var responseData = JSON.parse(xhr.responseText);
								if (responseData.errorMsg) {
			                        alert(responseData.errorMsg);
								}
							}
						},
						parameterMap: function(gridOptions){
							var options = $car.event.getParams({});
							excelParams = options;
							searchFilterForExcelStream.setData(options); 
							Object.assign(gridOptions, options);
							return JSON.stringify(gridOptions);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					page: 1,
					pageSize: 10,
					serverPaging: true,
					serverSorting: true,
					autoBind: false,
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
                    { field: "bookmark", width:"60px"
						, headerTemplate: "<button class='bookmark-btn thBmkBtn' value='N'><img src='" + contextPath + "/images/sub/star_n.png'></button>"
						, template:function(dataItem) {
					        var value = dataItem.regYn == "Y" ? "Y" : "N";
					        var imageName = value == "Y" ? "star_y.png" : "star_n.png";
					        return '<button class="bookmark-btn trBmkBtn" value="' + value + '"><img src="' + contextPath + '/images/sub/' + imageName + '"></button>';
					   	}
					},
                    { field: "rn", title: "순번", width:"60px", template: "#= !rn ? '' : rn #" },
                    { field: "vhclRegNo", title: "차량등록번호", width: "80px", template: "#= !vhclRegNo ? '-' : vhclRegNo #"},
                    { field: "vin", title: "차대번호", width: "101px", template: "#= !vin ? '-' : vin #" },
                    { field: "carmdl", title: "차종", width: "60px", template: "#= !carmdl ? '-' : carmdl #" },
                    { field: "mdlyr", title: "연식", width: "50px", template: "#= !mdlyr ? '-' : mdlyr #" },
                    { field: "locationNm", title: "소재지", width: "100px", template: "#= !locationNm ? '-' : locationNm #" },
                    { field: "crno", title: "법인등록번호", width: "100px", template: "#= !crno ? '-' : toCorporateNumFormat(crno) #" },
                    { field: "coNm", title: "법인명", width: "100px", template: "#= !coNm ? '-': coNm #" },
                    { field: "ownrNm", title: "소유자명", width: "100px", template: "#= !ownrNm ? '-' : ownrNm #" },
                    { field: "useYn", title: "사용여부", width: "40px", template: "#= !useYn ? '-' : useYn #" },
					{ field: "defectYn", title: "결함여부", width: "40px", template: "#= !defectYn ? '-' : defectYn #"},
					{ field: "expryYmd", title: "만료일자", width: "80px", template: "#= !expryYmd ? '-' : expryYmd #"}
                ],
                
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					var data = e.sender.dataSource.data();
					var chk = 0
					data.forEach(function(item) {
						if(item.regYn=="Y"){
							chk ++;
						}
					});
					
					if(chk == 10){
						$(".thBmkBtn").find("img").attr("src", contextPath + "/images/sub/star_y.png");
						$(".thBmkBtn").val("Y")
					}else{
						$(".thBmkBtn").find("img").attr("src", contextPath + "/images/sub/star_n.png");
						$(".thBmkBtn").val("null")
					}
					$(".trBmkBtn").on("click", function() {
						var param = {}
			            var button = $(this);
						param.vin = button.closest("tr").find("td").eq(3).text();
						var img = button.find("img");
								
			            if (button.val() == "N") {
							button.val("Y")
							img.attr("src", contextPath + "/images/sub/star_y.png");
							$car.event.insertBookmark(param);
							var trBtns = $("#carGrid").find("button");
							var chk = 0;
							trBtns.each(function(index, element) { 
								var btnVal = $(element).val();
								if(btnVal=="Y"){
									chk++;
								}
							});
							if(chk==10){
								$(".thBmkBtn").find("img").attr("src", contextPath + "/images/sub/star_y.png");
							}
			          	} else {
							button.val("N")
			                img.attr("src", contextPath + "/images/sub/star_n.png");
							$car.event.deleteBookmark(param);
							var trBtns = $("#carGrid").find("button");
							var chk = 0;
							trBtns.each(function(index, element) { 
								var btnVal = $(element).val();
								if(btnVal=="null"){
									chk++;
								}
							});
							if(chk!=10){
								$(".thBmkBtn").find("img").attr("src", contextPath + "/images/sub/star_n.png");
							}
			            }
			        });


					var formatTotal = FormatNumber(this.dataSource.total());
					$("#totCnt").text(formatTotal);
					kendo.ui.progress($(document.body), false);
				},
                change: function(e){
		            var selectedColumn = $('#carGrid_active_cell')
					var selectedColumnIndex = selectedColumn[0].cellIndex
		
		            var bookmarkColumnIndex = this.wrapper.find("th[data-field='bookmark']").index();
		
		            if (selectedColumnIndex !== bookmarkColumnIndex) {
		                $car.ui.rowClickEvent(e)
		            }
				}
			});
		},

		rowClickEvent : function(e) {
			$(".detail input").val('');
			$(".scrollBar02").scrollTop(0);
			
			var rows = e.sender.select();
			var data;
			
			rows.each(function(e) {
                var grid = $("#carGrid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });
            /** ownr left */
			var crno = !data.crno ? '-' : toCorporateNumFormat(data.crno);
			$('#crno').val(crno);
			$('#coNm').val(data.coNm);
			$('#ownrNm').val(data.ownrNm);
			
			/** ownr right */
			var brno = !data.brno ? "-" : toBizrnoNumFormat(data.brno);
			$('#brno').val(brno);
			/** ownr right - 지역 */
			if(!data.sggCd){
				var ctpvNm = '-';
				var sggNm = '' 
				$('#ctpvSggNm').val(ctpvNm + ' ' + sggNm);
			} else {
				ajax(false, contextPath+'/sys/carManage/selectCtpvSggNm', 'body', '처리중입니다.', { sggCd: data.sggCd }, function (sggNmData) {
					var ctpvNm = sggNmData.ctpv_nm;
					var sggNm = sggNmData.sgg_nm; 
					if(!sggNm){
						sggNm = '';
					}
					$('#ctpvSggNm').val(ctpvNm + ' ' + sggNm);
				});
			}
			
			/** car info  left */
			$('#vhclRegNo').val(!data.vhclRegNo ? "-" : data.vhclRegNo);
			$('#vin').val(!data.vin ? "-" : data.vin);
			$('#carmdl').val(!data.carmdl ? "-" : data.carmdl);
			$('#vhclNm').val(!data.vhclNm ? "-" : data.vhclNm);
			$('#mdlyr').val(!data.mdlyr ? "-" : data.mdlyr);
			$('#engineFom').val(!data.engineFom ? "-" : data.engineFom );
			
			/** car info  right */
			$('#sggNm').val(!data.locationNm ? "-" : data.locationNm);
			$('#frstRegYmd').val(!data.frstRegYmd ? "-" : data.frstRegYmd);
			$('#expryYmd').val(!data.expryYmd ? "-" : data.expryYmd);
			$('#regDt').val(!data.regDt ? "-" : data.regDt);
			$('#defectYn').val(!data.defectYn ? "-" : data.defectYn);
			if(auth === "s0123"){
				$('#useYn').data("kendoDropDownList").value(data.useYn);
			} else {
				$('#useYn').val(data.useYn);
			}		
			
			/** 결함정보 표출여부 */
			if(data.defectYn === 'Y'){
				$("#defectInfo").show();
				ajax(true, contextPath+'/sys/carManage/selectDefectList', 'body', '처리중입니다.', {vin : data.vin}, function (data) {
					$("#defectGrid").data("kendoGrid").setDataSource(data.data);
				});
			} else {
				$("#defectInfo").hide();
			}
			$(".detail_popup").addClass("view");
			
			/**
			 * 동일 row 다시 클릭할 수 있도록 선택 이후 선택 해제 처리
			 * 선택 배경 색을 유지하기 위해 배경색만 재지정
			 */	
		    rows.css("background-color", "#1274AC40");
		    var grid = $("#carGrid").data("kendoGrid");
		    grid.table.find("tr").not(rows).css("background-color", "");
		    grid.clearSelection();
			//
		},

		defectGrid : function() {
			$("#defectGrid").kendoGrid({
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
                     { title: "순번", width: "40px", field: "rn", template: "#: rn #" },
//					 {title: "결함유형", width: "60px", field: "defectNm", template: "#: defectNm #" },
                     {title: "발생일시", width: "100px", field: "ocrnDt", template: "#: ocrnDt #"},
					 {title: "결함내용", width: "150px", field: "defectsCn", template: "#: defectsCn #"},
					 {title: "조치여부", width: "60px", field: "actnYn",	template: "#: actnYn #"},
                     
                ],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
			});
		},
		
	};

    //이벤트 정의
   $car.event = {
	    
	    getParams : function(options) {
			options.searchChk = $("input[name='searchChk']:checked").val();
			options.regCmptncCd = $car.event.getAreaCd();
			options.searchCol = $("#searchCol").val();
			options.searchYn = $("#searchYn").val();
			options.searchWrd = $.trim($("#searchWrd").val());
			if($('#bookmarkOrder').is(':checked')){
				options.bookmarkOrder = "Y";
			}
			// 조건 입력 값이 없을 때 처리
			if(!options.searchYn && !options.searchWrd){
				delete options.searchCol;				
			}
			
			return options;
		},
		getAreaCd : function() {
			var sd ="";
			var sgg= "";
			if(firstLoad && auth == 'mkzd'){
			//최초 로드: 권한 mkzd 인 경우 처음 지역은 서울 종로구(1111)로 설정
				sd = '11';
				sgg = '11';	
				$("#searchCtpvNm").val(sd);
				$("#searchSggNm").val(sgg);
				firstLoad = false;
			} else if(firstLoad) {
			//최초 로드: 계정 정보의 지역코드
				sd = getCmptncZoneCd.substring(0,2);
				sgg = getCmptncZoneCd.substring(2,5);
				firstLoad = false;
			}else{
				sd = $("#searchCtpvNm").val();
				sgg = $("#searchSggNm").val();
			}
			
			//'도' 또는 '광역시'의 하위를 모두 조회하기 위한 설정
			if(sgg){
				var ctpvDivisionCd = sgg.substring(0, 2);	
				var sggDivisionCd = sgg.substring(2, 3);	
				
				if(ctpvDivisionCd === "00"){
					sgg = '';
				} else if(sggDivisionCd === '0') {
					sgg = sgg.substring(0, 2);
				}
			}
			return sd+sgg;
		},
	   	
	   
        setUIEvent : function() {
			// 엔터로 검색
			document.addEventListener('keydown', function(event) {
				if (event.key === "Enter") {
					searchMain();
			    }
			});
			
			$('#searchBtn').on('click', function() {
				searchMain();
			});
			
			var searchMain = function () {
			    var searchCol = $("#searchCol").val();
			    var searchWrd = $.trim($("#searchWrd").val());
			    var grid = $("#carGrid").data("kendoGrid");
			    if (searchCol === 'vhclRegNoFull' && !searchWrd) {
			        alert("정확한 차량등록번호를 입력해 주세요.");
			    } else {
			        grid.dataSource.page(1);
			    }
			};
			
			$('.update_btn').click(function(){
				$car.event.updateCar();
			});
			
			$('#excelBtn').click(function(){
				$car.event.excelBtn();
			});
			$('#excelBtnStream').click(function(){
				$car.event.excelBtnStream();
			});
			
			//테스트용: POI엑셀 다운과 스트리밍 다운을 동시 진행.
			$('#excelBtnBothTest').click(function(){
				$car.event.excelBtn();
				$car.event.excelBtnStream();
			});
			
			
			$(".thBmkBtn").on("click", function() {
				var button = $(this);
				if(button.val() == "Y"){
					button.val("N");
					$(".thBmkBtn").find("img").attr("src", contextPath + "/images/sub/star_n.png");
					var trBtns = $("#carGrid").find("button");
					trBtns.each(function(index, element) { 
						var btnVal = $(element).val();
						if(btnVal=="Y"){
							 $(element).trigger("click");
						}
					});
				}else{
					button.val("Y");
					$(".thBmkBtn").find("img").attr("src", contextPath + "/images/sub/star_y.png");
					var trBtns = $("#carGrid").find("button");
					trBtns.each(function(index, element) {
						var btnVal = $(element).val(); 
						if(btnVal=="N"){
							 $(element).trigger("click");
						}
					});
				}
			});
		},
		
		//엑셀다운
	    excelBtn : function(){
			var options={};
			var params = $car.event.getParams(options);
			
			var totalRowCount = $("#carGrid").data("kendoGrid").dataSource.total();
			excelDownAjax("/sys/carManage/excelDown", params, "carmanage", totalRowCount);
		},
		
		//엑셀다운 스트리밍
	    excelBtnStream : function(){
			var options={};
			var params = excelParams;
			var totalRowCount = $("#carGrid").data("kendoGrid").dataSource.total();
			excelDownStream("/sys/carManage/excelDownStream", params, totalRowCount);
		},
	
		
		updateCar : function() {
			var selectedUseYn = $('#useYn').data("kendoDropDownList").value();
			var param = {
				useYn: selectedUseYn,
				vin: $('#vin').val()
			}
			ajax(false, contextPath+"/sys/carManage/updateCar", "", "", param, function(result) {
	            if (result != null && result=="success"){
					alert("수정이 완료되었습니다.");
					
					$("#carGrid").data("kendoGrid").dataSource.read();
				}
			});
		},
		
		insertBookmark : function(p) {
			var param = p;
			ajax(false, contextPath+"/sys/carManage/insertBookmark", "body", "처리중입니다", param, function(result) {
	           //alert(result.message);
			});
			
		},
		
		deleteBookmark : function(p) {
			var param = p;
			ajax(false, contextPath+"/sys/carManage/deleteBookmark", "body", "처리중입니다", param, function(result) {
	           //alert(result.message);
			});
			
		}
		
		
   };
   
   $car.comm = {
		/**
		 * @Description : AJAX 통신 Sync Choice 모드
		 * @Author      : 비동기 처리 (토근포함)
		 * @Date        :
		 */

		syncAjax: function(choiceSync, isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

			var loader = isLoading($(isLodingElement)[0], {
				type: "overlay",
				class: "fa fa-refresh fa-spin",
				text: beforeSendText
			});

			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");

			$.ajax({
				url: url,
				type: 'POST',
				async: choiceSync,
				contentType: "application/json",
				data: JSON.stringify(ajaxParam),
				dataType: "json",
				beforeSend: function(xhr) {

					xhr.setRequestHeader(header, token);

					if (isLodingBool) {
						loader.loading();
					}
				},
				success: function(data) {
					if (fn_success != null || fn_complete != undefined) {
						fn_success(data);
					}
				},
				error: function(xhr, textStatus) {
					if (xhr.status == 401) {
						alert("권한이 없습니다. 사용자 인증이 필요합니다.");
					} else if (xhr.status == 403) {
						alert("세션이 만료되었습니다. 다시 로그인하세요.\n" + textStatus);
						location.href = "/rims";
					} else {
						alert("처리 중 에러가 발생하였습니다.");
					}
				},
				complete: function(xhr, status) {
					if (isLodingBool) {
						loader.remove();
					}
					$(".is-loading-element-overlay").remove();
					if (fn_complete != null || fn_complete != undefined) {
						fn_complete(xhr);
					}
				}
			});
		}
	};

}(window, document, jQuery));