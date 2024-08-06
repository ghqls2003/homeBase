package kr.or.kotsa.rims.cmmn.lib.mic.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.ResourceUtils;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.raonsecure.omnione.core.crypto.GDPCryptoHelperClient;
import com.raonsecure.omnione.core.data.did.v2.DIDs;
import com.raonsecure.omnione.core.data.iw.profile.Profile;
import com.raonsecure.omnione.core.data.iw.profile.result.VCVerifyProfileResult;
import com.raonsecure.omnione.core.data.rest.ResultJson;
import com.raonsecure.omnione.core.data.rest.ResultProfile;
import com.raonsecure.omnione.core.data.rest.ResultVcStatus;
import com.raonsecure.omnione.core.eoscommander.crypto.digest.Sha256;
import com.raonsecure.omnione.core.eoscommander.crypto.util.HexUtils;
import com.raonsecure.omnione.core.exception.IWException;
import com.raonsecure.omnione.sdk_verifier.api.data.SpProfileParam;
import com.raonsecure.omnione.sdk_verifier.api.data.VcVerifyProfileParam;
import com.raonsecure.omnione.core.key.IWKeyManagerInterface;
import com.raonsecure.omnione.core.key.IWKeyManagerInterface.OnUnLockListener;
import com.raonsecure.omnione.core.key.KeyManagerFactory;
import com.raonsecure.omnione.core.key.KeyManagerFactory.KeyManagerType;
import com.raonsecure.omnione.core.key.data.AESType;
import com.raonsecure.omnione.core.key.store.IWDIDFile;
import com.raonsecure.omnione.core.util.http.HttpException;
import com.raonsecure.omnione.sdk_server_core.api.EosDataApi;
import com.raonsecure.omnione.sdk_server_core.blockchain.common.BlockChainException;
import com.raonsecure.omnione.sdk_server_core.blockchain.common.ServerInfo;
import com.raonsecure.omnione.sdk_server_core.blockchain.common.StateDBResultDatas;
import com.raonsecure.omnione.sdk_server_core.blockchain.convert.VcStatusTbl;
import com.raonsecure.omnione.sdk_server_core.blockchain.convert.VcStatusTbl.VCStatusEnum;
import com.raonsecure.omnione.sdk_server_core.data.VcResult;
import com.raonsecure.omnione.core.data.iw.profile.EncryptKeyTypeEnum;
import com.raonsecure.omnione.sdk_verifier.VerifyApi;

@Service
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
public class MipDidVpServiceImpl implements MipDidVpService, InitializingBean {

	@Value(value="${app.blockchain-server-domain}")
    private String blockChainServerDomain;

	@Value(value="${Globals.verifyLicense}")
    private String verifyLicense;

	@Value(value="${Globals.wallet}/sp.wallet")
    private String keymanagerPath;

	@Value(value="${app.keymanager-password}")
    private String keymanagerPassword;

	@Value(value="${app.sp-key-id}")
    private String spKeyId;

	@Value(value="${app.sp-rsa-key-id}")
    private String spRsaKeyId;

	@Value(value="${app.sp-account}")
    private String spAccount;

	@Value(value="${Globals.wallet}/sp.did")
    private String spDidPath;

	/** 블록체인 서버정보 */
	private ServerInfo blockChainServerInfo;
	/** 키메니져 */
	private IWKeyManagerInterface keyManager;
	/** DID 파일 경로 */
	private String didFilePath;
	/** DID Document */
	private DIDs didDoc;

	String svcCode;

	public static String vpData;
	Integer encryptType;

	/**
	 * 초기 설정
	 */
	@Override
	public void afterPropertiesSet() throws Exception {
		blockChainServerInfo = new ServerInfo(verifyLicense);

		File keyManagerFile = null;
		try {
			keyManagerFile = ResourceUtils.getFile(keymanagerPath);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("FileNotFoundException Occured");
		}
		String keyManagerPath = keyManagerFile.getAbsolutePath();
		System.out.println("keyManagerPath : " + keyManagerPath);

		/** 키메니져 */
		keyManager = null;
		try {
			keyManager = KeyManagerFactory.getKeyManager(KeyManagerType.DEFAULT, keyManagerPath, keymanagerPassword.toCharArray());
		} catch (IWException e) {
			// TODO Auto-generated catch block
			System.out.println("IWException Occured");
		}

		try {
			keyManager.unLock(keymanagerPassword.toCharArray(), new OnUnLockListener() {
				@Override
				public void onSuccess() {
					System.out.println("[OMN] API keyManager onSuccess");
				}

				@Override
				public void onFail(int errCode) {
					System.out.println("[OMN] API keyManager onFail : " + errCode);
				}

				@Override
				public void onCancel() {
					System.out.println("[OMN] API keyManager onCancel");
				}
			});
		} catch (IWException e1) {
			// TODO Auto-generated catch block
			System.out.println("IWException Occured");
		}

		File didFile = null;
		try {
			didFile = ResourceUtils.getFile(spDidPath);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("FileNotFoundException Occured");
		}

		/** DID 파일 경로 */
		didFilePath = didFile.getAbsolutePath();

		IWDIDFile iWDIDFile = null;
		try {
			iWDIDFile = new IWDIDFile(didFilePath);
		} catch (IWException e) {
			// TODO Auto-generated catch block
			System.out.println("IWException Occured");
		}

		/** DID Document */
		didDoc = iWDIDFile.getDataFromDIDsV2();
	}

	/**
	 * Profile 요청
	 *
	 * @MethodName : getProfile
	 * @param trxInfoSvc 거래 & 서비스정보
	 * @return Base64로 인코딩된 Profile
	 * @throws SpException
	 */
	public String getProfile(Map<String, Object> paramsMap) {
		svcCode = (String) paramsMap.get("svcCode");
		String branchName = (String) paramsMap.get("branchName");

		// Profile 생성 Start
		Profile profile = new Profile();

		profile.setEncryptType(2);
		profile.setPresentType(1);
		profile.setSpName(branchName);
		profile.setName("모바일 면허증(QR)");
		profile.setKeyType(2);

		List<String> authType = new ArrayList<>();
		authType.add("pin");
		authType.add("face");

//		profile.setAuthType(authType);
		profile.setAuthType(null);

		byte[] tempNonce = null;

		try {
			tempNonce = new GDPCryptoHelperClient().generateNonce();
		} catch (IWException e) {
			// TODO Auto-generated catch block
			System.out.println("IWException Occured");
		}

		String nonce = Sha256.from(tempNonce).toString();

		profile.setNonce(nonce);

		SpProfileParam spProfileParam = new SpProfileParam(blockChainServerInfo, keyManager, spKeyId, svcCode, profile, didDoc.getId(), spAccount);

		if (profile.getKeyType() == EncryptKeyTypeEnum.ALGORITHM_RSA.getVal()) {
			try {
				spProfileParam.setEncPublicKey(keyManager.getPublicKey(spRsaKeyId));
			} catch (IWException e) {
				// TODO Auto-generated catch block
				System.out.println("IWException Occured");
			}
		}

		String spProfileJson = null;

		try {
			spProfileJson = VerifyApi.makeSpProfile(spProfileParam);
		} catch (BlockChainException | HttpException e) {
			// TODO Auto-generated catch block
			System.out.println("BlockChainException or HttpException Occured");
		}

		// Profile 생성 End

		ResultProfile resultJson = new ResultProfile();

		resultJson.setResult(true);
		resultJson.setProfileJson(spProfileJson);

		return resultJson.getProfileBase64();
	}

	/**
	 * VP 검증
	 *
	 * @param mipApiData {"data":"Base64로 인코딩된 M400 메시지"}
	 * @return {"result":true}
	 * @throws ParseException
	 * @throws SpException
	 */
	@SuppressWarnings("unchecked")
	public Boolean verifyVP(String trxcode, JSONObject vp) {
		Boolean result = false;

		encryptType = ((Long) vp.get("encryptType")).intValue();
		Integer keyType = ((Long) vp.get("keyType")).intValue();
		String type = (String) vp.get("type");
		String data = (String) vp.get("data");
		List<String> authType = (List<String>) vp.get("authType");
		String did = (String) vp.get("did");
		String nonce = (String) vp.get("nonce");

		// VP 검증 Start
		VCVerifyProfileResult vCVerifyProfileResult = new VCVerifyProfileResult();

		vCVerifyProfileResult.setEncryptType(encryptType);
		vCVerifyProfileResult.setKeyType(keyType);
		vCVerifyProfileResult.setType(type);
		vCVerifyProfileResult.setData(data);

		vCVerifyProfileResult.setAuthType(authType);
		vCVerifyProfileResult.setDid(did);
		vCVerifyProfileResult.setNonce(nonce);

		ResultJson resultJson = verify(vCVerifyProfileResult, trxcode);

		if (resultJson == null || !resultJson.isResult()) {
			return result;
		}
		// VP 검증 End

		// VP 상태 확인 Start
		Map<String, Object> vpDataMap = null;

		EncryptKeyTypeEnum keyTypeEnum = EncryptKeyTypeEnum.getEnum(vCVerifyProfileResult.getKeyType());

		if (keyTypeEnum == EncryptKeyTypeEnum.ALGORITHM_RSA) {
			try {
				AESType aESType = vCVerifyProfileResult.getEncryptType() == 1 ? AESType.AES128 : AESType.AES256;

				byte[] vpDataByte = keyManager.rsaDecrypt(spRsaKeyId, HexUtils.toBytes(vCVerifyProfileResult.getData()), aESType);

				data = new String(vpDataByte, StandardCharsets.UTF_8);
			} catch (IWException e) {
				System.out.println("IWException Occured");
			}
		}

		try {
			vpDataMap = new Gson().fromJson(data, HashMap.class);
		} catch (JsonSyntaxException e) {
			System.out.println("JsonSyntaxException Occured");
		}

		List<Map<String, Object>> verifiableCredentialList = (List<Map<String, Object>>) vpDataMap.get("verifiableCredential");

		if (ObjectUtils.isEmpty(verifiableCredentialList)) {

		}

		Map<String, Object> verifiableCredential = verifiableCredentialList.get(0);

		String vcId = (String) verifiableCredential.get("id");

		ResultVcStatus resultVcStatus = null;

		try {
			resultVcStatus = this.getVCStatus(vcId);
		} catch (BlockChainException e) {
			System.out.println("BlockChainException Occured");
		}

		String vcStatus = resultVcStatus.getVcStatus();

		if (vcStatus.equalsIgnoreCase("ACTIVE")) { // 활성화 상태
			result = true;
		} else if (vcStatus.equalsIgnoreCase("NEED_RENEW")) { // 갱신필요 상태
			String memo = resultVcStatus.getMemo();

			if (memo.equals("주소변경")) {
				result = true;
			} else {
				System.out.println("제출불가 상태 : " + vcStatus + "(" + memo + ")");
			}
		} else {
			System.out.println("제출불가 상태 : " + vcStatus);
		}
		// VP 상태 확인 End

		// 일반인증시 proof를 사용하고 안심인증시 proofs를 사용
		Map<String, Object> proof = (Map<String, Object>) vpDataMap.get("proof");
		List<Map<String, Object>> proofs = (List<Map<String, Object>>) vpDataMap.get("proofs");

		if (ObjectUtils.isEmpty(proof) && ObjectUtils.isEmpty(proofs)) {
//			throw new Exception("proof");
		}

		//vp 데이터 가져오기
		vpData = (String) vp.get("data");

		return result;
	}

	/**
	 * VC 상태 조회
	 *
	 * @MethodName : getVCStatus
	 * @param vcId VCID
	 * @return VC 상태
	 * @throws BlockChainException
	 */
	private ResultVcStatus getVCStatus(String vcId) throws BlockChainException {
		ResultVcStatus resultVcStatus = new ResultVcStatus();

		resultVcStatus.setVcId(vcId);

		EosDataApi eosDataApi = new EosDataApi();

		StateDBResultDatas<VcStatusTbl> stateDBResultDatas = eosDataApi.getVCStatus(blockChainServerInfo, vcId);

		if (!stateDBResultDatas.getDataList().isEmpty()) {
			VcStatusTbl vcStatusTbl = stateDBResultDatas.getDataList().get(0);

			resultVcStatus.setVcStatus(vcStatusTbl.getStatusCodeEnum().toString());
			resultVcStatus.setMemo(vcStatusTbl.getMemo().toString());
		} else {
			resultVcStatus.setVcStatus(VCStatusEnum.NOT_EXIST.toString());
		}

		resultVcStatus.setResult(true);

		return resultVcStatus;
	}

	/**
	 * 검증
	 *
	 * @MethodName : verify
	 * @param vCVerifyProfileResult 검증 파라미터
	 * @param trxcode 거래코드
	 * @return 검증 결과
	 * @throws SpException
	 */
	private ResultJson verify(VCVerifyProfileResult vCVerifyProfileResult, String trxcode) {
		VcResult vcResult = null;

		VcVerifyProfileParam vcVerifyProfileParam = new VcVerifyProfileParam(blockChainServerInfo, keyManager, spKeyId, spAccount, vCVerifyProfileResult, didFilePath);

		vcVerifyProfileParam.setServiceCode(svcCode);
		vcVerifyProfileParam.setCheckVCExpirationDate(true);
		vcVerifyProfileParam.setIssuerProofVerifyCheck(true);

		EncryptKeyTypeEnum keyTypeEnum = EncryptKeyTypeEnum.getEnum(vCVerifyProfileResult.getKeyType());

		if (keyTypeEnum == EncryptKeyTypeEnum.ALGORITHM_RSA)
			vcVerifyProfileParam.setEncryptKeyId(spRsaKeyId);

		try {
			vcResult = VerifyApi.verify2(vcVerifyProfileParam, false);
		} catch (BlockChainException e) {
			System.out.println("BlockChainException Occured");
		} catch (HttpException e) {
			System.out.println("HttpException Occured");
		}

		ResultJson resultJson = new ResultJson();

		if (vCVerifyProfileResult.getAuthType() != null) {
			String signKeyId = vcResult.getSignKeyId().toString();

			for (String auth : vCVerifyProfileResult.getAuthType()) {
				if (!StringUtils.containsIgnoreCase(signKeyId, auth)) {
					resultJson.setResult(vcResult.getStatus().equals("0"));

					return resultJson;
				}
			}
		}

		resultJson.setResult(vcResult.getStatus().equals("1"));

		return resultJson;
	}

	/**
	 * VP data 조회
	 *
	 * @MethodName : getVPData
	 * @param vp VP
	 * @throws SpException
	 */
	public Map<String, Object> getVPData(Map<String, Object> paramsMap){
		Map<String, Object> result = new HashMap<>();

		if(vpData != "") {
			AESType aESType = encryptType == 1 ? AESType.AES128 : AESType.AES256;

			byte[] vpDataByte = null;
			try {
				vpDataByte = keyManager.rsaDecrypt(spRsaKeyId, HexUtils.toBytes(vpData), aESType);
			} catch (IWException e) {
				// TODO Auto-generated catch block
				System.out.println("IWException Occured");
			}

			String reuslt = new String(vpDataByte, StandardCharsets.UTF_8);

			JSONParser parser = new JSONParser();
			JSONObject jsonVp = null;
	        try {
				jsonVp = (JSONObject) parser.parse(reuslt);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				System.out.println("ParseException Occured");
			}

	        JSONArray resultVpData = (JSONArray) jsonVp.get("verifiableCredential");

			int asortIndex = -1;
			int dlnoIndex = -1;
			int nameIndex = -1;
			for (int i = 0; i < resultVpData.size(); i++) {
			    if (((JSONObject) ((JSONArray) ((JSONObject) ((JSONObject) resultVpData.get(i)).get("credentialSubject")).get("privacy")).get(0)).get("type").equals("asort")) {
			    	asortIndex = i;
			    }
			    if (((JSONObject) ((JSONArray) ((JSONObject) ((JSONObject) resultVpData.get(i)).get("credentialSubject")).get("privacy")).get(0)).get("type").equals("dlno")) {
			    	dlnoIndex = i;
			    }
			    if (((JSONObject) ((JSONArray) ((JSONObject) ((JSONObject) resultVpData.get(i)).get("credentialSubject")).get("privacy")).get(0)).get("type").equals("name")) {
			    	nameIndex = i;
			    }
			}

			JSONObject asortObject = (JSONObject) ((JSONArray) ((JSONObject) ((JSONObject) resultVpData.get(asortIndex)).get("credentialSubject")).get("privacy")).get(0);
			JSONObject dlnoObject = (JSONObject) ((JSONArray) ((JSONObject) ((JSONObject) resultVpData.get(dlnoIndex)).get("credentialSubject")).get("privacy")).get(0);
			JSONObject nameObject = (JSONObject) ((JSONArray) ((JSONObject) ((JSONObject) resultVpData.get(nameIndex)).get("credentialSubject")).get("privacy")).get(0);
			String asort = (String) asortObject.get("value");
			String dlno = (String) dlnoObject.get("value");
			String name = (String) nameObject.get("value");

			result.put("asort", asort);
			result.put("dlno", dlno);
			result.put("name", name);
		}

		return result;
	}
}