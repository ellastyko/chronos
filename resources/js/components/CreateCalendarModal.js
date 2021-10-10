import {Modal, Button, Form, FloatingLabel} from 'react-bootstrap';
import toast,  { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';


export default function CreateCalendarWindow(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = event => {

        event.preventDefault();
        
        const data = {
            title: event.target.calendarTitle.value,
            type: event.target.calendarType.value
        }
        axios.post('/api/calendars', data, {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token')
            }
        })
        .then(response => {
            const data = response.data
            props.changeCalendars(calendar => [...calendar, data.calendar])
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
            <button className="btn " onClick={handleShow} style={{ width: "200px", minHeight: "192px"}}>
                <img src="/media/add.png" className=""/>    
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Calendar title</Form.Label>
                            <Form.Control type="text" id="calendarTitle" placeholder="Enter calendar title" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FloatingLabel controlId="calendarType" label="Type of Calendar">
                                <Form.Select id="calendarType" aria-label="Default select example">
                                    <option value="arrangement">Arrangement</option>
                                    <option value="reminder">Reminder</option>
                                    <option value="task">Task</option>
                                </Form.Select>
                            </FloatingLabel>
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