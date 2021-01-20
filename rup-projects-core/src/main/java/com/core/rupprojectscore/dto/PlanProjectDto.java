package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.entity.ProjectBuilder;
import com.core.rupprojectscore.exceptions.BadRequestException;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanProjectDto {

    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    @Min(0)
    private Long cost;
    @Min(ProjectBuilder.MINIMUM_NUMBER_OF_ITERATIONS)
    private Long numberOfIterations = 10L;

    public Project createProject() {
        ProjectBuilder projectBuilder = new ProjectBuilder();
        projectBuilder
                .dates(this.startDate, this.endDate)
                .numberOfIterations(this.numberOfIterations)
                .cost(this.cost);
        String error = projectBuilder.getError();
        if (error != null) {
            throw new BadRequestException(error);
        }
        return projectBuilder.build();
    }
}
