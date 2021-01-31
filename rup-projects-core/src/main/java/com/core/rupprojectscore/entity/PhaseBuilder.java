package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.PhaseType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class PhaseBuilder {

    private LocalDate startDate;
    private Long iterationSize;
    private Long numberOfIterations;
    private PhaseType phaseType;

    public PhaseBuilder() {
        this.phaseType = null;
        this.startDate = null;
        this.iterationSize = 0L;
        this.numberOfIterations = 0L;
    }

    public PhaseBuilder startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public PhaseBuilder phaseType(PhaseType phaseType) {
        this.phaseType = phaseType;
        return this;
    }

    public PhaseBuilder withIterations(Long iterationSize, Long numberOfIterations) {
        this.iterationSize = iterationSize;
        this.numberOfIterations = numberOfIterations;
        return this;
    }

    public Phase build() {
        assert this.isValid();
        List<Iteration> iterations = createIterations(this.startDate, this.iterationSize, this.numberOfIterations);
        return new Phase(this.phaseType, iterations);
    }

    private List<Iteration> createIterations(LocalDate iterationStartDate, Long iterationSize, Long numberOfIterations) {
        List<Iteration> iterations = new ArrayList<>();
        for (int i = 0; i < getNumberOfIterationsByPhase(this.phaseType, numberOfIterations); i++) {
            iterations.add(new Iteration(iterationStartDate, iterationStartDate.plusDays(iterationSize)));
            iterationStartDate = iterationStartDate.plusDays(iterationSize).plusDays(1);
        }
        return iterations;
    }

    private int getNumberOfIterationsByPhase(PhaseType phaseType, Long numberOfIterations) {
        return Math.toIntExact(Math.round(numberOfIterations * phaseType.getPercentage()));
    }

    private boolean isValid() {
        return this.startDate != null && phaseType != null;
    }
}
