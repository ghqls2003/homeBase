<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
	if(session.getAttribute("ssoUserId")!=null){
		response.sendRedirect("/sso/Session-view.jsp");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SP1 Login Sample</title>

<script type="text/javascript">

	function applyStyle()
	{
		try
		{
			if (navigator.appVersion.indexOf("MSIE 7.0") >= 0 || navigator.appVersion.indexOf("MSIE 8.0") >= 0)
			{
				document.body.style.cssText = "margin:0 0 0 0";
				document.getElementById("mainPage").style.position = "absolute";
				document.getElementById("mainPage").style.width = "100%";
				document.getElementById("mainPage").style.height = "100%";
			}
			else if (navigator.appVersion.indexOf("MSIE 6.0") >= 0)
			{
				document.getElementById("ssoPluginPage").style.zIndex = -1;
				document.getElementById("ssoPluginPage").style.position = "absolute";
				document.getElementById("ssoPluginPage").style.left = 0;
				document.getElementById("ssoPluginPage").style.top = 0;
			}
			else
			{
				document.body.style.cssText = "margin:0 0 0 0";
				document.getElementById("mainPage").style.position = "absolute";
				document.getElementById("mainPage").style.width = "100%";
				document.getElementById("mainPage").style.height = "100%";

				document.getElementById("ssoPluginPage").style.cssText = "visibility: hidden";
			}
		}
		catch (e)
		{
			alert(e.message);
		}
	}

	if (window.attachEvent)
	{
		window.attachEvent("onload", applyStyle);
	}
	else if (window.addEventListener)
	{
		window.addEventListener("load", applyStyle, false);
	}

</script>
</head>

<body style="position:absolute;margin:0 0 0 0;" bgcolor="#E6E6E6">
<div id="mainPage">
<form name="loginForm" id="loginForm" method="post" action="/sso/CreateRequestAuth.jsp">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td>
      <table width="520" bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td>
            <table width="500" border="1" bordercolor="#E1E1E1" style="border-collapse:collapse" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td>
                  <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="240" valign="top"><img src="images/login_main_img_03.jpg" border="0"></td>
                    </tr>
                    <tr>
                      <td width="300" valign="top">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td height="5"></td>
                          </tr>
                          <tr>
                            <td>
                              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td>
                                    <table width="100%" border="0" cellpadding="10" cellspacing="0" align="center">
                                      <tr>
                                        <td>
                                        <div id="willVisibleTable" style="visibility:hidden;position:absolute;">
                                        	<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
	                                            <tr>
	                                              <td><img src="images/logging.gif"  width="99" height="15" border="0"></td>
	                                            </tr>
	                                            <tr>
	                                              <td><br><img src="images/bar.gif" width="160" height="15" border="0"></td>
	                                            </tr>
                                            </table>
                                        </div>
                                        <div id="willHiddenTable" style="visibility:visible">
                                          <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                              <td width="200"><img src="images/admin_login_title_01.gif" width="210" height="27" border="0"></td>
                                              <td width="100" align="right"><img src="images/admin_login_img_02.gif" id="loginCertification" width="103" height="19" border="0"></td>
                                            </tr>
                                            <tr>
                                              <td colspan="2" height="7"></td>
                                            </tr>
                                            <tr>
                                              <td colspan="2" style="padding:0 0 0 4">
                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                  <tr>
                                                    <td><font COLOR="#7D7D7D">아이디</font></td>
                                                    <td><input type="text" name="user_id" id="user_id" value="sso" class="td_input"></td>
                                                  </tr>
                                                  <tr>
                                                    <td><font COLOR="#7D7D7D">비밀번호</font></td>
                                                    <td>
                                                    	<input type="password" name="user_pw" id="user_pw" value="1111" class="td_input">
                                                    	<input type="hidden" name="RelayState" id="RelayState" value="http://sp2.ts2020.kr:8558/sso/Session-view.jsp">
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colspan="2" height="7"></td>
                                            </tr>
                                            <tr>
                                              <td colspan="2" id="loginImgTd" align="center" style="padding:0 3 0 0">
                                              	<input type="image"  src="images/admin_login_btn_01.gif" id="loginImg" width="80" height="15" border="0">
                                              </td>
                                            </tr>
                                          </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                <table width="100%" height="35" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center">Copyrightⓒ2010 by DreamSecurity ALL RIGHT RESERVED.</td>
					</tr>
				</table>
				</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</form>


</div>
<div id="ssoPluginPage">
<div id="pluginArea"></div>
<div id="xsignArea"></div>
</div>
</body>

</html>