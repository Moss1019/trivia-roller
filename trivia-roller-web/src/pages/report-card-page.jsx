import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import Header from "../sections/header.jsx";
import Content from "../sections/content.jsx";
import Footer from "../sections/footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import escapeHtml from "../extensions/html-entity-extension.js";
import {useNavigate} from "react-router-dom";
import {setQuestions, setReportCard, setSubmissions} from "../store.js";

function ReportCardPage() {
    const reportCard = useSelector(state => state.reportCard.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const answerSummary = useMemo(() => {
        return reportCard.evaluations
            .filter(e => !e.isCorrect)
            .map((e, i) => (
                <Box key={i} className="mt25">
                    <Typography variant="body1">Question: {escapeHtml(e.questionPrompt)}</Typography>
                    <Typography variant="body1">Your answer: {escapeHtml(e.selectedAnswer)}</Typography>
                    <Typography variant="body1">Correct answer: {escapeHtml(e.correctAnswer)}</Typography>
                </Box>
            ));
    }, [reportCard])

    const restart = () => {
        dispatch(setQuestions([]));
        dispatch(setSubmissions([]));
        dispatch(setReportCard(null));
        navigate('/trivia-start');
    }

    return (
        <Box>
            <Header/>

            <Content>
                <Box className="justify-center">
                    <Card className="margined-width">
                        <CardContent>
                            <Box className="justify-center">
                                <Box className="column-align-center align-center">
                                    <Typography variant="h5">Your score</Typography>
                                    <Typography variant="h1">{reportCard.score}%</Typography>
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="h5">Here's what you missed</Typography>
                                {answerSummary}
                            </Box>

                            <Box className="mt25 justify-center">
                                <Button variant="contained" color="primary" onClick={restart}>
                                    restart
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Content>

            <Footer/>
        </Box>
    );
}

export default ReportCardPage;
