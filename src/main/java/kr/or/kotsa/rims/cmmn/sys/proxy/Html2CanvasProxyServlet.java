package kr.or.kotsa.rims.cmmn.sys.proxy;

import com.google.common.io.BaseEncoding;
import com.google.common.io.ByteStreams;
import com.google.gson.Gson;

import kr.or.kotsa.rims.ma.service.impl.MainViewServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static kr.or.kotsa.rims.cmmn.sys.util.CommonUtil.getXSS;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.regex.Pattern;

@Controller
public class Html2CanvasProxyServlet extends HttpServlet {
    private static final long serialVersionUID = -3408677365195660129L;
    Pattern callbackPattern = Pattern.compile("[a-zA-Z_$][0-9a-zA-Z_$]*");
    private static final Logger logger = LoggerFactory.getLogger(MainViewServiceImpl.class);

    @RequestMapping(value = "/proxy/html2canvas", method = RequestMethod.GET)
    protected @ResponseBody
    void doGet(HttpServletRequest req, HttpServletResponse resp, @RequestParam HashMap<String, Object> param)
        throws ServletException, IOException {
    	
    	String urlStr = getXSS(req.getParameter("url"));
    	String callback = getXSS(req.getParameter("callback"));
    	 
    	if (urlStr != null) {
    		URL url = new URL(urlStr);
    		
    		URLConnection connection = null; 
    		String contentType = null;
    		InputStream data = null;
    		
    		connection = url.openConnection();
        	contentType = connection.getContentType();
        	
        	try {
        		data = connection.getInputStream();
        	} catch(IOException e) {
        		logger.error("Html2CanvasProxyServlet : {}", e.getLocalizedMessage());
        	} finally {
        		if(data != null) data.close();
			}
        	
	        if (callback == null) {
	            resp.setContentType(contentType);
	            ByteStreams.copy(data, resp.getOutputStream());
	        } else {
	            if (!callbackPattern.matcher(callback).matches()) {
	                throw new ServletException("Invalid callback name");
	            }
	            resp.setContentType("application/javascript");
	            Writer out = new OutputStreamWriter(resp.getOutputStream(), "UTF-8") {
	                public void close() throws IOException {
	                    //Base64 stream will try to close before jsonp suffix is added.
	                };
	            };
	
	            try {
	                String dataUri = new Gson().toJson("data:" + contentType + ";base64,");
	                out.write(callback + "(" + dataUri.substring(0, dataUri.length() - 1));
	
	                OutputStream base64Stream = BaseEncoding.base64().encodingStream(out);
	                ByteStreams.copy(data, base64Stream);
	                base64Stream.close();
	
	                out.write("\");");
	                out.flush();
	            } catch (IOException e) {
	                logger.error("Html2CanvasProxyServlet : {}", e.getLocalizedMessage());
	            } finally {
	                if(out != null) out.close();
	            }
	        }
    	}
    }
}