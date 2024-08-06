<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.jni.*" %>
<%@ page import="java.io.*" %>
<%
	int err = 0;
	String[] pemCerts = {};
	
	// 서명 대상 파일 경로 (anySign 이외에는 아래 경로 변경 필요)
	String strOrgFile = "/home/dev1/workspace/git/AnySign/js/test/signfileinfo/test.txt";
	
	// 1차 서명 파일을 저장할 경로 (anySign 이외에는 아래 경로 변경 필요)
	String strSignFile = "/home/dev1/workspace/git/AnySign/js/test/signfileinfo/test_1.sig";
	
	// 2차 서명 파일을 저장할 경로 (anySign 이외에는 아래 경로 변경 필요)
	String strSignFile2 = "/home/dev1/workspace/git/AnySign/js/test/signfileinfo/test_2.sig";
	
	// 2차 서명 인증서 정보 (anySign 이외에는 아래 경로 변경 필요)
	File certpath = new File("/home/dev1/workspace/git/AnySign/js/test/signfileinfo/cert/signCert.der");
	File keypath = new File("/home/dev1/workspace/git/AnySign/js/test/signfileinfo/cert/signPri.key");
	String passwd = "qwer1234";
	
	String fileHash = request.getParameter("aFileHash");
	String signedData = request.getParameter("aSignedMsg");
	String add_signedData = request.getParameter("aAddSignedMsg");
	String vidMsg = request.getParameter("aVidMsg");
	int aSignerNum = 0;
	
	out.println("<h1>XecureWeb for Multi - SignFileInfo Test (Server)</h1>");

	if (add_signedData != null && add_signedData.length() != 0)
		signedData = add_signedData;
	
	//-----------------------------------------------------------------------------
	out.println("<h3>1. 클라이언트 서명값</h3>");
	if(signedData == null || signedData.length() == 0) {
		out.println("invalid request");
		return;
	}
	out.println("Client Signed Data: " + signedData + "<br>");
	//-----------------------------------------------------------------------------
	out.println("<h3>2. 클라이언트 서명 파일(원문데이터)해쉬값</h3>");
	if(fileHash == null || fileHash.length() == 0) {
		out.println("invalid request");
		return;
	}
	out.println("Client Signed fileHash: " + fileHash + "<br>");
	//-----------------------------------------------------------------------------
	out.println("<h3>3. 파일(원문데이터) 해쉬값으로 전자서명문 검증</h3>");
	String[] splitHashData = fileHash.split("\\$");
	String verifiedHashData = null;

	for (String tempHashData : splitHashData) {

		String[] splitAlgHash = tempHashData.split("\\|");

		if( splitAlgHash[0].toUpperCase().indexOf("SHA2") >= 0)
		{
			verifiedHashData = splitAlgHash[1];
			break;
		}
	}

	if(verifiedHashData == null || verifiedHashData.length() == 0) {
		out.println("No SHA2 fileHash.");
	}
	else
	{
		out.println("SHA2 FileHash Data: " + verifiedHashData + "<br>");
	}

	//-----------------------------------------------------------------------------
	// 서명검증 시작

	//request.setCharacterEncoding("UTF-8");
	//response.setContentType("text/html; charset=UTF-8");
	String aCharset = "UTF-8";

	XecureConfig aXecureConfig = new XecureConfig ();
	SignVerifier	verifier = null;

	String aResult = signedData;
	int aErrCode = 0;
	String aErrReason = "";
	String aPlain = "";
	String aCertificate = "";
	String aSubjectRDN = "";
	String aSerial = "";

	if (aResult == null || aResult.equals(""))
	{
		aErrCode = -1;
		aErrReason = "invalid parameter";
	}
	else if (aResult.length() < 10)
	{
		aErrCode = -1;
		aErrReason = "invalid parameter (short)";
	}
	else
	{
		if (aResult.substring(0, 4).equalsIgnoreCase("3082"))
		{
			/* Hex encoded Data */
			verifier = new SignVerifier (aXecureConfig , aResult, verifiedHashData.getBytes(), "", aCharset, 1);
		}
		else
		{
			/* Base64 encoded Data */
			verifier = new SignVerifier (aXecureConfig , aResult, verifiedHashData.getBytes(), "", aCharset, 1);
		}


		if (verifier.getLastError() != 0)
		{
			out.println("> SignVerifier fail<br>");

			aErrCode = verifier.getLastError();
			aErrReason = verifier.getLastErrorMsg();

			out.println("> 오류 코드 : " + aErrCode + "<br>");
			out.println("> 오류 메세지 : " + aErrReason + "<br>");
		}
		else
		{
			out.println("> SignVerifier success<br>");

			aPlain = verifier.getVerifiedMsg_Text();
			aCertificate = verifier.getSignerCertificate().getCertPem().replaceAll ("\n", "");
			aSubjectRDN = verifier.getSignerCertificate().getSubject();
			aSerial = verifier.getSignerCertificate().getSerial();

			out.println("> 서명 원문 : " + aPlain + "<br>");
			out.println("> 서명 인증서 주체 : " + aSubjectRDN + "<br>");
			out.println("> 서명 인증서 시리얼 : " + aSerial + "<br>");
			out.println("> 서명 인증서 : " + aCertificate + "<br>");
		}

	}
	// 서명검증 끝
	//-----------------------------------------------------------------------------
	out.println("<h3>2. 기존 서명 파일 삭제</h3>");
	out.println("Delete File 1: " + strSignFile + "<br>");
	out.println("Delete File 2: " + strSignFile2 + "<br>");
	
	File f1 = new File(strSignFile);
	File f2 = new File(strSignFile2);
	f1.delete();
	f2.delete();
	//-----------------------------------------------------------------------------
	out.println("<h3>3. 서명값 + 원본 파일 병합</h3>");
	out.println("Original File Path: " + strOrgFile + "<br>");
	out.println("Merge File Path: " + strSignFile + "<br>");
	
	XecureConfig xconfig = new XecureConfig();
	
	SplitFileSign sfs = new SplitFileSign(xconfig);
	byte[] bytes = new java.math.BigInteger(signedData, 16).toByteArray();
	err = sfs.merge(strSignFile, strOrgFile, bytes, pemCerts);
	if (err != 0)
	{
		out.println("> SplitFileSign.merge error[" + sfs.getLastError() + "]");
		return;
	}
	out.println("> SplitFileSign.merge success<br>");
	//-----------------------------------------------------------------------------
	out.println("<h3>4. 병합된 서명 파일 검증</h3>");
	out.println("Merge File Path: " + strSignFile + "<br>");
	
	FileSignVerifier fsv = new FileSignVerifier(xconfig, strSignFile);
	if (fsv.getLastError() != 0)
	{
		out.println("> FileSignVerifier error[" + fsv.getLastError() + "][" + fsv.getLastErrorMsg() + "]");
		return;
	}
	out.println("> FileSignVerifier success<br>");
	//-----------------------------------------------------------------------------
	out.println("<h3>5. 식별번호 검증</h3>");	
	if(vidMsg == null || vidMsg.length() == 0) {
		out.println("> no input VID Data");
	}
	else
	{
		out.println("Client VID Data: " + vidMsg + "<br>");
			
		VidVerifier vv = new VidVerifier(xconfig);
		//vv.virtualIDVerifyS(vidMsg, fsv.getSignerCertificate().getCertPem(), "1111112222222"); // 서버측에서 식별번호 입력 시 사용
		vv.virtualIDVerifyS(vidMsg, fsv.getSignerCertificate().getCertPem());
		if (vv.getLastError() != 0)
		{
			out.println("> VidVerifier error[" + vv.getLastError() + "][" + vv.getLastErrorMsg() + "]");
			return;
		}
		out.println("> VidVerifier success<br>");	
	}
	//-----------------------------------------------------------------------------
	out.println("<h3>6. 서버에서 파일 서명 (2차 서명)</h3>");
	out.println("2nd Sign File path:" + strSignFile2 + "<br>");
	out.println("Cert File path:" + certpath + "<br>");
	out.println("Key File path:" + keypath + "<br>");
	out.println("Password:" + passwd + "<br>");
	
	if (!certpath.exists() || !keypath.exists())
	{
		out.println("> not exists Cert");
		return;
	}
	
	RandomAccessFile fcert = new RandomAccessFile(certpath, "r");
	byte[] bpem = new byte[(int)fcert.length()];
	fcert.read(bpem);
	fcert.close();
	
	RandomAccessFile fkey = new RandomAccessFile(keypath, "r");
	byte[] bkey = new byte[(int)fkey.length()];
	fkey.read(bkey);
	fkey.close();
	
	byte[] bpasswd = passwd.getBytes();
	
	FileSigner fs = new FileSigner(xconfig);
	err = fs.signFileAddWithKey(bpem, bkey, bpasswd, strSignFile, strSignFile2);
	if (err != 0)
	{
		out.println("> FileSigner.signFileAddWithKey error[" + fs.getLastError() + "]");
		return;
	}
	out.println("> FileSigner.signFileAddWithKey success");
	//-----------------------------------------------------------------------------
	out.println("<h3>7. 2차 서명(multiSigner) 파일 검증</h3>");
	out.println("2nd Sign File path:" + strSignFile2 + "<br>");
	
	FileMultiSignVerifier fmsv = new FileMultiSignVerifier(xconfig, strSignFile2);
	if (fmsv.getLastError() != 0)
	{
		out.println("> FileMultiSignVerifier error[" + fmsv.getLastError() + "]");
		return;
	}
	out.println("> FileMultiSignVerifier success<p>");

	aSignerNum = fmsv.getNumberOfSigner();
	out.println("> 서명자 수 : " + aSignerNum + "<p>");

	for (int i = 0; i < aSignerNum; i++)
	{
		aCertificate = fmsv.getSignerCertificate(i).getCertPem().replaceAll ("\n", "");
		aSubjectRDN = fmsv.getSignerCertificate(i).getSubject();
		aSerial = fmsv.getSignerCertificate(i).getSerial();
			
		out.println("> 서명자[" + (i+1) + "]<br>");
		out.println("> 서명 인증서 주체 : " + aSubjectRDN + "<br>");
		out.println("> 서명 인증서 시리얼 : " + aSerial + "<br>");
		out.println("> 서명 인증서<br>");
		out.println("<textarea cols=\"100\" rows=\"10\">" + aCertificate + "</textarea><p>");
	}
%>
