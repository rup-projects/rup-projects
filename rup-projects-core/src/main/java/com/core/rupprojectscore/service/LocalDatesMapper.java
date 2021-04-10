package com.core.rupprojectscore.service;

import org.modelmapper.AbstractConverter;
import org.modelmapper.AbstractProvider;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.Provider;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDatesMapper {

    public ModelMapper createMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.createTypeMap(String.class, LocalDate.class);
        Provider<LocalDate> localDateProvider = new AbstractProvider<LocalDate>() {
            @Override
            public LocalDate get() {
                return LocalDate.now();
            }
        };

        Converter<String, LocalDate> toStringDate = new AbstractConverter<String, LocalDate>() {
            @Override
            protected LocalDate convert(String source) {
                DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate localDate = LocalDate.parse(source, format);
                return localDate;
            }
        };

        modelMapper.getTypeMap(String.class, LocalDate.class).setProvider(localDateProvider);
        modelMapper.addConverter(toStringDate);
        return modelMapper;
    }

}


