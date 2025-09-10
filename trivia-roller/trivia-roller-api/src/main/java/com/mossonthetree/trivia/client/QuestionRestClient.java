package com.mossonthetree.trivia.client;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.mossonthetree.trivia.model.Category;
import com.mossonthetree.trivia.model.Difficulty;
import com.mossonthetree.trivia.result.OpResult;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@ApplicationScoped()
public class QuestionRestClient {
    private final String baseUrl;

    private final HttpClient client;

    public QuestionRestClient(@ConfigProperty(name = "triviadb.base-url") String baseUrl) {
        this.baseUrl = baseUrl;
        client = HttpClient.newHttpClient();
    }

    public OpResult<QuestionsResponse> getQuestions(int amount, Category category, Difficulty difficulty) {
        var uriSb = new StringBuilder(baseUrl);
        uriSb.append("?amount=").append(amount);
        if(category != Category.ANY) {
            uriSb.append("&category=").append(category.value);
        }
        if(difficulty != Difficulty.ANY) {
            uriSb.append("&difficulty=").append(difficulty.value);
        }
        var uri = URI.create(uriSb.toString());
        var req = HttpRequest
                .newBuilder()
                .GET()
                .uri(uri)
                .build();
        try {
            var res = client.send(req, HttpResponse.BodyHandlers.ofString());
            if(res.statusCode() == 200) {
                var json = res.body();
                var gson = new Gson();
                return OpResult.successful(gson.fromJson(json, QuestionsResponse.class));
            }
            return OpResult.failed("Error calling remote api " + res.statusCode());
        } catch (Exception ex) {
            return OpResult.failed(ex);
        }
    }

    public static class QuestionsResponse {
        @SerializedName("response_code")
        public int responseCode;

        @SerializedName("results")
        public List<QuestionResponse> questions;

        public QuestionsResponse() {
        }

        public QuestionsResponse(int responseCode, List<QuestionResponse> questions) {
            this.responseCode = responseCode;
            this.questions = questions;
        }
    }

    public static class QuestionResponse {
        public String type;

        public String difficulty;

        public String category;

        public String question;

        @SerializedName("correct_answer")
        public String correctAnswer;

        @SerializedName("incorrect_answers")
        public List<String> incorrectAnswers;

        public QuestionResponse() {
        }

        public QuestionResponse(String type,
                                String difficulty,
                                String category,
                                String question,
                                String correctAnswer,
                                List<String> incorrectAnswers) {
            this.type = type;
            this.difficulty = difficulty;
            this.category = category;
            this.question = question;
            this.correctAnswer = correctAnswer;
            this.incorrectAnswers = incorrectAnswers;
        }
    }
}
