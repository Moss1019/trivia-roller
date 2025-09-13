import {Box} from "@mui/material";
import Header from "../sections/header.jsx";
import Content from "../sections/content.jsx";
import Footer from "../sections/footer.jsx";
import {useSelector} from "react-redux";

function ReportCardPage() {
    const reportCard = useSelector(state => state.reportCard.value);

    return (
        <Box>
            <Header />

            <Content>

                {JSON.stringify(reportCard)}
            </Content>

            <Footer />
        </Box>
    );
}

export default ReportCardPage;
