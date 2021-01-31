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
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private Long cost = 0L;

    @Column(name = "iterationsize")
    private Long iterationSize;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private List<Phase> phases = new ArrayList<>();

    @Column(name = "numberofiterations")
    @Builder.Default
    private Long numberOfIterations = 10L;

    public Project(LocalDate startDate, LocalDate endDate, Long numberOfIterations) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfIterations = numberOfIterations;
        this.iterationSize = calculateIterationSize();
    }

    private Long calculateIterationSize() {
        Duration projectDuration = Duration.between(this.startDate.atTime(0, 0), this.endDate.atTime(0, 0));
        return projectDuration.toDays() / numberOfIterations;
    }


    public Iteration getLastIteration() {
        return this.getPhases().get(PhaseType.MAX).getLastIteration();
    }

    public void setPhases(List<Phase> phases) {
        this.phases = phases;
        long number = 0;
        for (Phase phase : project.getPhases()) {
            for (Iteration iteration : phase.getIterations()) {
                number++;
                iteration.setNumber(number);
            }
        }
    }
}
