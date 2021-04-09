package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.service.Mapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhaseDto {

    private Long id;

    private PhaseType type;
    private List<IterationDto> iterations = new ArrayList<>();

    public static PhaseDto modelToDto(Phase phase) {
        return new Mapper().map(phase, PhaseDto.class);
    }

    public static Phase dtoToModel(PhaseDto dto) {
        return new Mapper().map(dto, Phase.class);
    }

    public String getStartDate() {
        return getIterations().get(0).getStartDate();
    }

    public String getEndDate() {
        return getIterations().get(getIterations().size() - 1).getEndDate();
    }

}
