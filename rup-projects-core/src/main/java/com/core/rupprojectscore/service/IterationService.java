package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;

import java.util.List;

public interface IterationService {
    List<IterationDto> openIterations();

    IterationDto openIteration(Long id);
}
