package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.core.rupprojectscore.dto.MemberDto.dtoToModel;
import static com.core.rupprojectscore.dto.MemberDto.modelToDto;
import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository repository;

    public MemberDto createMember(MemberDto dto) {
        return modelToDto(repository.save(dtoToModel(dto)));
    }

    public List<MemberDto> openMembers() {
        return repository.findAll().stream().map(MemberDto::modelToDto).collect(toList());
    }

    public MemberDto openMember(Long id) {
        return repository.findById(id).map(MemberDto::modelToDto).orElse(null);
    }

    public MemberDto updateMember(MemberDto dto) {
        return modelToDto(repository.save(dtoToModel(dto)));
    }

    public void deleteMember(Long id) {
        repository.deleteById(id);
    }

}
