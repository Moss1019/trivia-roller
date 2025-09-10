package com.mossonthetree.trivia.model;

public record AnswerEvaluation(String questionPrompt,
                               String correctAnswer,
                               String selectedAnswer,
                               boolean isCorrect) {
}
