package com.mossonthetree.trivia.service;

import com.mossonthetree.trivia.coordinator.AnswerCoordinator;
import com.mossonthetree.trivia.model.Answer;
import com.mossonthetree.trivia.model.AnswerSubmission;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.UUID;

public class AnswerServiceTest {
    private final AnswerCoordinator coordinator = Mockito.mock(AnswerCoordinator.class);

    @Test()
    public void testEvaluate() {
        var testId = UUID.randomUUID().toString();

        Mockito.when(coordinator.get(testId))
                .thenReturn(new Answer(testId, "Is this Java code", "Yes"));

        var sut = new AnswerService(coordinator);

        var answersSubmissions = List.of(new AnswerSubmission(testId, "Yes"));

        var actualRes = sut.evaluate(answersSubmissions);
        Assertions.assertTrue(actualRes.isValid());
        var actual = actualRes.getContent();
        Assertions.assertEquals(100.0f, actual.score());
        Assertions.assertEquals("Yes", actual.evaluations().getFirst().correctAnswer());
    }

    @Test()
    public void testEvaluateNoAnswerFound() {
        Mockito.when(coordinator.get("some-id"))
                .thenReturn(null);

        var sut = new AnswerService(coordinator);

        var answersSubmissions = List.of(new AnswerSubmission("some-id", "Yes"));

        var actualRes = sut.evaluate(answersSubmissions);
        Assertions.assertFalse(actualRes.isValid());
        Assertions.assertEquals("Answer not found for some-id", actualRes.getErrorMessage());
    }
}
