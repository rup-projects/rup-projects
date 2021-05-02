package com.core.rupprojectscore.entity;

import java.time.Duration;
import java.time.LocalDateTime;

public class ProjectBuilder {

    public static final int MIN_ITERATIONS = 10;
    public static final int MIN_DURATION = MIN_ITERATIONS * Iteration.MIN_SIZE;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long cost;
    private Long numberOfIterations;

    public ProjectBuilder() {
        this.startDate = null;
        this.endDate = null;
        this.cost = 0L;
        this.numberOfIterations = Project.MINIMUM_NUMBER_OF_ITERATIONS;
    }

    public ProjectBuilder dates(LocalDateTime startDate, LocalDateTime endDate) {
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
        if (this.cost > 0) {
            project.setCost(this.cost);
        }
        return project;
    }

    private boolean validate() {
        return this.startDate.isBefore(this.endDate) && numberOfIterations % 10 == 0;
    }

    public String getError() {
        if (startDate.plusDays(MIN_DURATION).isAfter(endDate)) {
            return String.format("project with minimum duration exceeds supplied end date %s", this.endDate);
        }
        if ((double) Duration.between(this.startDate, this.endDate).toDays() / (double) numberOfIterations < 2) {
            return String.format("project iteration size is less than 1 day, given nº of iterations %s", this.numberOfIterations);
        }
        return null;
    }
}
