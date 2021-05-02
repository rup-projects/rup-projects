package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.entity.ProjectBuilder;
import com.core.rupprojectscore.exceptions.BadRequestException;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanProjectDto {

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime startDate;
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime endDate;
    @Min(0)
    private Long cost;
    @Min(ProjectBuilder.MIN_ITERATIONS)
    private Long numberOfIterations = 10L;

    public Project createProject() {
        ProjectBuilder projectBuilder = new ProjectBuilder();
        projectBuilder.dates(this.startDate, this.endDate).numberOfIterations(this.numberOfIterations).cost(this.cost);
        String error = projectBuilder.getError();
        if (error != null) {
            throw new BadRequestException(error);
        }
        return projectBuilder.build();
    }
}
