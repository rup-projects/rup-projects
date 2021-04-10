package com.core.rupprojectscore.dto;

public enum PhaseType {
    Init(0.1, 0.38, 0.07, 0.12, 0.08),
    Elaboration(0.3, 0.18, 0.12, 0.26, 0.13),
    Construction(0.5, 0.08, 0.06, 0.10, 0.34),
    Transition(0.1, 0.04, 0.01, 0.03, 0.19);

    public static final int MAX = values().length;
    private final double durationPercentage;
    private final double requirementsPercentage;
    private final double analysisPercentage;
    private final double designPercentage;
    private final double implementationPercentage;

    PhaseType(double durationPercentage, double requirementsPercentage, double analysisPercentage,
              double designPercentage, double implementationPercentage) {
        this.durationPercentage = durationPercentage;
        this.requirementsPercentage = requirementsPercentage;
        this.analysisPercentage = analysisPercentage;
        this.designPercentage = designPercentage;
        this.implementationPercentage = implementationPercentage;
    }

    public double getDurationPercentage() {
        return durationPercentage;
    }

    public double getRequirementsPercentage() {
        return requirementsPercentage;
    }

    public double getAnalysisPercentage() {
        return analysisPercentage;
    }

    public double getDesignPercentage() {
        return designPercentage;
    }

    public double getImplementationPercentage() {
        return implementationPercentage;
    }
}
