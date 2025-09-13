import {Box, Button, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import escapeHtml from "../extensions/html-entity-extension.js";


function QuestionContainer(props) {
    const getAnswerOptions = () => {
        return props.question.possibleAnswers.map((a, i) => {
            return (
                <FormControlLabel key={i} value={i} control={<Radio />} label={a} />
            );
        });
    }

    const getQuestion = () => {
        return escapeHtml(props.question.prompt);
    }

    return (
        <Box>
            <Box>
                <Typography variant="h5">{getQuestion()}</Typography>
            </Box>
            <Box className="mt25">
                <RadioGroup
                    defaultValue="0"
                    name="radio-buttons-group"
                >
                    {getAnswerOptions()}
                </RadioGroup>
            </Box>
        </Box>
    );
}

export default QuestionContainer;