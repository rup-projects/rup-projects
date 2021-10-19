package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.core.rupprojectscore.dto.ProjectDto.modelToDto;

@Service
@RequiredArgsConstructor
public class ProjectService {

    final private ProjectRepository repository;

    public List<ProjectDto> openProjects() {
    return repository.findAll().stream().map(ProjectDto::modelToDto).collect(Collectors.toList());
    }

    public ProjectDto prePlanProject(PlanProjectDto dto) {
        Project project = dto.createProject();
        return modelToDto(project);
    }

    public ProjectDto planProject(PlanProjectDto planProjectDto) {
        Project project = planProjectDto.createProject();
        repository.save(project);
        return modelToDto(project);
    }

    public void deleteProject() {
        repository.deleteAll();
    }

}
