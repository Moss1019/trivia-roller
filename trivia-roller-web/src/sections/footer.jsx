import './sections.css'
import {Box, Typography} from "@mui/material";

function Footer() {
    return (
        <Box className="footer justify-between">
            <Typography variant="caption">v1.0</Typography>
            <Typography variant="caption">backend: {import.meta.env.VITE_TRIVIA_ROLLER_URL}</Typography>
        </Box>
    );
}

export default Footer;