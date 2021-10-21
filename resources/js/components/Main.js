import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { useState, useEffect} from 'react';
import axios from 'axios'

import CalendarWindow from './CalendarWindow.js';
import CreateCalendarModal from './CreateCalendarModal.js';


export default function Main() {

    const [calendars, changeCalendars] = useState([])

    const onLogout = event => {
        Cookies.remove('token')
        window.location.pathname = '/login'
    }

    useEffect(() => {

        axios.get('/api/calendars', {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token')
            }
        })
        .then(response => {
            changeCalendars(response.data.calendars)
        })
        .catch(error => {
            const errors = error.response.data?.errors;
            const message = error.response.data?.message;

            if (errors) 
                for (let i in errors) 
                    toast.error(errors[i]);   
            else 
                toast.error(message);       
        })   
    }, [])


    return (
        <div className="w-100 min-vh-100 d-flex">
      
            <div className="d-flex flex-column justify-content-around bg-light h-auto shadow" style={{ width: "5.0rem"}}>
                <a href="/" className="d-block p-4 link-dark text-decoration-none text-center" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <img src="/media/logo.png"/>    
                </a>
                
                <button onClick={onLogout} className="btn d-block p-4 text-center" >
                    <img src="/media/logout.png"/>    
                </button>
            </div>

            <div className="container">
                <h2 className="display-4 text-center my-3">Chronos calendars</h2>
                <div className="d-flex flex-wrap">
                    {
                        calendars.map(calendar => 
                            <CalendarWindow 
                                key={calendar.id} 
                                id={calendar.id} 
                                title={calendar.title} 
                                type={calendar.type}
                            />
                        )
                    }                 
                    <CreateCalendarModal changeCalendars={changeCalendars}/>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
