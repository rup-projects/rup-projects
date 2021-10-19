package com.core.rupprojectscore.resource;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

    private final MemberService service;

    @GetMapping
    public List<MemberDto> openMembers() {
        return service.openMembers();
    }

    @GetMapping("/{id}")
    public MemberDto openMember(@PathVariable Long id) {
        return service.openMember(id);
    }

    @PostMapping
    public MemberDto createMember(final @RequestBody MemberDto dto) {
        return service.createMember(dto);
    }

    @PutMapping("{id}")
    public MemberDto updateMember(final @PathVariable("id") Long id,
                                  final @RequestBody MemberDto dto) {
        dto.setId(id);
        return service.updateMember(dto);
    }

    @DeleteMapping("{id}")
    public void deleteMember(final @PathVariable("id") Long id) {
        service.deleteMember(id);
    }

}
