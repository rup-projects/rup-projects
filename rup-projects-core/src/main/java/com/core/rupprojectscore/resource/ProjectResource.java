package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "projects", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ProjectResource {

    private final ProjectService service;

    @GetMapping
    public List<ProjectDto> openProjects() {
        return this.service.openProjects();
    }

    @PostMapping
    public ProjectDto planProject(final @Valid @RequestBody PlanProjectDto dto) {
        return this.service.planProject(dto);
    }

    @PostMapping("/planned")
    public ProjectDto prePlanProject(@Valid @RequestBody PlanProjectDto dto) {
        return this.service.prePlanProject(dto);
    }

    @DeleteMapping()
    public void deleteProject() {
        this.service.deleteProject();
    }
}
