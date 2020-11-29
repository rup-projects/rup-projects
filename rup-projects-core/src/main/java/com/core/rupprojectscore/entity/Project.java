package com.core.rupprojectscore.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Objects.isNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    private List<Phase> phases;

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
