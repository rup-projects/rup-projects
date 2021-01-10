package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.service.IterationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "iterations", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class IterationResource {

    private final IterationService service;

    @GetMapping
    public List<IterationDto> openIterations() {
        return service.openIterations();
    }

    @GetMapping("phase/{id}")
    public List<IterationDto> openIteration(final @PathVariable("id") Long id) {
        return service.openIterationByPhase(id);
    }

}
