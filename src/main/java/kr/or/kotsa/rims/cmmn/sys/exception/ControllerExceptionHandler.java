package kr.or.kotsa.rims.cmmn.sys.exception;

import java.sql.SQLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.UncategorizedSQLException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

/*
 * @Controller 어노테이션이 달린 자바 파일의 하위 메소드에서 예외가 발생하면
 * @ControllerAdvice에서 처리 가능하다
 * */

@ControllerAdvice
public class ControllerExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(ControllerExceptionHandler.class);

    @ExceptionHandler({ NullPointerException.class, UncategorizedSQLException.class, SQLException.class })
    public ModelAndView handleException(Exception e) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("ERROR/error");
        return mav;
    }
}
