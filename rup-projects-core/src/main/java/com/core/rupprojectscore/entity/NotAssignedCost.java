package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.DisciplineType;
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
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "notassignedcost")
public class NotAssignedCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Enumerated
    private DisciplineType type;

    @Column
    private Long hours;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "notassignedcost_id")
    private List<Activity> activities = new ArrayList<>();

    public NotAssignedCost(DisciplineType type, Long hours) {
        this.type = type;
        this.hours = hours;
    }

    public DisciplineType getType() {
        return type;
    }

    public void setType(DisciplineType disciplineType) {
        this.type = disciplineType;
    }

    public Long getHours() {
        return hours;
    }

    public void setHours(Long hours) {
        this.hours = hours;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> notAssignedActivities) {
        this.activities = notAssignedActivities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
