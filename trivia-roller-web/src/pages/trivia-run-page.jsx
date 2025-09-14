import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import Header from "../sections/header.jsx";
import Content from "../sections/content.jsx";
import Footer from "../sections/footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setQuestions, setReportCard, setSnackbarMessage, setSnackbarMessageShow, setSubmissions} from "../store.js";
import ProgressBubbles from "../components/progress-bubbles.jsx";
import QuestionContainer from "../containers/question-container.jsx";
import AnswerService from "../services/answer-service.js";

function TriviaRunPage() {
    const token = useSelector(state => state.token.value);
    const questions = useSelector(state => state.questions.value);
    const answerSubmissions = useSelector(state => state.answerSubmissions.value)

    const showError = (message) => {
        dispatch(setSnackbarMessage(message));
        dispatch(setSnackbarMessageShow(true));
    }

    const answerServiceRef = useRef(new AnswerService(token, (err) => {
        showError('Remote server error: ' + err.message);
    }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(0);

    useEffect(() => {
        if (questions.length === 0) {
            navigate('/trivia-start')
        }
    }, [navigate, questions]);

    const numberAnswered = useMemo(() => {
        return questions.filter(q => q.answered).length;
    }, [questions])

    const showPreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const showNextQuestion = () => {
        setSelectedAnswerIndex(0);

        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[currentIndex];
        updatedQuestions[currentIndex] = {
            ...currentQuestion,
            answered: true
        };
        dispatch(setQuestions(updatedQuestions));

        const newSubmission = {
            questionId: currentQuestion.id,
            selectedAnswer: currentQuestion.possibleAnswers[selectedAnswerIndex]
        };
        const updatedSubmissions = answerSubmissions
            .filter(s => s.questionId !== currentQuestion.id)
            .concat(newSubmission);
        dispatch(setSubmissions(updatedSubmissions));

        if (currentIndex < questions.length) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const submitAnswers = () => {
        answerServiceRef.current.checkAnswers(answerSubmissions, (reportCard) => {
            dispatch(setReportCard(reportCard));
            navigate('/report-card');
        }, showError);
    }

    return (
        <Box>
            <Header/>

            <Content>
                <Box className="justify-center">
                    <Card className="margined-width">
                        <CardContent>
                            <Box className="fill-width column-align-center">
                                {currentIndex < questions.length &&
                                <Box>
                                    <ProgressBubbles
                                        questions={questions}
                                        currentIndex={currentIndex}
                                        onBubbleClick={setCurrentIndex}
                                    />
                                    <Box>
                                        <QuestionContainer
                                            value={selectedAnswerIndex}
                                            question={questions[currentIndex]}
                                            onSelectionChange={setSelectedAnswerIndex}
                                        />
                                        <Box className="mt25 justify-between">
                                            <Button onClick={showPreviousQuestion}>
                                                Previous
                                            </Button>

                                            <Button onClick={showNextQuestion}>
                                                Next
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                                }
                                {currentIndex === questions.length &&
                                    <Box className="mt25 column-align-center align-center">
                                        <Typography variant="h5">You've answered {numberAnswered} out
                                            of {questions.length} questions.</Typography>
                                        <Button variant="contained" onClick={submitAnswers}>
                                            Submit
                                        </Button>
                                    </Box>
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Content>

            <Footer/>
        </Box>
    );
}

export default TriviaRunPage;