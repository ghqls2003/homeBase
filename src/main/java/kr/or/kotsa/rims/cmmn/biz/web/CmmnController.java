package kr.or.kotsa.rims.cmmn.biz.web;

import static kr.or.kotsa.rims.cmmn.sys.util.GeojsonRenderer.renderGeojson;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.util.CryptoFile;
import xecure.crypto.Certificate;
import xecure.crypto.SignVerifier;
import xecure.crypto.VidVerifier;
import xecure.servlet.XecureConfig;

import org.springframework.core.io.Resource;

@Controller
@RequestMapping("cmmn")
public class CmmnController {

    private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);


	@Autowired
	private CmmnService commonService;

    /**
     * 코드 목록 조회
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "CommonCode")
	@ResponseBody
	public Object selectCommonCodeList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectCommonCodeList(paramsMap);
	}

	/**
	 * 소프트웨어 설치
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("software")
	public ModelAndView software(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.setViewName("cmmn/software");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
	 * 서명 결과
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("signResult")
	@ResponseBody
	public Object signResult(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		SignVerifier verifier = null;
		XecureConfig aXecureConfig = null;
		Map<String, Object> result = new HashMap<>();
		String sm = null, aVidMsg = null, aSignedMsg = null;
		boolean isGPKICertificate = false ;
		boolean isNPKICertificate = false ;
		Certificate cert = null;
		try {
			if(paramsMap.get("SIGNED") != null)
				sm = paramsMap.get("SIGNED").toString();
			if(paramsMap.get("aVidMsg") != null)
				aVidMsg = paramsMap.get("aVidMsg").toString();
			if(paramsMap.get("aSignedMsg") != null)
				aSignedMsg = paramsMap.get("aSignedMsg").toString();

			if (sm != null)
			{
				aXecureConfig = new XecureConfig ();
				if (sm.substring(0, 4).equalsIgnoreCase("3082"))
				{
					/* Hex encoded Data */
					verifier = new SignVerifier (aXecureConfig , sm, 0);
				}
				else
				{
					/* Base64 encoded Data */
					verifier = new SignVerifier (aXecureConfig , sm, 1);
				}

				result.put("code", verifier.getLastError());
				result.put("reason", verifier.getLastErrorMsg());
				logger.debug("code", verifier.getLastError());
				logger.debug("reason", verifier.getLastErrorMsg());

				if (verifier.getLastError() == 0)
				{
					result.put("plain", verifier.getVerifiedMsg_Text());
					result.put("certificatePEM", verifier.getSignerCertificate().getCertPem().replaceAll("\n", ""));
					result.put("subjectRDN", verifier.getSignerCertificate().getSubject());
//					result.put("crtfctSeCd", 2);
					logger.debug("plain", verifier.getVerifiedMsg_Text());
					logger.debug("certificatePEM", verifier.getSignerCertificate().getCertPem().replaceAll("\n", ""));
					logger.debug("subjectRDN", verifier.getSignerCertificate().getSubject());

					cert = verifier.getSignerCertificate();
				}
			}

			if (aVidMsg != null)
			{
//				aXecureConfig = new XecureConfig (System.getProperty("user.home") + "/XecureConf/xecure_servlet.conf");
				aXecureConfig = new XecureConfig ();
				String aCharset = "UTF-8";
				int aErrCode = 0;
				String aErrReason = "";
				String aPlain = "";
				String aPlainHex = "";

				if (aSignedMsg == null || aSignedMsg.equals(""))
				{
					aErrCode = -1;
					aErrReason = "invalid parameter";
				}
				else if (aSignedMsg.length() < 10)
				{
					aErrCode = -1;
					aErrReason = "invalid parameter (short)";
				}
				else
				{
					if (aSignedMsg.substring(0, 4).equalsIgnoreCase("3082"))
					{
						/* Hex encoded Data */
						verifier = new SignVerifier (aXecureConfig , aSignedMsg, aCharset);
					}
					else
					{
						/* Base64 encoded Data */
						verifier = new SignVerifier (aXecureConfig , aSignedMsg, aCharset);
					}

					if (verifier.getLastError() != 0)
					{
						aErrCode = verifier.getLastError();
						aErrReason = verifier.getLastErrorMsg();
						logger.debug("aErrCode", aErrCode);
						logger.debug("aErrReason", aErrReason);
					}
					else
					{
						// 서명 원문
						aPlain = verifier.getVerifiedMsg_Text();
						logger.debug("aPlain", aPlain);

						// 서명 원문(Hex)
						if(aPlain != null) {
							byte[] buf = verifier.getVerifiedMsg();
							String tmp = "";
							for (int i = 0; i < buf.length; i++)
							{
								tmp = Integer.toHexString(0xFF & buf[i]);
								if (tmp.length() == 1) tmp = "0" + tmp;
								aPlainHex += tmp;
							}
							logger.debug("aPlainHex", aPlainHex);
						}

						// 서명 인증서
						logger.debug("subjectRDN", verifier.getSignerCertificate().getSubject());
						result.put("subjectRDN", verifier.getSignerCertificate().getSubject());
						cert = verifier.getSignerCertificate();
					}
				}

				VidVerifier vid = new VidVerifier (aXecureConfig);

				vid.virtualIDVerifyS(aVidMsg, verifier.getSignerCertificate().getCertPem());
				logger.debug("aVidMsg", aVidMsg);
				logger.debug("getCertPem", verifier.getSignerCertificate().getCertPem());
				logger.debug("getLastError", vid.getLastErrorMsg());

				if( vid.getLastError () == 0) {
//					result.put("vidIDNumber", vid.getIdn());
					result.put("vidRealName", vid.getRealName());
//					result.put("crtfctSeCd", 1);
					logger.debug("vidRealName", vid.getRealName());
					logger.debug("getVid", vid.getVid());
				} else {
					result.put("vidCode", vid.getLastError());
					result.put("vidReason", vid.getLastErrorMsg());
					logger.debug("vidCode", vid.getLastError());
					logger.debug("vidReason", vid.getLastErrorMsg());
				}
			}
		} catch (FileNotFoundException e) {
			System.out.println("FileNotFoundException");
		} catch (IOException e) {
			System.out.println("IOException");
		}

		if(cert != null) {
			if("KR".equalsIgnoreCase(cert.getIssuer("c")))
			{
				if("Government of Korea".equalsIgnoreCase(cert.getIssuer("o"))) isGPKICertificate = true ;
				if("yessign".equalsIgnoreCase(cert.getIssuer("o"))) isNPKICertificate = true ;
				if("KICA".equalsIgnoreCase(cert.getIssuer("o"))) isNPKICertificate = true ;
				if("SignKorea".equalsIgnoreCase(cert.getIssuer("o"))) isNPKICertificate = true ;
				if("NCASign".equalsIgnoreCase(cert.getIssuer("o"))) isNPKICertificate = true ;
				if("CrossCert".equalsIgnoreCase(cert.getIssuer("o"))) isNPKICertificate = true ;
				if("TradeSign".equalsIgnoreCase(cert.getIssuer("o"))) isNPKICertificate = true ;
			}

			if(isGPKICertificate)
				result.put("crtfctSeCd", 1);
			else if(isNPKICertificate)
				result.put("crtfctSeCd", 2);
		}

		logger.debug("result", result);

		return result;
	}

	/**
     * 개인정보 식별여부
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("selectPrvYn")
	@ResponseBody
	public Object selectPrvYn(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return commonService.selectPrvYn(paramsMap);
	}

    /**
     * 멀티그룹 코드 목록 조회
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "MultiCode")
	@ResponseBody
	public Object selectMultiCodeList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> resultMap = new HashMap<>();

		@SuppressWarnings("unchecked")
		List<String> cdClList = (List<String>) paramsMap.get("cdClList");

    	if (!cdClList.isEmpty()) {
			for (int i=0; i<cdClList.size(); i++) {
				String cdCl = cdClList.get(i);

				Map<String, Object> cdClMap = new HashMap<>();
				cdClMap.put("cdCl", cdCl);

				resultMap.put(cdCl, commonService.selectCommonCodeList(cdClMap));
			}
		}

    	return resultMap;
	}

    /**
     * 지사 목록 조회
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "BrffcCode")
	@ResponseBody
	public Object selectBrffcCodeList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectBrffcCodeList(paramsMap);
	}

	/**
     * 파일 삭제
     *
     * @param deletePartFile
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping(value = "deleteFile")
    @ResponseBody
    public Object deleteFile(@RequestBody Map<String, Object> paramsMap) throws RimsException {
    	return commonService.deleteFile(paramsMap);
    }

    /**
     * 파일 업로드
     *
     * @param multiPartFile
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping(value = "fileUpload")
    @ResponseBody
    public Object insertFileUpload(@RequestParam("files") MultipartFile multiPartFile, Map<String, Object> paramsMap) throws RimsException {
    	return commonService.insertFileUpload(multiPartFile, paramsMap);
    }

    /**
     * 파일 다운로드
     *
     * @param
     * @return
     */
    @RequestMapping(value = "fileDownload", method = { RequestMethod.POST})
    public void selectFileDownload(@RequestParam Map<String, Object> paramsMap, HttpServletRequest req, HttpServletResponse res) throws RimsException, IOException {

    	String dFile = "";	//파일명
		String upDir = "";	//경로
		String path = "";	//다운로드 풀 경로
		String rFile = "";	//실제파일명

		if (paramsMap.get("filename") != null) {

			String filename = (String) paramsMap.get("filename");
 			if (filename.contains("..") || filename.contains("/") || filename.contains("\\") || filename.contains("%")) {
				return;
			}
		}

		if (paramsMap.get("realFilename") != null) {

			String realFilename = (String) paramsMap.get("realFilename");
			if (realFilename.contains("..") || realFilename.contains("/") || realFilename.contains("\\") || realFilename.contains("%")) {
				return;
			}
		}

		path = upDir + File.separator + dFile;

		if (paramsMap.get("atchFileSn") != null && paramsMap.get("filename") != null) {
			Map<String, Object> fvo = commonService.selectFileInfo(paramsMap);
			dFile = fvo.get("actl_file_nm").toString();
			upDir = fvo.get("atch_file_path").toString();
			rFile = fvo.get("atch_file_nm").toString();
		} else if (paramsMap.get("filename") != null) {
			String filepath = req.getSession().getServletContext().getRealPath("/");
			dFile = paramsMap.get("filename").toString();
			upDir = filepath + paramsMap.get("path").toString();

			if(paramsMap.get("filename") != null) {
				rFile = paramsMap.get("realFilename").toString();
			} else {
				rFile = dFile;
			}
		}

		File file = new File(path);

		String userAgent = req.getHeader("User-Agent");
		boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
		String fileName = null;

		if (ie) {
			fileName = URLEncoder.encode(rFile, "utf-8");
		} else {
			fileName = new String(rFile.getBytes("utf-8"),"iso-8859-1");
		}

		res.setContentType("application/octet-stream");
		res.setHeader("Content-Disposition","attachment;filename=\"" +fileName+"\";");

		ServletOutputStream so		= null;
		FileInputStream fis			= null;
		BufferedInputStream bis		= null;
		BufferedOutputStream bos	= null;

		try {
			so  = res.getOutputStream();
			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			bos = new BufferedOutputStream(so);

			byte[] data = new byte[2048];
			int input = 0;
			while ((input = bis.read(data)) != -1) {
				bos.write(data, 0, input);
				bos.flush();
			}
		} catch (IOException e) {
			logger.error("IOException이 발생하였습니다.");
		} finally {
			if(fis != null)
				fis.close();

			if(bis != null)
				bis.close();

			if(bos != null)
				bos.close();

			if(so != null)
				so.close();
		}
    }

    /**
     * 이미지 파일 로더
     *
     * @param
     * @return
     * @throws RimsException
     */
    @GetMapping(path = "/fileLoader/{attFileNo}")
    @ResponseBody
    public void fileLoader( @PathVariable(value = "attFileNo") int attFileNo, HttpServletRequest request, HttpServletResponse response) throws IOException, RimsException {

        String attFileNm  = null;
        String savFileNm  = null;
        String savDir     = null;
        String savPath    = null;
        File   targetFile = null;

         try {
        	Map<String, Object> fvo = commonService.selectFileInfoByAtchFileSn(attFileNo);

      		attFileNm = fvo.get("realFileNm").toString();
      		savFileNm = fvo.get("atchFileNm").toString();
      		savDir    = fvo.get("atchFileCours").toString();
      		savPath   = savDir + File.separator + savFileNm;

             if (attFileNm == null || attFileNm.trim().isEmpty()) {
                 response.sendError(HttpStatus.BAD_REQUEST.value());
                 return ;
             }

             if (savFileNm == null || savFileNm.trim().isEmpty()) {
                 response.sendError(HttpStatus.BAD_REQUEST.value());
                 return ;
             }

             targetFile = new File(savPath); // 프로파티 값이 아닌 DB 의 파일 저장경로로 파일을 접근하는 경우에 사용한다.

             if (!targetFile.exists()) {
                 response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value());
                 return ;
             }

             if (!targetFile.isFile()) {
                 response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value());
                 return ;
             }
         } catch (NumberFormatException e) {
             response.sendError(HttpStatus.BAD_REQUEST.value());
             return ;
         }

         OutputStream out = null;
         FileInputStream fis = null;

         try {
             String mimeType = Files.probeContentType(Paths.get(targetFile.getAbsolutePath()));

             response.setContentType(mimeType);
             response.setContentLength((int) targetFile.length());

             String userAgent = request.getHeader("User-Agent");
             boolean ie = userAgent.indexOf("MSIE") > -1;
             boolean ie11 = userAgent.indexOf("Trident") > -1;

             if (ie || ie11) {
                 attFileNm = URLEncoder.encode(attFileNm, "UTF-8").replaceAll("\\+", "%20");
             } else {
                 attFileNm = new String(attFileNm.getBytes("UTF-8"), "ISO-8859-1");
             }

             response.setHeader("Content-Disposition", "attachment; filename=\"" + attFileNm + "\";");
             response.setHeader("Content-Transfer-Encoding", "binary");

             out = response.getOutputStream();
             fis = new FileInputStream(targetFile);

             FileCopyUtils.copy(fis, out);
         } catch (UnsupportedEncodingException e) {
             logger.error("UnsupportedEncodingException Occured.");
         } finally {
             if (fis != null) {
                 try {
                     fis.close();
                 } catch (IOException e) {
                     logger.error("IOException Occured.");
                 }
             }
         }
    }

    /**
     * 파일 암호화 & 업로드
     *
     * @param multiPartFile
     * @param paramsMap
     * @return
     * @throws RimsException
     * @author 정영훈
     */
    @RequestMapping(value = "encryptFileUpload")
    @ResponseBody
    public Object insertEncryptFileUpload(@RequestParam("files") MultipartFile multiPartFile, Map<String, Object> paramsMap) throws RimsException, IOException {
			CryptoFile cryptoFile = new CryptoFile();
			byte[] encryptedFile = cryptoFile.encryptFile(multiPartFile);

			return commonService.insertEncryptFileUpload(multiPartFile, encryptedFile, paramsMap);
    }

     /* 파일 복호화 & 다운로드 & Get방식
     *
     * @param paramsMap
     * @author 정영훈
     */
    @RequestMapping(value = "decryptFileDownloadGet", method = { RequestMethod.GET})
    public void selectDecryptFileDownload(@RequestParam Map<String, Object> paramsMap, HttpServletRequest req, HttpServletResponse res) throws RimsException, IOException {

    	String dFile = "";	//파일명
		String upDir = "";	//경로
		String path = "";	//다운로드 풀 경로
		String rFile = "";	//실제파일명

		//파일이름 검사
		if (paramsMap.get("filename") != null) {

			String filename = (String) paramsMap.get("filename");
 			if (filename.contains("..") || filename.contains("/") || filename.contains("\\") || filename.contains("%")) {
				return;
			}
		}

		if (paramsMap.get("atchFileSn")!=null && paramsMap.get("filename")!=null) {

			Map<String, Object> fvo = commonService.selectEncryptFileInfo(paramsMap);

			dFile = fvo.get("actl_file_nm").toString();
			upDir = fvo.get("atch_file_path").toString();

			path = upDir + File.separator + dFile;
			System.out.print("path ==> " + path);

			rFile = fvo.get("atch_file_nm").toString();
		}

		File file = new File(path);
		byte[] encryptedFile = new byte[(int) file.length()];
		FileInputStream fis = null;

		//암호화된(복호화 할) 파일을 서버에서 호출.
		try {
			if (file.exists()) {
				fis = new FileInputStream(file);
				fis.read(encryptedFile);
			} else {
				//404코드 반환
				res.setStatus(HttpServletResponse.SC_NOT_FOUND);
				// 파일이 존재하지 않을 때 contentType 설정
				// res.setContentType("text/plain");
	            return;
			}
	    } catch (IOException e) {
			// 오류 처리 로직 추가
	    	logger.error("IOException이 발생하였습니다.");
	        res.setContentType("text/plain");

	        return;
	    } finally {
			fis.close();
		}

		//복호화 처리
		CryptoFile cryptoFile = new CryptoFile();
		byte[] decryptedFile = cryptoFile.decryptFile(encryptedFile);

		// 출력 스트림 설정
	    ServletOutputStream so = res.getOutputStream();
	    BufferedOutputStream bos = new BufferedOutputStream(so);

		try {
			res.setContentType("application/octet-stream");
			res.setHeader("Content-Disposition", "attachment; filename=\"" + rFile + "\"");
		    // 복호화된 파일 데이터를 클라이언트로 전송
		    bos.write(decryptedFile);
		    bos.flush();
		} catch (IOException e) {
			logger.error("IOException이 발생하였습니다.");
	        res.setContentType("text/plain");
		} finally {
		    bos.close();
		    so.close();
		}
    }

    /**
     * 지역 목록 조회 (시도)
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "selectAreaSidoList")
	@ResponseBody
	public Object selectAreaSidoList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectAreaSidoList(paramsMap);
	}

	/**
     * 지역 목록 조회(시/군/구)
     * @return
     * @throws RimsException
     */
	@RequestMapping(value = "selectAreaSignguList")
	@ResponseBody
	public Object selectAreaSignguList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectAreaSignguList(paramsMap);
	}

	/**
	 * 지역 목록 조회(읍/면/동)
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "selectAreaEmdList")
	@ResponseBody
	public Object selectAreaEmdList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectAreaEmdList(paramsMap);
	}

	/**
	 * 진입금지구역 목록 조회
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "selectZoneCdInfo")
	@ResponseBody
	public Object selectZoneCdInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectZoneCdInfo(paramsMap);
	}

	/**
	 * 진입제한구역 목록
	 * @return
	 * @throws RimsException
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "selectZoneInfo")
	@ResponseBody
	public Map<String,Object> selectZoneInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		Object obj = commonService.selectZoneInfo(paramsMap);
		return (Map<String,Object>)renderGeojson((List<Map>) obj, "geometry");
	}

	/**
	 * 권한 목록
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "authType")
	@ResponseBody
	public Object selectAuthTypeList() throws RimsException {
		return commonService.selectAuthTypeList();
	}

	/**
	 * 소속 목록
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "belongType")
	@ResponseBody
	public Object selectBelongTypeList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.selectBelongTypeList(paramsMap);
	}

	/**
    * 코드정보 조회
    *
    * @param paramsMap
    * @return
    * @throws RimsException
    */
   @RequestMapping("codeList")
   @ResponseBody
   public ModelAndView listView(@RequestBody Map<String, Object> paramsMap) throws RimsException {

   ModelAndView mav = new ModelAndView("jsonView");

    // 코드정보 목록
    List<Map<String, Object>> list = commonService.getCmmCode(paramsMap);

    mav.addObject("result", list);

       return mav;

   }

	/**
	 * 물질 목록
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping(value = "getMttrList")
	@ResponseBody
	public Object getMttrList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return commonService.getMttrList(paramsMap);
	}

    /**
     * 물질 목록 조회
     * @param paramsMap
     * @return result
     * @throws RimsException
     */
    @RequestMapping(value = "readMttrList")
    @ResponseBody
    public Object readMttrList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        Map<String, Object> result = new HashMap<String, Object>();

        result.put("data" , commonService.readMttrList(paramsMap));
        result.put("total", commonService.readMttrCnt(paramsMap));

        return result;
    }
//	/**
//	 * 파일 다운로드(Get)
//	 *
//	 * @param
//	 * @return
//	 */
//	@RequestMapping(value = "fileDownloadGet", method = { RequestMethod.GET })
//	public void selectFileDownloadGet(@RequestParam Map<String, Object> paramsMap, HttpServletRequest req,
//			HttpServletResponse res) throws RimsException, IOException {
////        ModelAndView mav = new ModelAndView("jsonView");
//
//    	String dFile = "";	//파일명
//		String upDir = "";	//경로
//		String path = "";	//다운로드 풀 경로
//		String rFile = "";	//실제파일명
//
//		if (paramsMap.get("filename") != null) {
//
//			String filename = (String) paramsMap.get("filename");
// 			if (filename.contains("..") || filename.contains("/") || filename.contains("\\") || filename.contains("%")) {
//				return;
//			}
//		}
//
//		if (paramsMap.get("realFilename") != null) {
//
//			String realFilename = (String) paramsMap.get("realFilename");
//			if (realFilename.contains("..") || realFilename.contains("/") || realFilename.contains("\\") || realFilename.contains("%")) {
//				return;
//			}
//		}
//
//		if (paramsMap.get("atchFileSn")!=null && paramsMap.get("filename")!=null) {
//
//			Map<String, Object> fvo = commonService.selectFileInfo(paramsMap);
//
//			dFile = fvo.get("actl_file_nm").toString();
//			upDir = fvo.get("atch_file_path").toString();
//
//			path = upDir + File.separator + dFile;
//
//
//			rFile = fvo.get("atch_file_nm").toString();
//
//		} else if (paramsMap.get("atchFileSn")!=null) {
//			/*
//			int atchFileSn = Integer.valueOf(paramsMap.get("atchFileSn").toString());
//			// 파일 정보 조회
//			Map<String, Object> fvo = commonService.selectFileInfo(atchFileSn);
//
//			dFile = fvo.get("atchFileNm").toString();
//			upDir = fvo.get("atchFileCours").toString();
//
//			path = upDir + File.separator + dFile;
//
//			rFile = fvo.get("realFileNm").toString();
//			*/
//		} else if (paramsMap.get("filename")!=null) {
//
//			String filepath = req.getSession().getServletContext().getRealPath("/");
//
//			dFile = paramsMap.get("filename").toString();
//			upDir = filepath + paramsMap.get("path").toString();
//
//			path = upDir + File.separator + dFile;
//
//			if(paramsMap.get("filename")!=null) {
//				rFile = paramsMap.get("realFilename").toString();
//			} else {
//				rFile = dFile;
//			}
//		}
//
//		File file = new File(path);
//
//		String userAgent = req.getHeader("User-Agent");
//		boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
//		String fileName = null;
//
//		if (ie) {
//			fileName = URLEncoder.encode(rFile, "utf-8");
//		} else {
//			fileName = new String(rFile.getBytes("utf-8"),"iso-8859-1");
//		}
//
//		res.setContentType("application/octet-stream");
//		res.setHeader("Content-Disposition","attachment;filename=\"" +fileName+"\";");
//		FileInputStream fis = null;
//		try {
//			fis = new FileInputStream(file);
//			ServletOutputStream so;
//			BufferedOutputStream bos;
//			BufferedInputStream bis = new BufferedInputStream(fis);
//			so = res.getOutputStream();
//			bos = new BufferedOutputStream(so);
//
//			byte[] data = new byte[2048];
//			int input = 0;
//			while ((input = bis.read(data)) != -1) {
//				bos.write(data, 0, input);
//				bos.flush();
//			}
//			bis.close();
//			bos.close();
//			so.close();
//		} catch (IOException e) {
//			logger.error("IOException이 발생하였습니다.");
//		} finally {
//			if(fis != null)
//				fis.close();
//		}
//    }


	/**
	 * 파일 다운로드(Get)
	 *
	 * @param
	 * @return
	 */
	@RequestMapping(value = "fileDownloadGet", method = { RequestMethod.GET })
	public void selectFileDownloadGet(@RequestParam Map<String, Object> paramsMap, HttpServletRequest req,
			HttpServletResponse res) throws RimsException, IOException {
//        ModelAndView mav = new ModelAndView("jsonView");
		Map<String, Object> result = new HashMap<>();

		String dFile = ""; // 파일명
		String upDir = ""; // 경로
		String path = ""; // 다운로드 풀 경로
		String rFile = ""; // 실제파일명

		if (paramsMap.containsKey("atchmnflSn")
				&& (!paramsMap.get("atchmnflSn").equals("") && paramsMap.get("atchmnflSn") != null)) {
			int atchFileSn = Integer.valueOf(paramsMap.get("atchmnflSn").toString());
			String atchmnflNm = paramsMap.get("atchmnflNm").toString();

			// 파일 정보 조회
			Map<String, Object> fvo = commonService.selectFileInfo2(atchFileSn, atchmnflNm);

			if (fvo == null) {
				// 다운로드 실패
				result.put("success", false);
			} else {

				dFile = fvo.get("atchFileNm").toString();

				upDir = fvo.get("atchFileCours").toString();

				path = upDir + File.separator + dFile;

				rFile = fvo.get("realFileNm").toString();

				File file = new File(path);

				String userAgent = req.getHeader("User-Agent");
				boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
				String fileName = null;

				if (ie) {
					fileName = URLEncoder.encode(rFile, "utf-8");
				} else {
					fileName = new String(rFile.getBytes("utf-8"), "iso-8859-1");
				}

//                fileName = URLEncoder.encode("법정대리인_동의서(서식).hwp", "utf-8");
				res.setContentType("application/octet-stream");
				res.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\";");

				FileInputStream fis = null;
				try {
					fis = new FileInputStream(file);

					ServletOutputStream so = res.getOutputStream();

					BufferedOutputStream bos = null;

					BufferedInputStream bis = new BufferedInputStream(fis);

					try {
						bos = new BufferedOutputStream(so);

						byte[] data = new byte[2048];
						int input = 0;
						while ((input = bis.read(data)) != -1) {
							bos.write(data, 0, input);
							bos.flush();
						}
					} catch(IOException e) {
						logger.error("BufferedOutputStream IOException이 발생하였습니다.");
					} finally {
						if (bis != null) {
							bis.close();
						}

						if (bos != null) {
							bos.close();
						}

						if (so != null) {
							so.close();
						}
					}
				} catch (IOException e) {
					logger.error("FileInputStream IOException이 발생하였습니다.");
				} finally {
					if (fis != null) {
						fis.close();
					}
				}
			}
		} else if (!paramsMap.get("realFileNm").equals("") && paramsMap.get("realFileNm") != null) {
			String realFileNm = paramsMap.get("realFileNm").toString();
			Resource resource = new ClassPathResource("atchFile" + File.separator + realFileNm);
			rFile = realFileNm;

			if (resource.getFile().exists()) {

				File file = resource.getFile();

				String userAgent = req.getHeader("User-Agent");
				boolean ie = userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("rv:11") > -1;
				String fileName = null;

				if (ie) {
					fileName = URLEncoder.encode(rFile, "utf-8");
				} else {
					fileName = new String(rFile.getBytes("utf-8"), "iso-8859-1");
				}
//                fileName = URLEncoder.encode("법정대리인_동의서(서식).hwp", "utf-8");
				res.setContentType("application/octet-stream");
				res.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\";");

				FileInputStream fis = null;

				try {
					fis = new FileInputStream(file);
					ServletOutputStream so = res.getOutputStream();
					BufferedOutputStream bos = null;
					BufferedInputStream bis = new BufferedInputStream(fis);

					try {
						bos = new BufferedOutputStream(so);

						byte[] data = new byte[2048];
						int input = 0;
						while ((input = bis.read(data)) != -1) {
							bos.write(data, 0, input);
							bos.flush();
						}
					} catch(IOException e) {
						logger.error("BufferedOutputStream IOException이 발생하였습니다.");
					} finally {
						if (bis != null) {
							bis.close();
						}

						if (bos != null) {
							bos.close();
						}

						if (so != null) {
							so.close();
						}
					}
				} catch (IOException e) {
					logger.error("FileInputStream IOException이 발생하였습니다.");
				} finally {
					if (fis != null) {
						fis.close();
					}
				}
			}
		}
	}

}
