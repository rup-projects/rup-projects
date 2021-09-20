package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;

import java.util.List;

public interface ProjectService {

    List<ProjectDto> openProjects();

    ProjectDto prePlanProject(PlanProjectDto dto);

    ProjectDto planProject(PlanProjectDto dto);

    void deleteProject();
}
