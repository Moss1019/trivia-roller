package com.mossonthetree.trivia.model;

import java.util.List;

public record Question(String id,
                       String prompt,
                       List<String> possibleAnswers) {
}
