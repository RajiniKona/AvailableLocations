import { React, useState, useRef } from 'react';
import { TimePicker } from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './NewLocation.css';
import Axios from 'axios';
function NewLocation({ showLocation}) {
    const [startvalue, onStartChange] = useState('10:00');
    const [endValue, onEndChange] = useState('13:00');
    const location = useRef();
    const [data, setData] = useState({
        startTime: '',
        endTime: '',
        location: ''
    })

    const handleSave = (e) => {
        e.preventDefault();
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        newdata.startTime = startvalue;
        newdata.endTime = endValue;
        newdata.location = location.current.value;
        setData(newdata);
        const url = "http://localhost:5264/api/location?startTime=" + newdata.startTime + "&endTime=" + newdata.endTime + "&location=" + newdata.location;
        Axios.post(url).then(res => {
            location.current.value = '';
            showLocation(false);
        }).catch(function (error) {
            console.log("error");
        }
        );
       
    }

    const handleCancel = () => {
        showLocation(false);
    }
    return (
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Start Time : </label>
                    <TimePicker onChange={onStartChange} value={startvalue} />
                </p>
                <p>
                    <label>End Time : </label>
                    <TimePicker onChange={onEndChange} value={endValue} />
                </p>
                <p>
                    <label>Location : </label>
                    <input type="text" id="locationInput" placeholder="location" ref={location} required></input>
                </p>
            </div>
            <div>
                <button className="px-6 py-2 rounded-md btn btn-primary text-stone-50" onClick={handleSave}>Save</button>
            </div>
            <div class="p-4">
                <button className="p-6 py-2 rounded-md btn btn-primary text-stone-50" onClick={handleCancel}>Cancel</button>
            </div>
        </section>

    )
}

export default NewLocation;