import React, { useState, useEffect, SetState } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import toast,  { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Register() {


    const onSubmit = async event => {

        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value
        const passwordRepeat = event.target.passwordRepeat.value
        
        if (!email) {
            const notify = () => toast.error('Invalid email!');
            return notify();
        }
        if (!password) {
            const notify = () => toast.error('Invalid password!');
            return notify();
        }
        if (password !== passwordRepeat) {
            
            const notify = () => toast.error('Passwords are different!');
            return notify();
        }

        const data = {
            email,
            password
        }
        
        axios.post('/api/user/register', data)
        .then(response => {
            toast.success(response.data.message);
            window.location.pathname = '/login'
        })
        .catch(error => {

            const errors = error.response.data?.errors;
            if (errors) {
                for (let i in errors) {
                    toast.error(errors[i]);
                } 
            }      
        })
    }

    return (
        <div className="container min-vh-100 d-flex justify-content-center">
            <Toaster />
            <div className="col-md-4 col-md-offset-3 d-flex col-xs-1">
                <form className="h-50 w-100 align-self-center" onSubmit={onSubmit} >
                    <p className="h4 mb-4 text-center">Chronos <img src="/media/logo.png"/> </p>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input 
                            required
                            type="email" 
                            className="form-control" 
                            id="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <input type="password" min="5" max="50" className="form-control" id="password" placeholder="Password" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" min="5" max="50" className="form-control" id="passwordRepeat" placeholder="Repeat Password" required/>
                    </div>
                    <div className="row justify-content-around">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                        <a href="/login" className="form-text">Already have account?</a>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
