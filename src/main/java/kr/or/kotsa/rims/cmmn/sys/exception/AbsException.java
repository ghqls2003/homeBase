package kr.or.kotsa.rims.cmmn.sys.exception;

public abstract class AbsException extends RuntimeException {
	
	public AbsException() {}
	
	public AbsException(String message) {
		super(message);
	}
}