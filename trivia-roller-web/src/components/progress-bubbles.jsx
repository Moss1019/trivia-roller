import './components.css'
import {Box, Typography} from "@mui/material";

function ProgressBubbles(props) {
    return (
        <Box className="justify-center">
            <Box className="justify-between">
                {props.questions.map((q, i) => {
                    const className = i === props.currentIndex ?
                        'progress-entry-current' :
                        q.answered ?
                            'progress-entry-answered' :
                            'progress-entry-unanswered';
                    return (
                        <Box className="mr25 ml25 pointer" key={i} onClick={() => props.onBubbleClick(i)}>
                            <Typography variant="h5" className={`progress-entry ${className}`}>
                                {i + 1}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

export default ProgressBubbles;