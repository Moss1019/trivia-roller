package com.mossonthetree.trivia.service;

import com.mossonthetree.trivia.client.QuestionRestClient;
import com.mossonthetree.trivia.coordinator.AnswerCoordinator;
import com.mossonthetree.trivia.model.Category;
import com.mossonthetree.trivia.model.Difficulty;
import com.mossonthetree.trivia.result.OpResult;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.LinkedList;
import java.util.List;

public class QuestionServiceTest {
    private final QuestionRestClient client = Mockito.mock(QuestionRestClient.class);

    @Test()
    public void testGet() {
        Mockito.when(client.getQuestions(5, Category.GENERAL, Difficulty.EASY))
                        .thenReturn(OpResult.successful(createSuccessResponse()));
        Mockito.when(client.getQuestions(10, Category.ANIMALS, Difficulty.MEDIUM))
                .thenReturn(OpResult.successful(createRateLimitedResponse()));

        var coordinator = new AnswerCoordinator();
        var sut = new QuestionService(client, coordinator, 10);

        var actual = sut.get(5, Category.GENERAL, Difficulty.EASY);
        Assertions.assertTrue(actual.isValid());
        var firstQuestion = actual.getContent().getFirst().prompt();
        Assertions.assertEquals("Do you have a beard?", firstQuestion);

        actual = sut.get(10, Category.ANIMALS, Difficulty.MEDIUM);
        Assertions.assertFalse(actual.isValid());
        Assertions.assertEquals("Rate limit reached", actual.getErrorMessage());
    }

    @Test()
    public void testGetPopulateCoordinator() {
        Mockito.when(client.getQuestions(5, Category.GENERAL, Difficulty.EASY))
                .thenReturn(OpResult.successful(createSuccessResponse()));

        var sut = new AnswerCoordinator();
        var questionService = new QuestionService(client, sut, 10);

        var actual = questionService.get(5, Category.GENERAL, Difficulty.EASY);
        Assertions.assertTrue(actual.isValid());
        var firstQuestionId = actual.getContent().getFirst().id();

        var answer = sut.get(firstQuestionId);
        Assertions.assertEquals("Yes", answer.correctAnswer());
    }

    @Test()
    public void testGetTooManyRequests() {
        var sut = new AnswerCoordinator();
        var questionService = new QuestionService(client, sut, 10);

        var actual = questionService.get(15, Category.GENERAL, Difficulty.EASY);
        Assertions.assertFalse(actual.isValid());
        Assertions.assertEquals("Too many questions requested, max is 10", actual.getErrorMessage());
    }

    private QuestionRestClient.QuestionsResponse createSuccessResponse() {
        var questionResponses = new LinkedList<QuestionRestClient.QuestionResponse>();
        questionResponses.add(new QuestionRestClient.QuestionResponse("multiple",
                "easy",
                "any",
                "Do you have a beard?",
                "Yes",
                List.of(new String[]{ "No", "Who wants a beard?", "Maybe" })));
        return new QuestionRestClient.QuestionsResponse(0, questionResponses);
    }

    private QuestionRestClient.QuestionsResponse createRateLimitedResponse() {
        return new QuestionRestClient.QuestionsResponse(5, new LinkedList<>());
    }
}
