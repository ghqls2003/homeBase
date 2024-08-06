package kr.or.kotsa.rims.cmmn.sys.util;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;

@Component
public class SessionIdProvider {
	private final HttpSession session;
	
	public SessionIdProvider(HttpSession session) {
		this.session = session;
	}
	
	public String getSessionId() {
		if(session != null) {
			return session.getId();	
		} else {
			return null;
		}
	}
}
