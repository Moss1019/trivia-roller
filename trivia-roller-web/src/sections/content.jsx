import './sections.css'
import {Box} from "@mui/material";

function Content({children}) {
    return (
        <Box className="content">
            {children}
        </Box>
    );
}

export default Content;