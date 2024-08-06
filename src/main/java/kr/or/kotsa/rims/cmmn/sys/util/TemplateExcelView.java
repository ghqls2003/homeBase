package kr.or.kotsa.rims.cmmn.sys.util;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.view.document.AbstractXlsxStreamingView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class TemplateExcelView extends AbstractXlsxStreamingView {

    private String template ="template/";


    @Override
    protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook,
                                      HttpServletRequest req, HttpServletResponse response) throws Exception {
        OutputStream os = null;
        InputStream is = null;

        // template 파일 이름
        template += modelMap.get("templateFileNm");

        try {
            // 오늘날짜
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            Date todayDate = new Date();
            String today = dateFormat.format(todayDate);

            // 다운받아질 파일 이름_오늘날짜
            String fileName = modelMap.get("downloadFileNm").toString();
            fileName += "_" + today;


            is = new ClassPathResource(template).getInputStream();

            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ".xlsx");

            os = response.getOutputStream();

            XLSTransformer transformer = new XLSTransformer();

//            Workbook excel = transformer.transformXLS(is, modelMap);
            Workbook excel = transformer.transformXLS(is, modelMap);
            excel.write(os);
            os.flush();

        } catch (IOException e) {
            System.out.println("파일 또는 스트림 관련 예외가 발생하였습니다.");
            throw new RuntimeException("파일 또는 스트림 관련 예외가 발생하였습니다.");
        } catch (InvalidFormatException e) {
            System.out.println("올바르지 않은 파일 형식 예외가 발생하였습니다.");
            throw new RuntimeException("올바르지 않은 파일 형식 예외가 발생하였습니다.");
        } catch (ParsePropertyException e) {
            System.out.println("속성 파싱 예외가 발생하였습니다.");
            throw new RuntimeException("속성 파싱 예외가 발생하였습니다.");
        } catch (Exception e) {
            System.out.println("엑셀 파일 생성 중 예외가 발생하였습니다.");
            throw new RuntimeException("엑셀 파일 생성 중 예외가 발생하였습니다.");
        } finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                	System.out.println("파일 스트림 처리 중 예외가 발생하였습니다.");
                }
            }
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                	System.out.println("파일 입출력 예외가 발생하였습니다.");
                }
            }
        }
    }
}
