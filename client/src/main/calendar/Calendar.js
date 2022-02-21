import './calendar.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useQuery } from '@apollo/client';
import { QUERY_HAIRSTYLIST, QUERY_APPOINTMENTS } from '../../utils/queries';

const Calendar = () => {
    const stylists = useQuery(QUERY_HAIRSTYLIST)
    const appointments = useQuery(QUERY_APPOINTMENTS)

    if (stylists.loading) return 'Loading Stylists...';
    if (stylists.error) return `Error! ${stylists.error.message}`;


    if(appointments.loading) return `Loading Appointments...`;
    if(appointments.error) return `Error! ${appointments.error.message}`

    const resourceData = stylists.data.hairdressers.map(stylistData => ({
        id: stylistData._id,
        title: stylistData.username
    }))

    const eventsData = appointments.data.appointments.map(appointmentData => ({
        title: appointmentData.title + ' ' +appointmentData.name,
        id: appointmentData._id,
        resourceId: appointmentData.userId.toString(),
        start: appointmentData.start,
        end: appointmentData.end,
        interactive: true,
        editable: true,
    }))
    console.log(appointments.data)
    console.log(eventsData)

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