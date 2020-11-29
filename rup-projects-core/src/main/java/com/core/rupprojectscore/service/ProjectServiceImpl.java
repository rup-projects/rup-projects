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

        ProjectDto map = mapper.map(project, ProjectDto.class);

        return map;
    }

    private void createPhases(Project project, List<Iteration> iterations) {
        createPhase(project, iterations, PhaseType.Init);
        createPhase(project, iterations, PhaseType.Elaboration);
        createPhase(project, iterations, PhaseType.Construction);
        createPhase(project, iterations, PhaseType.Transition);
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

//        private void createPhases(Project project) {
//
//           Integer numberOfIterations = Math.toIntExact(Math.round(iterations.size() * phaseType.getPercentage()));
//            project.addPhase(
//                    Phase.builder()
//                            .type(phaseType)
//                            .iterations(iterations.subList(0, numberOfIterations))
//                            .build()
//            );
//        }


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
                    .endDate(index.plusDays(dto.getIterationSize() - 1))
                    .build());
        }
        return result;
    }

    @Override
    public ProjectDto startSystem() {
        return null;
    }
}
