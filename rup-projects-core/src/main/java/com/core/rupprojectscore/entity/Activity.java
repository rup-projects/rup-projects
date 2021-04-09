package com.core.rupprojectscore.entity;

import com.core.rupprojectscore.dto.DisciplineType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

    @Column
    @Enumerated
    private DisciplineType disciplineType;

    @Column(name = "startdatetime")
    private String startDateTime;

    public Activity(DisciplineType disciplineType, String description, Long hours) {
        this.description = description;
        this.disciplineType = disciplineType;
        this.hours = hours;
    }

}
