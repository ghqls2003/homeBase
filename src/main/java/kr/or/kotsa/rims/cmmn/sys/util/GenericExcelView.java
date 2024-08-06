package kr.or.kotsa.rims.cmmn.sys.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsxStreamingView;

public class GenericExcelView extends AbstractXlsxStreamingView {

	@Override
	protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook,
								HttpServletRequest req, HttpServletResponse res) throws UnsupportedEncodingException{

		String excelName = (String) modelMap.get("excelName");
		String[] colName = (String[]) modelMap.get("colName");
		String[] valName = (String[]) modelMap.get("valName");
		List<Map<String, Object>> colValue = (List<Map<String, Object>>) modelMap.get("colValue");

		res.setContentType("application/msexcel");
		String encodedFileName = URLEncoder.encode(excelName + ".xls", StandardCharsets.UTF_8.toString());
		res.setHeader("Content-Disposition", "attachment; filename="+ encodedFileName);
		Sheet sheet = workbook.createSheet(excelName);

		// 상단 메뉴명 생성
		Row menuRow = sheet.createRow(0);
		for (int i = 0; i < colName.length; i++) {
			Cell cell = menuRow.createCell(i);
			cell.setCellValue(colName[i]);
		}

		// 내용 생성
		for (int i = 0; i < colValue.size(); i++) {
			// 메뉴 ROW가 있기때문에 +1을 해준다.
			Row row = sheet.createRow(i + 1);

			Map<String, Object> mapobject = colValue.get(i);
			int cnt = 0;

			if(valName == null || valName.length == 0) {

			    for (String mapkey : mapobject.keySet()){
					Cell cell = row.createCell(cnt);
					String cellStr = "";

					if(mapobject.get(mapkey) != null) {
					    //MAP의 KEY값을 이용하여 VALUE값 가져오기
				        //System.out.println("key:"+mapkey+",value:"+mapobject.get(mapkey));
						cellStr = mapobject.get(mapkey).toString();
					}
					cell.setCellValue(cellStr);
					cnt++;
			    }
			}else {

				for (int k = 0; k < valName.length; k++) {
					Cell cell = row.createCell(cnt);
					String cellStr = "";

				    for (String mapkey : mapobject.keySet()){
						if(valName[k].equals(mapkey)) {
							if(mapobject.get(mapkey) != null) {
							    //MAP의 KEY값을 이용하여 VALUE값 가져오기
						        //System.out.println("key:"+mapkey+",value:"+mapobject.get(mapkey));
								cellStr = mapobject.get(mapkey).toString();
							}
							cell.setCellValue(cellStr);
						}
				    }
					cnt++;
				}
			}
		}
	}

}