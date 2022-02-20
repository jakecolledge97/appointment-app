import './survey.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_HAIRSTYLIST } from '../../utils/queries';
import DatePicker from "react-datepicker";
import DateTimePicker from 'react-datetime-picker';


const SurveyPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [hairUserData, setHairUserData] = useState({ hairLength: 'Short', service: 'Cut', stylist: '', appointmentDate: startDate })
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
    // console.log(data)
    console.log(hairUserData)
    return (
        <>
            <form>
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