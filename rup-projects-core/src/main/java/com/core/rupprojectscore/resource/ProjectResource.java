package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.PlanProjectDto;
import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.exceptions.NotFoundException;
import com.core.rupprojectscore.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(value = "projects", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ProjectResource {

    private final ProjectService service;

    @GetMapping("/opened")
    public ProjectDto startSystem() {
        Optional<ProjectDto> projectDto = this.service.startSystem();
        if (projectDto.isEmpty()) {
            return null;
        }
        return projectDto.get();
    }

    @PostMapping
    public ProjectDto planProject(final @Valid @RequestBody PlanProjectDto dto) {
        return this.service.planProject(dto);
    }

    @PostMapping("/refresh")
    public ProjectDto refreshProject(final @Valid @RequestBody ProjectDto dto) {
        return this.service.refreshProject(dto);
    }

    @DeleteMapping()
    public void deleteProject() {
        this.service.deleteProject();
    }

}
