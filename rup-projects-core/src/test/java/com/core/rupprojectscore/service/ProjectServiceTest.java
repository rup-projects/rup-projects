package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.repository.MemberRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class ProjectServiceTest {

    private ProjectService sut = new ProjectServiceImpl(
            new Mapper()
    );

    private MemberRepository repository;

    @Test
    void planProjectTest_having_defaultNumberOfIterations() {
        // Arrangement
        ProjectDto project = ProjectDto.builder()
                .startDate(LocalDate.of(1, 1, 1))
                .endDate(LocalDate.of(1, 6, 30))
                .cost(100000L)
                .build();

        // Actions
        ProjectDto projectDto = sut.planProject(project);

        // Asserts
        assertThat(projectDto).isNotNull();
        assertThat(projectDto.getPhases().size()).isEqualTo(4);
        assertThat(projectDto.getIterations().size()).isEqualTo(10);
    }

//    @Test
//    void planProjectTest_havingNumberOfIterations() {
//        // Arrangement
//        ProjectDto project = ProjectDto.builder()
//                .startDate(LocalDate.of(1, 1, 1))
//                .endDate(LocalDate.of(1, 6, 30))
//                .numberOfIterations(12L)
//                .cost(100000L)
//                .build();
//
//        // Actions
//        ProjectDto projectDto = sut.planProject(project);
//
//        // Asserts
//        assertThat(projectDto).isNotNull();
//        assertThat(projectDto.getPhases().size()).isEqualTo(4);
//        assertThat(projectDto.getIterations().size()).isEqualTo(12);
//
//    }

}
