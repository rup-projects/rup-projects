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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Iteration> iterations = new ArrayList<>();

    public Phase(PhaseType phaseType, List<Iteration> iterations) {
        this.type = phaseType;
        this.iterations = iterations;
    }

    public LocalDate getEndDate() {
        return this.getIterations().get(this.getIterations().size() -1).getEndDate();
    }

    public Iteration getLastIteration() {
        return null
    }
}
