package com.core.rupprojectscore.entity;

import java.time.Duration;
import java.time.LocalDate;

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
        // asserts... startDate
        Project project = new Project(this.startDate, this.endDate, this.numberOfIterations);
        if (this.cost > 0) {
            project.setCost(this.cost);
        }
        return project;
    }

    public String getError() {
        if (this.startDate.isAfter(this.endDate)) {
            return String.format("start date %s before end date %s", this.startDate, this.endDate);
        }
        if (!this.isValidNumberOfIterations()) {
            return String.format("invalid project number of iterations %s", this.numberOfIterations);
        }
        if (!this.isValidIterationSize()) {
            return String.format("invalid project iteration size %s", this.calculateIterationSize());
        }
        if (startDate.plusDays(MINIMUM_DURATION).isAfter(endDate)) {
            return String.format("project with minimum duration exceeds supplied end date %s", this.endDate);
        }
        return null;
    }

    private boolean isValidNumberOfIterations() {
        return numberOfIterations >= MINIMUM_NUMBER_OF_ITERATIONS && numberOfIterations % 10 == 0;
    }

    private boolean isValidIterationSize() {
        return calculateIterationSize() >= MINIMUM_ITERATION_SIZE;
    }

    private Long calculateIterationSize() {
        Duration projectDuration = Duration.between(this.startDate.atTime(0, 0), this.endDate.atTime(0, 0));
        return projectDuration.toDays() / numberOfIterations + 1;
    }
}
