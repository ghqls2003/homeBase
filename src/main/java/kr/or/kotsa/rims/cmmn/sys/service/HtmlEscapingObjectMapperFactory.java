package kr.or.kotsa.rims.cmmn.sys.service;

import com.fasterxml.jackson.core.SerializableString;
import com.fasterxml.jackson.core.io.CharacterEscapes;
import com.fasterxml.jackson.core.io.SerializedString;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.text.translate.AggregateTranslator;
import org.apache.commons.lang3.text.translate.CharSequenceTranslator;
import org.apache.commons.lang3.text.translate.EntityArrays;
import org.apache.commons.lang3.text.translate.LookupTranslator;
import org.springframework.beans.factory.FactoryBean;

public class HtmlEscapingObjectMapperFactory implements FactoryBean<ObjectMapper> {

    private final ObjectMapper objectMapper;


    public HtmlEscapingObjectMapperFactory() {
        objectMapper = new ObjectMapper();
        objectMapper.getFactory().setCharacterEscapes(new HTMLCharacterEscapes());
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public ObjectMapper getObject() throws RimsException {
        return objectMapper;
    }

    @Override
    public Class<?> getObjectType() {
        return ObjectMapper.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    public static class HTMLCharacterEscapes extends CharacterEscapes {

        private final int[] asciiEscapes;

        private final CharSequenceTranslator charSequenceTranslator;

        public HTMLCharacterEscapes() {
            asciiEscapes = CharacterEscapes.standardAsciiEscapesForJSON();

            asciiEscapes['<'] = CharacterEscapes.ESCAPE_CUSTOM;
            asciiEscapes['>'] = CharacterEscapes.ESCAPE_CUSTOM;
//            asciiEscapes['&'] = CharacterEscapes.ESCAPE_CUSTOM;
//            asciiEscapes['"'] = CharacterEscapes.ESCAPE_CUSTOM;
//            asciiEscapes['\''] = CharacterEscapes.ESCAPE_CUSTOM;


            charSequenceTranslator = new AggregateTranslator(new LookupTranslator(EntityArrays.BASIC_ESCAPE()), new LookupTranslator((EntityArrays.ISO8859_1_ESCAPE())), new LookupTranslator(EntityArrays.HTML40_EXTENDED_ESCAPE()), new LookupTranslator(new String[][]{{"(", "&#40;"}, {")", "&#41;"}, {"#", "&#35;"}, {"\'", "&#39;"}}));

        }

        @Override
        public int[] getEscapeCodesForAscii() {
            int[] lAsciiEscapes =  asciiEscapes;
            return lAsciiEscapes;
        }

        @Override
        public SerializableString getEscapeSequence(int i) {
            return new SerializedString(StringEscapeUtils.escapeHtml4(Character.toString((char) i)));
        }
    }
}
