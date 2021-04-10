package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Member;
import com.core.rupprojectscore.entity.MemberRole;
import com.core.rupprojectscore.entity.UseCase;
import com.core.rupprojectscore.service.Mapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private Long id;
    private String name;
    private String surName;
    private String email;
    private MemberRole role;

    public static MemberDto modelToDto(Member member) {
        return new Mapper().map(member, MemberDto.class);
    }

    public static Member dtoToModel(MemberDto dto) {
        return new Mapper().map(dto, Member.class);
    }

}
