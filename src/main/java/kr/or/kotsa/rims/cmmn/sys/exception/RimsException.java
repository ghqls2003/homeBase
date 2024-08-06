package kr.or.kotsa.rims.cmmn.sys.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by ischoi on 2017-05-14.
 */

public class RimsException extends Exception {

    public RimsException() {
    }

    public RimsException(String message) {
        super(message);
    }

    public RimsException(Exception e) {
        super(e);
    }

}
