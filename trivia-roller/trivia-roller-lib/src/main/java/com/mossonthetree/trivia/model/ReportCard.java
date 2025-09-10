package com.mossonthetree.trivia.model;

import java.util.List;

public record ReportCard(float score, List<AnswerEvaluation> evaluations) {
}
