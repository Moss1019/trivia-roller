import './App.css'
import {Box} from "@mui/material";
import TriviaRunPage from "./pages/trivia-run-page.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TriviaStartPage from "./pages/trivia-start-page.jsx";
import ReportCardPage from "./pages/report-card-page.jsx";

function App() {
    const routes = [
        {path: '/trivia-run', Component: TriviaRunPage},
        {path: '/trivia-start', Component: TriviaStartPage},
        {path: '/report-card', Component: ReportCardPage},

        {path: '/', Component: TriviaStartPage},
    ];

    const router = createBrowserRouter(routes);

    return (
        <Box>
            <RouterProvider router={router} />
        </Box>
    );
}

export default App;
