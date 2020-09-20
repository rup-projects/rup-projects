package com.core.rupprojectscore.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class Mapper {

    private final ModelMapper mapperAdapted = new ModelMapper();

    public <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source
                .stream()
                .map(element -> mapperAdapted.map(element, targetClass))
                .collect(Collectors.toList());
    }

    public <D> D map(Object source, Class<D> destinationType) {
        return mapperAdapted.map(source, destinationType);
    }

}
