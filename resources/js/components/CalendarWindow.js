import {Modal, Button, Form} from 'react-bootstrap';
import { useState } from 'react';


export default function ModalWindow() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = event => {

        // event.preventDefault();
        console.log('here')
        
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
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary"  type="submit" onClick={handleSubmit}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}