package com.mossonthetree.trivia.service;

import com.mossonthetree.trivia.client.QuestionRestClient;
import com.mossonthetree.trivia.coordinator.AnswerCoordinator;
import com.mossonthetree.trivia.model.Answer;
import com.mossonthetree.trivia.model.Category;
import com.mossonthetree.trivia.model.Difficulty;
import com.mossonthetree.trivia.model.Question;
import com.mossonthetree.trivia.result.OpResult;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.*;

@ApplicationScoped()
public class QuestionService {
    private static final Map<Integer, String> RESPONSE_CODES = new HashMap<>();

    private final QuestionRestClient client;

    private final AnswerCoordinator coordinator;

    private final int maxQuestions;

    public QuestionService(QuestionRestClient client,
                           AnswerCoordinator coordinator,
                           @ConfigProperty(name = "triviadb.max-questions") int maxQuestions) {
        this.client = client;
        this.coordinator = coordinator;
        this.maxQuestions = maxQuestions;
    }

    public OpResult<List<Question>> get(int amount, Category category, Difficulty difficulty) {
        if(amount < 0) {
            amount *= -1;
        }
        if(amount > maxQuestions) {
            return OpResult.failed("Too many questions requested, max is " + maxQuestions);
        }

        var questionsRes = client.getQuestions(amount, category, difficulty);
        if(!questionsRes.isValid()) {
            return OpResult.failed(questionsRes.getErrorMessage());
        }

        var questions = questionsRes.getContent();
        if(questions.responseCode != 0) {
            return OpResult.failed(RESPONSE_CODES.get(questions.responseCode));
        }

        var res = new LinkedList<Question>();
        for(var q: questions.questions) {
            var questionId = UUID.randomUUID().toString();
            var possibleAnswers = new LinkedList<String>();
            possibleAnswers.add(q.correctAnswer);
            possibleAnswers.addAll(q.incorrectAnswers);
            possibleAnswers.sort(String::compareTo);
            var question = new Question(questionId, q.question, possibleAnswers);
            var answer = new Answer(questionId, q.question, q.correctAnswer);
            coordinator.add(answer);
            res.add(question);
        }

        return OpResult.successful(res);
    }

    public OpResult<List<Category.Details>> getCategories() {
        return OpResult.successful(Category.getDetails());
    }

    public OpResult<List<Difficulty.Details>> getDifficultyLevels() {
        return OpResult.successful(Difficulty.getDetails());
    }

    static {
        RESPONSE_CODES.put(0, "OK");
        RESPONSE_CODES.put(1, "No Results");
        RESPONSE_CODES.put(2, "Invalid parameter");
        RESPONSE_CODES.put(3, "Token not found");
        RESPONSE_CODES.put(4, "Token empty");
        RESPONSE_CODES.put(5, "Rate limit reached");
    }
}
