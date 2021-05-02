package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Iteration;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IterationDto {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private Long number;
    private List<NotAssignedCostDto> notAssignedCosts;
    private List<RealizationDto> realizations;
    private List<String> dateTimes;

    public static IterationDto modelToDto(Iteration iteration) {
        return new ModelMapper().map(iteration, IterationDto.class);
    }

    public static Iteration dtoToModel(IterationDto dto) {
        return new ModelMapper().map(dto, Iteration.class);
    }

}
