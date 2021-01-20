package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.PhaseType;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class ProjectBuilder {

    public static final int MINIMUM_NUMBER_OF_ITERATIONS = 10;
    public static final int MINIMUM_ITERATION_SIZE = 10;
    public static final int MINIMUM_DURATION = MINIMUM_NUMBER_OF_ITERATIONS * MINIMUM_ITERATION_SIZE;

    private LocalDate startDate;
    private LocalDate endDate;
    private Long cost;
    private Long numberOfIterations;

    public ProjectBuilder() {
        this.startDate = null;
        this.endDate = null;
        this.cost = 0L;
        this.numberOfIterations = 0L;
    }

    public ProjectBuilder dates(LocalDate startDate, LocalDate endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        return this;
    }

    public ProjectBuilder numberOfIterations(Long numberOfIterations) {
        this.numberOfIterations = numberOfIterations;
        return this;
    }

    public ProjectBuilder cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public Project build() {
        assert this.validate();
        Project project = new Project(this.startDate, this.endDate, this.numberOfIterations, calculateIterationSize());
        initPhases(project);
        enumerateProjectIterations(project);
        if (this.cost > 0) {
            project.setCost(this.cost);
        }
        return project;
    }

    private void initPhases(Project project) {
        List<Phase> phases = new ArrayList<>();
        LocalDate phaseStartDate = this.startDate;
        for (PhaseType phaseType : PhaseType.values()) {
            PhaseBuilder phaseBuilder = new PhaseBuilder();
            Phase phase = phaseBuilder
                    .phaseType(phaseType)
                    .startDate(phaseStartDate)
                    .withIterations(project.getIterationSize(), this.numberOfIterations)
                    .build();
            phaseStartDate = phase.getEndDate().plusDays(1);
            phases.add(phase);
        }
        Iteration lastIteration = phases.stream()
                .flatMap(phase -> phase.getIterations().stream())
                .max(Comparator.comparing(Iteration::getEndDate))
                .get();
        if (!this.endDate.equals(lastIteration)) {
            lastIteration.setEndDate(this.endDate);
        }
        project.setPhases(phases);
    }

    private void enumerateProjectIterations(Project project) {
        AtomicInteger atomicInteger = new AtomicInteger(1);
        project.getPhases()
                .stream()
                .flatMap(phase -> phase.getIterations().stream())
                .forEach(iteration -> iteration.setNumber((long) atomicInteger.getAndIncrement()));
    }

    private Long calculateIterationSize() {
        Duration projectDuration = Duration.between(this.startDate.atTime(0, 0), this.endDate.atTime(0, 0));
        return projectDuration.toDays() / numberOfIterations;
    }

    private boolean validate() {
        return this.startDate.isBefore(this.endDate) && numberOfIterations % 10 == 0;
    }

    public String getError() {
        if (startDate.plusDays(MINIMUM_DURATION).isAfter(endDate)) {
            return String.format("project with minimum duration exceeds supplied end date %s", this.endDate);
        }
        long iterationSize = Duration.between(this.startDate.atTime(0, 0), this.endDate.atTime(0, 0)).toDays() / numberOfIterations + 1;
        if (iterationSize < MINIMUM_ITERATION_SIZE) {
            return String.format("invalid project iteration size %s", iterationSize);
        }
        return null;
    }
}
