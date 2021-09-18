import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import ModalWindow from './ModalWindow.js';


export default function Main() {

    const [date, changeDate] = useState(new Date());
    const calendars = useState([])
    const events = useState([])


    const onChange = value => {

        changeDate(value)
    }

    const onLogout = event => {
        Cookies.remove('token')
        window.location.pathname = '/login'
    }


    return (
        <div className="w-100 vh-100 d-flex">
      
            <div className="d-flex flex-column justify-content-around bg-light h-100 shadow" style={{ width: "5.0rem"}}>
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
                    <button className="btn m-2 text-center" style={{ minWidth: "220px"}}>
                        <h5 className="display-6">My calendar</h5>
                        <hr className="m-2 "/>
                        <img src="/media/myschedule.png" className="" alt="My calendar"/>    
                    </button>
                    <button className="btn m-2" style={{ minWidth: "220px"}}>
                        <h5 className="display-6 text-center">Parties</h5>
                        <hr className="m-2"/>
                        <img src="/media/schedule.png" className=""/>    
                    </button>
                    <ModalWindow/>
                </div>
                
                {/* <Calendar
                    className="shadow rounded"
                    onChange={onChange}
                    value={date}
                /> */}
            </div>
        </div>
    );
}

if (document.getElementById('main')) {
    ReactDOM.render(<Main />, document.getElementById('main'));
}
