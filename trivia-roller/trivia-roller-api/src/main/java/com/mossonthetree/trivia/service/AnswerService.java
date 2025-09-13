package com.mossonthetree.trivia.service;

import com.mossonthetree.trivia.coordinator.AnswerCoordinator;
import com.mossonthetree.trivia.model.AnswerEvaluation;
import com.mossonthetree.trivia.model.AnswerSubmission;
import com.mossonthetree.trivia.model.ReportCard;
import com.mossonthetree.trivia.result.OpResult;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.LinkedList;
import java.util.List;

@ApplicationScoped()
public class AnswerService {
    private final AnswerCoordinator coordinator;

    private final int maxSubmissions;

    public AnswerService(AnswerCoordinator coordinator,
                         @ConfigProperty(name = "triviadb.max-questions") int maxSubmissions) {
        this.coordinator = coordinator;
        this.maxSubmissions = maxSubmissions;
    }

    public OpResult<ReportCard> evaluate(List<AnswerSubmission> submissions) {
        if(submissions.size() > maxSubmissions) {
            return OpResult.failed("Invalid number of answers, max is " + maxSubmissions);
        }

        var evaluations = new LinkedList<AnswerEvaluation>();
        var score = 0.0f;
        for(var submission : submissions) {
            var answer = coordinator.get(submission.questionId());
            if(answer == null) {
                return OpResult.failed("Answer not found for " + submission.questionId());
            }
            var isCorrect = submission.selectedAnswer().equals(answer.correctAnswer());
            if(isCorrect) {
                score += 1.0f;
            }
            evaluations.add(new AnswerEvaluation(answer.prompt(), answer.correctAnswer(), submission.selectedAnswer(), isCorrect));
        }
        score *= 100.0f;
        score /= submissions.size();

        return OpResult.successful(new ReportCard(score, evaluations));
    }
}
