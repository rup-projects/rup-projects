package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    final private ProjectRepository repository;

    @Override
    public ProjectDto planProject(ProjectDto projectDto) {
        projectDto.checkProjectDto();
        if (projectDto.hasId() && repository.existsById(projectDto.getId())) {
            repository.deleteById(projectDto.getId());
        }
        Project project = projectDto.createProject();
        repository.save(project);
        return ProjectDto.create(project);
    }

    @Override
    public Optional<ProjectDto> startSystem() {
        List<Project> projects = repository.findAll();
        if (projects.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(ProjectDto.create(projects.get(0)));
    }

    @Override
    public void deleteProject() {
        repository.deleteAll();
    }

}
