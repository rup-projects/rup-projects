package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.service.Mapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDto {

    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long cost;
    private List<PhaseDto> phases;
    private Long iterationSize;
    @Builder.Default
    private Long numberOfIterations = 10L;

    public static ProjectDto create(Project project) {
        return new Mapper().map(project, ProjectDto.class);
    }

    public List<IterationDto> getIterations() {
        return phases.stream()
                .flatMap(phaseDto -> phaseDto.getIterations().stream())
                .collect(Collectors.toList());
    }

    public boolean hasId() {
        return nonNull(id);
    }

    public Project createProject() {
        Project project = Project.builder().build();
        project.setStartDate(this.getStartDate());
        project.setEndDate(this.getEndDate());
        project.setIterationSize(this.getIterationSize());
        this.createPhases(project);
        return project;
    }

    private void createPhases(Project project) {
        List<Iteration> iterations = this.createIterations(project);
        for (PhaseType phaseType : PhaseType.values()) {
            project.addPhase(Phase.builder()
                    .type(phaseType)
                    .iterations(iterations.subList(project.getNumberOfIterations(),
                            project.getNumberOfIterations() + this.getNumberOfIterationsByPhases(iterations.size(), phaseType)))
                    .build()
            );
        }
    }

    public int getNumberOfIterationsByPhases(Integer numberOfIterations, PhaseType phaseType) {
        return Math.toIntExact(Math.round(numberOfIterations * phaseType.getPercentage()));
    }

    private List<Iteration> createIterations(Project project) {
        List<Iteration> result = new ArrayList<>();
        for (LocalDate index = project.getStartDate();
             index.plusDays(project.getIterationSize()).isBefore(project.getEndDate());
             index = index.plusDays(project.getIterationSize())) {
            result.add(Iteration.builder()
                    .startDate(index)
                    .endDate(index.plusDays(project.getIterationSize() - 1))
                    .build());
        }
        Iteration lastGeneratedIteration = result.get(getNumberOfIterations().intValue() - 2);
        result.add(Iteration.builder().startDate(lastGeneratedIteration.getEndDate().plusDays(1)).endDate(project.getEndDate()).build());
        return result;
    }

    public boolean isValid() {
        return this.getNumberOfIterations() >= 10
                && this.getNumberOfIterations() % 10 == 0
                && !isExceedsProjectEndDate();
    }

    private boolean isExceedsProjectEndDate() {
        return this.getStartDate().plusDays(this.getNumberOfIterations() * Iteration.MINIMUM_ITERATION_SIZE).isAfter(this.getEndDate());
    }
}
