package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.UseCaseDto;

import java.util.List;

public interface UseCaseService {
    UseCaseDto createUseCase(UseCaseDto dto);

    List<UseCaseDto> openUseCases();

    UseCaseDto openUseCase(Long id);

    UseCaseDto updateUseCase(UseCaseDto useCaseDto);

    void deleteUseCase(Long id);

    void prioritizeUseCases(List<UseCaseDto> useCasesDto);
}
