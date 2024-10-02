(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$menu = W.$menu || {};

    $(document).ready(function() {
       $menu.ui.pageLoad();		//최초 페이지 로드 시
       $menu.event.setUIEvent();
    });

	$menu.ui = {
		pageLoad : function() {
			ajax(true, contextPath+'/sys/menu/selectMenuList', 'body', '처리중입니다.', {}, function (data) {
	            if (data != null) {
	                var ds1 = data.pts;
	                var ds2 = data.ops;
	                $menu.ui.kendoTreeViewLoad('1', ds1);
	                $menu.ui.kendoTreeViewLoad('2', ds2);
	            }
	        });

			$("#useYn").kendoDropDownList({
				dataSource: {
					data: ["Y", "N"]
				},
				optionLabel: "사용유무(선택)"
			});

			$("#prvcIdntfYn").kendoDropDownList({
				dataSource: {
					data: ["Y", "N"]
				},
				optionLabel: "개인정보식별여부(선택)"
			});
		},

		kendoTreeViewLoad : function(tid, ds) {
			 $("#treeview"+tid).kendoTreeView({
				 dataSource: {
	       		    transport: {
	         		    read: function(options) {
	         		    	var menuCd = options.data.menuCd || '';
		         		    options.success($.grep(ds, function(x) {
		         		    	return x.upMenuCd == menuCd;
		         		    }));
	         		    },
						beforeSend: function(xhr) {
							xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
						}
	       		    },
                    schema: {
                        model: {
                            id: "menuCd",
                            hasChildren: function(x) {
		         		          var id = x.id;

		         		          for (var i = 0; i < ds.length; i++) {
		         		            if (ds[i].upMenuCd == id) {
		         		              return true;
		         		            }
		         		          }
		         		          return false;
		         		    }
		         		   ,spriteCssClass: "sprite"
                        }
        		    }
                },
         		dataSpriteCssClassField: "sprite",
	         	template :kendo.template($("#treeview-template").html())
			}).data("kendoTreeView");

			var treeview = $("#treeview"+tid).data("kendoTreeView");
			treeview.expand(".k-item");

			$("#menu"+tid).kendoContextMenu({
				target: "#treeview"+tid,
				filter: ".k-in",
				select: function(e) {
					var button = $(e.item);
					var node = $(e.target);

		            var dataItem = $("#treeview"+tid).data("kendoTreeView").dataItem(node);

					if(button.text() == 'Create'){
						if(dataItem.upMenuCd != '')
							$menu.ui.insertView(dataItem.menuCd, dataItem.upMenuCd, dataItem.upMenuNm);
						else
							$menu.ui.insertView(dataItem.menuCd, dataItem.menuCd, dataItem.menuNm);

						var treeview = $("#treeview"+tid).data("kendoTreeView");
						treeview.expand(node);

					}else if(button.text() == 'Delete'){
				    	$menu.ui.DeleteView(dataItem.menuCd);
					}
				}
			});

			$(window).resize(function(){
				$("#treeview"+tid).data("kendoTreeView").resize();
		    });

			$("#treeview1").show();
			$("#treeview2").hide();
		},

		detailView : function(menuCd, menuNm, menuUrl, upMenuCd, upMenuNm, menuOrdr, useYn, prvcIdntfYn) {
			$('.save_btn').css('pointer-events', 'none');
			$('.insert_btn').css('pointer-events', 'auto');
			$('.update_btn').css('pointer-events', 'auto');
			$('.delete_btn').css('pointer-events', 'auto');
			$('.cancel_btn').css('pointer-events', 'none');

			$(".insert_btn").html('추가');
			$("#menuCd").val(menuCd);
			$("#menuNm").val(menuNm);
			$("#menuUrl").val(menuUrl);
			$("#upMenuCd").val(upMenuCd);
			$("#upMenuNm").val(upMenuNm);
			$("#menuOrdr").val(menuOrdr);
			$("#useYn").data("kendoDropDownList").value(useYn);
			$("#prvcIdntfYn").data("kendoDropDownList").value(prvcIdntfYn);

			if(upMenuCd != '')
				$('.sort-btn').css('pointer-events', 'auto');

			$menu.event.changeInputReadable();
			
			ajax(true, contextPath+'/sys/menu/mnAccAuth', 'body', '처리중입니다.', {"menuCd": menuCd}, function (data) {
				var authData = "";
				for(var i=0; i<data.length; i++) {
					if(data.length-1 == i) {
						authData += data[i].authNm;
					} else {
						authData += data[i].authNm+", ";
					}
				}
				
				$("#mnAccAuth").val(authData);
			});
		},

		insertView : function(menuCd, upMenuCd, upMenuNm){
			$menu.event.changeInputEditable();
			$menu.event.updateStateButton();

			var maenuDiv = $("li.tab-link.current")[0].id;

			if(upMenuCd != '')
				$(".insert_btn").html('추가');

			if(menuCd.substr(7,2) == 90)
				alert("메뉴를 생성할 수 없습니다.")
			else{
				ajax(true, contextPath+'/sys/menu/selectMenuOrdr', 'body', '처리중입니다.', {upMenuCd : upMenuCd, menuDiv: maenuDiv}, function (result) {
		            if (result != null) {
						if(upMenuCd != '')
		                	$("#menuOrdr").val(result);
						else
							$("#menuOrdr").val(result-1);
		            }
		        });
				$("#menuCd").val("insert");
				$menu.ui.cancleView();
				$("#upMenuCd").val(upMenuCd);
				$("#upMenuNm").val(upMenuNm);
			}
		},

		cancleView : function(){
			$("#menuNm").val("");
			$("#menuUrl").val("");
			$("#useYn").data("kendoDropDownList").value("Y");
			$("#prvcIdntfYn").data("kendoDropDownList").value("N");
		},

				DeleteView: function(menuCd){
        		if(confirm("삭제 하시겠습니까?")){

                    ajax(true, contextPath+'/sys/menu/updateDeleteMenu', 'body', '처리중입니다.', {menuCd : menuCd}, function (data) {
                        if(data != null){
                        alert("메뉴가 삭제되었습니다.");
                         location.reload();
                        }
                    });
        		}

        		}
	};

    //이벤트 정의
   $menu.event = {
        setUIEvent : function() {
			$menu.event.initialStateButton();
			$menu.event.changeInputReadable();

			$('.tab-link').click(function(e){
				$(".insert_btn").html('대메뉴 추가');

				$('.cancel_btn').click();

				$("#menuCd").val("");
				$("#upMenuCd").val("");
				$("#upMenuNm").val("");
				$("#menuOrdr").val("");

				if(e.target.id == 'PMNU' || e.target.innerHTML == '포털'){
					$("#PMNU").addClass("current");
					$("#OMNU").removeClass("current");
					$("#treeview1").show();
					$("#treeview2").hide();
				} else if(e.target.id == 'OMNU' || e.target.innerHTML == '관리자'){
					$("#PMNU").removeClass("current");
					$("#OMNU").addClass("current");
					$("#treeview1").hide();
					$("#treeview2").show();
				}

				$menu.event.initialStateButton();
			});

			$('.sort-btn').click(function(e){
				$menu.event.updateMenuOrdr(e.currentTarget.innerText);
			});

			$('.save_btn').click(function(){
				$menu.event.updateCode();
			});

			$('.insert_btn').click(function(){
				var menuCd = $("#menuCd").val();
				var upMenuCd = $("#upMenuCd").val();
				var upMenuNm = $("#upMenuNm").val();

				if(upMenuCd == "") {
					upMenuCd = $("#menuCd").val();
					upMenuNm = $("#menuNm").val();
				}

				$menu.ui.insertView(menuCd, upMenuCd, upMenuNm);
			});

			$('.update_btn').click(function(){
				$menu.event.changeInputEditable();
				$menu.event.updateStateButton();

				if($('#useYn').val() == '사용유무(선택)')
					$("#useYn").data("kendoDropDownList").value("Y");
				if($('#prvcIdntfYn').val() == '개인정보식별여부(선택)')
					$("#prvcIdntfYn").data("kendoDropDownList").value("N");
			});

			$('.cancel_btn').click(function(){
				$menu.ui.cancleView();
			});

			$('#menuNm').on("input", function(){
				$(this).val($(this).val().replace(/[^ㄱ-힣a-zA-Z\s]/gi, ""));
			});

			$('#menuUrl').on("input", function(){
				$(this).val($(this).val().replace(/^\/|[^a-zA-Z0-9/]/g, ""));
			});

            $('#delete_btn').click(function(){
                    var selectMenuCd = $('#menuCd').val();
                         $menu.ui.DeleteView(selectMenuCd);
            });


        },

		changeInputEditable : function() {
			$("#menuNm").prop("readonly", false);
			$("#menuUrl").prop("readonly", false);
			$("#useYn").data("kendoDropDownList").readonly(false);
			$("#prvcIdntfYn").data("kendoDropDownList").readonly(false);
			$('.sort-btn').css('pointer-events', 'none');
		},

		changeInputReadable : function() {
			$("#menuNm").prop("readonly", true);
			$("#menuUrl").prop("readonly", true);
			$("#useYn").data("kendoDropDownList").readonly();
			$("#prvcIdntfYn").data("kendoDropDownList").readonly();
		},

		updateStateButton : function() {
			$('.save_btn').css('pointer-events', 'auto');
			$('.insert_btn').css('pointer-events', 'none');
			$('.update_btn').css('pointer-events', 'none');
			$('.delete_btn').css('pointer-events', 'none');
			$('.cancel_btn').css('pointer-events', 'auto');
		},

		initialStateButton : function() {
			$('.save_btn').css('pointer-events', 'none');
			$('.insert_btn').css('pointer-events', 'auto');
			$('.update_btn').css('pointer-events', 'none');
			$('.delete_btn').css('pointer-events', 'none');
			$('.cancel_btn').css('pointer-events', 'none');
			$('.sort-btn').css('pointer-events', 'none');
		},

		updateCode : function() {
			var param = {
				menuNm: $("#menuNm").val(),
				menuUrl: $("#menuUrl").val(),
				upMenuCd: $("#upMenuCd").val(),
				menuOrdr: $("#menuOrdr").val(),
				useYn: $("#useYn").val(),
				prvcIdntfYn: $("#prvcIdntfYn").val(),
				menuDiv: $("li.tab-link.current")[0].id
			};

			var menuCd = $("#menuCd").val();

			if($("#menuNm").val() == '')
				alert("메뉴명을 입력해 주십시오.")
			else if($("#useYn").val() == '사용유무(선택)')
				alert("사용여부를 선택해 주십시오.")
			else if($("#prvcIdntfYn").val() == '개인정보식별여부(선택)')
				alert("개인정보식별여부를 선택해 주십시오.")
			else{
				if(menuCd == "insert"){
					if (confirm("등록 하시겠습니까?")) {
						ajax(true, contextPath+'/sys/menu/insertMenu', 'body', '처리중입니다.', param, function (data) {

				            if (data != null) {
				                 alert("메뉴가 등록되었습니다.");
				                 location.reload();
				            }
				        });
					}
	            }else{
	                if (confirm("저장 하시겠습니까?")) {
						param.menuCd = menuCd;
	                    ajax(true, contextPath+'/sys/menu/updateMenu', 'body', '처리중입니다.', param, function (data) {

	                        if (data != null) {
	                             alert("메뉴 정보가 수정되었습니다.");
	                             location.reload();
	                        }
	                    });
	                }
	            }
			}
		},

		updateMenuOrdr : function( flag ) {
			if($("#menuId").val() == 'insert' || $("#menuId").val() == ''){
				return;
			}

			var menuOrdr = $("#menuOrdr").val();
			var menuDiv = $("li.tab-link.current")[0].id;

			ajax(true, contextPath+'/sys/menu/selectMenuOrdr', 'body', '처리중입니다.', {upMenuCd : $("#upMenuCd").val(), menuDiv: menuDiv}, function (result) {
	            if (result != null) {

					if(flag == '위로'){
						menuOrdr = Number(menuOrdr) - 1;
						if(menuOrdr == 0){
							menuOrdr = 1;
							return;
						}
					}else{
						menuOrdr = Number(menuOrdr) + 1;
						if(result == menuOrdr){
							menuOrdr = result;
							return;
						}
					}

					var param = {
						ordrKey: flag,
						menuOrdr: menuOrdr,
					    upMenuCd: $("#upMenuCd").val(),
						menuDiv: $("li.tab-link.current")[0].id,
						menuCd: $("#menuCd").val()
					};

					ajax(true, contextPath+'/sys/menu/updateMenuOrdr', 'body', '처리중입니다.', param, function (data) {
			            if (data != null) {
			            	$("#menuOrdr").val(menuOrdr);
			            	location.reload();
			            }
			        });
	            }
	        });
		},

		deleteCode : function(menuCd, upMenuCd, menuNm) {
			var param = {
			    upMenuCd: upMenuCd,
				menuCd: menuCd
			};

			var cfmText = "";
			if(upMenuCd != '')
				cfmText = menuNm+"메뉴가 삭제됩니다. 삭제 하시겠습니까?";
			else
				cfmText = menuNm+"의 하위 메뉴까지 삭제됩니다. 삭제 하시겠습니까?";

		    if (confirm(cfmText)) {
				ajax(true, contextPath+'/sys/menu/updateDeleteMenu', 'body', '처리중입니다.', param, function (data) {

		            if (data != null) {
		               alert("메뉴가 삭제 되었습니다.");
		               location.reload();
		            }
		        });
		    }
		},
    };

}(window, document, jQuery));