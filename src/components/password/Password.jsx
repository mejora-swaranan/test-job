import React, { useState } from 'react';
import Style from './../profile/profile.module.scss';
import { FaCheck, FaInfoCircle } from "react-icons/fa";

const Password = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordValid, setPasswordValid] = useState(false);

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password should be min 8 characters.");
        }
        if (!/\d/.test(password)) {
            errors.push("Password should contain at least one digit.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password should contain at least one capital letter.");
        }
        if (!/\W/.test(password)) {
            errors.push("Password should contain at least one special character.");
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (name === 'newPassword') {
            const errors = validatePassword(value);
            setPasswordErrors(errors);
            setPasswordValid(errors.length === 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!oldPassword.trim()) {
            setError('Old password is required');
            return;
        }
        // Replace this with actual validation logic
        if (oldPassword !== 'Password@321') {
            setError('Invalid old password');
            return;
        }

        if (!newPassword.trim()) {
            setError('New password is required');
            return;
        }

        if (!confirmPassword.trim()) {
            setError('Confirm password is required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password did not match');
            return;
        }

        // If all validations pass, show success message and reset fields
        setSuccessMessage('Your password has been successfully changed');
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setError('');
        setPasswordErrors([]);
        setPasswordValid(false);
    };

    return (
        <div className="profile-form">
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className={`${Style.inputField} form-group d-flex flex-wrap align-items-center mb-3`}>
                    <label htmlFor="oldPassword" className='col-12 col-md-5 pt-1 pb-1'>Old Password</label>
                    <input 
                        type="password" 
                        id="oldPassword"
                        name="oldPassword"
                        placeholder='Old Password' 
                        className='col-12 col-md-7'
                        value={formData.oldPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className={`${Style.inputField} form-group d-flex flex-wrap align-items-center mb-3`}>
                    <label htmlFor="newPassword" className='col-12 col-md-5 pt-1 pb-1'>New Password</label>
                    <input 
                        type="password" 
                        id="newPassword"
                        name="newPassword"
                        placeholder='New Password' 
                        className='col-12 col-md-7'
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                    <div className="col-12 col-md-7 offset-md-5">
                        {passwordErrors.length > 0 
                            ? passwordErrors.map((err, index) => (
                                <small key={index} className='mt-1' style={{ display: "block", color: "#ff0000" }}>
                                    <FaInfoCircle /> {err}
                                </small>
                            )) 
                            : passwordValid && <small style={{ color: "#14bc96" }}><FaCheck /> Password is okay</small>
                        }
                    </div>
                </div>
                <div className={`${Style.inputField} form-group d-flex flex-wrap align-items-center mb-5`}>
                    <label htmlFor="confirmPassword" className='col-12 col-md-5 pt-1 pb-1'>Confirm New Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Confirm New Password' 
                        className='col-12 col-md-7'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className={`${Style.inputField} form-group d-flex flex-wrap justify-content-center`}>
                    <button type="submit" className={`${Style.updateBtn} btn btn-primary`}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default Password;
