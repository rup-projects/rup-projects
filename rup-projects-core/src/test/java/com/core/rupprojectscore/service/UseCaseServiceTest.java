package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.UseCaseDto;
import com.core.rupprojectscore.repository.UseCaseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UseCaseServiceTest {

    @Autowired
    private UseCaseService service;
    @Autowired
    private UseCaseRepository repository;

    @Test
    void createUseCase() {
        // Arrangement
        UseCaseDto usecaseDto = UseCaseDto.builder()
                .name("usecase")
                .description("description")
                .build();

        // Actions
        UseCaseDto useCaseDto = service.createUseCase(usecaseDto);

        // Asserts
        assertThat(usecaseDto.getId()).isNotNull();
        assertThat(usecaseDto.getName()).isEqualTo("usecase");
        assertThat(usecaseDto.getDescription()).isEqualTo("description");
        assertThat(usecaseDto.getId()).isGreaterThan(0);
    }
}