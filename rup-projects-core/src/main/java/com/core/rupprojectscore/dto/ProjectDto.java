package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.service.Mapper;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;

import javax.validation.constraints.Min;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDto {

    private Long id;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    @Min(0)
    private Long cost;
    @Singular
    private List<PhaseDto> phases = new ArrayList<>();
    private Long iterationSize;
    @Builder.Default
    private Long numberOfIterations = 10L;

    public static ProjectDto modelToDto(Project project) {
        return new Mapper().map(project, ProjectDto.class);
    }

    public List<IterationDto> getIterations() {
        return phases.stream().flatMap(phaseDto -> phaseDto.getIterations().stream()).collect(Collectors.toList());
    }

}
