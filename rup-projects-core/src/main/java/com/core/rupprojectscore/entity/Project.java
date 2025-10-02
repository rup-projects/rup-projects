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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    private Long cost = 0L;

    @Column(name = "iterationsize")
    private Long iterationSize;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id")
    private List<Phase> phases = new ArrayList<>();

    @Column(name = "numberofiterations")
    @Builder.Default
    private Long numberOfIterations = Project.MINIMUM_NUMBER_OF_ITERATIONS;

    public Project(LocalDateTime startDate, LocalDateTime endDate, Long numberOfIterations) {
        this.startDate = startDate.toLocalDate();
        this.endDate = endDate.toLocalDate();
        this.numberOfIterations = numberOfIterations;
        this.iterationSize = Duration.between(startDate, endDate).toDays() / numberOfIterations;
        initPhases();
    }

    private void initPhases() {
        LocalDate phaseStartDate = this.startDate;
        PhaseBuilder phaseBuilder = new PhaseBuilder();
        for (PhaseType phaseType : PhaseType.values()) {
            Phase phase = phaseBuilder.phaseType(phaseType)
                    .startDate(phaseStartDate)
                    .withIterations(this.iterationSize, this.numberOfIterations,(long) this.getIterations().size() == 0 ? 1L : this.getIterations().size() + 1)
                    .build();
            phaseStartDate = phase.getEndDate().plusDays(1);
            this.phases.add(phase);
        }
        Iteration lastIteration = getLastPhase().getLastIteration();
        if (!this.endDate.equals(lastIteration.getEndDate())) {
            lastIteration.setEndDate(this.endDate);
        }
    }

    private Phase getLastPhase() {
        return this.getPhases().get(PhaseType.MAX - 1);
    }

    private List<Iteration> getIterations() {
        return this.getPhases().stream().flatMap(phase -> phase.getIterations().stream()).collect(Collectors.toList());
    }
}
