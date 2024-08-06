package kr.or.kotsa.rims.cmmn.sys.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kr.or.kotsa.rims.cmmn.biz.web.CmmnController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * 엑셀 스트리밍 다운로드 진행 상태 저장
 * @see GenericExcelStream
 * @see SessionIdProvider
 * @author 정영훈
 * @since 240320
 */
@Component
public class ExcelStatusManager {
	private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);
	
    private final Map<String, SessionInfo> sessionInfoMap = new ConcurrentHashMap<>();
    private final SessionIdProvider sessionIdProvider;
    
    @Autowired
    public ExcelStatusManager(SessionIdProvider sessionIdProvider) {
        this.sessionIdProvider = sessionIdProvider;
    }
    
    /**
	 * 엑셀 다운로드 진행 여부(진행:T, 종료:F)
	 */
    public boolean isExcelInProgress() {
        removeExpiredSessions();
        String sessionId = sessionIdProvider.getSessionId();
        if (sessionId == null) {
            return false; 
        }
        SessionInfo sessionInfo = sessionInfoMap.get(sessionId);
        return sessionInfo != null && sessionInfo.isInProgress();
    }

    public void setExcelInProgress(boolean inProgress) {
        String sessionId = sessionIdProvider.getSessionId();
        if (sessionId != null) {
            sessionInfoMap.put(sessionId, new SessionInfo(inProgress));
            logger.info("[Excel Status] setExcelInProgress: Key: "+sessionId +" , "+ "Value: "+ inProgress);
        }
    }

    public void removeExcelStatus() {
        String sessionId = sessionIdProvider.getSessionId();
        if (sessionId != null) {
            sessionInfoMap.remove(sessionId);
        }
    }

    /**
     * 10분 경과 건이 남아있으면 제거
     */
    private void removeExpiredSessions() {
        long currentTimeMillis = System.currentTimeMillis();
        
        sessionInfoMap.entrySet().removeIf(entry -> {
            long sessionCreationTime = entry.getValue().getCreationTime();
            long elapsedTimeInMillis = currentTimeMillis - sessionCreationTime;
            long elapsedTimeInMinutes = TimeUnit.MILLISECONDS.toMinutes(elapsedTimeInMillis);
            return elapsedTimeInMinutes >= 10;
        });
    }

    private static class SessionInfo {
        private final boolean inProgress;
        private final long creationTime;

        public SessionInfo(boolean inProgress) {
            this.inProgress = inProgress;
            this.creationTime = System.currentTimeMillis();
        }

        public boolean isInProgress() {
            return inProgress;
        }

        public long getCreationTime() {
            return creationTime;
        }
    }
}
