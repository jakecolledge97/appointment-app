import './survey.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_HAIRSTYLIST } from '../../utils/queries';
import {CREATE_APPOINTMENT} from '../../utils/mutations';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


const SurveyPage = () => {
    const [createAppointment, {appointmentError}] = useMutation(CREATE_APPOINTMENT)
    const [startDate, setStartDate] = useState(new Date());
    const [hairUserData, setHairUserData] = useState({ hairLength: 'Short', service: 'Cut', stylist: '', appointmentDate: startDate, appointmentEnd: '' })
    const { loading, error, data } = useQuery(QUERY_HAIRSTYLIST);

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
        if(!hairUserData.hairLength || !hairUserData.service || !hairUserData.stylist || !hairUserData.appointmentDate){
            return "You must fill out the form"
        }else{
            if(hairUserData.hairLength === 'Short'){
                setHairUserData(
                    {
                        ...hairUserData, 
                        appointmentEnd: moment(hairUserData.appointmentDate.toISOString()).add(0.25, 'hours').format()
                    })
            }else if(hairUserData.hairLength === 'Medium'){
                setHairUserData(
                    {
                        ...hairUserData, 
                        appointmentEnd: moment(hairUserData.appointmentDate.toISOString()).add(0.5, 'hours').format()
                    })
            }else if(hairUserData.hairLength === 'Long'){
                setHairUserData(
                    {
                        ...hairUserData, 
                        appointmentEnd: moment(hairUserData.appointmentDate.toISOString()).add(1, 'hours').format()
                    })
            }
            await createAppointment({
                variables: {
                    userId: hairUserData.stylist,
                    name: hairUserData.service,
                    start: hairUserData.appointmentDate,
                    end: hairUserData.appointmentEnd
                }
            })
        }
    }
    const date = moment(hairUserData.appointmentDate.toISOString()).add(0.5, 'hours').format()
    // const date = hairUserData.appointmentDate.toISOString()
    // console.log(data)
    console.log(date)
    console.log(hairUserData.appointmentDate)
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
                            <option key={stylist._id} value={stylist.username}>
                                {stylist.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Appointment Date:</p>
                    <DateTimePicker format="y-MM-dd h:mm" selected={hairUserData.appointmentDate} value={hairUserData.appointmentDate} onChange={(date) => setHairUserData({ ...hairUserData, appointmentDate: date })} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
}

export default SurveyPage;