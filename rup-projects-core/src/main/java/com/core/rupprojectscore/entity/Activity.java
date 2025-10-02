package com.core.rupprojectscore.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String description;

    @Column
    private Long hours;

    @ManyToOne
    @JoinColumn(name = "notassignedcost_id")
    private NotAssignedCost notAssignedCost;

    @ManyToOne
    @JoinColumn(name = "realization_id")
    private Realization realization;

    @Column(name = "startdatetime")
    private LocalDateTime startDateTime;

    public Activity(NotAssignedCost notAssignedCost, String description, Long hours) {
        this.description = description;
        this.notAssignedCost = notAssignedCost;
        this.hours = hours;
    }

}
