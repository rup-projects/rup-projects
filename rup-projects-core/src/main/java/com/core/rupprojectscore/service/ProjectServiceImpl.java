package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.exceptions.NotFoundException;
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
        if (!repository.findAll().isEmpty()) {
            repository.deleteAll();
        }
        repository.save(project);
        return modelToDto(project);
    }

    @Override
    public ProjectDto startSystem() {
        List<Project> projects = repository.findAll();
        if (projects.isEmpty()) {
            throw new NotFoundException("Created project not found");
        }
        return modelToDto(projects.get(0));
    }

    @Override
    public void deleteProject() {
        repository.deleteAll();
    }

}
