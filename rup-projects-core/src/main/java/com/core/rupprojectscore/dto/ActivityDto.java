package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Activity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityDto {

    private Long id;
    private String description;
    private Long hours;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDateTime;

    public static ActivityDto modelToDto(Activity activity) {
        return new ModelMapper().map(activity, ActivityDto.class);
    }

    public static Activity dtoToModel(ActivityDto dto) {
        return new ModelMapper().map(dto, Activity.class);
    }

}
