import React, { useState } from 'react';
import { Table } from 'reactstrap';
import {customer_status} from './../../../data/Data';
import styles from './../../../assets/scss/custom.module.scss';
import "./event.scss";

const CustomerEventLog = () => {
    const [showDetails, setShowDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showDescription, setShowDescription] = useState(false);

    function toggleShow(index) {
        setShowDetails(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }
 
    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    // Define JSON data for the events
    const eventData = [
        {
            "title": "Loan",
            "content": {
                "Updated:": "",
                "Ownership Comment": <> From "vzxvzxvz" to "vzxvzxvz" </>,
                "": <>Corporate Test Corporate of ABC. trading(Customer) deleted <br/> <small>on 14th May, 2024 at 19:10:30</small></>,
            },
            "details": {
                "description": <><small>by "Reckon123" (Super-Admin) on 14th May, 2024 at 19:10:30</small></>
            }
        },
        {
            "title": "Updated",
            "content": {
                "Updated:": "",
                "Corporate Test Corporate of ABC. trading(Customer) deleted": "",
            },
            "details": {
                "description": <><small>by "Reckon123" (Super-Admin) on 14th May, 2024 at 19:10:30</small></>
            }
        },
        {
            "title": "Updated",
            "content": {
                "Updated:": "",
                "Corporate Test Corporate of ABC. trading(Customer) deleted": "",
            },
            "details": {
                "description": <><small>by "Reckon123" (Super-Admin) on 14th May, 2024 at 19:10:30</small></>
            }
        }
    ];

    // Filter event data based on search query
    const filteredEventData = eventData.filter(event => {
        const allContentKeys = Object.keys(event.content).map(key => key.toLowerCase());
        return allContentKeys.some(key => key.includes(searchQuery.toLowerCase()));
    });

    return (
        <>
            <div className="blog-input-wrap mb-5">
                <div className="row d-flex flex-wrap justify-content-sm-between">
                    <div className="col-12 col-sm-6 col-md-4">
                        <select className={`${styles.selectdropdown}`}>
                            {customer_status.map((customerlog, index) => (
                                <option key={index} value={customerlog.value}>
                                    {customerlog.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <input 
                            className={styles.textfield}
                            type="text" 
                            placeholder="Search by keyword..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </div>
                </div>
            </div>
            <div className={`event-section ${showDescription ? 'event-sec-wrap' : ''}`}>
                <Table bordered className={`${styles.tableForall} header-bg-primary event-table`}>
                    <thead>
                        <tr>
                            <th>
                                Event
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEventData.map((event, index) => (
                            <tr key={index}>
                                <td>
                                    <div className='content'>
                                        {event.title === "Loan" && Object.entries(event.content).map(([key, value]) => (
                                            <React.Fragment key={key}>
                                                <strong>{key}</strong> {value}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                        {event.title === "Updated" && Object.entries(event.content).map(([key, value]) => (
                                            <React.Fragment key={key}>
                                                <strong>{key}</strong>: {value}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                        <div className='content-desc'>
                                            <button className='show-desc-content' onClick={() => toggleShow(index)}>{showDetails[index] ? "Hide Details" : "Show Details"}</button>
                                            {showDetails[index] && (
                                                <div className="description-details">
                                                    {event.details.description}
                                                    <br />
                                                    {event.details.IP}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <button className='show-desc-content mt-2' onClick={toggleDescription}>{showDescription ? 'See Less' : 'See More'}</button>
        </>
    );
};

export default CustomerEventLog;