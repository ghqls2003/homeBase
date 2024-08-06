package kr.or.kotsa.rims.cmmn.sys.util; 

import org.apache.ibatis.cursor.Cursor;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.or.kotsa.rims.cmmn.biz.web.CmmnController;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.util.Map;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.servlet.http.HttpServletResponse;

import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.catalina.connector.ClientAbortException;

/**
 * 엑셀 파일 스트리밍 생성 및 다운로드. 최대로우 초과 시 시트 이동하지 않는 버전.
 * @see ExcelStatusManager
 * @author 정영훈
 * @since 240228
 */
public class GenericExcelStream {
	private static final Logger logger = LoggerFactory.getLogger(CmmnController.class);
	
	private HttpServletResponse response;
	private SqlSessionFactory sqlSessionFactory;
	private ExcelStatusManager excelStatusManager; 
	
	private String QUERY_ID;
	private String[] COL_TITLE;
	private String[] COL_KEY;
	private int TOTAL;
	private Map<String, Object> QUERY_MAP;
	private String FILE_NAME;
	
	private final static int MAX_ROWS_PER_SHEET = 1_047_000; 
	//private final static int MAX_ROWS_PER_SHEET = 100;   //테스트용
	private final static int MAX_WRITE_ROWS = 100_000; //작성 가능 최대 ROWS 지정(MAX_ROWS_PER_SHEET 보다 클 수 없음)
	private final static int FLUSH_SIZE = 100;
	
	
	private SqlSession sqlSession;
    private Cursor<Map<String, Object>> cursor;	
    private Boolean isLoaded = false;
	private final ExecutorService executorService = Executors.newSingleThreadExecutor();
	
	public GenericExcelStream(HttpServletResponse response) {
		this.response = response;
	}
	
	public GenericExcelStream setExcelData(
			String queryId, String[] colTitle, String[] colKey, int total, String fileName) {
		this.QUERY_ID = queryId;
		this.COL_TITLE = colTitle;
    	this.COL_KEY = colKey; 
    	this.TOTAL = total;
    	this.FILE_NAME = fileName;
		return this;
	}
	
	public GenericExcelStream setQueryMap(Map<String, Object> queryMap){
		this.QUERY_MAP = queryMap;
		return this;
	}
	
	public GenericExcelStream setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
        return this;
    }
	
	public GenericExcelStream setExcelStatusManager(ExcelStatusManager excelStatusManager) {
		this.excelStatusManager = excelStatusManager;
		return this;
	}
	
	public void build() {
		try (OutputStream os = new BufferedOutputStream(response.getOutputStream())){
			if(TOTAL > MAX_WRITE_ROWS ) {
				logger.error("[Excel Stream] 작성 가능 건수를 초과했습니다. 현재: {}, 최대: {}", TOTAL, MAX_WRITE_ROWS);
                response.sendError(HttpServletResponse.SC_FORBIDDEN);
                return;
			}
			excelStatusManager.setExcelInProgress(true);
			
			//파일이름+날짜 설정
			String currentDateTime = getCurrentDateTime();
			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition","attachment; filename=" + FILE_NAME + "_" + currentDateTime + ".xlsx");
			
			response.flushBuffer();
			createExcel(os);
			excelStatusManager.setExcelInProgress(false);
		} catch(Exception e) {
			logger.error("[Excel Stream] Error occurred while streaming Excel file build.");
			excelStatusManager.setExcelInProgress(false);
		}
	}
	public static String getCurrentDateTime() {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMddHHmmss");
		return now.format(formatter);
	}
	
	public void createExcel(OutputStream os) throws Exception {
		loadData();
		prepareWorkbook(os);
	}
	
	public void closeDataResources() {
		logger.info("[Excel Stream] 종료 요청");
        try {
			if(cursor != null) {
				cursor.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
        executorService.shutdownNow(); 
        sqlSession.close();
    }
	
	public void loadData() {
		logger.info("[Excel Stream] loadData 실행" );
		executorService.execute(() -> {
            try {
                sqlSession = sqlSessionFactory.openSession();
                logger.info("[Excel Stream] loadData 시작: excel streaming data load");
                cursor = sqlSession.selectCursor(QUERY_ID, QUERY_MAP);
                isLoaded = true;
            } catch (Exception e) {
            	logger.error("[Excel Stream] loadData에서 예외 발생");
            	isLoaded = true;
                closeDataResources();
                excelStatusManager.setExcelInProgress(false);
            } finally {
            	executorService.shutdownNow();
            	logger.info("[Excel Stream] loadData 종료: excel streaming data load ");
            }
        });
	}
	
	public void prepareWorkbook(OutputStream os) throws InterruptedException {
		logger.info("[Excel Stream] prepareWorkbook 실행");
		
		Workbook wb = new Workbook(os, "ExcelApplication", "1.0");
		Worksheet ws = wb.newWorksheet("Sheet1");
		try {
			while(!isLoaded) {
				ws.value(0, 0, "");
				try {
					ws.flush();
				} catch (IOException e) {
					logger.error("[Excel Stream] Error occurred while flushing prepareWorkbook");
					closeDataResources();
					break;
				} 
			}
		} catch(Exception e) {
			logger.error("[Excel Stream] Error occurred while creating prepareWorkbook");
			closeDataResources();
		} finally {
			try {
				createWorkbook(wb, ws);
			} catch(Exception e){
				logger.error("[Excel Stream] Error occurred while flushing prepareWorkbook");
				closeDataResources();
			}
		}
	}
	
	
	public void createWorkbook(Workbook wb, Worksheet ws) throws ClientAbortException{
		logger.info("[Excel Stream] Excel stream : START"); 
    	
    	int totalSheets  = (TOTAL + MAX_ROWS_PER_SHEET - 1) / MAX_ROWS_PER_SHEET; 
    	for (int sheetIndex = 0; sheetIndex < totalSheets; sheetIndex++) {
            try {
            	if(sheetIndex == 0 ) {
            		createWorksheet(ws, sheetIndex);
            	} else {
            		String sheetName = "Sheet" + (sheetIndex + 1);
    				Worksheet newWs = wb.newWorksheet(sheetName);
    				createWorksheet(newWs, sheetIndex);
            	}
            } catch (Exception e) {
                logger.error("[Excel Stream] Error occurred while creating worksheet.");
                closeDataResources();
                excelStatusManager.setExcelInProgress(false);
                break; 
            }
        }
        try {
			wb.close();
		} catch (IOException e) {
			logger.info("[Excel Stream] wb close 중에 IOE 발생");
			closeDataResources();
		}
        
        logger.info("[Excel Stream] Excel stream : END");
    }
	
    private void createWorksheet(Worksheet ws, int sheetIndex) throws ClientAbortException {
    	// 제목 행 작성
    	for(int i = 0; i < COL_TITLE.length; i++) {
    		ws.value(0, i, COL_TITLE[i]);
    	}
    	int startRow = sheetIndex * MAX_ROWS_PER_SHEET;
    	int endRow = Math.min((sheetIndex + 1) * MAX_ROWS_PER_SHEET, TOTAL);
    	
    	try {
    		Stream<Map<String, Object>> stream = StreamSupport.stream(cursor.spliterator(), false);
    		
    		AtomicInteger idxRow = new AtomicInteger(startRow + 1);
    		AtomicInteger rowsFlushed = new AtomicInteger(1);
    		
    		stream.skip(startRow).limit(endRow - startRow) 
    		.forEach(rowValue -> {
    			for(int i = 0; i < COL_KEY.length; i++) {
    				Object value = rowValue.get(COL_KEY[i]);
    				ws.value(idxRow.get() - startRow, i, value != null ? value.toString() : "");
    			}
    			idxRow.incrementAndGet();
    			if (rowsFlushed.incrementAndGet() % FLUSH_SIZE == 0) {
    				try {
    					ws.flush();
    				} catch (IOException e) {
    					logger.error("[Excel Stream] Error occurred while flushing worksheet: IOException");
    					throw new RuntimeException("[Excel Stream] Error occurred while flushing worksheet: IOException");
    				}
    			}
    		});
    		
    	} catch(Exception e) {
    		logger.error("[Excel Stream] Error occurred while creating worksheet: Exception");
    		closeDataResources();
    		excelStatusManager.setExcelInProgress(false);
    	} finally {
    		try {
    			ws.finish();
    			logger.info("[Excel Stream] 엑셀 스트리밍 생성 종료");
    		} catch (IOException e) {
    			closeDataResources();
    			logger.error("[Excel Stream] Error occurred while flushing and finishing.");
    		}
    	}
    }
    
    /*
     * 이하 코드는 현재 사용하지 않음.
     */
    public void createWorkbookOrizin(OutputStream os) throws Exception {
    	logger.info("==> Excel stream : START"); 
    	Workbook wb = new Workbook(os, "ExcelApplication", "1.0");
    	
    	int totalSheets  = (TOTAL + MAX_ROWS_PER_SHEET - 1) / MAX_ROWS_PER_SHEET; 
    	for (int sheetIndex = 0; sheetIndex < totalSheets; sheetIndex++) {
            String sheetName = "Sheet" + (sheetIndex + 1);
            Worksheet ws = wb.newWorksheet(sheetName);
            try {
            	createWorksheetOrizin(ws, sheetIndex);
            } catch (Exception e) {
                logger.error("Error occurred while creating worksheet. Aborting.");
                excelStatusManager.setExcelInProgress(false);
                break; 
            }
        }
        wb.close();
        logger.info("==> Excel stream : END");
    }
    
	private void createWorksheetOrizin(Worksheet ws, int sheetIndex) throws ClientAbortException {
    	
    	// 제목 행 작성
		for(int i = 0; i < COL_TITLE.length; i++) {
            ws.value(0, i, COL_TITLE[i]);
        }
		int startRow = sheetIndex * MAX_ROWS_PER_SHEET;
	    int endRow = Math.min((sheetIndex + 1) * MAX_ROWS_PER_SHEET, TOTAL);
		
		SqlSession sqlSession = null;
		Cursor<Map<String, Object>> cursor= null;
		
		try {
			sqlSession = sqlSessionFactory.openSession();
			cursor = sqlSession.selectCursor(QUERY_ID, QUERY_MAP);
			
			Stream<Map<String, Object>> stream = StreamSupport.stream(cursor.spliterator(), false);
			
			AtomicInteger idxRow = new AtomicInteger(startRow + 1);
			AtomicInteger rowsFlushed = new AtomicInteger(1);
				
			stream.skip(startRow).limit(endRow - startRow) 
				.forEach(rowValue -> {
					for(int i = 0; i < COL_KEY.length; i++) {
						Object value = rowValue.get(COL_KEY[i]);
						ws.value(idxRow.get() - startRow, i, value != null ? value.toString() : "");
					}
					idxRow.incrementAndGet();
					if (rowsFlushed.incrementAndGet() % FLUSH_SIZE == 0) {
			            try {
							ws.flush();
						} catch (IOException e) {
							logger.error("다운 중 최초 오류: Error occurred while flushing worksheet1.");
							throw new RuntimeException("Error occurred while flushing worksheet.2");
						}
			        }
				});
			
		} catch(Exception e) {
			logger.error("Error occurred while creating worksheet.");
	        excelStatusManager.setExcelInProgress(false);
		} finally {
			try {
				ws.finish();
            } catch (IOException e) {
	           	 logger.error("Error occurred while flushing and finishing3.");
            }
        	if (cursor != null) {
                try {
					cursor.close();
				} catch (IOException e) {
					logger.error("Error occurred while closing cursor.");
				}
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}