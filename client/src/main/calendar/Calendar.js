import './calendar.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
            start: "2022-02-09T09:00:00",
            end: "2022-02-09T09:30:00",
            interactive: true,
            editable: true,
            resourceId: 1
        },
        {
            id: "b",
            title: "Another ap",
            startTime: "10:00:00",
            endTime: "11:00:00",
            resourceId: 4
        }
    ]

    return (
        <div className="calendar-page">
            <FullCalendar
                height="800px"
                handleWindowResize="true"
                plugins={[resourceTimeGridPlugin, interactionPlugin]}
                initialView="resourceTimeGridDay"
                resources={resourceData}
                events={eventsData}
                slotDuration="00:15:00"
                slotMinTime="06:00:00"
                slotMaxTime="18:00:00"
                customButtons={{
                    myCustomButton: {
                        text: "Custom!",
                        click: function () {
                            alert("boo")
                        }
                    }
                }}
                headerToolbar={{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,resourceTimeGridDay,listWeek'
                }}
            />
        </div>
    );
}

export default Calendar;