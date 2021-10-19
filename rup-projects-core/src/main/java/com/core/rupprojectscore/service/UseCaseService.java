package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.UseCaseDto;
import com.core.rupprojectscore.repository.UseCaseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.core.rupprojectscore.dto.UseCaseDto.dtoToModel;
import static com.core.rupprojectscore.dto.UseCaseDto.modelToDto;
import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class UseCaseService {

    private final UseCaseRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    public UseCaseDto createUseCase(UseCaseDto dto) {
        return mapper.map(repository.save(dtoToModel(dto)), UseCaseDto.class);
    }

    public List<UseCaseDto> openUseCases() {
        return repository.findAll().stream().map(UseCaseDto::modelToDto).collect(toList());
    }

    public UseCaseDto openUseCase(Long id) {
        return repository.findById(id).map(UseCaseDto::modelToDto).orElse(null);
    }

    public UseCaseDto updateUseCase(UseCaseDto useCaseDto) {
        return modelToDto(repository.save(dtoToModel(useCaseDto)));
    }

    public void deleteUseCase(Long id) {
        repository.deleteById(id);
    }


    public void prioritizeUseCases(List<UseCaseDto> useCasesDto) {
        useCasesDto.stream().map(UseCaseDto::dtoToModel).forEach(repository::save);
    }
}
