package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.ProjectDto;

public interface ProjectService {
    ProjectDto planProject(ProjectDto dto);

    ProjectDto startSystem();

}
