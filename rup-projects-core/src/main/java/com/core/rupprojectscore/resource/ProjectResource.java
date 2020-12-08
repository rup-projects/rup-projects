package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.ProjectDto;
import com.core.rupprojectscore.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "projects", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ProjectResource {

    private final ProjectService service;

    @GetMapping
    public ProjectDto startSystem() {
        Optional<ProjectDto> projectDto = service.startSystem();
        if (projectDto.isEmpty()) {
            //todo project not created return or status 404 or 204 o exception o null Object DTO ?
            return null;
        }
        return projectDto.get();
    }

    @PostMapping
    public ProjectDto planProject(final @RequestBody ProjectDto dto) {
        return service.planProject(dto);
    }

}
