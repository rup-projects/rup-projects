package com.core.rupprojectscore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotAssignedCostDto {
    private Long id;
    private DisciplineType type;
    private Long hours;
    private List<ActivityDto> notAssignedActivities;
}
