package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;
import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository repository;
    private final MapperFacade mapperFacade;

    public List<MemberDto> openMembers() {
        return toDto(repository.findAll());
    }

    public MemberDto createMember(MemberDto dto) {
        return toDto(repository.save(from(dto)));
    }

    public MemberDto updateMember(MemberDto dto) {
        return toDto(repository.save(from(dto)));
    }

    public void deleteMember(Long id) {
        repository.deleteById(id);
    }

    // TODO Could be extract this to MapperFacade as generics ??
    private MemberDto toDto(Member toMap) {
        return mapperFacade.map(toMap, MemberDto.class);
    }

    private Member from(MemberDto toMap) {
        return mapperFacade.map(toMap, Member.class);
    }

    private List<MemberDto> toDto(List<Member> listToMap) {
        return mapperFacade.mapList(listToMap, MemberDto.class);
    }

}
