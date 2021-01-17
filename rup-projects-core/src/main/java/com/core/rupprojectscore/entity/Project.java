package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.PhaseType;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static java.util.Objects.isNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project")
public class Project {

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
    private Long numberOfIterations = 10L;

    public Project(LocalDate startDate, LocalDate endDate, Long numberOfIterations) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfIterations = numberOfIterations;
        this.createPhases();
    }

    private void createPhases() {
        this.phases = new ArrayList<>();
        List<Iteration> iterations = this.createIterations();
        for (PhaseType phaseType : PhaseType.values()) {
            // TODO Create PhaseBuilder
            this.phases.add(Phase.builder()
                    .type(phaseType)
                    .iterations(iterations.subList(this.getNumberOfIterations(),
                            this.getNumberOfIterations() + this.getNumberOfIterationsByPhases(this.numberOfIterations, phaseType)))
                    .build()
            );
        }
    }

    public List<Phase> getPhases() {
        if (isNull(phases)) {
            phases = new ArrayList<>();
        }
        return phases;
    }

    public Integer getNumberOfIterations() {
        return Math.toIntExact(getPhases().stream().flatMap(phase -> phase.getIterations().stream()).count());
    }

    public int getNumberOfIterationsByPhases(Long numberOfIterations, PhaseType phaseType) {
        return Math.toIntExact(Math.round(numberOfIterations * phaseType.getPercentage()));
    }

    private List<Iteration> createIterations() {
        List<Iteration> result = new ArrayList<>();
        AtomicInteger counter = new AtomicInteger(1);
        for (LocalDate index = this.getStartDate();
             index.plusDays(this.getIterationSize()).isBefore(this.getEndDate());
             index = index.plusDays(this.getIterationSize())) {
            result.add(Iteration.builder()
                    .number((long) counter.getAndIncrement())
                    .startDate(index)
                    .endDate(index.plusDays(this.getIterationSize() - 1))
                    .build());
        }
        Iteration lastGeneratedIteration = result.get(getNumberOfIterations().intValue() - 2);
        result.add(Iteration.builder().number((long) counter.getAndIncrement()).startDate(lastGeneratedIteration.getEndDate().plusDays(1)).endDate(this.getEndDate()).build());
        return result;
    }

}
