package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.entity.UseCase;
import com.core.rupprojectscore.service.Mapper;
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

    //todo a lo mejor mover modelo
    public static final int MINIMUM_NUMBER_OF_ITERATIONS = 10;
    public static final int MINIMUM_ITERATION_SIZE = 10;
    public static final int MINIMUM_DURATION = MINIMUM_NUMBER_OF_ITERATIONS * MINIMUM_ITERATION_SIZE;

    private Long id;
    @NotNull
    private LocalDate startDate;
    @NotNull
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
