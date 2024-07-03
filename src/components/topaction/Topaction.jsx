import React from 'react';
import Style from "./../../assets/scss/custom.module.scss";
import { FaLock, FaPencilAlt, FaPause, FaKey, FaSyncAlt, FaTimes } from "react-icons/fa";

const Topaction = () => {
    return (
        <>
            <ul className={`${Style.actioniconBtn} d-flex flex-wrap justify-content-end align-items-center`}>
                <li>
                    <button type="button" className="btn-primary">
                        <FaLock />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn-primary">
                        <FaPencilAlt />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn-primary">
                        <FaPause />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn-primary">
                        <FaKey />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn-primary">
                        <FaSyncAlt />
                    </button>
                </li>
                <li>
                    <button type="button" className="btn-secondary">
                        <FaTimes />
                    </button>
                </li>
            </ul>
        </>
    );
};

export default Topaction;