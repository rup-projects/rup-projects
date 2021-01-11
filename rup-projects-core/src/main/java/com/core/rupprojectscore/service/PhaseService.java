package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;

import java.util.List;

public interface PhaseService {
    List<PhaseDto> openPhases();

    List<IterationDto> openIterations(Long phaseId);
}
