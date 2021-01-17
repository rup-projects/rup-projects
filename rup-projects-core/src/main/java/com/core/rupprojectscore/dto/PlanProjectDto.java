package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.exceptions.BadRequestException;
import com.core.rupprojectscore.service.Mapper;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Singular;

import javax.validation.constraints.Min;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProjectDto {

    public static final int MINIMUM_NUMBER_OF_ITERATIONS = 10;
    public static final int MINIMUM_ITERATION_SIZE = 10;
    public static final int MINIMUM_DURATION = MINIMUM_NUMBER_OF_ITERATIONS * MINIMUM_ITERATION_SIZE;

    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    @Min(0)
    private Long cost;
    @Builder.Default
    private Long numberOfIterations = 10L;

    public Project createProject() {
        Project project = Project.builder().build();
        project.setStartDate(this.getStartDate());
        project.setEndDate(this.getEndDate());
        project.setCost(this.getCost());
        project.setIterationSize(calculateIterationSize());
        project.setNumberOfIterations(this.numberOfIterations);
        this.createPhases(project);
        return project;
    }

    private void createPhases(Project project) {
        List<Iteration> iterations = this.createIterations(project);
        for (PhaseType phaseType : PhaseType.values()) {
            project.addPhase(Phase.builder()
                    .type(phaseType)
                    .iterations(iterations.subList(project.getNumberOfIterations(),
                            project.getNumberOfIterations() + this.getNumberOfIterationsByPhases(this.numberOfIterations, phaseType)))
                    .build()
            );
        }
    }

    private List<Iteration> createIterations(Project project) {
        List<Iteration> result = new ArrayList<>();
        AtomicInteger counter = new AtomicInteger(1);
        for (LocalDate index = project.getStartDate();
             index.plusDays(project.getIterationSize()).isBefore(project.getEndDate());
             index = index.plusDays(project.getIterationSize())) {
            result.add(Iteration.builder()
                    .number((long) counter.getAndIncrement())
                    .startDate(index)
                    .endDate(index.plusDays(project.getIterationSize() - 1))
                    .build());
        }
        Iteration lastGeneratedIteration = result.get(getNumberOfIterations().intValue() - 2);
        result.add(Iteration.builder().number((long) counter.getAndIncrement()).startDate(lastGeneratedIteration.getEndDate().plusDays(1)).endDate(project.getEndDate()).build());
        return result;
    }

    private Long calculateIterationSize() {
        Duration projectDuration = Duration.between(this.getStartDate().atTime(0, 0), this.getEndDate().atTime(0, 0));
        return projectDuration.toDays() / numberOfIterations + 1;
    }

    public int getNumberOfIterationsByPhases(Long numberOfIterations, PhaseType phaseType) {
        return Math.toIntExact(Math.round(numberOfIterations * phaseType.getPercentage()));
    }



    public void checkProjectDto() {
        if (this.startDate.isAfter(this.endDate)) {
            throw new BadRequestException(String.format("start date %s before end date %s", this.startDate, this.endDate));
        }
        if (!this.isValidNumberOfIterations()) {
            throw new BadRequestException(String.format("invalid project number of iterations %s", this.numberOfIterations));
        }
        if (!this.isValidIterationSize()) {
            throw new BadRequestException(String.format("invalid project iteration size %s", this.calculateIterationSize()));
        }
        if (this.isMinimumDurationExceedsPlannedDates()) {
            throw new BadRequestException(String.format("project with minimum duration exceeds supplied end date %s", this.endDate));
        }
    }

    private boolean isValidNumberOfIterations() {
        return numberOfIterations >= MINIMUM_NUMBER_OF_ITERATIONS  && numberOfIterations % 10 == 0;
    }

    private boolean isValidIterationSize() {
        return calculateIterationSize() >= MINIMUM_ITERATION_SIZE;
    }

    private boolean isMinimumDurationExceedsPlannedDates() {
        return startDate.plusDays(MINIMUM_DURATION).isAfter(endDate);
    }

}
