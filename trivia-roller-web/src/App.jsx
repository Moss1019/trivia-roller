import './App.css'
import {Box, Button, Snackbar} from "@mui/material";
import TriviaRunPage from "./pages/trivia-run-page.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TriviaStartPage from "./pages/trivia-start-page.jsx";
import ReportCardPage from "./pages/report-card-page.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import AuthService from "./services/auth-service.js";
import {setSnackbarMessage, setSnackbarMessageShow, setToken} from "./store.js";

function App() {
    const token = useSelector(state => state.token.value);
    const showSnackbar = useSelector(state => state.snackbarMessage.showMessage);
    const snackbarMessage = useSelector(state => state.snackbarMessage.message);

    const dispatch = useDispatch();

    const authServiceRef = useRef(new AuthService(console.log));

    useEffect(() => {
        if(!token || token.length === 0) {
            authServiceRef.current.login({username: 'trivia-app', password: 'secret123!'},
                (token) => {
                    dispatch(setToken(token));
            });
        }
    }, [dispatch, token]);

    const routes = [
        {path: '/trivia-run', Component: TriviaRunPage},
        {path: '/trivia-start', Component: TriviaStartPage},
        {path: '/report-card', Component: ReportCardPage},

        {path: '/', Component: TriviaStartPage},
    ];

    const router = createBrowserRouter(routes);

    const toastAction = (
        <Button onClick={() => dispatch(setSnackbarMessageShow(false))}>
            ok
        </Button>
    );

    return (
        <>
            <Snackbar
                anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
                open={showSnackbar}
                message={snackbarMessage}
                autoHideDuration={6000}
                action={toastAction}
                onClose={() => dispatch(setSnackbarMessage(false))}
                />
            {!token && token.length === 0 &&
                <Box>
                    logging in...
                </Box>
            }
            {token && token.length > 0 &&
                <Box>
                    <RouterProvider router={router} />
                </Box>
            }
        </>
    );
}

export default App;
