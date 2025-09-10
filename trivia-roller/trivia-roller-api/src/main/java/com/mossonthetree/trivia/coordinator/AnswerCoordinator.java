package com.mossonthetree.trivia.coordinator;

import com.mossonthetree.trivia.model.Answer;
import com.mossonthetree.trivia.model.AnswerSubmission;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.HashMap;
import java.util.Map;

@ApplicationScoped()
public class AnswerCoordinator {
    private final Map<String, Answer> correctAnswers = new HashMap<>();

    public void add(Answer answer) {
        correctAnswers.put(answer.questionId(), answer);
    }

    public Answer get(String questionId) {
        if(correctAnswers.containsKey(questionId)) {
            return correctAnswers.get(questionId);
        }
        return null;
    }

    public Answer get(AnswerSubmission submission) {
        return get(submission.questionId());
    }
}
