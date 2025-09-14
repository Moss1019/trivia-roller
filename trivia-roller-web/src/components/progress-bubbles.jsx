import './components.css'
import {Box, Typography} from "@mui/material";
import {useMemo} from "react";

function ProgressBubbles(props) {
    const bubblesToShow = useMemo(() => {
        const getQuestionSlice = () => {
            if (props.questions.length < 9) {
                return {questions: props.questions};
            }
            let leftSide = Math.min(4, props.currentIndex);
            let rightSide = Math.min(4, props.questions.length - props.currentIndex - 1);
            if (leftSide < 4) {
                rightSide += 4 - leftSide;
            }
            if (rightSide < 4) {
                leftSide += 4 - rightSide;
            }
            return {
                leftSide: leftSide,
                rightSide: rightSide,
                questions: props.questions.slice(props.currentIndex - leftSide, props.currentIndex + rightSide + 1)
            };
        }

        const currentSettings = getQuestionSlice();
        return currentSettings.questions.map((q, i) => {
            const currentQuestion = props.questions[props.currentIndex];
            const className = q.id === currentQuestion.id ?
                'progress-entry-current' :
                q.answered ?
                    'progress-entry-answered' :
                    'progress-entry-unanswered';
            const offset = currentSettings.leftSide !== undefined ?
                (props.currentIndex - 4 < 0 ?
                    0 :
                    props.currentIndex + 4 < props.questions.length ?
                        props.currentIndex - 4 :
                        props.currentIndex - currentSettings.leftSide) :
                0;
            const questionIndex = i + offset;
            return (
                <Box className="mr25 ml25 pointer" key={i} onClick={() => props.onBubbleClick(questionIndex)}>
                    <Typography variant="h5" className={`progress-entry ${className}`}>
                        {questionIndex + 1}
                    </Typography>
                </Box>
            );
        })
    }, [props])

    return (
        <Box className="justify-center">
            <Box className="justify-between">
                {bubblesToShow}
            </Box>
        </Box>
    );
}

export default ProgressBubbles;