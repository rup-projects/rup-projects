package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.UseCase;
import com.core.rupprojectscore.service.Mapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UseCaseDto {
    private Long id;
    private String name;
    private String description;
    private Integer priority;

    public static UseCaseDto modelToDto(UseCase useCase) {
        return new Mapper().map(useCase, UseCaseDto.class);
    }

    public static UseCase dtoToModel(UseCaseDto dto) {
        return new Mapper().map(dto, UseCase.class);
    }
}
