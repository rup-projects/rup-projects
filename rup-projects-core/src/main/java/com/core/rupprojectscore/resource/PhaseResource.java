package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.IterationDto;
import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.service.PhaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "phases", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PhaseResource {

    private final PhaseService service;

    @GetMapping
    public List<PhaseDto> openPhases() {
        return service.openPhases();
    }

    @GetMapping("/{id}/iterations")
    public List<IterationDto> openIterations(@PathVariable("id") Long id) {
        return service.openIterations(id);
    }

}
