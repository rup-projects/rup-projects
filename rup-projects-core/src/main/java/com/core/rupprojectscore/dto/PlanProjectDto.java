package com.core.rupprojectscore.dto;

import com.core.rupprojectscore.entity.Iteration;
import com.core.rupprojectscore.entity.Phase;
import com.core.rupprojectscore.entity.Project;
import com.core.rupprojectscore.entity.ProjectBuilder;
import com.core.rupprojectscore.exceptions.BadRequestException;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProjectDto {

    @NotNull
    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    @Min(0)
    private Long cost;
    @Builder.Default
    private Long numberOfIterations = 10L;

    public Project createProject() {
        ProjectBuilder projectBuilder = new ProjectBuilder();
        projectBuilder
                .dates(this.getStartDate(), this.getEndDate())
                .numberOfIterations(this.numberOfIterations)
                .cost(this.getCost());
        String error = projectBuilder.getError();
        if (error != null) {
            throw new BadRequestException(error);
        }
        return projectBuilder.build();
    }

    public boolean isValid() {
        return false;
    }
}
