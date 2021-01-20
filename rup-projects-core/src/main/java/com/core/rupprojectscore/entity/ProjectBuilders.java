package com.core.rupprojectscore.entity;

import java.time.LocalDate;

public interface ProjectBuilders {

    interface Dates {
        NumberOfIterations dates(LocalDate startDate, LocalDate endDate);
    }

    interface NumberOfIterations {
        Optionals numberOfIterations(Long numberOfIterations);
    }

    interface Optionals {
        Optionals cost(Long cost);

        String getError();

        Project build();
    }

}
