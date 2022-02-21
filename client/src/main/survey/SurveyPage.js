import './survey.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_HAIRSTYLIST, QUERY_SINGLE_HAIRSTYLIST } from '../../utils/queries';
import { CREATE_APPOINTMENT } from '../../utils/mutations';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import { useAuthContext } from '../../utils/AuthContext';


const SurveyPage = () => {
    const [createAppointment, { appointmentError }] = useMutation(CREATE_APPOINTMENT)
    const [startDate, setStartDate] = useState(new Date());
    const [hairUserData, setHairUserData] = useState({ hairLength: 'Short', service: 'Cut', stylist: '', appointmentDate: new Date().toISOString(), appointmentEnd: '' })
    const { loading, error, data } = useQuery(QUERY_HAIRSTYLIST);
    const { userData } = useAuthContext()

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setHairUserData({
            ...hairUserData,
            [name]: value,
        });
    }


    const handleFormSubmit = async (event) => {
        event.preventDefault()
        
        if (!hairUserData.hairLength || !hairUserData.service || !hairUserData.stylist || !hairUserData.appointmentDate) {
            return "You must fill out the form"
        } else {
            let endDate = new Date().toISOString()
            let appointmentName = userData.data.username
            if (hairUserData.service === 'Cut') {
                if (hairUserData.hairLength === 'Short') {
                    endDate = moment(hairUserData.appointmentDate).add(0.25, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")
                } else if (hairUserData.hairLength === 'Medium') {
                    endDate = moment(hairUserData.appointmentDate).add(0.5, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")
                } else if (hairUserData.hairLength === 'Long') {
                    endDate = moment(hairUserData.appointmentDate).add(1, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")
                }
            }else if(hairUserData.service === 'Colour'){
                if (hairUserData.hairLength === 'Short') {
                    endDate = moment(hairUserData.appointmentDate).add(0.5, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")
                } else if (hairUserData.hairLength === 'Medium') {
                    endDate = moment(hairUserData.appointmentDate).add(0.75, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")
                } else if (hairUserData.hairLength === 'Long') {
                    endDate = moment(hairUserData.appointmentDate).add(1, 'hours').format("YYYY-MM-DD[T]HH:mm:ss")
                }
            }

            await createAppointment({
                variables: {
                    userId: hairUserData.stylist,
                    name: hairUserData.service,
                    start: moment(hairUserData.appointmentDate).format("YYYY-MM-DD[T]HH:mm:ss"),
                    end: endDate,
                    title: appointmentName
                }
            })
        }
    }


    const onDateInputUpdate = (date) => {
        setStartDate(date)
        setHairUserData({
            ...hairUserData,
            appointmentDate: date.toISOString()
        })
    }

    // const date = hairUserData.appointmentDate.toISOString()
    // console.log(data)
    // console.log(date)
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <p>Hair Length:</p>
                <div>
                    <label htmlFor="hair-short">
                        <input type="radio" id="hair-short" name="hairLength" value="Short" onChange={handleChange} checked={hairUserData.hairLength === 'Short'} />
                        Short
                    </label>
                </div>
                <div>
                    <label htmlFor="hair-medium">
                        <input type="radio" id="hair-medium" name="hairLength" value="Medium" onChange={handleChange} checked={hairUserData.hairLength === 'Medium'} />
                        Medium
                    </label>
                </div>
                <div>
                    <label htmlFor="hair-long">
                        <input type="radio" id="hair-long" name="hairLength" value="Long" onChange={handleChange} checked={hairUserData.hairLength === 'Long'} />
                        Long
                    </label>
                </div>
                <p>Service:</p>
                <div>
                    <label htmlFor="hair-cut">
                        <input type="radio" id="hair-cut" name="service" value="Cut" onChange={handleChange} checked={hairUserData.service === 'Cut'} />
                        Cut
                    </label>
                </div>
                <div>
                    <label htmlFor="hair-colour">
                        <input type="radio" id="hair-colour" name="service" value="Colour" onChange={handleChange} checked={hairUserData.service === 'Colour'} />
                        Colour
                    </label>
                </div>
                <div>
                    <p>Stylist:</p>
                    <select name="stylist" id="stylist" value={hairUserData.stylist} onChange={handleChange}>
                        <option key="0" value="none">None</option>
                        {data.hairdressers.map(stylist => (
                            <option key={stylist._id} value={stylist._id}>
                                {stylist.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Appointment Date:</p>
                    <DateTimePicker format="y-MM-dd h:mm a" selected={startDate} value={startDate} onChange={onDateInputUpdate} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}

export default SurveyPage;