package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ProjectDto;

import java.util.Optional;

public interface ProjectService {
    ProjectDto planProject(ProjectDto dto);

    Optional<ProjectDto> startSystem();

}
