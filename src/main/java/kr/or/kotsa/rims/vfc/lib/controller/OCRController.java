package kr.or.kotsa.rims.vfc.lib.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.SecureRandom;
import java.security.spec.PKCS8EncodedKeySpec;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.quram.mi.lib.data.result.QuramOcrScanResult;
import com.quram.mi.lib.engine.QuramOcrScanner;
import com.quram.mi.lib.engine.QuramOcrScanner.QuramOcrResultType;
import com.quram.mi.lib.engine.QuramOcrScanner.QuramOcrScannerFrameType;
import com.quram.mi.lib.engine.QuramOcrScanner.QuramOcrScannerResultCode;
import com.quram.mi.lib.engine.QuramOcrScanner.QuramOcrScannerType;
import com.quram.mi.lib.engine.ScanOptions;
import com.quram.mi.lib.util.ResultSaver;  

import kr.or.kotsa.rims.vfc.lib.logmanager.LogsManager;


/* result값 쌓이지 않게 하기 위해서 주석처리 함 '// no stack result' 으로 검색 */

@Controller
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
public class OCRController {

	
    private static Logger resultLogger = LoggerFactory.getLogger("com.quram.mi.sample.log.result");
    private static Logger AppLogger = LoggerFactory.getLogger("com.quram.mi.sample.log");

	private static LogsManager mLogManager = new LogsManager();
	private static int tryCount=0;

	private static final String TESS_PATH = "TESS.PATH";
    private static final String FACE_DATA_PATH = "FACE.DATA.PATH";
    
    private static final String RSA_SEED_PATH = "rsa.seed.path";
    private static final String RSA_PUBLIC_PATH = "rsa.public.path";
    private static final String RSA_PRIVATE_PATH = "rsa.private.path";
    private static Environment env;

    private boolean useEncryptJpg = false;
    final int seedSize = 32;
    private byte[] seed = null;
    private String publicKeyString = null;
    private String privateKeyString = null;

    private PrivateKey privateKey;

    @Autowired
    public OCRController(Environment environment) {
        env = environment;
        seed = null;
        boolean hasSeed = getSeed();
        boolean hasKey = false;
        if(getPublicKey() && getPrivateKey())
            hasKey = true;
        if(hasSeed  || hasKey)
            useEncryptJpg = true;
    
        if(useEncryptJpg) {
            try {
                KeyFactory keyFactory;
                if (hasKey) { // 고정키 사용 시
                    byte[] privateKeyBytes = Base64.getDecoder().decode(privateKeyString);
                    // PKCS8 인코딩된 개인 키로 변환
                    PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);

                    // KeyFactory를 사용하여 PrivateKey 객체 생성
                    keyFactory = KeyFactory.getInstance("RSA"); // 알고리즘에 따라 변경 가능
                    privateKey = keyFactory.generatePrivate(privateKeySpec);
                } else {
                    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
                    keyPairGenerator.initialize(2048, new SecureRandom(seed)); // 2048비트 RSA 키 생성
                    KeyPair keyPair = keyPairGenerator.generateKeyPair();
                    privateKey = keyPair.getPrivate();
                    keyFactory = KeyFactory.getInstance("RSA");
                }
            } catch (Exception e) {
                useEncryptJpg = false;
            }
        } else {}
    }

    public static String getTessPath() {
        AppLogger.info("tesseract data path : " + Paths.get(env.getProperty(TESS_PATH)).toAbsolutePath().normalize());
        return env.getProperty(TESS_PATH);
    }
    
    public static byte[] hexToByteArray(String hex) {
        if (hex == null || hex.length() % 2 != 0) { 
            System.out.println("hex.length()" + hex.length());
            return new byte[] {}; 
        }

        byte[] bytes = new byte[hex.length() / 2];
        for (int i = 0; i < hex.length(); i += 2) {
            byte value = (byte) Integer.parseInt(hex.substring(i, i + 2), 16);
            bytes[(int) Math.floor(i / 2)] = value;
        }
        return bytes;
    }
 
    public boolean getSeed() {

        String path = null;
        boolean ret = false;
       
        //System.out.println("getSeed()");

        try {
            path = env.getProperty(RSA_SEED_PATH);
            path = Paths.get(path).toAbsolutePath().normalize().toString();

            //System.out.println("RSA seed path : " + path);
            
            File f = new File(path);
            if(f != null && f.exists()) {
                if(f.isFile()) {
                	FileInputStream fileInputStream = null;
                    try {
                        // 파일을 읽어서 바이트 배열로 저장
                        fileInputStream = new FileInputStream(path);

                        // 파일의 크기만큼 바이트 배열 생성
                        byte[] fileData = new byte[fileInputStream.available()];
                        // 파일 내용을 바이트 배열에 읽어옴
                        fileInputStream.read(fileData);
   
                        seed = new byte[seedSize];
                        if(seedSize > 0)
                            Arrays.fill(seed, (byte) 0);
                   
                        if (fileData.length > 0) {
                            System.arraycopy(fileData, 0, seed, 0, fileData.length);
                        } else {
                            SecureRandom random = new SecureRandom();
                            random.nextBytes(seed);
                        }
                
                        String text = new String(seed, StandardCharsets.UTF_8); 
                        System.out.println(text); // 문자열 출력
       
                        ret = true;
                    } catch (IOException e) {
                        System.out.println("Failed to get rsa seed IOException");
                        ret = false;
                    } finally {
                    	fileInputStream.close();
                    }
                }
            }
        } catch (FileNotFoundException e) {
            System.out.println("RSA seed file not found");
            ret = false;
        } catch (SecurityException e) {
            System.out.println("Security exception while accessing RSA seed file");
            ret = false;
        } catch (Exception e) {
            System.out.println("Failed to get rsa seed path");
            ret = false;
        }
        return ret;
    }

    public boolean getPublicKey() {

        String path = null;
        boolean ret = false;
       
        try {
            path = env.getProperty(RSA_PUBLIC_PATH);
            path = Paths.get(path).toAbsolutePath().normalize().toString();

            System.out.println("RSA Public path : " + path);
            File f = new File(path);
            if (f != null && f.exists()) {
                if (f.isFile()) {
                	FileInputStream fileInputStream = null;
                    try {
                        // 파일을 읽어서 바이트 배열로 저장
                        fileInputStream = new FileInputStream(path);

                        // 파일의 크기만큼 바이트 배열 생성
                        byte[] fileData = new byte[fileInputStream.available()];
                        // 파일 내용을 바이트 배열에 읽어옴
                        fileInputStream.read(fileData);
   
                        String publicKeyPEM = new String(fileData, StandardCharsets.UTF_8);

                        publicKeyString = publicKeyPEM.replace("-----BEGIN PUBLIC KEY-----", "")
                        .replace("-----END PUBLIC KEY-----", "")
                        .replaceAll("\\s", "");

                        System.out.println(publicKeyString); // 문자열 출력
       
                        ret = true;
                    } catch (IOException e) {
                        System.out.println("Failed to get rsa seed IOException");
                        ret = false;
                    } finally {
                    	fileInputStream.close();
                    }
                }
            }
        } catch (SecurityException e) {
            System.out.println("Security exception while accessing file");
            ret = false;
        } catch (InvalidPathException e) {
            System.out.println("Invalid path exception");
            ret = false;
        } catch (Exception e) {
            System.out.println("Failed to get rsa seed path");
            ret = false;
        }
        
        return ret;
    }


    public boolean getPrivateKey() {

        String path = null;
        boolean ret = false;
       
        try {
            path = env.getProperty(RSA_PRIVATE_PATH);
            path = Paths.get(path).toAbsolutePath().normalize().toString();

            System.out.println("RSA Privat path : " + path);
            File f = new File(path);
            if (f != null && f.exists()) {
                if (f.isFile()) {
                	FileInputStream fileInputStream = null;
                    try {
                        // 파일을 읽어서 바이트 배열로 저장
                        fileInputStream = new FileInputStream(path);

                        // 파일의 크기만큼 바이트 배열 생성
                        byte[] fileData = new byte[fileInputStream.available()];
                        // 파일 내용을 바이트 배열에 읽어옴
                        fileInputStream.read(fileData);
   
                        String privateKeyPEM = new String(fileData, StandardCharsets.UTF_8);

                        privateKeyString = privateKeyPEM.replace("-----BEGIN PRIVATE KEY-----", "")
                        .replace("-----END PRIVATE KEY-----", "")
                        .replaceAll("\\s", "");

                        System.out.println(privateKeyString); // 문자열 출력
       
                        ret = true;
                    } catch (IOException e) {
                        System.out.println("파일 읽기 실패");
                        ret = false;
                    } finally {
                        if (fileInputStream != null) {
                            fileInputStream.close();
                        }
                    }
                }
            }
        } catch (SecurityException e) {
            System.out.println("Security exception while accessing file");
            ret = false;
        } catch (InvalidPathException e) {
            System.out.println("Invalid path exception");
            ret = false;
        } catch (Exception e) {
            System.out.println("Failed to get rsa seed path");
            ret = false;
        }
        
        return ret;
    }

    public static String getFaceDataPath() {
        String ret = null;
        String facePathProp = env.getProperty(FACE_DATA_PATH);
        if(facePathProp == null || "".equals(facePathProp)) {
            AppLogger.info("face data path is empty.");
            return null;
        }
        String path = Paths.get(facePathProp).toAbsolutePath().normalize().toString();
        AppLogger.info("face data path : " + path);

        try {
            File f = new File(path);
            if (f != null && f.exists()) {
                if(f.isFile()) {
                    if(path.matches("(?i).*\\.xml$")) {
                        ret = path;
                    }
                } else {
                    ret = Paths.get(path, "haarcascade_frontalface_alt.xml").toAbsolutePath().normalize().toString();
                }
            }
        } catch (SecurityException e) {
            AppLogger.error("Security exception while accessing file", e);
            return null;
        } catch (InvalidPathException e) {
            AppLogger.error("Invalid path exception", e);
            return null;
        } catch (Exception e) {
            AppLogger.error("Failed to get face data path", e);
            return null;
        }
        
        return ret;
    }

    @PostMapping(value = "vfc/scan/{type}", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String scanFrameByWebUpload(@PathVariable String type, @RequestParam("files") MultipartFile[] uploadedFiles,
            @RequestParam(value = "encrypted", required = false, defaultValue = "") String encrypted,
            @RequestParam(value = "key", required = false, defaultValue = "") String key,
            @RequestParam(value = "config", required = false, defaultValue = "") String in_config
    ) {
        AppLogger.info("[scanFrameByWebUpload start]");
        return scanFrame(type, uploadedFiles, in_config , false, encrypted, key);
    }

    private String decryptRsa(PrivateKey privateKey, String securedValue) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        byte[] encryptedBytes = hexToByteArray(securedValue);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        String decryptedValue = new String(decryptedBytes, "utf-8"); // 문자 인코딩 주의.
        return decryptedValue;
    }

     public String scanFrame(
            String type,
            MultipartFile[] uploadedFiles, String in_config, boolean autoMode, String encrypted, String key
    ) {
        /*
         * 하나은행 지원되는 카드 종류
         * 1. 신분증(운전면허증, 주민등록증)
         * 2. 외국인등록증
         * 3. 여권
         * 4. 지로
         */
        boolean onlySsa = false;
        boolean notSave = false;
        boolean base64Image = false;
        long totalST = System.currentTimeMillis();

        String retJSON = "";
        String resultJsonStr = "";

        long st = 0, t = 0;


        st = System.currentTimeMillis();
        if (type == null) {
            // 기본 모드 설정
            type = "id-auto";
        }
        // 1) 디폴트 스캐너 타입설정
        QuramOcrScannerType scannerType = QuramOcrScannerType.IDCARD_AUTO;
        AppLogger.info("[scanFrame start]");
        type = type.toLowerCase();
        // 각 모드에 따라 스캐너 타입을 별도로 설정해야 함.
        if (type.equals("id-auto")) {
            scannerType = QuramOcrScannerType.IDCARD_AUTO;
        } else if (type.equals("id-alien")) {
            scannerType = QuramOcrScannerType.ID_ALIEN_REGISTRATION;
        } else if(type.equals("id-alien-back")) {
            scannerType = QuramOcrScannerType.ID_ALIEN_BACK;
        } else if (type.equals("passport")) {
            scannerType = QuramOcrScannerType.PASSPORT;
        } else if (type.equals("giro")) {
            scannerType = QuramOcrScannerType.GIRO;
        } else if (type.equals("ssa")) {
            AppLogger.info("[scanFrame SSA]");
            onlySsa = true;
        }
        /*
         * 스캔 옵션 예시
         *  - 기본값이 설정되어 있으며 scannerType 값 외에는 ScanOptions 인스턴스 생성한 그대로 사용해도 충분함.
         */
        ScanOptions scanOpts = new ScanOptions();
        
        if(onlySsa) {
            scanOpts.onlySsa = true;
        }
        
        if (scanOpts != null) {
	        scanOpts.scannerType = scannerType; // (기본값: QuramOcrScannerType.ID_AUTO), 스캐너 타입 명시적으로 지정할 것
	        // 필수 스캔 옵션 (기본값: true)
	        scanOpts.scanLicenseNumber = true; // 운전면허증 번호 스캔 여부
	        scanOpts.scanIssueDate = true; // 발급일자 스캔 여부
	        // 부가적인 스캔 옵션 (기본값: false)
	        scanOpts.scanRegion = true; // 발행처 스캔 여부
	        scanOpts.scanLicenseSerial = true; // 운전면허증 시리얼번호 스캔 여부
	        scanOpts.scanLicenseType = true; // 운전면허증 종류 스캔 여부
	        scanOpts.findFace = true; // 얼굴 찾기 여부 (기본값: false)
	        scanOpts.faceDataPath = getFaceDataPath(); // 얼굴 데이터 파일 경로, findFace가 true일 때 해당 경로가 비정상적이면 ScannerInitException 발생
	        scanOpts.tryColorTest = true; // 입력 프레임이 색깔인지 흑백인지 확인 (기본값: false)
	        // 부가적인 인식 동작 옵션 예시
	        scanOpts.frameType = QuramOcrScannerFrameType.SINGLE; // 단일 프레임 인식 모드
	        scanOpts.numOfCardbox = 10; // 카드 영역 찾는 프레임 개수
	        scanOpts.limitAngle = true; // 카드의 각도가 회전되어 있을 때 카드를 찾을 수 있을지 제한하는 옵션 (기본값: 고정)
	        // limitAngle = false로 설정 시 인식률 저하될 수 있음.
	        scanOpts.autoMode = autoMode;
	
	        if (in_config.equals("") || (in_config.contains("OCR") == false && in_config.contains("SSA") == false )) {
	            // config가 비어있는 경우 OCR 만 수행하고, SSA는 수행하지 않음
	            scanOpts.doOCR = true;
	            scanOpts.doSSA = true;
	        } else if ((in_config.contains("OCR") == true) && (in_config.contains("SSA") == false)) {
	            // config에 "OCR"이 포함되어 있는 경우 OCR 수행
	            scanOpts.doOCR = true;
	            scanOpts.doSSA = false;
	        } else if ((in_config.contains("OCR") == false) && (in_config.contains("SSA") == true)) {
	            // config에 "SSA"이 포함되어 있는 경우 SSA 수행
	            scanOpts.doOCR = false;
	            scanOpts.doSSA = true;
	        } else {
	            scanOpts.doOCR = true;
	            scanOpts.doSSA = true;
	        }
	
	        if(onlySsa) {
	            scanOpts.doOCR = true;
	            scanOpts.doSSA = true;
	        }
	        
	        if (in_config.contains("base64image") == true) {
	            base64Image = true;
	        }
	
	        if (in_config.contains("notsave") == true) {
	            notSave = true;
	        }        
	
	        scanOpts.threshFD = 0.5f;
        }
        
        // 인식 시간 저장에 따른 시간 리스트 설정
        ArrayList<Long> recogTimeList = new ArrayList<Long>();
        // 웹 모드는 한장의 이미지로 처리함으로 첫번째 이미지 파일의 리스트를 멀티파트 파일에 추가

        byte[] jpgBytes = null;

        if(useEncryptJpg) {
            try {
                
                byte[] decodedBytes = Base64.getDecoder().decode(encrypted);
               // System.out.println("key : " + key);
                byte[] decodedKeyBytes = Base64.getDecoder().decode(key);
                String decodedString = new String(decodedKeyBytes);

                //decodedKeyBytes = hexToByteArray(decodedString);

                // System.out.println("decodedKeyBytes : ");    
                // for(int i = 0; i < decodedKeyBytes.length; i++)
                // {
                //     int unsignedByte = decodedKeyBytes[i] & 0xFF; // 바이트를 부호 없는 정수로 변환
                //     System.out.print(unsignedByte + " ");
                // }
                // System.out.print("\n");
               
                byte[] decryptedKey = null;
                try {

                    //System.out.println("decodedString1 : " + decodedString); 
                    decodedString = decryptRsa(privateKey, decodedString);
                    //System.out.println("decodedString2 : " + decodedString); 
                    decryptedKey = hexToByteArray(decodedString);
                    // System.out.println("decryptedKey : ");
                    // for (int i = 0; i < decryptedKey.length; i++) {
                    //     int unsignedByte = decryptedKey[i] & 0xFF; // 바이트를 부호 없는 정수로 변환
                    //     System.out.print(unsignedByte + " ");
                    // }
                    // System.out.print("\n");

                } catch (Exception e) {
                    System.out.println("rsa decrypt error." + ResultSaver.getScanResultStringIfExceptionOccur(e));  
                }
                //System.out.println("1");

                byte[] keyBytes = decryptedKey;
                byte[] ivBytes = new byte[keyBytes.length / 2];
                System.arraycopy(keyBytes, 0, ivBytes, 0, ivBytes.length);
         
                // AES 복호화 설정
                SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "AES");
    
                IvParameterSpec ivParameterSpec = new IvParameterSpec(ivBytes);
 
                try {
                        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

                        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
         
                        // 데이터를 복호화
                        jpgBytes = cipher.doFinal(decodedBytes);
                    } catch (Exception e) {
                        System.out.println("aes decrypt error." + ResultSaver.getScanResultStringIfExceptionOccur(e));  
                }

            } catch (Exception e) {
                System.out.println("decrypt image error.");
            }
        } else {
            MultipartFile mf = uploadedFiles[0];
            String contentType = mf.getContentType();
            String orgFileName = mf.getOriginalFilename();
            AppLogger.info("uploaded file : " + orgFileName);
            if (contentType.equals("image/jpg") || contentType.equals("image/jpeg")) {
                try {
                    jpgBytes = mf.getBytes();
                } catch (IOException e) {
                    System.out.println("Failed to get rsa seed IOException");
                }
            }
        }
                          
    
		mLogManager.setAppLogString("QuramMI");

        t = System.currentTimeMillis() - st;
        AppLogger.debug(String.format("[TIME] %s time : %d", "controller prepare", t));

        // 입력된 이미지는 반드시 jpg 나 jpeg로 입력되어야 함.
        if (jpgBytes != null) {
            try {
                // 파일의 정보를 바이트로 변환
                byte[] frameBytes = null;
                frameBytes = jpgBytes;        

                ArrayList<byte[]> frameList = new ArrayList<byte[]>();
                // 프레임 리스트에 추가
                frameList.add(frameBytes);

                // 인식 시간 시작 정보 입력
                long recogST = System.currentTimeMillis();

                // 현재 날짜(일/시간/분/초) 단위 및 랜덤값 5자리로 동시 동시 처리 시간에 대한 중복을 시간과 랜덤으로 구분
                // 랜덤 + 시간 정보 순서임..
                Date scanTime = new Date();

                SimpleDateFormat scanTimeFormat = new SimpleDateFormat("yyyyMMddHHmmss_SSS");

                String scanTimeDir = "web_" + scanTimeFormat.format(scanTime);

                // 라이브러리 호출 (QuramOcrScanner.scanIDCard)
                // 인식 엔진에 스캔 결과 구분 문구, 스캔 옵션, 프레임리스트, 학습데이터 정보
                String keyword = type + "_" + scanTimeDir;
                
                AppLogger.info("[scanFrame scanIDCard start]");
                QuramOcrScanResult scanResult = QuramOcrScanner.scanIDCard(keyword, scanOpts, frameList, getTessPath());
                AppLogger.info("[scanFrame scanIDCard end]");
                long recogET = System.currentTimeMillis();
                long recogTime = recogET - recogST;
                // 인식 전체 동작 시간 정보 추가
                // 라이브러리 호출 (전체 인식 시간 정보 업데이트)
                AppLogger.debug(String.format("[TIME] %s time : %d", "jar api call", recogTime));
                scanResult.setRecogTime(recogTime);
                recogTimeList.add(recogTime);

                st = System.currentTimeMillis();

                
/* no stack result				    	

                // 기본 저장 디렉토리(절대경로, 상대경로 모두 생성가능함)
//                String defaultStorageDir = "/home/ec2-user/storage";
                String defaultStorageDir = "./result";
//                String defaultStorageDir = "/home/tsp/result";
                Path saveDir = Paths.get(defaultStorageDir, scanTimeDir).normalize().toAbsolutePath();

                // 인식이 정상인지 또는 인식이 안된 경우를 분리하여 내부 저장하도록 디렉토리 정보 구분
                if(onlySsa || notSave) {
                    saveDir = null;
                }
				else if(scanResult.getResultCode().contains(QuramOcrScannerResultCode.SUCCESS.name())) {
                    QuramOcrResultType idType = scanResult.getResultScanType();

                    saveDir = Paths.get(saveDir.toAbsolutePath().toString(), idType.toString()).normalize();

                    // 신분증 사진을 추출할 수 있는 종류에서만 이미지를 추출하고 저장한다.
				    if(scanResult.getResultScanType() == QuramOcrResultType.DRIVER_LICENSE ||
                            scanResult.getResultScanType() == QuramOcrResultType.RESIDENT_REGISTRATION ||
                            scanResult.getResultScanType() == QuramOcrResultType.PASSPORT ||
                            scanResult.getResultScanType() == QuramOcrResultType.ALIEN_REGISTRATION) {

                        // 라이브러리 호출 (얼굴사진, 마스킹된 이미지, 마스킹되지 않는 이미지 )
                        // 신분증의 각 이미지를 byte[] 버퍼로 추출한다. JPG, PNG 포맷의 버퍼로 추출된다.
                        final ResultSaver.ImageFormat format = ResultSaver.ImageFormat.JPG;  
                        byte pBuf[] = ResultSaver.getPortraitBuf(scanResult, format);  
                        byte mBuf[] = ResultSaver.getMarkedBuf(scanResult, format);  
                        byte uBuf[] = ResultSaver.getUnmarkedBuf(scanResult, format);  
                        byte mfBuf[] = ResultSaver.getMarkedFrameBuf(scanResult, format);  
                        byte ufBuf[] = ResultSaver.getUnmarkedFrameBuf(scanResult, format);  
                        // 신분증 이미지 버퍼 파일로 저장
                        String pSavePath = ResultSaver.saveBuffer(pBuf, saveDir,"portrait", format);  
                        String mSavePath = ResultSaver.saveBuffer(mBuf, saveDir,"marked_image", format);  
                        String uSavePath = ResultSaver.saveBuffer(uBuf, saveDir,"unmarked_image", format);  
                        String mfSavePath = ResultSaver.saveBuffer(mfBuf, saveDir,"marked_frame", format);  
                        String ufSavePath = ResultSaver.saveBuffer(ufBuf, saveDir,"unmarked_frame", format);  
                        // 파일로 저장된 신분증 이미지 경로를 결과 객체에 설정
                        scanResult.setIdImagePath(pSavePath, ResultSaver.ImageType.PORTRAIT);  
                        scanResult.setIdImagePath(mSavePath, ResultSaver.ImageType.MARKED_CARD);  
                        scanResult.setIdImagePath(uSavePath, ResultSaver.ImageType.UNMARKED_CARD);  
                        scanResult.setIdImagePath(mfSavePath, ResultSaver.ImageType.MARKED_FRAME);  
                        scanResult.setIdImagePath(ufSavePath, ResultSaver.ImageType.UNMARKED_FRAME);      
                    }
				} else {
                    if(autoMode) {
                        saveDir = null;
                    } else {
					    saveDir = Paths.get(saveDir.toAbsolutePath().toString(), "errorRecog_"+type).   normalize();
                    }
				}
				
                if(saveDir != null) {
                    // 입력 이미지 저장
                    String oSavePath = ResultSaver.saveBuffer(frameBytes, saveDir, "original", ResultSaver.ImageFormat.JPG);
                    scanResult.setIdImagePath(oSavePath, ResultSaver.ImageType.ORG_FRAME);
                    // 로그 매니저의 로그 파일로 저장
                    mLogManager.setAppScanInfo(scanResult);
                    String logString = mLogManager.getAppLogString();
                    ResultSaver.saveTextToFile(logString, "result.txt", saveDir);
                }
*/              
                
                // 라이브러리 호출 (이미지 결과를 사전에 호출하면 이미지 저장 경로 포함, 만약 단독 호출하면 이미지 경로 미포함됨)
                if(!onlySsa) {
                    scanResult.encryptResult();
                }
                resultJsonStr = ResultSaver.getResultJson(scanResult);  
                //System.out.println("wee");
                if(base64Image) {
                    //System.out.println("wee2");
                    final ResultSaver.ImageFormat format = ResultSaver.ImageFormat.JPG;  
                    byte mBuf[] = ResultSaver.getMarkedBuf(scanResult, format);  
                    byte[] base64 = Base64.getEncoder().encode(mBuf);  
                    String strISO = new String(base64);  
                    JSONObject jsonObject = new JSONObject(resultJsonStr);
                    jsonObject.put("base64image", strISO);  
                    resultJsonStr = jsonObject.toString();
                }

                //AppLogger.info("[scanFrame scanIDCard resultJsonStr]" + resultJsonStr);
                
                
/* no stack result                
                if(saveDir != null) {
                    // 인식 결과 json 저장
                    ResultSaver.saveScanResultToJson(scanResult, saveDir);
                }
                // 라이브러리 호출 (ResultSaver.save)
                // 위의 getResultJson + getProtraitBuf + getMarkedBuf + getUnmarkedBuf 를 동시 처리함.
                ResultSaver.save (scanResult, saveDir.toString(), keyword, false, true);  
 */
                
                if(!onlySsa) {
                    String tmp = new String(resultJsonStr);
                    String jumin = "jumin";
                    int index = tmp.indexOf(jumin);
            
                    if (index != -1) {
                        char[] charArray = tmp.toCharArray();
                        int startIndex = index + jumin.length() + 5;
                        int indexToChange = index + jumin.length() + 5 + 6 + 1;
                        if (charArray[startIndex] != '"' && startIndex < charArray.length) {
                            for(int i = 0; i < 7; i++) {
                                if (indexToChange >= 0 && indexToChange < charArray.length) {
                                    if(charArray[indexToChange]  == '"') {
                                        break;
                                    }
                                    charArray[indexToChange] = 'x';
                                }
                                indexToChange++;
                            }
                            tmp = new String(charArray);
                        }
                    } 
                    
                    String driver_number = "driver_number";
                    index = tmp.indexOf(driver_number);
            
                    if (index != -1) {
                        char[] charArray = tmp.toCharArray();
                        int startIndex = index + jumin.length() + 5;
                        int indexToChange = index + driver_number.length() + 5 + 6;
                        if (charArray[startIndex] != '"' && startIndex < charArray.length) {
                            for(int i = 0; i < 6; i++) {
                                if (indexToChange >= 0 && indexToChange < charArray.length) {
                                    if(charArray[indexToChange]  == '"') {
                                        break;
                                    }
                                    charArray[indexToChange] = 'x';
                                }
                                indexToChange++;
                            }
                            tmp = new String(charArray);
                        }
                    }
                    resultLogger.info(String.format("Result: %s", tmp));
                }
                
                // String 으로 전환된 JSON 값 리턴 전달
                retJSON = resultJsonStr;
            } catch (Exception e) {
                AppLogger.error("not finalized result with JSON output", e);
                retJSON = ResultSaver.getScanResultStringIfExceptionOccur(e);  
            }
        } else {
            retJSON = "Input image file type error";
        }

        long totalET = System.currentTimeMillis();
        long totalTime = totalET - totalST;

        AppLogger.info("[Result of scanned by Web]");
        AppLogger.info("Version: "+ QuramOcrScanner.getVersionInfo()); // 자바 라이브러리, 네이티브 라이브러리, 릴리즈 날짜 정보 전체 출력
        if(!onlySsa) {
            String tmp = new String(retJSON);
            String jumin = "jumin";
            int index = tmp.indexOf(jumin);

            if (index != -1) {
                char[] charArray = tmp.toCharArray();
                int startIndex = index + jumin.length() + 5;
                int indexToChange = index + jumin.length() + 5 + 6 + 1;
                if (charArray[startIndex] != '"' && startIndex < charArray.length) {
                    for(int i = 0; i < 7; i++) {
                        if (indexToChange >= 0 && indexToChange < charArray.length) {
                            if(charArray[indexToChange]  == '"') {
                                break;
                            }
                            charArray[indexToChange] = 'x';
                        }
                        indexToChange++;
                    }
                    tmp = new String(charArray);
                }
            } 
        
            String driver_number = "driver_number";
            index = tmp.indexOf(driver_number);

            if (index != -1) {
                char[] charArray = tmp.toCharArray();
                int startIndex = index + jumin.length() + 5;
                int indexToChange = index + driver_number.length() + 5 + 6;
                if (charArray[startIndex] != '"' && startIndex < charArray.length) {
                    for(int i = 0; i < 6; i++) {
                        if (indexToChange >= 0 && indexToChange < charArray.length) {
                            if(charArray[indexToChange]  == '"') {
                                break;
                            }
                            charArray[indexToChange] = 'x';
                        }
                        indexToChange++;
                    }
                    tmp = new String(charArray);
                }
            }
            AppLogger.info(tmp);
        }
        AppLogger.info(String.format("Total Recog. Time: %d", totalTime));
        String recogTimeListStr = "recog time of each frame : ";

        for (long time : recogTimeList) {
            recogTimeListStr += time + " ";
        }
        AppLogger.info(recogTimeListStr);
        AppLogger.info("scan done.");

        return retJSON;
    }
}
