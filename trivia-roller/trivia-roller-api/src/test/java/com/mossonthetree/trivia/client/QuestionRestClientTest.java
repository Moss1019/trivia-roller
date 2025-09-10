package com.mossonthetree.trivia.client;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

public class QuestionRestClientTest {
    @Test()
    @Disabled("Not to be executed during compilation, used during development to get test data")
    public void testGet() {
        var sut = new QuestionRestClient("https://opentdb.com/api.php");

        var actualRes = sut.getQuestions(1, null, null);
        var actual = actualRes.getContent();

        Assertions.assertNotNull(actual);
        Assertions.assertEquals(0, actual.responseCode);
    }
}
