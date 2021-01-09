package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.repository.PhaseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
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

}
