import {Modal, Button, Form} from 'react-bootstrap';
import toast,  { Toaster } from 'react-hot-toast';
import TimePicker from 'react-time-picker';
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';


export default function AddEventModal(props) {

    const [hours, changeTime] = useState('10:00');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = event => {

        event.preventDefault();
        
        const data = {
            title: event.target.eventTitle.value,
            date: new Date(props.date).toLocaleDateString('en-GB') + ' ' + hours,
            calendar_id: props.calendar_id
        }

        axios.post('/api/events', data, {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token')
            }
        })
        .then(response => {
            const data = response.data
            props.changeEvents(events => [...events, response.data.event])
            toast.success(data.message);
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
        handleClose();
    }

    return (
        <>  
            <Toaster/>
            <button className="btn btn-primary" onClick={handleShow}>
                Create event
            </button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Event title</Form.Label>
                            <Form.Control type="text" id="eventTitle" placeholder="Enter event title" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose time for event</Form.Label>
                            <TimePicker
                                className="mx-2"
                                onChange={changeTime}
                                value={hours}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex justify-content-around">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>              
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}