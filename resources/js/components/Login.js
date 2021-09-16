import React from 'react';
import toast,  { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie"
import ReactDOM from 'react-dom';

export default function Login() {

    const onSubmit = async event => {

        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value

        if (!email) {
            const notify = () => toast.error('Invalid email!');
            return notify();
        }
        if (!password) {
            const notify = () => toast.error('Invalid password!');
            return notify();
        }

        const data = {
            email,
            password
        }
        
        axios.post('/api/user/login', data)
        .then(response => {

            const data = response.data

            Cookies.set('token', data.token)
            toast.success(data.message);
            window.location.pathname = '/'
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
    
    return (
        <div className="container min-vh-100 d-flex justify-content-center">
            <Toaster />
            <div className="col-md-4 col-md-offset-3 d-flex">
                <form className="h-50 w-100 align-self-center" onSubmit={onSubmit}>
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" required/>
                    </div>
                    <div className="row justify-content-around">
                        <button type="submit" className="btn btn-primary">Log in</button>
                        <a href="/signup" className="form-text">Sign up</a>
                    </div>              
                </form>
            </div>
        </div>
    );
}

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
