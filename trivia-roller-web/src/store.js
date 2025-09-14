import {configureStore, createSlice} from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: sessionStorage.getItem('token') ?? ''
    },
    reducers: {
        setToken: (state, action) => {
            sessionStorage.setItem('token', action.payload);
            state.value = action.payload;
        }
    }
});

const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        value: []
    },
    reducers: {
        setQuestions: (state, action) => {
            state.value = action.payload;
        }
    }
});

const answerSubmissionSlice = createSlice({
    name: 'answerSubmissions',
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
        value: null
    },
    reducers: {
        setReportCard: (state, action) => {
            state.value = action.payload;
        }
    }
});

const snackbarMessageSlice = createSlice({
    name: 'snackbarMessage',
    initialState: {
        message: null,
        showMessage: false
    },
    reducers: {
        setSnackbarMessage: (state, action) => {
            state.message = action.payload;
        },
        setSnackbarMessageShow: (state, action) => {
            state.showMessage = action.payload;
        }
    }
})

export default configureStore({
    reducer: {
        token: tokenSlice.reducer,
        questions: questionsSlice.reducer,
        categories: categorySlice.reducer,
        difficulties: difficultySlice.reducer,
        answerSubmissions: answerSubmissionSlice.reducer,
        reportCard: reportCardSlice.reducer,
        snackbarMessage: snackbarMessageSlice.reducer,
    }
});

export const {
    setToken
} = tokenSlice.actions;

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
    setReportCard
} = reportCardSlice.actions;

export const {
    setSnackbarMessage,
    setSnackbarMessageShow
} = snackbarMessageSlice.actions;
