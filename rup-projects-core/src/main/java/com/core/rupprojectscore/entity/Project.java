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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;

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
    private Long cost;

    @Column(name = "iterationsize")
    private Long iterationSize;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private List<Phase> phases;


    @Column(name = "numberofiterations")
    @Builder.Default
    private Long numberOfIterations = 10L;


    public void addPhase(Phase build) {
        if (isNull(phases)) {
            this.phases = new ArrayList<>();
        }
        this.phases.add(build);
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
}
