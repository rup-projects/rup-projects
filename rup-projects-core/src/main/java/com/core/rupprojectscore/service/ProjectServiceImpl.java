package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.core.rupprojectscore.dto.ProjectDto.modelToDto;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    final private ProjectRepository repository;

    @Override
    public ProjectDto planProject(PlanProjectDto planProjectDto) {
        Project project = planProjectDto.createProject();
        repository.save(project);
        return modelToDto(project);
    }

    @Override
    public ProjectDto refreshProject(ProjectDto projectDto) {
        PlanProjectDto planProjectDto = new PlanProjectDto(projectDto.getStartDate(), projectDto.getEndDate(), projectDto.getCost(), projectDto.getNumberOfIterations());
        Project project = planProjectDto.createProject();
        repository.deleteById(projectDto.getId());
        repository.save(project);
        return modelToDto(project);
    }

    @Override
    public Optional<ProjectDto> startSystem() {
        List<Project> projects = repository.findAll();
        if (projects.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(modelToDto(projects.get(0)));
    }

    @Override
    public void deleteProject() {
        repository.deleteAll();
    }

}
