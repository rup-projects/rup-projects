package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository repository;
    private final ModelMapper mapper = new ModelMapper();

    public List<MemberDto> openMembers() {
        return mapper.map(repository.findAll(), new TypeToken<List<MemberDto>>() {
        }.getType());
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
