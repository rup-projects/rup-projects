package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.MemberRole;
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
public class IterationDto {
    private Long id;
    private String number;
    private GregorianCalendar start;
    private GregorianCalendar end;
    private Integer duration;
}