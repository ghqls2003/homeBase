<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page contentType="text/html; charset=euc-kr" pageEncoding="euc-kr" %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.security.*" %>
<%@ page import="java.util.Random" %>
<%@ page import="java.io.File" %>
<% request.setCharacterEncoding("euc-kr"); %>
<% response.setContentType("text/html; charset=euc-kr"); %>
<%
	File file = null;
	int i = 0;
	File[] files = null;

	String realPath = "/home/eomjh/workspace/FCMS/js/test/FileStore/";
	file = new File(realPath);
	if (file.exists() && file.isDirectory())
	{
		files = file.listFiles();
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<meta http-equiv="cache-control" content="no-cache">
<style type="text/css">
form			{margin:0px 0px 0px 0px;}
input.largebtn	{ width: 500px; }
input.mediumbtn	{ width: 300px; }
input.smallbtn	{ width: 150px; }
h1, h2, h3, h4  { margin:0;}
h3              { font-size:13pt; background-color:#EEE;}
b				{color: blue}
.test			{border:1px dashed gray;}
.test td		{font-size: 9pt;color: #333333;background: #EEEEEE;text-align: center;}
select.combo	{width:150px; font-size: 9pt;color: #333333;;}
.inputtext		{width: 100%;}
.inputtextarea	{width: 100%;word-break:break-all;}
.inputselect	{width: 100%;}
ainput{border:0px; margin:2px; padding:1px;}
.inputbutton	{width: 100%;height: 100%; border:1px solid #d3d3d3; margin:2px; padding:1px;}
.inputcheck		{width: 14px;height: 14px;}
</style>

<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"" + "../anySign4PCInterface.js" + "?version=" + new Date().getTime() + "\"></scr"+"ipt>");
</script>
<script language='javascript'>
<%
    VidVerifier vid = new VidVerifier(new XecureConfig());
    out.println(vid.ServerCertWriteScript());

	// AnySign 세션ID 설정
	String HashedSessionID = "";

	// 1. 고정 세션 ID
	HashedSessionID = "reaverTestSID19810531";
	
	// 2. 웹세션ID 해쉬
	//String id = session.getId();
	//HashedSessionID = cipher.getHash("SHA256",id);

	out.println("AnySign.mAnySignSID = '" + HashedSessionID + "';");
%>
AnySign.mAnySignLiteEnable = false;
PrintObjectTag ();
</script>

<script language='javascript'>
function init()
{
	initForm();
	numbering();
}

function numbering ()
{
	var aElements = document.getElementsByTagName('h3');

	for (i = 0 ; i < aElements.length ; i++)
	{
		aElements[i].innerHTML = (i + 1) + ". " + aElements[i].innerHTML;
		aElements.id = "elem" + (i + 1);
	}
}

function initForm ()
{
	var aPort = "";
	if (window.location.port == "") {
		if (window.location.protocol == "https:") aPort = "443";
		else aPort = "80";
	} else {
		aPort = window.location.port;
	}
	
	var aPathname = location.pathname;
	var aLastIndex = aPathname.lastIndexOf("/");
	
	// form_UploadFileEx
	document.getElementById ("form_UploadFileEx").aXgateAddress.value = AnySign.mXgateAddress;
	document.getElementById ("form_UploadFileEx").aHostName.value = window.location.hostname;
	document.getElementById ("form_UploadFileEx").aPort.value = 80;
	document.getElementById ("form_UploadFileEx").aSID.value = document.cookie || "B7445038AB051E1E9BBBE5C47623361AE2B2768F";
	document.getElementById ("form_UploadFileEx").aPath.value = aPathname.substring(0, aLastIndex) + "/file_upload.jsp";
	document.getElementById ("form_UploadFileEx").aQuery.value = "param1=test.txt&param2=한글테스트";
	document.getElementById ("form_UploadFileEx").aDescription.value = "파일을 업로드합니다.";
	
	// form_DownloadFileEx
	document.getElementById ("form_DownloadFileEx").aXgateAddress.value = AnySign.mXgateAddress;
	document.getElementById ("form_DownloadFileEx").aHostName.value = window.location.hostname;
	document.getElementById ("form_DownloadFileEx").aPort.value = 80;
	document.getElementById ("form_DownloadFileEx").aSID.value = document.cookie || "B7445038AB051E1E9BBBE5C47623361AE2B2768F";
	document.getElementById ("form_DownloadFileEx").aPath.value = aPathname.substring(0, aLastIndex) + "/file_download.jsp";
	document.getElementById ("form_DownloadFileEx").aQuery.value = "param1=test.txt&param2=한글테스트";
	document.getElementById ("form_DownloadFileEx").aDescription.value = "파일을 다운로드합니다.";
}

function sumCheckbox (aCheckbox)
{
	var aIter;
	var aTotal = 0;

	for (aIter = 0;aIter < aCheckbox.length;aIter++)
	{
		if (aCheckbox[aIter].checked)
			aTotal += parseInt (aCheckbox[aIter].value);
	}

	return aTotal;
}

function sumSelect (aSelect)
{
	var aIter;
	var aTotal = "";

	for (aIter = 0;aIter < aSelect.length;aIter++)
	{
		if (aSelect[aIter].selected)
		{
			aTotal += aSelect[aIter].value;
			aTotal += "|";
		}
	}

	aTotal = aTotal.substring (0, aTotal.length - 1);

	return aTotal;
}

function setChar (form)
{
	if (form.aCharset[0].checked)
		return "utf-8";
	else
		return "euc-kr";
}

function onSelectOpenFileCallback(result) {
	if (result != "") {
		g_input.value = result;
		
		if (g_option == 0 && g_output != undefined && g_ext != undefined) {
			g_output.value = result + g_ext;
		}
	}
}

function onSelectOpenFile(option, input_element, output_element, ext) {
	g_input = input_element;
	g_output = output_element;
	g_ext = ext;
	g_option = option;
	
	AnySign.SelectFile("", "", option, onSelectOpenFileCallback);
}

function UploadFileEx_Callback (aResult) {
	document.getElementById ("form_UploadFileEx").aResult.value = aResult.replace(/\|/g, '\r\n');
}

function UploadFileEx_ErrCallback (aResult) {
	var aResultString = "ErrCode [" + aResult.code + "] ErrMsg [" +aResult.msg+"]";
	alert (aResultString);
	document.getElementById ("form_UploadFileEx").aResult.value = aResultString;
}

function DownloadFileEx_Callback (aResult) {
	document.getElementById ("form_DownloadFileEx").aResult.value = aResult.replace(/\|/g, '\r\n');
}

function DownloadFileEx_ErrCallback (aResult) {	
	var aResultString = "ErrCode [" + aResult.code + "] ErrMsg [" +aResult.msg+"]";
	alert (aResultString);
	document.getElementById ("form_DownloadFileEx").aResult.value = aResultString;
}

function onSelectSaveFile(element, option) {
	g_input = element;
	g_option = option;
	
	AnySign.SelectFile("", "", option, onSelectSaveFileCallback);
}

function onSelectSaveFileCallback(result) {
	if (result != "") {
		g_input.value = result;
		
		if (g_option == 0 && g_output != undefined && g_ext != undefined) {
			g_output.value = result + g_ext;
		}
	}
}
</script>
</head>
<body onload="init();" leftmargin="0" topmargin="0" style="padding-top:0px; padding-left:0px;">
<form name='xecure'><input type=hidden name='p'>
</form>
	<table width="694" align='center' border="0" cellspacing="0" cellpadding="0" height="100%">
		<!-- Header -->
		<tr>
			<td>
				<div id="xecure_header" />
			</td>
		</tr>

		<!-- Body -->
		<tr>
			<td valign="top">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<!-- contents start -->
						<td>
							<!-- CENTER START -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td>
										<br>
										
										<h3 id="17">UploadFileEx</h3>
										<form id="form_UploadFileEx" name="form_UploadFileEx" method="post" action="#">
										<table class="test">
											<tr>
												<td width="50" rowspan="10">Input</td>
												<td width="120">aXgateAddress</td>
												<td width="524"><input type="text" class="inputtext" name="aXgateAddress"/></td>
											</tr>
											<tr>
												<td>aPath</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aPath"/></td>
											</tr>
											<tr>
												<td>aQuery</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aQuery"/></td>
											</tr>
											<tr>
												<td>aHostName</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aHostName"/></td>
											</tr>
											<tr>
												<td>aPort</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aPort"/></td>
											</tr>
											<tr>
												<td>aInputFilePath</td>
												<td style="text-align:left;">
													<input type="checkbox" class="inputcheck" name="aFileSelectOption" value="0" checked disabled="true"/>
													0 : 단일 파일 선택<br/>
													<input type="checkbox" class="inputcheck" name="aFileSelectOption" value="2"/>
													2 : 복수 파일 선택 (Ctrl + Click)<br/>
													<input type="button" class="inputbutton" style="height:auto;" value="SelectFile"
													onClick="onSelectOpenFile (sumCheckbox (this.form.aFileSelectOption), this.form.aInputFilePath);"/>
													<input type="text" class="inputtext" name="aInputFilePath"/>
												</td>
											</tr>
											<tr>
												<td>aOption</td>
												<td style="text-align:left;">
													<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
													0x00000000 : 기본 옵션<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="524288"/>
													0x00080000 : 진행창을 보이지 않는다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="1048576"/>
													0x00100000 : 성공 시 진행창을 닫는다.(오류 시는 닫지 않는다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="2097152"/>
													0x00200000 : 완료 시 진행창을 닫는다.(오류가 발생해도 닫는다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="4194304"/>
													0x00400000 : 오류 시 다음 파일 계속 진행한다.(기본값은 종료한다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="8388608"/>
													0x00800000 : 오류 시 다음 파일 계속 진행할지 확인창을 띄운다.<br/>
												</td>
											</tr>
											<tr>
												<td>aDescription</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aDescription"/></td>
											</tr>
											<tr>
												<td><b>aSID</b></td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aSID"/></td>
											</tr>
											<tr>
												<td><b>aCharset</b></td>
												<td style="text-align:left;">
													<input type="radio" class="inputcheck" name="aCharset" value="utf-8" checked/>
													utf-8<br/>
													<input type="radio" class="inputcheck" name="aCharset" value="euc-kr"/>
													euc-kr<br/>
											</tr>
											<tr>
												<td>Run</td>
												<td colspan="2">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.UploadFileEx"
													onClick="AnySign.UploadFileEx (this.form.aXgateAddress.value,
																				   this.form.aPath.value,
																				   this.form.aQuery.value,
																				   this.form.aHostName.value,
																				   this.form.aPort.value,
																				   this.form.aInputFilePath.value,
																				   sumCheckbox (this.form.aOption),
																				   this.form.aDescription.value,
																				   this.form.aSID.value,
																				   setChar (this.form),
																				   UploadFileEx_Callback,
																				   UploadFileEx_ErrCallback)"/>
												</td>
											</tr>
											<tr>
												<td>Output</td>
												<td colspan="2">
													<textarea class="inputtextarea" name="aResult" rows="7"></textarea>
												</td>
											</tr>
										</table>
										</form>
										<br/>
										
										<h3 id="18">DownloadFileEx</h3>
										<form id="form_DownloadFileEx" name="form_DownloadFileEx" method="post" action="#">
										<table class="test">
											<tr>
												<td width="50" rowspan="11">Input</td>
												<td width="120">aXgateAddress</td>
												<td width="524"><input type="text" class="inputtext" name="aXgateAddress"/></td>
											</tr>
											<tr>
												<td>aPath</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aPath"/></td>
											</tr>
											<tr>
												<td>aQuery</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aQuery"/></td>
											</tr>
											<tr>
												<td>aHostName</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aHostName"/></td>
											</tr>
											<tr>
												<td>aPort</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aPort"/></td>
											</tr>
											<tr>
												<td>aTargetFilePath</td>
												<td style="text-align:left;">
													<select name="aTargetFileSelect" multiple="single" class="inputselect" size="6">
<%
													if (files != null)
													{
														for (i = 0 ; i < files.length; ++i)
														{
															if (!files[i].isDirectory())
																out.println ("<option value=\"" +  files[i].getName() + "\">" + files[i].getName() + " (" + files[i].length() + " Byte)</option>");
														}
													}
													else
													{
														out.println ("<option value=\"\">No Files</option>");
													}
%>
													</select>
													* Multi Select: Ctrl + Click<br/>
													<input type="button" class="inputbutton" style="height:auto;" value="Select"
													onClick="this.form.aTargetFilePath.value = sumSelect (this.form.aTargetFileSelect)"/><br/>
													<input type="text" class="inputtext" name="aTargetFilePath"/>
												</td>
											</tr>
											<tr>
												<td>aDownloadPath</td>
												<td style="text-align:left;">
													<input type="button" class="inputbutton" style="height:auto;" value="SelectFile"
													onClick="onSelectSaveFile (this.form.aDownloadPath, 3);"/>
													<input type="text" class="inputtext" name="aDownloadPath"/>
												</td>
											</tr>
											<tr>
												<td>aOption</td>
												<td style="text-align:left;">
													<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
													0x00000000 : 기본 옵션<br/>													
													<input type="checkbox" class="inputcheck" name="aOption" value="65536" checked />
													0x00010000 : 저장할 파일 선택창을 출력하지 않는다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="131072"/>
													0x00020000 : 저장할 파일을 임시 폴더에 저장한다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="262144"/>
													0x00040000 : 동일한 이름의 저장 파일이 있는 경우 오류 처리한다.(기본값은 덮어쓴다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="524288"/>
													0x00080000 : 진행창을 보이지 않는다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="1048576"/>
													0x00100000 : 성공 시 진행창을 닫는다.(오류 시는 닫지 않는다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="2097152"/>
													0x00200000 : 완료 시 진행창을 닫는다.(오류가 발생해도 닫는다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="4194304"/>
													0x00400000 : 오류 시 다음 파일 계속 진행한다.(기본값은 종료한다)<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="8388608"/>
													0x00800000 : 오류 시 다음 파일 계속 진행할지 확인창을 띄운다.<br/>
												</td>
											</tr>
											<tr>
												<td>aDescription</td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aDescription"/></td>
											</tr>
											<tr>
												<td><b>aSID</b></td>
												<td style="text-align:left;"><input type="text" class="inputtext" name="aSID"/></td>
											</tr>
											<tr>
												<td><b>aCharset</b></td>
												<td style="text-align:left;">
													<input type="radio" class="inputcheck" name="aCharset" value="utf-8" checked/>
													utf-8<br/>
													<input type="radio" class="inputcheck" name="aCharset" value="euc-kr"/>
													euc-kr<br/>
											</tr>
											<tr>
												<td>Run</td>
												<td colspan="2">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.DownloadFileEx"
													onClick="AnySign.DownloadFileEx (this.form.aXgateAddress.value,
																				     this.form.aPath.value,
																				     this.form.aQuery.value,
																				     this.form.aHostName.value,
																				     this.form.aPort.value,
																				     this.form.aTargetFilePath.value,
																				     this.form.aDownloadPath.value,
																				     sumCheckbox (this.form.aOption),
																				     this.form.aDescription.value,
																					 this.form.aSID.value,
																				     setChar (this.form),
																				     DownloadFileEx_Callback,
																				     DownloadFileEx_ErrCallback)"/>
												</td>
											</tr>
											<tr>
												<td>Output</td>
												<td colspan="2">
													<textarea class="inputtextarea" name="aResult" rows="7"></textarea>
												</td>
											</tr>
										</table>
										</form>
										<br/>
									</td>
								</tr>
							</table>
							<!-- CENTER END -->
						</td>
						<!-- contents end -->
					</tr>
				</table>
			</td>
		</tr>

		<!-- Footer -->
		<tr>
			<td>
				<div id="xecure_footer" />
			</td>
		</tr>
	</table>
</body>
</html>
