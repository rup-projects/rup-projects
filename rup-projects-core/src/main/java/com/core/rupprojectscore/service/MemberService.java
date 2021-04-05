package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.dto.UseCaseDto;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository repository;
    private final Mapper mapper;

    public List<MemberDto> openMembers() {
        return toDto(repository.findAll());
    }

    public MemberDto createMember(MemberDto dto) {
        return toDto(repository.save(toModel(dto)));
    }

    public MemberDto updateMember(MemberDto dto) {
        return toDto(repository.save(toModel(dto)));
    }

    public void deleteMember(Long id) {
        repository.deleteById(id);
    }

    // TODO Could be extract this to MapperFacade as generics ??
    private MemberDto toDto(Member member) {
        return mapper.map(member, MemberDto.class);
    }

    private Member toModel(MemberDto dto) {
        return mapper.map(dto, Member.class);
    }

    private List<MemberDto> toDto(List<Member> memberList) {
        return mapper.mapList(memberList, MemberDto.class);
    }

    public MemberDto openMember(Long id) {
        return repository.findById(id).map(member -> mapper.map(member, MemberDto.class)).orElse(null);
    }
}
