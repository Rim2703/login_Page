import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        let nameErr = '';
        let mobileErr = '';
        let emailErr = '';

        if (name.trim() === '') {
            nameErr = 'Please enter your name';
        }

        if (mobile.trim() === '') {
            mobileErr = 'Please enter your mobile number';
        } else if (!/^\d{10}$/.test(mobile)) {
            mobileErr = 'Please enter a valid mobile number';
        }

        if (email.trim() === '') {
            emailErr = 'Please enter your email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailErr = 'Please enter a valid email';
        }

        if (nameErr || mobileErr || emailErr) {
            setNameError(nameErr);
            setMobileError(mobileErr);
            setEmailError(emailErr);
            return;
        }

        console.log('Name:', name);
        console.log('Mobile:', mobile);
        console.log('Email:', email);

        // Submit form data to backend
        if (Object.keys(nameError, emailError, mobileError).length === 0) {
            axios
                .post("http://localhost:5000/login", { name, mobile, email })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="error">{nameError}</div>
                </div>
                <div className="form-control">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <div className="error">{mobileError}</div>
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="error">{emailError}</div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;


