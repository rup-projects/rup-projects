package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.PhaseType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ProjectBuilder {

    public static final int MIN_ITERATIONS = 10;
    public static final int MIN_DURATION = MIN_ITERATIONS * Iteration.MIN_SIZE;

    private LocalDate startDate;
    private LocalDate endDate;
    private Long cost;
    private Long numberOfIterations;

    public ProjectBuilder() {
        this.startDate = null;
        this.endDate = null;
        this.cost = 0L;
        this.numberOfIterations = Project.MINIMUM_NUMBER_OF_ITERATIONS;
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
        Project project = new Project(this.startDate, this.endDate, this.numberOfIterations);
        this.initPhases(project);
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
            Phase phase = phaseBuilder.phaseType(phaseType)
                    .startDate(phaseStartDate)
                    .withIterations(project.getIterationSize(), this.numberOfIterations)
                    .build();
            phaseStartDate = phase.getEndDate().plusDays(1);
            phases.add(phase);
        }
        Iteration lastIteration = project.getLastIteration();
        if (!this.endDate.equals(lastIteration.getEndDate())) {
            lastIteration.setEndDate(this.endDate);
        }
        project.setPhases(phases);
    }

    private boolean validate() {
        return this.startDate.isBefore(this.endDate) && numberOfIterations % 10 == 0;
    }

    public String getError() {
        if (startDate.plusDays(MIN_DURATION).isAfter(endDate)) {
            return String.format("project with minimum duration exceeds supplied end date %s", this.endDate);
        }
        long iterationSize = new Project(this.startDate, this.endDate, this.numberOfIterations).getIterationSize();
        if (iterationSize < Iteration.MIN_SIZE) {
            return String.format("invalid project iteration size %s", iterationSize);
        }
        return null;
    }
}
