package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.DisciplineType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
}
