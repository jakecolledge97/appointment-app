import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

const Calendar = () => {

    return (
        <div className="calendar-page">
            <FullCalendar
                plugins={[resourceTimeGridPlugin]}
                initialView="resourceTimeGridDay"
                resources={[
                    {
                        id: 1,
                        title: "event 1"
                    },
                    {
                        id: 2,
                        title: "event 2"
                    }
                ]}
            />
        </div>
    );
}

export default Calendar;