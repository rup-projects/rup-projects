package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class ProjectServiceTest {

    private ProjectService sut;
    private MemberRepository repository;
    private ProjectDto project;
    private ProjectDto projectDto;

    @BeforeEach
    public void before() {
        sut = new ProjectServiceImpl(new Mapper());
    }

    @Test
    void planProjectTest_having_defaultNumberOfIterations() {
        project = createProjectDto(LocalDate.of(1, 1, 1), LocalDate.of(1, 6, 30), cost(100000L));
        projectDto = sut.planProject(project);
        assertProject(PhaseType.values(), iterations(10));
        assertPhases(
                Arrays.asList(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                Arrays.asList(3, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                Arrays.asList(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                Arrays.asList(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18))
        );
    }

    private ProjectDto createProjectDto(LocalDate start, LocalDate end, long cost) {
        return ProjectDto.builder()
                .startDate(LocalDate.of(1, 1, 1))
                .endDate(LocalDate.of(1, 6, 30))
                .cost(100000L)
                .build();
    }

    public void assertProject(PhaseType[] phaseTypes, int iterations) {
        assertThat(projectDto).isNotNull();
        assertThat(projectDto.getPhases().size()).isEqualTo(phaseTypes.length);
        assertThat(projectDto.getIterations().size()).isEqualTo(iterations);
        assertThat(projectDto.getPhases().stream().map(PhaseDto::getType).collect(Collectors.toList()))
                .isEqualTo(Arrays.asList(PhaseType.Init, PhaseType.Elaboration, PhaseType.Construction, PhaseType.Transition));
    }

    private void assertPhases(List<? extends Serializable>... expecteds) {
        for (PhaseType phaseType : PhaseType.values()) {
            assertPhase(projectDto, expecteds[phaseType.ordinal()]);
        }
    }

    private void assertPhase(ProjectDto projectDto, List<? extends Serializable> expected) {
        assertThat(getPhase(projectDto, PhaseType.Init).getIterations().size()).isEqualTo((int) expected.get(0));
        assertThat(getPhase(projectDto, PhaseType.Init).getStartDate()).isEqualTo(LocalDate.of(1, 1, 1));
        assertThat(getPhase(projectDto, PhaseType.Init).getEndDate()).isEqualTo(LocalDate.of(1, 1, 18));
    }

    private PhaseDto getPhase(ProjectDto projectDto, PhaseType phaseType) {
        return projectDto.getPhases().stream()
                .filter(phaseDto -> phaseType.equals(phaseDto.getType()))
                .findFirst()
                .orElse(null);
    }

    private long cost(long cost) {
        return cost;
    }

    private int iterations(int iterations) {
        return iterations;
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
