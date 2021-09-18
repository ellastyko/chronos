import {Modal, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios'


export default function ModalWindow() {

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

        })
        .then(response => {

        })
        .catch(error => {

        })
        handleClose();
    }

    return (
        <>
            <button className="btn " onClick={handleShow} style={{ width: "200px", minHeight: "192px"}}>
                <img src="/media/add.png" className=""/>    
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Calendar title</Form.Label>
                            <Form.Control type="text" id="calendarTitle" placeholder="Enter calendar title" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select id="calendarType" aria-label="Default select example">
                                <option>Type of Calendar</option>
                                <option value="arrangement">Arrangement</option>
                                <option value="reminder">Reminder</option>
                                <option value="task">Task</option>
                            </Form.Select>
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