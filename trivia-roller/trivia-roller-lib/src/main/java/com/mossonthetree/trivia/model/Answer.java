package com.mossonthetree.trivia.model;

public record Answer(String questionId,
                     String prompt,
                     String correctAnswer) {
}
