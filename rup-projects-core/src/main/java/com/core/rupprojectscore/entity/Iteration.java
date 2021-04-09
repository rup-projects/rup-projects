package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.DisciplineType;
import com.core.rupprojectscore.dto.PhaseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "iteration")
public class Iteration {

    public static final int MIN_SIZE = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "startdate")
    private LocalDate startDate;

    @Column(name = "enddate")
    private LocalDate endDate;

    @Column
    private Long number;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "iteration_id")
    private List<NotAssignedCost> notAssignedCosts;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "iteration_id")
    private List<Realization> realizations = new ArrayList<>();

    public Iteration(LocalDate startDate, LocalDate endDate, Long number, PhaseType phaseType) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.number = number;
        this.notAssignedCosts = initNotAssignedCosts(phaseType);
    }

    private List<NotAssignedCost> initNotAssignedCosts(PhaseType phaseType) {
        List<NotAssignedCost> notAssignedCost = new ArrayList<>();
        for (DisciplineType disciplineType : DisciplineType.values()) {
            notAssignedCost.add(getNotAssignedCost(getWorkDaysBetweenDates().size() * 8, disciplineType, phaseType));
        }
        return notAssignedCost;
    }

    private NotAssignedCost getNotAssignedCost(int hours, DisciplineType disciplineType, PhaseType phaseType) {
        double notAssignedHours;
        if (DisciplineType.Requirements.equals(disciplineType)) {
            notAssignedHours = hours * phaseType.getRequirementsPercentage();
            return new NotAssignedCost(disciplineType, (long) notAssignedHours);
        } else if (DisciplineType.Analysis.equals(disciplineType)) {
            notAssignedHours = hours * phaseType.getAnalysisPercentage();
            return new NotAssignedCost(disciplineType, (long) notAssignedHours);
        } else if (DisciplineType.Design.equals(disciplineType)) {
            notAssignedHours = hours * phaseType.getDesignPercentage();
            return new NotAssignedCost(disciplineType, (long) notAssignedHours);
        } else {
            notAssignedHours = hours * phaseType.getImplementationPercentage();
            return new NotAssignedCost(disciplineType, (long) notAssignedHours);
        }
    }

    private List<LocalDate> getWorkDaysBetweenDates() {
        return this.startDate.datesUntil(endDate)
                .filter(localDate -> !List.of(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY).contains(localDate.getDayOfWeek()))
                .collect(Collectors.toList());
    }

}
