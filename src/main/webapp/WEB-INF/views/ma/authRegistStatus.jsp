<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script
	src="${pageContext.request.contextPath}/js/mm/authRegistStatus.js"></script>

<div class="header">
	<!-- header start -->
	<div class="pageSubj">
		<span>사용신청현황</span>
	</div>
</div>
<!-- header end -->

<div class="container">
	<!-- container start -->

	<div class="contBox">

		<div class="boHeader">
			<span>사용신청내역</span> <input type="hidden" id="confmCd"
				value="${authRequestInfo.confmCd}" />
		</div>
		<div class="wTableBox">
			<table class="wTable t01">
				<colgroup>
					<col width="150" />
					<col width="" />
				</colgroup>
				<tr>
					<th>아이디</th>
					<td id="userId">${authRequestInfo.userId}</td>
				</tr>
				<tr>
					<th>성명</th>
					<td>${authRequestInfo.userNm}</td>
				</tr>
				<tr>
					<th>생년월일</th>
					<td>${authRequestInfo.userBirthday}</td>
				</tr>
				<tr>
					<th>핸드폰번호</th>
					<td>${authRequestInfo.mpno}</td>
					<c:choose>
						<c:when test="${'03' == authRequestInfo.confmCd}">
				</tr>
				<th>신청권한</th>
				<td><select id="authType"></select><input type="hidden"
					id="auth" value="${authRequestInfo.authorId}" /></td>
				</tr>
				<tr>
					<th>소속</th>
					<td><select id="belongType"></select><input type="hidden"
						id="psitnNm" value="${authRequestInfo.psitnNm}" /></td>
				</tr>
				<tr id="bizrNoTr" style='display: none;'>
					<th>사업자등록번호</th>
					<td><input type="text" class="inp01" id="bizrNo"
						<c:if test="${'C00' == authRequestInfo.authorId}">
								value="${authRequestInfo.bizrno}"
							</c:if> />
						<a href="javascript:void(0)" class="wbtn01" id="btnBizrNo">확인</a>
						<span class="e01">※확인되지 않는 사업자 등록번호의 경우 관리자에게 연락 바랍니다.
							(TEL. 1899-2793(내선2번))</span></td>
				</tr>
				<tr>
					<th>증빙서류 파일</th>
					<td><input type="text" class="inp01" readonly="readonly" /> <%--							<input type="file" class="hidden" id = "file_upload_field" name = "file_upload_field" accept=".zip, .hwp, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt, .bmp, .jpg, .jpeg, .gif, .png" onchange='fileAddCheck(this)'/>--%>
						<input type="file" class="hidden" id="file_upload_field"
						name="file_upload_field"
						accept=".zip, .hwp, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt, .bmp, .jpg, .jpeg, .gif, .png"
						onchange='fileAddCheck(this)' /> <a href="javascript:void(0)"
						class="wbtn01">파일찾기</a> <span class="e01">※ 소속을 확인 할 수 있는
							서류 첨부 바랍니다. (예 : 재직증명서, 건강보험납입증명서 등)</span></td>
				</tr>
				<tr>
					<th></th>
					<td><a href="javascript:fileDownload(${fileInfo.atchFileSn});"
						style='color: blue; text-decoration: underline;'>${fileInfo.realFileNm}</a>
					</td>
				</tr>
				<tr>
					<th>처리상태</th>
					<td style="color: red">${authRequestInfo.confmNm}</td>
				</tr>
				<tr>
					<th>반려사유</th>
					<td style="white-space: pre;">${authRequestInfo.lockResn}</td>
				</tr>
				</c:when>
				<c:otherwise>
					<tr>
						<th>신청권한</th>
						<td>${authRequestInfo.authorNm}</td>
					</tr>
					<tr>
						<th>소속</th>
						<td>${authRequestInfo.psitnNm}</td>
					</tr>
					<c:if test="${'C00' == authRequestInfo.authorId}">
						<tr>
							<th>사업자등록번호</th>
							<td>${authRequestInfo.bizrno}</td>
						</tr>
					</c:if>
					<tr>
						<th>증빙서류 파일</th>
						<td><a
							href="javascript:fileDownload('${fileInfo.atchFileSn}','${fileInfo.atchFileNm}');"
							style='color: blue; text-decoration: underline;'>${fileInfo.realFileNm}</a></td>
					</tr>
					<tr>
						<th>처리상태</th>
						<td>${authRequestInfo.confmNm}</td>
					</tr>
				</c:otherwise>
				</c:choose>
			</table>
		</div>
		<c:if test="${'03' == authRequestInfo.confmCd}">
			<div class="btnBox">
				<a href="javascript:void(0)" id="btnRegist">재신청</a>
			</div>
		</c:if>
	</div>
</div>
<!-- container end -->
