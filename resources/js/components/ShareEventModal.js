import { Modal, Button } from 'react-bootstrap';
import toast,  { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import ReactSearchBox from "react-search-box";

export default function ShareEventModal(props) {

    const [options, setOptions] = useState([])
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onSearch = keyword => {
        axios.get('/api/users', {
            params: {
                search: keyword
            }
        })
        .then(response => { 

            let options = []
            for (let user of response.data) 
                options.push({ value: user.email, key: user.email, id: user.id })           
            setOptions(options) 
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
    } 


    const handleInvite = selected => {
        
        axios.post('/api/calendars/invite', {
            invited_user: selected.item.id,
            calendar_id: props.calendar_id
        }, {
            headers: { 
                'Authorization': `Bearer ` + Cookies.get('token')
            }
        })
        .then(response => { 
            toast.success(response.data.message);
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
                Share
            </button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Share Calendar with people</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactSearchBox
                        placeholder="Placeholder"
                        onChange={onSearch}
                        data={options}
                        onSelect={handleInvite}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}