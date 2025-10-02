package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.exceptions.BadRequestException;
import com.core.rupprojectscore.repository.PhaseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhaseService {

    private final PhaseRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    public List<PhaseDto> openPhases() {
        return repository.findAll().stream().map(PhaseDto::modelToDto).collect(Collectors.toList());
    }

    public List<IterationDto> openIterations(Long phaseId) {
        Phase phase = repository.findById(phaseId).orElseThrow(() -> new BadRequestException("La phase no existe"));
        return phase.getIterations().stream().map(IterationDto::modelToDto).collect(Collectors.toList());
    }
}
