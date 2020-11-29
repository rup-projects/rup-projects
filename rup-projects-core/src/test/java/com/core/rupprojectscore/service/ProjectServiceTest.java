package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.repository.MemberRepository;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.stream.Collectors;

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
        assertThat(projectDto.getPhases().stream().map(PhaseDto::getType).collect(Collectors.toList()))
                .isEqualTo(Arrays.asList(PhaseType.Init, PhaseType.Elaboration, PhaseType.Construction, PhaseType.Transition));

        // Initial phase
        assertThat(getPhase(projectDto, PhaseType.Init).getIterations().size()).isEqualTo(1);
        assertThat(getPhase(projectDto, PhaseType.Init).getStartDate()).isEqualTo(LocalDate.of(1, 1, 1));
        assertThat(getPhase(projectDto, PhaseType.Init).getEndDate()).isEqualTo(LocalDate.of(1, 1, 18));

        // Elaboration phase
        assertThat(getPhase(projectDto, PhaseType.Elaboration).getIterations().size()).isEqualTo(3);
        assertThat(getPhase(projectDto, PhaseType.Elaboration).getStartDate()).isEqualTo(LocalDate.of(1, 1, 19));
        assertThat(getPhase(projectDto, PhaseType.Elaboration).getEndDate()).isEqualTo(LocalDate.of(1, 1, 19).plusDays(3 * 18 - 1));

    }

    private PhaseDto getPhase(ProjectDto projectDto, PhaseType phaseType) {
        return projectDto.getPhases().stream()
                .filter(phaseDto -> phaseType.equals(phaseDto.getType()))
                .findFirst()
                .orElse(null);
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
