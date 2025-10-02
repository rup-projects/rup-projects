package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.UseCaseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class UseCaseServiceTest {

    @Autowired
    private UseCaseService service;

    @Test
    void createUseCase() {
        // Arrangement
        UseCaseDto toCreate = UseCaseDto.builder()
                .name("usecase")
                .description("description")
                .build();

        // Actions
        UseCaseDto result = service.createUseCase(toCreate);

        // Asserts
        assertThat(result.getId()).isNotNull();
        assertThat(result.getName()).isEqualTo("usecase");
        assertThat(result.getDescription()).isEqualTo("description");
        assertThat(result.getId()).isGreaterThan(0);
    }
}
