import {Box, Button, Card, CardContent} from "@mui/material";
import Header from "../sections/header.jsx";
import Content from "../sections/content.jsx";
import Footer from "../sections/footer.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setQuestions} from "../store.js";
import ProgressBubbles from "../components/progress-bubbles.jsx";
import QuestionContainer from "../containers/question-container.jsx";

function TriviaRunPage() {
    const questions = useSelector(state => state.questions.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if(questions.length === 0) {
            navigate('/trivia-start')
        }
    }, [navigate, questions]);

    const showPreviousQuestion = () => {
        if(currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    const showNextQuestion = () => {
        const updatedQuestions = [...questions];
        const currentQuestion = updatedQuestions[currentIndex];
        updatedQuestions[currentIndex] = {
            ...currentQuestion,
            answered: true
        };
        dispatch(setQuestions(updatedQuestions))
        if(currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <Box>
            <Header />

            <Content>
                <Box className="justify-center">
                    <Card className="margined-width">
                        <CardContent>
                            <Box className="fill-width column-align-center">
                                <ProgressBubbles
                                    questions={questions}
                                    currentIndex={currentIndex}
                                    onBubbleClick={setCurrentIndex}
                                />

                                <Box>
                                    <QuestionContainer
                                        question={questions[currentIndex]}

                                    />
                                    <Box className="mt25 justify-between">
                                        <Button onClick={showPreviousQuestion}>
                                            Previous
                                        </Button>

                                        {currentIndex < questions.length - 1 &&
                                        <Button onClick={showNextQuestion}>
                                            Next
                                        </Button>
                                        }
                                        {currentIndex === questions.length - 1 &&
                                        <Button onClick={() => navigate('/report-card')}>
                                            Finish
                                        </Button>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Content>

            <Footer />
        </Box>
    );
}

export default TriviaRunPage;