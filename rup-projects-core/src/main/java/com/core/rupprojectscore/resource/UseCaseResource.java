package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.UseCaseDto;
import com.core.rupprojectscore.service.UseCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(value = UseCaseResource.USE_CASES_ENDPOINT, produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UseCaseResource {

    public static final String USE_CASES_ENDPOINT = "use_cases";

    private final UseCaseService service;

    @PostMapping
    public ResponseEntity<UseCaseDto> createUseCase(final @RequestBody UseCaseDto dto) {
        return ResponseEntity.ok(this.service.createUseCase(dto));
    }

    @GetMapping
    public List<UseCaseDto> openUseCases() {
        return this.service.openUseCases();
    }

    @PutMapping("{id}")
    public void updateUseCase(final @PathVariable("id") Long id, final @RequestBody UseCaseDto dto) {
        dto.setId(id);
        service.updateUseCase(dto);
    }

    @PutMapping()
    public ResponseEntity prioritizeUseCases(final @RequestBody List<UseCaseDto> useCasesDto) {
        service.prioritizeUseCases(useCasesDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        this.service.deleteUseCase(id);
    }

}


