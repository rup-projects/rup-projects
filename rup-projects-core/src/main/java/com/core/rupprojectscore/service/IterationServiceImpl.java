package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.repository.IterationRepository;
import com.core.rupprojectscore.repository.PhaseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IterationServiceImpl implements IterationService {

    private final IterationRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    @Override
    public List<IterationDto> openIterations() {
        return repository.findAll().stream().map(iteration ->
                mapper.map(iteration, IterationDto.class)).collect(Collectors.toList());
    }

    @Override
    public IterationDto openIteration(Long id) {
        return repository.findById(id).map(iteration -> mapper.map(iteration, IterationDto.class)).get();
    }
}
