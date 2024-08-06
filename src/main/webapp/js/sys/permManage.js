(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$perm = W.$perm || {};

	var tabNo = '';
	var authrt_cd = '';

	$(document).ready(function() {
		$perm.ui.pageLoad();		//최초 페이지 로드 시
		$perm.event.setUIEvent();
	});

	$perm.ui = {
		pageLoad: function() {
			$perm.ui.search();
			$perm.ui.permManageInfo();
		},

		// 검색옵션
		search: function() {
			$("#searchCol1").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "전체", value: "all" },
						{ name: "권한코드", value: "authrtCd" },
						{ name: "권한명", value: "authrtNm" }
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});

			$("#searchCol2").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "사용", value: "Y" },
						{ name: "미사용", value: "N" }
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});

			$(".use_yn").kendoDropDownList({
				dataSource: {
					data: ["Y", "N"]
				}
			});

			$(".useYn").kendoDropDownList({
				dataSource: {
					data: ["Y", "N"]
				}
			});

		},

		insertPopup: function(tabNo) {

			var param = {
				tabNo : tabNo
			};

			ajax(true, contextPath + '/sys/selectPtsMenuInfo.do', 'body', '처리중입니다.', param, function(data) {
				$("#authrt_memu").kendoTreeView({
					checkboxes: {
						checkChildren: true
					},
					dataSource: data
				});

				$("#authrt_memu").on("change", function(e) {
					// 선택된 체크박스 항목들의 값을 가져옴
					var dataSource = $("#authrt_memu").data("kendoTreeView").dataSource;
					var checkedNodes = dataSource.view().filter(function(node) {
						return node.checked;
					});

					var parentsMemuData = dataSource.data();
					var childMenuCode = checkedNodes.length;

					var checkedItems = [];
					var tempItems = [];

					// 상위메뉴 선택시 하위메뉴 전체 선택
					for (var i = 0; i < checkedNodes.length; i++) {
					  var menuCode = checkedNodes[i].menuCode;

					  if (!tempItems.includes(menuCode)) {
					    checkedItems.push(menuCode);
					    tempItems.push(menuCode);
					  }

					  if (checkedNodes[i].items) {
					    // 하위메뉴 항목이 있는 경우, 하위메뉴 항목들을 확인
					    for (var j = 0; j < checkedNodes[i].items.length; j++) {
					      var childMenuCode = checkedNodes[i].items[j].menuCode;

					      if (!tempItems.includes(childMenuCode) && checkedNodes[i].items[j].checked) {
					        checkedItems.push(childMenuCode);
					        tempItems.push(childMenuCode);
					      }
					    }
					  }
					}

					// 하위메뉴를 선택시 상위메뉴도 함께 선택
					for(var k=0; k< parentsMemuData.length; k++) {
						var parentsMemu = dataSource.view()[k].dirty;

						if(parentsMemu == true) {
							var parentsMemuCode = dataSource.view()[k].menuCode;
							var childMenu = dataSource.view()[k].items;

							if(childMenu != undefined) {
								for(var h=0; h< childMenu.length; h++) {
									var childMenuChk = childMenu[h].checked;

									if(childMenuChk == true) {
										var childMenuCode = childMenu[h].menuCode;

										if (!tempItems.includes(parentsMemuCode)) {
										    checkedItems.push(parentsMemuCode);
										    tempItems.push(parentsMemuCode);
										}

										if (!tempItems.includes(childMenuCode)) {
										    checkedItems.push(childMenuCode);
										    tempItems.push(childMenuCode);
										}
									}
								}
							}
						}
					}
				});
			});
		},

		detailPopup: function(authrtCd, tabNo) {

			$("#authrtMemu").show();

			var param = {
				authrtCd : authrtCd,
				tabNo : tabNo
			};

			ajax(true, contextPath + '/sys/selectPerDetailInfo.do', 'body', '처리중입니다.', param, function(data) {
				$("#authrtMemu").kendoTreeView({
					checkboxes: {
						checkChildren: true
					},
					dataSource: data
				});

				$("#authrtMemu").on("change", function(e) {
					// 선택된 체크박스 항목들의 값을 가져옴
					var dataSource = $("#authrtMemu").data("kendoTreeView").dataSource;
					var checkedNodes = dataSource.view().filter(function(node) {
						return node.checked;
					});

					var parentsMemuData = dataSource.data();
					var childMenuCode = checkedNodes.length;

					var checkedItems = [];
					var tempItems = [];

					// 상위메뉴 선택시 하위메뉴 전체 선택
					for (var i = 0; i < checkedNodes.length; i++) {
					  var menuCode = checkedNodes[i].menuCode;

					  if (!tempItems.includes(menuCode)) {
					    checkedItems.push(menuCode);
					    tempItems.push(menuCode);
					  }

					  if (checkedNodes[i].items) {
					    // 하위메뉴 항목이 있는 경우, 하위메뉴 항목들을 확인
					    for (var j = 0; j < checkedNodes[i].items.length; j++) {
					      var childMenuCode = checkedNodes[i].items[j].menuCode;

					      if (!tempItems.includes(childMenuCode) && checkedNodes[i].items[j].checked) {
					        checkedItems.push(childMenuCode);
					        tempItems.push(childMenuCode);
					      }
					    }
					  }
					}

					// 하위메뉴를 선택시 상위메뉴도 함께 선택
					for(var k=0; k< parentsMemuData.length; k++) {
						var parentsMemu = dataSource.view()[k].dirty;

						if(parentsMemu == true) {
							var parentsMemuCode = dataSource.view()[k].menuCode;
							var childMenu = dataSource.view()[k].items;

							if(childMenu != undefined) {
								for(var h=0; h< childMenu.length; h++) {
									var childMenuChk = childMenu[h].checked;

									if(childMenuChk == true) {
										var childMenuCode = childMenu[h].menuCode;

										if (!tempItems.includes(parentsMemuCode)) {
										    checkedItems.push(parentsMemuCode);
										    tempItems.push(parentsMemuCode);
										}

										if (!tempItems.includes(childMenuCode)) {
										    checkedItems.push(childMenuCode);
										    tempItems.push(childMenuCode);
										}
									}
								}
							}
						}
					}
				});
			});
		},


		permManageInfo: function() {
			$("#permGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/selectPermManageInfo.do',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function(xhr, status) {
								if (xhr.status != 200) {
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
						parameterMap: function(options) {
							options.searchCol1 = $("#searchCol1").val();
							options.searchCol2 = $("#searchCol2").val();
							options.searchWrd = $("#searchWrd").val();
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
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{
						title: "순번",
						width: "50px",
						field: "rn",
						template: "#: rn #"
					},
					{
						title: "권한코드",
						width: "100px",
						field: "authrt_cd",
						template: "#= authrt_cd != null ? authrt_cd : '-' #"

					},
					{
						title: "권한명",
						width: "100px",
						field: "authrt_nm",
						template: "#= authrt_nm != null ? authrt_nm : '-' #"
					},
					{
						title: "권한설명",
						width: "130px",
						field: "authrt_expln",
						template: "#= authrt_expln != null ? authrt_expln : '-' #"
					},
					{
						title: "인원",
						width: "80px",
						field: "total_user",
						template: "#= total_user != null ? total_user : '-' #"
					},
					{
						title: "사용",
						width: "80px",
						field: "use_user",
						template: "#= use_user != null ? use_user : '-' #"
					},
					{
						title: "미사용",
						width: "80px",
						field: "nouse_user",
						template: "#= nouse_user != null ? nouse_user : '-' #"
					},
					{
						title: "등록자",
						width: "100px",
						field: "user_id",
						template: "#= user_id != null ? user_id : '-' #"
					},
					{
						title: "권한생성일",
						width: "100px",
						field: "reg_dt",
						template: "#= reg_dt != null ? reg_dt : '-' #"
					}
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				change: $perm.ui.rowClickEvent
			});
		},

		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function(e) {
				var grid = $("#permGrid").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});

			authrt_cd = data.authrt_cd;
			tabNo = 1;
			$perm.ui.detailPopup(authrt_cd, tabNo);

			$('#authrtCd').val(data.authrt_cd);
			$('#authrtNm').val(data.authrt_nm);
			$('#authrtExpln').val(data.authrt_expln);
			$('#useYn').data("kendoDropDownList").value(data.use_yn);

			$(".detail_popup").addClass("view");

		}
	};

	//이벤트 정의
	$perm.event = {
		setUIEvent: function() {

			// 엑셀다운로드버튼
			$(".excelDownBtn").on("click", function() {
				$perm.event.excelDownBtn();
			});

			// 조회 버튼
			$('.searchBtn').on("click", function() {
				$("#permGrid").data("kendoGrid").dataSource.page(1);
			});

			// 상세 팝업 닫기 버튼
			$('.cancel_btn').on("click", function() {
				location.reload();
			});

			// 등록 팝업 닫기 버튼
			$('.cancelBtn').on("click", function() {
				location.reload();
			});

			// 등록 팝업 버튼
			$('.register_btn').click(function() {
				tabNo = 1;
				$perm.ui.insertPopup(tabNo);
				$(".register_popup").addClass("view");
			});

			// 탭메뉴 버튼(등록)
			$('#tab_memu1').click(function() {
				tabNo = 1;
				$perm.ui.insertPopup(tabNo);

			});

			// 탭메뉴 버튼(등록)
			$('#tab_memu2').click(function() {
				tabNo = 2;
				$perm.ui.insertPopup(tabNo);
			});

			// 탭메뉴 버튼(상세)
			$('#tabMemu1').click(function() {
				tabNo = 1;
				$perm.ui.detailPopup(authrt_cd, tabNo);

			});

			// 탭메뉴 버튼(상세)
			$('#tabMemu2').click(function() {
				tabNo = 2;
				$perm.ui.detailPopup(authrt_cd, tabNo);
			});

			// 등록 버튼
			$('.insert_btn').click(function() {

				var authrtCd = $('#authrt_cd').val();
				var authrtNm = $('#authrt_nm').val();

				if (authrtCd == '' || authrtCd == null) {
					alert('권한코드를 입력해 주세요');
				} else if (authrtNm == '' || authrtNm == null) {
					alert('권한명을 입력해 주세요');
				} else {
					if(confirm("등록 하시겠습니까?")) {
						$perm.event.insert();
					}
				}
			});

			// 수정 버튼
			$('.update_btn').click(function() {
				if (confirm("수정 하시겠습니까?")) {
					$perm.event.update();
				}
			});

			// 삭제 버튼
//			$('.delete_btn').click(function() {
//				if (confirm("삭제 하시겠습니까?")) {
//					$perm.event.delete();
//				}
//			});

		},

		// 등록
		insert: function() {
			function getAllNodes(nodes) {
			    var result = [];
			    for (var i = 0; i < nodes.length; i++) {
			        var isChecked = nodes[i].checked || false;
			        if (nodes[i].hasChildren) {
			            var childNodes = getAllNodes(nodes[i].children.view());
			            for (var j = 0; j < childNodes.length; j++) {
			                if (childNodes[j].checked) {
			                    isChecked = true;
			                    break;
			                }
			            }
			            result = result.concat(childNodes);
			        }
			        var nodeData = {
			            checked: isChecked,
			            text: nodes[i].text,
			            menuCode: nodes[i].menuCode,
						authrtCd: $('#authrt_cd').val()
			        };
			        result.push(nodeData);
			    }
			    return result;
			}
			var treeView = $("#authrt_memu").data("kendoTreeView");
			var allNodes = getAllNodes(treeView.dataSource.view());
			var param = {
				checkedItems: allNodes,
				authrtCd: $('#authrt_cd').val(),
				authrtNm: $('#authrt_nm').val(),
				useYn: $('#use_yn').val(),
				authrtExpln: $('#authrt_expln').val()
			};
			ajax(true, contextPath + '/sys/insertAuth.do', 'body', '처리중입니다.', param, function(data) {
				// alert(data.total);
				$(".register_popup").removeClass("view");
				location.reload();
			});
		},

		// 수정
		update: function() {
			function getAllNodes(nodes) {
			    var result = [];
			    for (var i = 0; i < nodes.length; i++) {
			        var isChecked = nodes[i].checked || false;
			        if (nodes[i].hasChildren) {
			            var childNodes = getAllNodes(nodes[i].children.view());
			            for (var j = 0; j < childNodes.length; j++) {
			                if (childNodes[j].checked) {
			                    isChecked = true;
			                    break;
			                }
			            }
			            result = result.concat(childNodes);
			        }
			        var nodeData = {
			            checked: isChecked,
			            text: nodes[i].text,
			            menuCode: nodes[i].menuCode,
						authrtCd: $('#authrtCd').val()
			        };
			        result.push(nodeData);
			    }
			    return result;
			}
			var treeView = $("#authrtMemu").data("kendoTreeView");
			var allNodes = getAllNodes(treeView.dataSource.view());
			var param = {
				checkedItems: allNodes,
				authrtCd: $('#authrtCd').val(),
				authrtNm: $('#authrtNm').val(),
				useYn: $('#useYn').val(),
				authrtExpln: $('#authrtExpln').val()
			};
			ajax(true, contextPath+'/sys/updateAuth.do', 'body', '처리중입니다.', param, function (data) {
				alert(data.message);
				$(".detail_popup").removeClass("view");
				location.reload();
			});
		},

		getTreeViewDataAsArray: function(treeview) {
		    var dataArray = [];

		    // TreeView의 데이터 모델 순회
		    treeview.dataSource.view().forEach(function (item) {
		        var dataItem = {
		            id: item.id,
		            text: item.text,
		            // 필요한 다른 속성도 추가할 수 있습니다.
		        };
		        dataArray.push(dataItem);

		        // 자식 노드가 있는 경우 재귀적으로 처리
		        if (item.items && item.items.length > 0) {
		            dataItem.children = getChildrenData(item.items);
		        }
		    });

		    return dataArray;
		},


		// 삭제
//		delete: function() {
//			var param = {
//				authrtCd: $('#authrtCd').val(),
//			};
//			ajax(true, contextPath + '/sys/deleteAuth.do', 'body', '처리중입니다.', param, function(data) {
//				alert(data.message);
//				$(".detail_popup").removeClass("view");
//				location.reload();
//			});
//		},

		// 엑셀다운로드
		excelDownBtn: function() {
			var fileNm = 'permManage'
			var params = {};
			params.searchCol1 = $("#searchCol1").val();
			params.searchCol2 = $("#searchCol2").val();
			params.searchWrd = $("#searchWrd").val();
			params.elxExcelDownReason = $('#elxExcelDownReason').val();
			params._csrf = $('._csrf').val();

			excelDown("/sys/excelDown", params, fileNm);
		}

	};
}(window, document, jQuery));