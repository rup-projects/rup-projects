package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    final private Mapper mapper;
    final private ProjectRepository projectRepository;

    @Override
    public ProjectDto planProject(ProjectDto dto) {
        assert dto.getNumberOfIterations() >= 10
                && dto.getNumberOfIterations() % 10 == 0
                && !isExceedsProjectEndDate(dto);
        if (nonNull(dto.getId())) {
            projectRepository.deleteById(dto.getId());
        }
        Project project = createProject(dto);
        projectRepository.save(project);
        return mapper.map(project, ProjectDto.class);
    }

    @Override
    public Optional<ProjectDto> startSystem() {
        List<Project> projects = projectRepository.findAll();
        if (projects.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(mapper.map(projects.get(0), ProjectDto.class));
    }

    private boolean isExceedsProjectEndDate(ProjectDto dto) {
        return dto.getStartDate().plusDays(dto.getNumberOfIterations() * Iteration.MINIMUM_ITERATION_SIZE).isAfter(dto.getEndDate());
    }

    private Project createProject(ProjectDto dto) {
        Project project = Project.builder().build();
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setIterationSize(calculateProjectIterationSize(project, dto.getNumberOfIterations()));
        createPhases(project, dto);
        return project;
    }

    private Long calculateProjectIterationSize(Project project, Long numberOfIterations) {
        Duration projectDuration = Duration.between(project.getStartDate().atTime(0, 0), project.getEndDate().atTime(0, 0));
        return projectDuration.toDays() / numberOfIterations + 1;
    }

    private void createPhases(Project project, ProjectDto dto) {
        List<Iteration> iterations = createIterations(project, dto);
        for (PhaseType phaseType : PhaseType.values())
            createPhase(project, iterations, phaseType);
    }

    private List<Iteration> createIterations(Project project, ProjectDto dto) {
        List<Iteration> result = new ArrayList<>();
        for (LocalDate index = project.getStartDate();
             index.plusDays(project.getIterationSize()).isBefore(project.getEndDate());
             index = index.plusDays(project.getIterationSize())) {
            result.add(Iteration.builder()
                    .startDate(index)
                    .endDate(index.plusDays(project.getIterationSize() - 1))
                    .build());
        }
        Iteration lastGeneratedIteration = result.get(dto.getNumberOfIterations().intValue() - 2);
        result.add(Iteration.builder().startDate(lastGeneratedIteration.getEndDate().plusDays(1)).endDate(project.getEndDate()).build());
        return result;
    }

    private void createPhase(Project project, List<Iteration> iterations, PhaseType phaseType) {
        Integer numberOfIterations = Math.toIntExact(Math.round(iterations.size() * phaseType.getPercentage()));
        project.addPhase(
                Phase.builder()
                        .type(phaseType)
                        .iterations(iterations.subList(project.getNumberOfIterations(), project.getNumberOfIterations() + numberOfIterations))
                        .build()
        );
    }
}
