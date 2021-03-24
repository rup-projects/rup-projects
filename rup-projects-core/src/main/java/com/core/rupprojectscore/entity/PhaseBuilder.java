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
    private Long iterationIdx;

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

    public PhaseBuilder withIterations(Long iterationSize, Long numberOfIterations, Long iterationIdx) {
        this.iterationSize = iterationSize;
        this.numberOfIterations = numberOfIterations;
        this.iterationIdx = iterationIdx;
        return this;
    }

    public Phase build() {
        assert this.isValid();
        return new Phase(this.phaseType, this.startDate, this.iterationIdx, this.iterationSize, this.numberOfIterations);
    }

    private boolean isValid() {
        return this.startDate != null && phaseType != null;
    }
}
