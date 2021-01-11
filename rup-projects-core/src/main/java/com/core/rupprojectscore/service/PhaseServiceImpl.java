package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.repository.PhaseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhaseServiceImpl implements PhaseService {

    private final PhaseRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    @Override
    public List<PhaseDto> openPhases() {
        return repository.findAll().stream().map(phase ->
                mapper.map
                        (phase, PhaseDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<IterationDto> openIterations(Long phaseId) {
        Optional<Phase> phase = repository.findById(phaseId);
        return phase.get().getIterations().stream().map(iteration -> mapper.map(iteration, IterationDto.class))
                .collect(Collectors.toList());
    }

}
