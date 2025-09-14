import './sections.css'
import {Box, Typography} from "@mui/material";

function Header() {
    return (
        <Box className="header justify-between">
            <Typography variant="h3">Trivia Roller</Typography>
            <Typography variant="h3">Test your knowledge</Typography>
        </Box>
    );
}

export default Header;
