package com.core.rupprojectscore.dto;

public enum PhaseType {
    Init(0.1),
    Elaboration(0.3),
    Construction(0.5),
    Transition(0.1);

    private double percentage;

    private PhaseType(double percentage) {
        this.percentage = percentage;
    }
    
    public double getPercentage() {
        return percentage;
    }

}
