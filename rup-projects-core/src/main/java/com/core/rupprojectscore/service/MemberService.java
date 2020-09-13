package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    public List<MemberDto> openMembers() {
        return repository.findAll().stream()
                .map(member -> mapper.map(member, MemberDto.class))
                .collect(toList());
    }

    public MemberDto createMember(MemberDto memberDto) {
        return mapper.map(
                repository.save(mapper.map(memberDto, Member.class)), MemberDto.class
        );
    }

    public MemberDto updateMember(MemberDto dto) {
        return mapper.map(
                repository.save(mapper.map(dto, Member.class)), MemberDto.class
        );
    }

    public void deleteMember(Long id) {
        repository.deleteById(id);
    }
}
