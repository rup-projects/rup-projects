package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

public class ProjectServiceTest {

    private ProjectService projectService;
    private MemberRepository repository;
    private ProjectDto project;
    private ProjectDto projectDto;

    @BeforeEach
    public void before() {
        projectService = new ProjectServiceImpl(new Mapper());
    }

    @Test
    void planProjectTest_having_defaultNumberOfIterations() {
        project = createProjectDto(LocalDate.of(1, 1, 1), LocalDate.of(1, 6, 30), cost(100000L));
        projectDto = projectService.planProject(project);
        assertProject(PhaseType.values(), iterations(10));
        assertPhases(
                List.of(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                List.of(3, LocalDate.of(1, 1, 19), LocalDate.of(1, 3, 13)),
                List.of(5, LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(1, LocalDate.of(1, 6, 12), LocalDate.of(1, 6, 29))
        );
        assertIterations(
                List.of(LocalDate.of(1, 1, 1), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 1, 19), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 1, 19), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 1, 19), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11))
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
        assertThat(projectDto.getPhases().size()).isEqualTo(phaseTypes.length);
        assertThat(projectDto.getIterations().size()).isEqualTo(iterations);
    }

    private void assertPhases(List<? extends Serializable>... expectedPhases) {
        for (PhaseType phaseType : PhaseType.values()) {
            assertPhase(projectDto, phaseType, expectedPhases[phaseType.ordinal()]);
        }
    }

    private void assertPhase(ProjectDto projectDto, PhaseType phaseType, List<? extends Serializable> expectedPhaseInformation) {
        PhaseDto phase = getPhase(projectDto, phaseType);
        assertThat(phase.getIterations().size()).isEqualTo((int) expectedPhaseInformation.get(0));
        assertThat(phase.getStartDate()).isEqualTo(expectedPhaseInformation.get(1));
        assertThat(phase.getEndDate()).isEqualTo(expectedPhaseInformation.get(2));
    }

    private PhaseDto getPhase(ProjectDto projectDto, PhaseType phaseType) {
        return projectDto.getPhases().stream()
                .filter(phaseDto -> phaseType.equals(phaseDto.getType()))
                .findFirst()
                .orElse(null);
    }

    private void assertIterations(List<? extends Serializable>... expectedIterations) {
        for (List expectedIterationInfo : expectedIterations) {
            assertIteration(projectDto, expectedIterationInfo);
        }
    }

    private void assertIteration(ProjectDto projectDto, List expectedIterationInfo) {
        assertThat(projectDto.getIterations()
                .stream()
                .anyMatch(iteration -> expectedIterationInfo.get(0)
                        .equals(iteration.getStartDate()) && expectedIterationInfo.get(1)
                        .equals(iteration.getEndDate()))).isTrue();

    }

    private long cost(long cost) {
        return cost;
    }

    private int iterations(int iterations) {
        return iterations;
    }

}
