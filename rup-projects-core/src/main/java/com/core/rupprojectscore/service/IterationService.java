package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.RealizationDto;

import java.util.List;

public interface IterationService {
    List<IterationDto> openIterations();

    IterationDto openIteration(Long id);

    void splitNotAssignedCost(Long id, Long notAssignedCostId);

    void mergeNotAssignedActivity(Long id, Long notAssignedCostId, Long notAssignedActivityId);

    IterationDto updateIteration(IterationDto dto);

    List<RealizationDto> getRealizations(Long iterationId);
}
