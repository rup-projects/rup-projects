package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Activity;
import com.core.rupprojectscore.entity.Realization;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RealizationDto {

    private Long id;
    private MemberDto member;
    private List<ActivityDto> activities;

    public static RealizationDto modelToDto(Realization realization) {
        return new ModelMapper().map(realization, RealizationDto.class);
    }

    public static Realization dtoToModel(RealizationDto dto) {
        return new ModelMapper().map(dto, Realization.class);
    }
}
