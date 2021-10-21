import {Modal, Button} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import toast,  { Toaster } from 'react-hot-toast';

import AddEventModal from './AddEventModal';
import ShareEventModal from './ShareEventModal';


export default function CalendarWindow(props) {

    const [date, changeDate] = useState(new Date());
    const [events, setEvents] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {

        
        axios.get(`/api/calendars/${props.id}/events`, {
            params: {
                date: new Date(date).toLocaleDateString('en-GB')
            },
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token')
            }
        })
        .then(response => {
            setEvents(response.data.events)
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

    }, [date])

    return (
        <>
            <Toaster/>

            <button className="btn m-2" onClick={handleShow} style={{ minWidth: "220px"}}>
                <h5 className="display-6 text-center">{props.title}</h5>
                <hr className="m-2"/>
                <img src="/media/schedule.png"/>    
            </button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex">
                    
                    <Calendar
                        className="shadow rounded w-50 mx-3"
                        onChange={changeDate}
                        value={date}
                    />
                    <div className="w-50">
                        <h4>Events</h4>
                        {
                            events.map(event => 
                                <p key={event.id}>
                                    <span className="fst-italic text-muted me-2">{event.time}
                                    </span>{event.title}
                                </p>
                            )
                        }    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ShareEventModal calendar_id={props.id}/>
                    
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <AddEventModal changeEvents={setEvents} date={date} calendar_id={props.id}/>
                </Modal.Footer>
            </Modal>
        </>
    )
}