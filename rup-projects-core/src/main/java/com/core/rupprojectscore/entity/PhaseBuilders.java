package com.core.rupprojectscore.entity;

import java.time.LocalDate;

public interface PhaseBuilders {

    interface PhaseType {
        StartDate phaseType(com.core.rupprojectscore.dto.PhaseType phaseType);
    }

    interface StartDate {
        WithIterations startDate(LocalDate startDate);
    }

    interface WithIterations {
        Optionals withIterations(Long iterationSize, Long numberOfIterations);
    }

    interface Optionals {
        Phase build();
    }

}
