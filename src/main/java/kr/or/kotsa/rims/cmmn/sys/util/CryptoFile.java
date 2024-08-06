package kr.or.kotsa.rims.cmmn.sys.util;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import kr.or.kotsa.rims.cmmn.biz.web.CmmnController;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.Security;
import java.util.Arrays;

/**
 * 키 생성, 암호화, 복호화 기능
 * Bouncy Castle 라이브러리 사용
 * @author 정영훈
 */
public class CryptoFile {
	private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);
	private static final int SALT_LENGTH = 32; 
	private static final String STATIC_KEY = "SPDLQJTLTMXPAXNDOSXLDNJS";
	
    public CryptoFile() {
        Security.addProvider(new BouncyCastleProvider());
    }

    // 솔트 생성
    private byte[] generateSalt() {
    	try {
            SecureRandom random = SecureRandom.getInstanceStrong();
            byte[] salt = new byte[SALT_LENGTH]; 
            random.nextBytes(salt);
            return salt;
    	} catch (NoSuchAlgorithmException | NullPointerException e) {
    		logger.error("Salt 생성 중 오류가 발생하였습니다: {}", e.getMessage());
            return null;
        } catch (Exception e) {
        	logger.error("Salt 생성 중 오류가 발생하였습니다: {}", e.getMessage());
            return null;
        }
    }
    
    // 키 생성
    private SecretKey generateSecretKey(char[] key, byte[] salt) {
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            sha.reset();
            sha.update(salt);
            byte[] keyBytes = new byte[key.length * Character.BYTES];
            for (int i = 0; i < key.length; i++) {
                keyBytes[i] = (byte) key[i];
            }
            keyBytes = Arrays.copyOf(keyBytes, SALT_LENGTH);
            return new SecretKeySpec(keyBytes, "AES");
        } catch (NoSuchAlgorithmException e) {
        	logger.error("알고리즘이 지원되지 않습니다: {}", e.getMessage());
    		return null;
        } catch (Exception e) {
            logger.error("키 생성 중 오류가 발생하였습니다: {}", e.getMessage());
            return null;
        }
    }
    
    // 파일 암호화 메서드
    public byte[] encryptFile(MultipartFile multiPartFile) {
    	SecretKey secretKey = null;
	    byte[] salt = null;
	    
    	// 솔트 생성
    	salt = generateSalt(); 
    	// 고정 키+솔트로 암호키 생성
        secretKey = generateSecretKey(STATIC_KEY.toCharArray(), salt);
        
        try {
        	ByteArrayOutputStream encryptedData = new ByteArrayOutputStream();
            encryptedData.write(salt);
        	
            // Cipher 객체를 이용하여 암호화
            Cipher cipher = Cipher.getInstance("AES", "BC");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            // 암호화된 데이터를 저장할 ByteArrayOutputStream
            byte[] buffer = new byte[8192];
            int bytesRead;
            try (InputStream fileInputStream = multiPartFile.getInputStream()) {
                while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                    // 암호화된 데이터를 저장
                    byte[] encryptedBuffer = cipher.update(buffer, 0, bytesRead);
                    encryptedData.write(encryptedBuffer);
                }
            } catch (IOException e) {
                logger.error("파일 암호화 중 오류가 발생하였습니다: {}", e.getMessage());
                return null; 
            } 

            // 암호화된 데이터를 완료
            byte[] finalEncryptedBuffer = cipher.doFinal();
            encryptedData.write(finalEncryptedBuffer);

            // 암호화된 데이터를 바이트 배열로 변환하여 반환
            return encryptedData.toByteArray();
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException e) { 
        	logger.error("파일 암호화 중 오류가 발생하였습니다: {}", e.getMessage());
        	return null;
        } catch (Exception e) {
            logger.error("파일 암호화 중 오류가 발생하였습니다: {}", e.getMessage());
            return null;
        } 
    }
    // 솔트추출
    public byte[] extractSalt(byte[] encryptedFile) {
        try {
            if (encryptedFile == null || encryptedFile.length < SALT_LENGTH) {
                // 예외 케이스: encryptedFile이 null이거나 솔트의 예상 길이보다 짧을 때
                throw new IllegalArgumentException("Invalid encrypted file format");
            }

            byte[] salt = Arrays.copyOfRange(encryptedFile, 0, SALT_LENGTH);
            return salt;
        } catch (IllegalArgumentException e) {
        	logger.error("파일 형식이 잘못됐습니다: {}", e.getMessage());
            return null; 
        } catch (Exception e) {
        	logger.error("추출 중 오류가 발생했습니다: {}", e.getMessage());
            return null; 
        }
    }
    
    // 솔트제거 파일 추출
    public byte[] extractFile(byte[] encryptedFile) {
        try {
            if (encryptedFile == null || encryptedFile.length < SALT_LENGTH) {
                // 예외 케이스: encryptedFile이 null이거나 솔트의 예상 길이보다 짧을 때
                throw new IllegalArgumentException("Invalid encrypted file format");
            }
            byte[] remainingFileData = Arrays.copyOfRange(encryptedFile, SALT_LENGTH, encryptedFile.length);
            return remainingFileData;
        } catch (IllegalArgumentException e) {
        	logger.error("파일 형식이 잘못됐습니다: {}", e.getMessage());
            return null; 
        } catch (Exception e) {
        	logger.error("추출 중 오류가 발생했습니다: {}", e.getMessage());
            return null; 
        }
    }
    
    // 파일 복호화 메서드
    public byte[] decryptFile(byte[] encryptedFile) {
    	
    	SecretKey secretedKey;
	    byte[] extractedSalt;
	    byte[] extractedFile;
	    extractedSalt = extractSalt(encryptedFile);
    	extractedFile = extractFile(encryptedFile);
	   
    	secretedKey = generateSecretKey(STATIC_KEY.toCharArray(), extractedSalt);
    	
    	try {
    		Cipher cipher = Cipher.getInstance("AES", "BC");
            cipher.init(Cipher.DECRYPT_MODE, secretedKey);

            // 복호화된 데이터를 저장할 ByteArrayOutputStream
            ByteArrayOutputStream decryptedData = new ByteArrayOutputStream();
            try (ByteArrayInputStream bis = new ByteArrayInputStream(extractedFile);
                 CipherInputStream cis = new CipherInputStream(bis, cipher)) {
                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = cis.read(buffer)) != -1) {
                    decryptedData.write(buffer, 0, bytesRead);
                }
    		} catch (IOException e) {
                logger.error("파일 읽기 중 오류가 발생하였습니다: {}", e.getMessage());
                return null; 
            }

            // 복호화한 데이터를 바이트 배열로 변환하여 반환
            return decryptedData.toByteArray();
        } catch (NoSuchAlgorithmException | NoSuchPaddingException e) { 
        	logger.error("파일 복호화 중 오류가 발생하였습니다: {}", e.getMessage());
        	return null; 
        } catch (Exception e) {
            logger.error("파일 복호화 중 오류가 발생하였습니다: {}", e.getMessage());
            return null;
        }
    }
}
