import './calendar.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

const Calendar = () => {

    const resourceData = [
        {
            id: 1,
            title: "Person 1"
        },
        {
            id: 2,
            title: "Person 2"
        },
        {
            id: 3,
            title: "Person 3"
        },
        {
            id: 4,
            title: "person 4"
        }
    ]

    const eventsData = [
        {
            id: "a",
            title: "Hair ap",
            startTime: "09:00:00",
            endTime: "09:30:00",
            resourceId: 1
        },
        {
            id: "b",
            title: "Another ap",
            startTime:"10:00:00",
            endTime:"11:00:00",
            resourceId: 4
        }
    ]

    return (
        <div className="calendar-page">
            <FullCalendar
                height="800px"
                plugins={[resourceTimeGridPlugin]}
                initialView="resourceTimeGridDay"
                resources={resourceData}
                events={eventsData}
                slotDuration="00:15:00"
                slotMinTime="06:00:00"
                slotMaxTime="18:00:00"
            />
        </div>
    );
}

export default Calendar;