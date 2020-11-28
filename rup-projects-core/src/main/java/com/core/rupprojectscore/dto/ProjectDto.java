package com.core.rupprojectscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private Long cost;
    private Long iterationSize;
    private Long numberOfIterations;

    private List<PhaseDto> phases;

    public List<IterationDto> getIterations() {
        return phases.stream()
                .flatMap(phaseDto -> phaseDto.getIterations().stream())
                .collect(Collectors.toList());
    }

    public Long getNumberOfIterations() {
        return isNull(numberOfIterations)
                ? 10L
                : numberOfIterations;
    }
}
