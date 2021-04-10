package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;

import java.util.Optional;

public interface ProjectService {

    ProjectDto planProject(PlanProjectDto dto);

    ProjectDto refreshProject(ProjectDto dto);

    Optional<ProjectDto> startSystem();

    void deleteProject();
}
