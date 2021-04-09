package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.service.LocalDatesMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IterationDto {
    private Long id;
    private String startDate;
    private String endDate;
    private Long number;
    private List<NotAssignedCostDto> notAssignedCosts;
    private List<RealizationDto> realizations;
    private List<String> dateTimes;

    public static IterationDto modelToDto(Iteration iteration) {
        return new LocalDatesMapper().createMapper().map(iteration, IterationDto.class);
    }

    public static Iteration dtoToModel(IterationDto dto) {
        return new LocalDatesMapper().createMapper().map(dto, Iteration.class);
    }

}
