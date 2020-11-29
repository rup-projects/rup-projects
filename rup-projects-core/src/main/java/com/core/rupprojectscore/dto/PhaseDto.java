package com.core.rupprojectscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhaseDto {

    private PhaseType type;
    private List<IterationDto> iterations;

    public LocalDate getStartDate() {
        return getIterations().get(0).getStartDate();
    }

    public LocalDate getEndDate() {
        return getIterations().get(getIterations().size() - 1).getEndDate();
    }

}
