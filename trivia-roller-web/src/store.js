import {configureStore, createSlice} from "@reduxjs/toolkit";

const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        // value: []
        value: JSON.parse("[{\"id\":\"7fcdb351-7943-45ab-88e5-3ffc0c63af9f\",\"possibleAnswers\":[\"Cray X-MP\",\"Cray XK7\",\"IBM Blue Gene/Q\",\"Thinking Machines CM-5\"],\"prompt\":\"What is the name of the supercomputer located in the control room in &quot;Jurassic Park&quot; (1993)?\", \"answered\": false},{\"id\":\"a88dec1c-1255-4038-b000-3152cd3c1dbf\",\"possibleAnswers\":[\"Angeline\",\"Christine\",\"Mary\",\"Pamela\"],\"prompt\":\"In the Friday The 13th series, what is Jason&#039;s mother&#039;s first name?\", \"answered\": false},{\"id\":\"814559c4-aeea-43e5-aae7-e1491bc410af\",\"possibleAnswers\":[\"Antarctica\",\"Australia\",\"New Zealand\",\"South Africa\"],\"prompt\":\"Where was the Sniper character in Team Fortress 2 born?\", \"answered\": false}]")
    },
    reducers: {
        setQuestions: (state, action) => {
            state.value = action.payload;
        }
    }
});

const answerSubmissionSlice = createSlice({
    name: 'answerSubmission',
    initialState: {
        value: []
    },
    reducers: {
        setSubmissions: (state, action) => {
            state.value = action.payload;
        }
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        value: []
    },
    reducers: {
        setCategories: (state, action) => {
            state.value = action.payload;
        }
    }
});

const difficultySlice = createSlice({
    name: 'difficulties',
    initialState: {
        value: []
    },
    reducers: {
        setDifficulties: (state, action) => {
            state.value = action.payload;
        }
    }
});

const reportCardSlice = createSlice({
    name: 'reportCard',
    initialState: {
        value: {
            "evaluations": [
                {
                    "correctAnswer": "True",
                    "isCorrect": false,
                    "questionPrompt": "AMD created the first consumer 64-bit processor.",
                    "selectedAnswer": "False"
                },
                {
                    "correctAnswer": "2004",
                    "isCorrect": false,
                    "questionPrompt": "What year was the RoboSapien toy robot released?",
                    "selectedAnswer": "2000"
                },
                {
                    "correctAnswer": "Emperor",
                    "isCorrect": true,
                    "questionPrompt": "What is the largest living species of penguin?",
                    "selectedAnswer": "Emperor"
                },
                {
                    "correctAnswer": "Burrow",
                    "isCorrect": false,
                    "questionPrompt": "What is the name of a rabbit&#039;s abode?",
                    "selectedAnswer": "Dray"
                }
            ],
            "score": 25
        }
    },
    reducers: {
        setReportCard: (state, action) => {
            state.value = action.payload;
        }
    }
});

export default configureStore({
    reducer: {
        questions: questionsSlice.reducer,
        categories: categorySlice.reducer,
        difficulties: difficultySlice.reducer,
        answerSubmission: answerSubmissionSlice.reducer,
        reportCard: reportCardSlice.reducer
    }
});

export const {
    setQuestions
} = questionsSlice.actions;

export const {
    setSubmissions
} = answerSubmissionSlice.actions;

export const {
    setCategories
} = categorySlice.actions;

export const {
    setDifficulties
} = difficultySlice.actions;

export const {
    serReportCard
} = reportCardSlice.actions;
