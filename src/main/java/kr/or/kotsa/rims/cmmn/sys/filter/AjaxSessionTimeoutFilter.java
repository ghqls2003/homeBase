package kr.or.kotsa.rims.cmmn.sys.filter;

import javax.security.sasl.AuthenticationException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.AccessDeniedException;

/**
 * 클래스 이름 : AjaxSessionTimeoutFilter
 * 클래스 설명 : ajax 세션 타임아웃 설정
 * 버전 정보 : 1.0
 * 작성일 : 2018-03-09
 * 작성자 : jaehobaek
 * 수정내역 :
 * 저작권 정보 :
 */

public class AjaxSessionTimeoutFilter implements Filter {

    private String ajaxHeader;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        if (isAjaxRequest(req)) {
            try {
                chain.doFilter(req, res);
            } catch (AccessDeniedException e) {
                res.sendError(HttpServletResponse.SC_FORBIDDEN);
            } catch (AuthenticationException e) {
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            chain.doFilter(req, res);
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void destroy() {

    }

    private boolean isAjaxRequest(HttpServletRequest req) {
    	boolean result = false;
    	
    	if (req != null) {
    		result = req.getHeader(ajaxHeader) != null && req.getHeader(ajaxHeader).equals(Boolean.TRUE.toString());
    	}
    	
    	return result;
    }

    public void setAjaxHeader(String ajaxHeader) {
    	String ajaxHeaderStr = ajaxHeader;
    	
    	if (ajaxHeaderStr != null && !"".equals(ajaxHeaderStr)) {
    		this.ajaxHeader = ajaxHeaderStr;
    	}
    }
}
