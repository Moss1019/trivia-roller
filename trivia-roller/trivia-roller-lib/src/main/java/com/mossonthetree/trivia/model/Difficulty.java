package com.mossonthetree.trivia.model;

import java.util.Arrays;
import java.util.List;

public enum Difficulty {
    ANY("Any", "any"),
    EASY("Easy", "easy"),
    MEDIUM("Medium", "medium"),
    HARD("Hard", "hard");

    public final String label;

    public final String value;

    Difficulty(String label, String value) {
        this.label = label;
        this.value = value;
    }

    private static final List<Details> DETAILS = Arrays.stream(Difficulty.values())
            .map(d -> new Details(d, d.label, d.value))
            .toList();

    public static List<Details> getDetails() {
        return DETAILS;
    }

    public record Details(Difficulty difficulty, String label, String value) {

    }
}
