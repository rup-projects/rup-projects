package com.core.rupprojectscore.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "project")
public class Project {

    public static final Long MINIMUM_NUMBER_OF_ITERATIONS = 10L;
    public static final Long MINIMUM_ITERATION_SIZE = 10L;
    public static final Long MINIMUM_DURATION = MINIMUM_NUMBER_OF_ITERATIONS * MINIMUM_ITERATION_SIZE;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "startdate")
    private LocalDate startDate;

    @Column(name = "enddate")
    private LocalDate endDate;

    @Column
    private Long cost;

    @Column(name = "iterationsize")
    private Long iterationSize;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private List<Phase> phases;

    @Column(name = "numberofiterations")
    @Builder.Default
    private Long numberOfIterations = Project.MINIMUM_NUMBER_OF_ITERATIONS;

    public Project(LocalDate startDate, LocalDate endDate, Long numberOfIterations, Long iterationSize) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfIterations = numberOfIterations;
        this.iterationSize = iterationSize;
    }


}
