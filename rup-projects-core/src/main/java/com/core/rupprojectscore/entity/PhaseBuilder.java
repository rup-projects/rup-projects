package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.PhaseType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class PhaseBuilder implements PhaseBuilders.StartDate, PhaseBuilders.PhaseType, PhaseBuilders.WithIterations, PhaseBuilders.Optionals{


    private LocalDate startDate;
    private Long iterationSize;
    private Long numberOfIterations;
    private PhaseType phaseType;

    public static PhaseBuilders.PhaseType PhaseBuilder() {
        return new PhaseBuilder();
    }

    public PhaseBuilders.WithIterations startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public PhaseBuilders.StartDate phaseType(PhaseType phaseType) {
        this.phaseType = phaseType;
        return this;
    }

    public PhaseBuilders.Optionals withIterations(Long iterationSize, Long numberOfIterations) {
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
        for (int i = 0; i < getNumberOfIterationsByPhases(this.phaseType, numberOfIterations); i++) {
            iterations.add(new Iteration(iterationStartDate, iterationStartDate.plusDays(iterationSize)));
            iterationStartDate = iterationStartDate.plusDays(iterationSize).plusDays(1);
        }
        return iterations;
    }

    private int getNumberOfIterationsByPhases(PhaseType phaseType, Long numberOfIterations) {
        return Math.toIntExact(Math.round(numberOfIterations * phaseType.getPercentage()));
    }

    private boolean isValid() {
        return this.startDate != null && phaseType != null;
    }
}
