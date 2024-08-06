package kr.or.kotsa.rims.cmmn.sys.util;

import kostat.sop.ServiceAPI.common.geom.*;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sonar.api.internal.google.gson.Gson;
import org.sonar.api.internal.google.gson.JsonElement;
import org.sonar.api.internal.google.gson.JsonParser;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


public class GeojsonRenderer {

    private String geometry;

    private static final Logger logger = LoggerFactory.getLogger(GeojsonRenderer.class);
    
    private static final char QUOTES = '"';

    public static Map<String,Object> renderGeojson(Map bnd, String name) throws RimsException {

//        List<Map> bndList = (List) bnd.get("result");
//
//        List<Object> testList = (List) bnd.get("result");
//
//
        StringBuffer buf = new StringBuffer();
//        buf.append("{" + QUOTES + "type" + QUOTES + ": " + QUOTES + "FeatureCollection" + QUOTES + ",");
//        buf.append("" + QUOTES + "id" + QUOTES + ": " + QUOTES + "" + bnd.get("id") + "" + QUOTES + ",");
//        buf.append("" + QUOTES + "errMsg" + QUOTES + ": " + QUOTES + "" + bnd.get("errMsg") + "" + QUOTES + ",");
//        buf.append("" + QUOTES + "errCd" + QUOTES + ": " + bnd.get("errCd") + ",");
//        buf.append("" + QUOTES + "trId" + QUOTES + ": " + QUOTES + "" + bnd.get("trId") + "" + QUOTES + ",");
//        buf.append("" + QUOTES + "ts" + QUOTES + ": " + QUOTES + "" + bnd.get("ts") + "" + QUOTES + ",");
//        buf.append(" " + QUOTES + "features" + QUOTES + ": [");

//        if (bndList != null && bndList.size() != 0) {
//
//            if (testList instanceof List) {
//                buf.append(generateByGeojsonModel(bnd, name));
//            } else if (testList instanceof Map) {
//                buf.append(generateByGeojsonModel(bndList, name));
//            }
//        } else {
//            buf.append("]}");
//        }
    	 buf.append(getGeojsonPiece(bnd, name));
    	
    	JsonParser parser = new JsonParser();
    	JsonElement element = parser.parse(buf.toString().substring(0, buf.toString().length() - 1));
    	Map<String,Object> map = new HashMap<String,Object>();
    	Gson gson = new Gson();
    	map = (Map<String,Object>) gson.fromJson(element, map.getClass());
        return map;
    }

    @SuppressWarnings("unchecked")
	public static Map<String,Object> renderGeojson(List<Map> bndList, String name) throws RimsException {

        StringBuffer buf = new StringBuffer();
        
        buf.append("{" + QUOTES + "type" + QUOTES + ": " + QUOTES + "FeatureCollection" + QUOTES + ",");
        buf.append(" " + QUOTES + "features" + QUOTES + ": [");
        
        if (bndList.size() != 0) {
            buf.append(generateByGeojsonModel(bndList, name));
        } else {
            buf.append("]}");
        }
        
    	JsonParser parser = new JsonParser();
    	JsonElement element = parser.parse(buf.toString());
    	Map<String,Object> map = new HashMap<String,Object>();
    	Gson gson = new Gson();
    	
    	map = (Map<String,Object>) gson.fromJson(element, map.getClass());
    	
        return map;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
	private static String generateByGeojsonModel(List<Map> bndList, String name) throws RimsException {
        StringBuffer buf = new StringBuffer();
        Map model = null;
        Iterator<Map> itr = bndList.iterator();

        while (itr.hasNext()) {

            Object obj = itr.next();
            if (obj instanceof List) {
                Iterator<Map> itr2 = ((List) obj).iterator();

                while (itr2.hasNext()) {
                    model = (Map) itr2.next();
                    buf.append(getGeojsonPiece(model, name));
                }
            } else if (obj instanceof Map) {

                //model = (Map) itr.next();
                model = (Map) obj;
                buf.append(getGeojsonPiece(model, name));
            }

        }
        if (buf.toString().equals("")) {
            return "";
        } else {
            return buf.toString().substring(0, buf.toString().length() - 1) + "]}";
        }
    }

    private static String getGeojsonPiece(Map<String, ?> model, String name) {

        StringBuffer buf = new StringBuffer();
        buf.append("{" + QUOTES + "type" + QUOTES + ":" + "" + QUOTES + "Feature" + QUOTES + ",");


        String path_contents = "";

        Geometry geometry = null;

        // SDO_ORDINATE_ARRAY에 좌표가 하나도 없는 경우 에러나서 해당 바이트가 13 바이트 이상일 때만 처리하도록 함.
        if (((byte[]) model.get(name)) != null) {
        
	        if (((byte[]) model.get(name)).length > 13) {
	            byte[] geometrybyte = (byte[]) model.get(name);
	            geometry = WKBAdapter.wkbToGeometry(geometrybyte);
	        }
	
	        if (geometry instanceof Polygon) {
	            buf.append("" + QUOTES + "geometry" + QUOTES + ":" + "{" + QUOTES + "type" + QUOTES + ":" + QUOTES + "Polygon" + QUOTES + ",");
	            buf.append("" + QUOTES + "coordinates" + QUOTES + ":[");
	            path_contents = toPath((Polygon) geometry);
	        } else if (geometry instanceof MultiPolygon) {
	            MultiPolygon mpg = (MultiPolygon) geometry;
	
	            int numpg = mpg.getNumGeometries();
	
	            if (numpg == 1) {
	                buf.append("" + QUOTES + "geometry" + QUOTES + ":" + "{" + QUOTES + "type" + QUOTES + ":" + QUOTES + "Polygon" + QUOTES + ",");
	                buf.append("" + QUOTES + "coordinates" + QUOTES + ":[");
	                path_contents = toPath((Polygon) mpg.getGeometryN(0));
	            } else {
	                buf.append("" + QUOTES + "geometry" + QUOTES + ":" + "{" + QUOTES + "type" + QUOTES + ":" + QUOTES + "MultiPolygon" + QUOTES + ",");
	                buf.append("" + QUOTES + "coordinates" + QUOTES + ":[");
	                path_contents = toPath((MultiPolygon) geometry);
	            }
	
	            //buf.append("                " + QUOTES + "geometry" + QUOTES + ":"+"{" + QUOTES + "type" + QUOTES + ":" + QUOTES + "Polygon" + QUOTES + ",\n");
	            //buf.append("                            " + QUOTES + "coordinates" + QUOTES + ":[\n                                           ");
	            //toPath((MultiPolygon) geometry);
	        } else if (geometry instanceof LineString) {
	            buf.append("" + QUOTES + "geometry" + QUOTES + ":" + "{" + QUOTES + "type" + QUOTES + ":" + QUOTES + "LineString" + QUOTES + ",");
	            buf.append("" + QUOTES + "coordinates" + QUOTES + ":[");
	            path_contents = toPath((LineString) geometry);
	        } else {
	            buf.append("" + QUOTES + "geometry" + QUOTES + ":" + "{" + QUOTES + "type" + QUOTES + ":" + QUOTES + "Polygon" + QUOTES + ",");
	            buf.append("" + QUOTES + "coordinates" + QUOTES + ":[");
	        }
	
	        buf.append(path_contents);
	        buf.append("]},");
	        buf.append("" + QUOTES + "properties" + QUOTES + ":{");
        }
        
        model.remove("geometry");
        
        Iterator<String> keys = model.keySet().iterator();

        while (keys.hasNext()) {
            String keyname = keys.next();

            buf.append("" + QUOTES + "" + keyname + "" + QUOTES + ":" + QUOTES + "" + model.get(keyname) + "" + QUOTES + "");

            if (keys.hasNext()) buf.append(",");
        }

        buf.append("}");
        buf.append("},");
        
        return buf.toString();

    }


    private static String toPath(Polygon geometry) {
        StringBuffer buf = new StringBuffer();

        // 익스테리어 링을 그리고
        LineString exRing = geometry.getExteriorRing();

        buf.append("[");
        buf.append(ordinateArray2String(exRing.getCoordArray()));
        buf.append("]");

        // 인테리어 링이 존재한다면 인테리어링을 그리고
        int num_inLing = geometry.getNumInteriorRings();
        
        // 인테리어링 개수 체크 후 0보다 크면 그림
        if (num_inLing > 0) {
	        LineString inRings[] = new LineString[num_inLing];
	        
	        for (int i = 0; i < num_inLing; i++) {
	            inRings[i] = geometry.getInteriorRingN(i);
	            buf.append(",[");
	            buf.append(ordinateArray2String(inRings[i].getCoordArray()));
	            buf.append("]");
	        }
        }

        return buf.toString();
    }


    private static String toPath(MultiPolygon geometry) {
        StringBuffer buf = new StringBuffer();
        int num_pg = geometry.getNumGeometries();
        for (int i = 0; i < num_pg; i++) {
            if (i > 0) buf.append(",");
            buf.append("[");
            buf.append(toPath((Polygon) geometry.getGeometryN(i)));
            buf.append("]");
        }
        return buf.toString();
    }
    
    private static String toPath(LineString geometry) {
    	StringBuffer buf = new StringBuffer();
        buf.append(ordinateArray2String(geometry.getCoordArray()));
        
        return buf.toString();
    }


    private static String ordinateArray2String(double[] ordinates) {

        int numpt = (int) (ordinates.length / 2) - 1;

        StringBuffer buf = new StringBuffer();
        buf.append("[");
        buf.append((double) ordinates[0]);
        buf.append(",");
        buf.append((double) ordinates[1]);
        buf.append("],");

        for (int i = 1; i < numpt; i++) {
            buf.append("[");
            buf.append((double) ordinates[(i * 2)]);
            buf.append(",");
            buf.append((double) ordinates[(i * 2) + 1]);
            buf.append("],");
        }
        buf.append("[");
        buf.append((double) ordinates[numpt * 2]);
        buf.append(",");
        buf.append((double) ordinates[(numpt * 2) + 1]);
        buf.append("]");
        return buf.toString();
    }

}
