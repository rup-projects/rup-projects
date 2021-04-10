package com.core.rupprojectscore.service;

import com.core.rupprojectscore.dto.MemberDto;

import java.util.List;

public interface MemberService {

    MemberDto createMember(MemberDto dto);

    List<MemberDto> openMembers();

    MemberDto openMember(Long id);

    MemberDto updateMember(MemberDto memberDto);

    void deleteMember(Long id);
}
