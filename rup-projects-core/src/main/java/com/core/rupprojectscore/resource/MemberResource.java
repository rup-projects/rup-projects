package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.service.MembersCrudService;
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
@RequestMapping(value = "members", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class MemberResource {

    private final MembersCrudService service;

    @GetMapping
    public ResponseEntity<List<MemberDto>> openMembers() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<MemberDto> createMember(final @RequestBody MemberDto dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("{id}")
    public ResponseEntity<MemberDto> updateMember(final @PathVariable("id") Long id,
                                                  final @RequestBody MemberDto dto) {
        dto.setId(id);
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMember(final @PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
