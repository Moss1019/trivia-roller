import {Box, Button, Card, CardContent} from "@mui/material";
import Header from "../sections/header.jsx";
import Content from "../sections/content.jsx";
import Footer from "../sections/footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useRef, useState} from "react";
import QuestionService from "../services/question-service.js";
import {setCategories, setDifficulties, setQuestions, setSnackbarMessage, setSnackbarMessageShow} from "../store.js";
import LabeledSelect from "../components/labeled-select.jsx";
import LabeledInput from "../components/labeled-input.jsx";
import escapeHtml from "../extensions/html-entity-extension.js";
import {useNavigate} from "react-router-dom";

function TriviaStartPage() {
    const token = useSelector(state => state.token.value);
    const categories = useSelector(state => state.categories.value);
    const difficulties = useSelector(state => state.difficulties.value);
    const questions = useSelector(state => state.questions.value);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showError = (message) => {
        dispatch(setSnackbarMessage(message));
        dispatch(setSnackbarMessageShow(true));
    }

    const questionServiceRef = useRef(new QuestionService(token, (err) => {
        showError('Remote server error: ' + err.message);
    }));

    const [amount, setAmount] = useState(5);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');

    useEffect(() => {
        if (categories.length === 0) {
            questionServiceRef.current.getCategories((categories) => {
                dispatch(setCategories(categories));
                setCategory(categories[0].category);
            });
        } else {
            setCategory(categories[0].category);
        }
        if (difficulties.length === 0) {
            questionServiceRef.current.getDifficulties((difficulties) => {
                dispatch(setDifficulties(difficulties));
                setDifficulty(difficulties[0].difficulty);
            })
        } else {
            setDifficulty(difficulties[0].difficulty);
        }
    }, [categories, difficulties, dispatch]);

    const categoryOptions = useMemo(() => {
        return categories.map(c => ({
            value: c.category,
            label: escapeHtml(c.label)
        }))
    }, [categories]);

    const difficultyOptions = useMemo(() => {
        return difficulties.map(c => ({
            value: c.difficulty,
            label: c.label
        }))
    }, [difficulties]);

    const randomize = () => {
        const randomAmount = Math.floor(Math.random() * 15.0);
        setAmount(randomAmount);
        const randomCategory = Math.floor(Math.random() * categories.length);
        setCategory(categories[randomCategory].category);
        const randomDifficulty = Math.floor(Math.random() * difficulties.length);
        setDifficulty(difficulties[randomDifficulty].difficulty);
    }

    const start = () => {
        if(questions.length > 0) {
            navigate('/trivia-run');
        } else {
            questionServiceRef.current.getQuestions(amount, category, difficulty, (questions) => {
                dispatch(setQuestions(questions.map(q => ({...q, answered: false}))));
                navigate('/trivia-run');
            }, showError)
        }
    }

    return (
        <Box>
            <Header/>

            <Content>
                <Box className="justify-center align-center inherit-height">
                    <Card className="margined-width">
                        <CardContent>
                            <Box className="justify-between">
                                <Box className="fill-width">
                                    <LabeledInput
                                        label="Amount"
                                        value={amount}
                                        type="number"
                                        onChange={setAmount}
                                        />

                                    <LabeledSelect
                                        label="Category"
                                        value={category}
                                        values={categoryOptions}
                                        onChange={setCategory}
                                    />

                                    <LabeledSelect
                                        label="Category"
                                        value={difficulty}
                                        values={difficultyOptions}
                                        onChange={setDifficulty}
                                    />
                                </Box>

                                <Box className="fill-width justify-center align-center">
                                    <Box className="column-align-center fill-height">
                                        <Button variant="contained" onClick={start}>
                                            Start
                                        </Button>

                                        <Button variant="outlined" className="mt25" onClick={randomize}>
                                            Randomize
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                </Box>
            </Content>

            <Footer/>
        </Box>
    );
}

export default TriviaStartPage;