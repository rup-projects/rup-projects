package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.repository.MemberRepository;
import com.core.rupprojectscore.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class ProjectServiceTest {

    private ProjectService projectService;
    private MemberRepository repository;
    private ProjectDto project;
    private ProjectDto projectDto;
    private ProjectRepository projectRepository = mock(ProjectRepository.class);

    @BeforeEach
    public void before() {
        projectService = new ProjectServiceImpl(new Mapper(),projectRepository);
    }

    @Test
    void planProjectTest_having_defaultNumberOfIterations() {
        project = createProjectDto(LocalDate.of(1, 1, 1), LocalDate.of(1, 6, 30), cost(100000L));
        projectDto = projectService.planProject(project);
        verify(projectRepository,times(1)).save(any());
        assertProject(PhaseType.values(), iterations(10));
        assertPhases(
                List.of(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                List.of(3, LocalDate.of(1, 1, 19), LocalDate.of(1, 3, 13)),
                List.of(5, LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(1, LocalDate.of(1, 6, 12), LocalDate.of(1, 6, 29))
        );
        assertIterations(
                List.of(LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                List.of(LocalDate.of(1, 1, 19), LocalDate.of(1, 2, 5)),
                List.of(LocalDate.of(1, 2, 6), LocalDate.of(1, 2, 23)),
                List.of(LocalDate.of(1, 2, 24), LocalDate.of(1, 3, 13)),
                List.of(LocalDate.of(1, 3, 14), LocalDate.of(1, 3, 31)),
                List.of(LocalDate.of(1, 4, 1), LocalDate.of(1, 4, 18)),
                List.of(LocalDate.of(1, 4, 19), LocalDate.of(1, 5, 6)),
                List.of(LocalDate.of(1, 5, 7), LocalDate.of(1, 5, 24)),
                List.of(LocalDate.of(1, 5, 25), LocalDate.of(1, 6, 11)),
                List.of(LocalDate.of(1, 6, 12), LocalDate.of(1, 6, 29))
        );
    }

    @Test
    void planProjectTest_having_5NumberIterations_and_id_then_itCreates5IterationsAndRemovePrevious() {
        project = createProjectDto(
                LocalDate.of(1, 1, 1),
                LocalDate.of(1, 6, 30),
                cost(100000L));
        project.setNumberOfIterations(5L);
        project.setId(5L);

        projectDto = projectService.planProject(project);
        verify(projectRepository, times(1)).save(any());
        assertProject(PhaseType.values(), iterations(10));
        assertPhases(
                List.of(1, LocalDate.of(1, 1, 1), LocalDate.of(1, 1, 18)),
                List.of(2, LocalDate.of(1, 1, 19), LocalDate.of(1, 3, 13)),
                List.of(1, LocalDate.of(1, 3, 14), LocalDate.of(1, 6, 11)),
                List.of(1, LocalDate.of(1, 6, 12), LocalDate.of(1, 6, 29))
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
        for (IterationDto iteration : projectDto.getIterations()) {
            assertIteration(iteration, expectedIterations);
        }
    }

    private void assertIteration(IterationDto iteration, List<? extends Serializable>[] expectedIterationInfo) {
        assertThat(Arrays.asList(iteration.getStartDate(), iteration.getEndDate())).isIn(expectedIterationInfo);
    }


    private boolean isIn(List<? extends Serializable> expected, IterationDto iteration) {
        return expected.get(0).equals(iteration.getStartDate())
                && expected.get(1).equals(iteration.getEndDate());
    }

    private long cost(long cost) {
        return cost;
    }

    private int iterations(int iterations) {
        return iterations;
    }

}
