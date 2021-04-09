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
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "phase")
public class Phase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Enumerated
    private PhaseType type;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Iteration> iterations = new ArrayList<>();

    public Phase(PhaseType phaseType, LocalDate startDate, Long firstIterationIdx, Long iterationSize, Long numberOfIterations) {
        this.type = phaseType;
        this.iterations = createIterations(startDate, firstIterationIdx, iterationSize, numberOfIterations, phaseType);
    }

    private List<Iteration> createIterations(LocalDate iterationStartDate, Long iterationIdx, Long iterationSize, Long numberOfIterations, PhaseType phaseType) {
        List<Iteration> iterations = new ArrayList<>();
        for (int i = 0; i < getNumberOfIterationsByPhase(this.type, numberOfIterations); i++) {
            iterations.add(new Iteration(iterationStartDate, iterationStartDate.plusDays(iterationSize), iterationIdx, phaseType));
            iterationStartDate = iterationStartDate.plusDays(iterationSize).plusDays(1);
            iterationIdx++;
        }
        return iterations;
    }

    private int getNumberOfIterationsByPhase(PhaseType phaseType, Long numberOfIterations) {
        return Math.toIntExact(Math.round(numberOfIterations * phaseType.getDurationPercentage()));
    }

    public LocalDate getEndDate() {
        return getLastIteration().getEndDate();
    }

    public Iteration getLastIteration() {
        return this.iterations.get(this.iterations.size() - 1);
    }
}
