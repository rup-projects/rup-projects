package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.UseCaseDto;
import com.core.rupprojectscore.entity.UseCase;
import com.core.rupprojectscore.repository.UseCaseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class UseCaseServiceImpl implements UseCaseService {

    private final UseCaseRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    public UseCaseDto createUseCase(UseCaseDto dto) {
        return mapper.map(repository.save(mapper.map(dto, UseCase.class)), UseCaseDto.class);
    }

    public List<UseCaseDto> openUseCases() {
        return repository.findAll().stream()
                .map(useCase -> mapper.map(useCase, UseCaseDto.class))
                .collect(toList());
    }

    public UseCaseDto updateUseCase(UseCaseDto useCaseDto) {
        return mapper.map(repository.save(mapper.map(useCaseDto, UseCase.class)), UseCaseDto.class);
    }

    public void deleteUseCase(Long id) {
        repository.deleteById(id);
    }


    public void prioritizeUseCases(List<UseCaseDto> useCasesDto) {
        useCasesDto.stream()
                .map(useCaseDto -> mapper.map(useCaseDto, UseCase.class))
                .forEach(repository::save);
    }
}
