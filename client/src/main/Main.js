import Calendar from "./calendar/Calendar";
import Booking from "./booking/Booking";
import Header from "./header/Header";
import requiredRole from "../utils/RequireStylist"
import RequireRole from "../utils/RequireStylist";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Main = () => {

    return (
        <div className="main">
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<h1>Home</h1>} />
                    <Route exact path="/booking" element={<Booking />} />
                    <Route exact path="/calendar" element={
                        <RequireRole requiredRole={true}>
                            <Calendar />
                        </RequireRole>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default Main;