import React, { useState } from 'react';
import { FaExclamationTriangle, FaCheckSquare } from "react-icons/fa";
import './promocode.scss';

const PromoCode = ({promotitle, promoplaceholder}) => { 
    const [promoCode, setPromoCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [succMessage, setSuccMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
        setErrorMessage('');
    };

    const handleSubmit = () => {
        if (promoCode.trim() === 'Code123') {
            setSubmitted(true);
            setErrorMessage('');
            setSuccMessage(<><FaCheckSquare /> Promo code applied</>);
        } else {
            setErrorMessage(<><FaExclamationTriangle /> Not a valid promo code.</>);
            setSuccMessage('');
        }
    };
    return (
        <>
            <div className="promocode-input-wrap mt-2 mb-2">
                <div className="promocode-input-group">
                    <div className="promocode-input">
                        <span>{promotitle}</span>
                        <input 
                            type="text" 
                            placeholder={promoplaceholder} 
                            value={promoCode} 
                            onChange={handlePromoCodeChange}
                        />
                        <button 
                            type='submit' 
                            className='btn-primary btn' 
                            onClick={handleSubmit}
                            disabled={!promoCode.trim()}
                        >
                            Apply
                        </button>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {submitted && <p className="success-message">{succMessage}</p>}
                </div>
            </div>
        </>
    );
};

export default PromoCode;