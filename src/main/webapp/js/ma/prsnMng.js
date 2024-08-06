(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$prsnMng = W.$prsnMng || {};
	
	var dataList;
	var pathName;
	
	$(document).ready(function() {
		$prsnMng.ui.pageLoad();		//최초 페이지 로드 시
		$prsnMng.event.setUIEvent();
	});

	$prsnMng.ui = {
		pageLoad: function() {
			pathName = window.location.pathname;
			
		},
			
		getData: function() {
			const dfd = $.Deferred();
			const params = {};
			ajax(false, contextPath + '/ma/prsnMng/selectPrsnMngList', 'body', '확인인중입니다.', params, function(response) {
				if (response && response.data.length > 0) {
					dfd.resolve(response);
				} else {
					dfd.reject();
				}
			});
			return dfd.promise();
		},
		
		executePrepend: function() {
			$("#subWrap").remove();
			$(".wrap").prepend(`
				<div id="subWrap" class="privacyPopup" style="display: none;">
		        	<!-- 이용약관  -->
		 	        <div class="contBox">
			          	<div class="nameBox" style="display: flex; justify-content:space-between; width:100%; background-color: #F5F8FE !important;">
			          		<div>
			            		<h4 class="name">개인정보 처리방침</h4>
			            	</div>
			            	<div class="closePrivacy">
			            		<h4 class="name privacy" style="cursor: pointer;">X</h4>
			            		<div class="closePrivacy">
					           		<span></span>
					           		<span></span>
					            </div>
			            	</div>
			          	</div>

					<div class="cont" >
						<div class="scrollBar02">
							<div class="cont_txt">
								<div id="cnt" class="txt" aria-label="editor" >
								</div>
							</div>
						</div>
						<div class="privacyBtmCnt">
							<table class="privacyBtmTab">
								<tr>
									<th><div class="privacyBtmCom" > >> 지난 버전 보기</div></th>
									<td style="width:50%;">
										<label for="psrnMngList" style="display:none">지난버전 보기</label>
										<input type="text" id="psrnMngList"s>
									</td>
								</tr>
							</table>
						<div>
					</div>

			        </div>
		        </div>
		      </div>
			`)
		},
			
		createMapList: function(prsnMgnList) {
			const dataMap = new Map();
			prsnMgnList.data.forEach((item) => {
				dataMap.set(item.trms_sn, item)
			});
			dataList = dataMap;
		},
		
		setPreviousList: function() {
			var prsnTtlList = [];

			dataList.forEach((item) => {
				var dataList = {
					cd_id: item.trms_sn,
					cd_nm: item.ttl
				}
				prsnTtlList.push(dataList);
			});

			$('#psrnMngList').kendoDropDownList({
				dataTextField: "cd_nm",
				dataValueField: "cd_id",
				dataSource: prsnTtlList,
			})
		},
		
		findCont: function() {
			const trmsSn = $("#psrnMngList").val();
			dataList.forEach((item) => {
				if (item.trms_sn === parseInt(trmsSn)) {
					$('#cnt').html(item.trms_cn);
					$('#cnt table').find('th, td').css({
						'border': '1px solid black',
					});
					$('.scrollBar02').scrollTop(0);
				}
			});
		}
	};
	//이벤트 정의
	$prsnMng.event = {
		setUIEvent: function() {

			
			let rootAfterStyle = document.createElement("style");
			rootAfterStyle.innerHTML =
				`
					.privacyPopup::before {
					    position: absolute;
					    top: 0;
					    left: 0;
					    content: '';
					    width: 100%;
					    height: 100%;
					    background-color: #000a;
					}
					.privacyPopup .k-picker-solid{width: 270px !important;}
					
				
				`;
			
			document.head.appendChild(rootAfterStyle);		
				
			$(".privacy").on("click", function(e) {
				kendo.ui.progress($(document.body), true);
				$prsnMng.event.closeEsc();
				e.preventDefault();
				$prsnMng.ui.getData().done((prsnMgnList) => {
					$prsnMng.ui.createMapList(prsnMgnList);
					$prsnMng.ui.executePrepend();
					$prsnMng.event.clickEvent();
					$prsnMng.ui.setPreviousList();
					
					if (pathName === '/') {
						$('.header').css({"z-index":"1"});
					}else{
						
					}
					
					$('#psrnMngList').on('change', function(e) {
						$prsnMng.ui.findCont();
					})	
					$('#psrnMngList').trigger('change');
					
				}).fail(() => {
					alert("데이터없음");
					kendo.ui.progress($(document.body), false);
				});
			});
		},
		
		clickEvent: function() {
			if ($("#subWrap").css("display") == "none") {
				$("#subWrap").css({ "display": "block" });
				kendo.ui.progress($(document.body), false);
			} else {
				
			}
			
			// closePrivacy 클릭 이벤트 핸들러
			$('.closePrivacy').click(function() {
				$prsnMng.event.closeEvent();
			});
		},
		
		closeEvent: function() {
			if ($("#subWrap").css("display") == "block") {
				$("#subWrap").css({ "display": "none" });

				// 초기화된 값으로 변경
				$("#psrnMngList").data("kendoDropDownList").value("1");
				$('.closePrivacy').off('click');
				$('#psrnMngList').off('change');
				 $('.header').removeAttr('style');
			}

		},
		
		closeEsc: function() {
			function escKeyHandler(e) {
				if (e.which === 27) {
					$prsnMng.event.closeEvent();
					$(document).off("keydown", escKeyHandler);
				}
			}
			$(document).on("keydown", escKeyHandler);
		},
		
	};

}(window, document, jQuery));