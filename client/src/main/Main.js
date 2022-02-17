import Calendar from "./calendar/Calendar";
import Booking from "./booking/Booking";
import Header from "./header/Header";
import requiredRole from "../utils/RequireStylist"
import RequireRole from "../utils/RequireStylist";

const Main = () => {

    return ( 
        <div className="main">
            <Header />
            <Booking />
            <RequireRole requiredRole={true}>
                <Calendar />
            </RequireRole>
        </div>
    );
}
 
export default Main;