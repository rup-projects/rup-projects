package com.core.rupprojectscore.dto;

public enum Error {
    INVALID_NUMBER_OF_ITERATIONS,
    WRONG_PROPOSED_COMBINATION_COLORS,
    DUPLICATE_PROPOSED_COMBINATION_COLORS,
    NULL;


    public boolean isNull() {
        return this == Error.NULL;
    }
}
