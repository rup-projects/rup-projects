package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PhaseType;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.entity.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    final private Mapper mapper;

    @Override
    public ProjectDto planProject(ProjectDto dto) {
        Project project = Project.builder().build();

        calculateProjectIterationSize(dto);

        List<Iteration> iterations = createIterations(dto);

        createPhases(project, iterations);


        project.addPhase(Phase.builder()
                .type(PhaseType.Init)
                .iterations(iterations.subList(0, 2))
                .build());

        project.addPhase(Phase.builder()
                .type(PhaseType.Elaboration)
                .iterations(iterations.subList(3, 6))
                .build());
        project.addPhase(Phase.builder()
                .type(PhaseType.Construction)
                .iterations(iterations.subList(7, 10))
                .build());
        project.addPhase(Phase.builder()
                .type(PhaseType.Transition)
                .iterations(iterations.subList(11, 12))
                .build());

        ProjectDto map = mapper.map(project, ProjectDto.class);

        return map;
    }

    private void createPhases(Project project, List<Iteration> iterations) {
        createInitialPhase(project, iterations);
//        createInitialPhase();
//        createInitialPhase();
//        createInitialPhase();
    }

    private void createInitialPhase(Project project, List<Iteration> iterations) {
        project.addPhase(
                Phase.builder()
                        .type(PhaseType.Init)
                        .iterations(Arrays.asList(iterations.get(0)))
                        .build()
        );
    }

    private void calculateProjectIterationSize(ProjectDto projectDto) {
        Duration duration = Duration.between(projectDto.getStartDate().atTime(0, 0), projectDto.getEndDate().atTime(0, 0));
        long iterationDuration = duration.toDays() / projectDto.getNumberOfIterations();
        projectDto.setIterationSize(iterationDuration);
    }

    private List<Iteration> createIterations(ProjectDto dto) {
        List<Iteration> result = new ArrayList<>();
        for (LocalDate index = dto.getStartDate(); index.isBefore(dto.getEndDate()); index = index.plusDays(dto.getIterationSize())) {
            result.add(Iteration.builder()
                    .startDate(index)
                    .endDate(index.plusDays(dto.getIterationSize()))
                    .build());
        }
        return result;
    }

    @Override
    public ProjectDto startSystem() {
        return null;
    }
}
