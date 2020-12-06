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

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    final private Mapper mapper;
    final private ProjectRepository projectRepository;

    @Override
    public ProjectDto planProject(ProjectDto dto) {
        if (nonNull(dto.getId())) {
            projectRepository.deleteById(dto.getId());
        }
        Project project = initProject(dto);
        projectRepository.save(project);
        return mapper.map(project, ProjectDto.class);
    }

    @Override
    public ProjectDto startSystem() {
        return null;
    }

    private Project initProject(ProjectDto dto) {
        Project project = Project.builder().build();
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setIterationSize(calculateProjectIterationSize(project, dto.getNumberOfIterations()));
        initPhases(project);
        return project;
    }

    private long calculateProjectIterationSize(Project project, long numberOfIterations) {
        Duration projectDuration = Duration.between(project.getStartDate().atTime(0, 0), project.getEndDate()
                .atTime(0, 0));
        return projectDuration.toDays() / numberOfIterations;
    }

    private void initPhases(Project project) {
        List<Iteration> iterations = createIterations(project);
        createPhase(project, iterations, PhaseType.Init);
        createPhase(project, iterations, PhaseType.Elaboration);
        createPhase(project, iterations, PhaseType.Construction);
        createPhase(project, iterations, PhaseType.Transition);
    }

    private List<Iteration> createIterations(Project project) {
        List<Iteration> result = new ArrayList<>();
        for (LocalDate index = project.getStartDate(); index.isBefore(project.getEndDate()); index = index.plusDays(project.getIterationSize())) {
            result.add(Iteration.builder()
                    .startDate(index)
                    .endDate(index.plusDays(project.getIterationSize() - 1))
                    .build());
        }
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
