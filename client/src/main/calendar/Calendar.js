import './calendar.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useQuery } from '@apollo/client';
import { QUERY_HAIRSTYLIST, QUERY_APPOINTMENTS } from '../../utils/queries';

const Calendar = () => {
    const {loading, error, data} = useQuery(QUERY_HAIRSTYLIST)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.hairdressers[1].username)

    const resourceData = data.hairdressers.map(stylistData => ({
        id: stylistData._id,
        title: stylistData.username
    }))

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