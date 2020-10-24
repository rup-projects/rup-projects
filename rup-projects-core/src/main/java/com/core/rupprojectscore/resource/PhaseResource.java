package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.PhaseDto;
import com.core.rupprojectscore.service.PhaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "phases", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PhaseResource {

    private final PhaseService service;

    @PostMapping
    public List<PhaseDto> planProject() {
        return service.openPhases();
    }

}
