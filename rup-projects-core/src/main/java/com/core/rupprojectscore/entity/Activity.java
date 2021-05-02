package com.core.rupprojectscore.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
