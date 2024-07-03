import React, { useState } from 'react';
import { Table } from 'reactstrap';
import styles from './../../../assets/scss/custom.module.scss';
import "./event.scss";

const Event = () => {
    const [showDetails, setShowDetails] = useState({});

    function toggleShow(index) {
        setShowDetails(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    // Define JSON data for the events
    const eventData = [
        {
            "title": "Loan",
            "content": {
                "Loan profitability_probability": "0.83415841002705",
                "Loan probability_not_past_due": "0.33",
                "Loan probability_two_weeks_past_due": "0.01",
                "Loan probability_four_or_more_weeks_past_due": "0.34"
            },
            "details": {
                "description": "Loan (#FT1006349) updated by 'Reckon1234' (Super-Admin) on 20th March, 2024 at 19:58:26",
                "IP": "103.94.84.156"
            }
        },
        {
            "title": "Updated",
            "content": {
                "Fee adjustment add": "From \"\" to \"Amount : 10 Date : 2024-03-07 02:19:59 Comment : test\""
            },
            "details": {
                "description": "Loan (#FT100639) updated by 'Reckon123' (Super-Admin) on 19th March, 2024 at 19:58:26",
                "IP": "103.94.84.156"
            }
        }
    ];

    return (
        <>
            <Table bordered className={`${styles.tableForall} header-bg-primary event-table`}>
                <thead>
                    <tr>
                        <th>
                            Event
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {eventData.map((event, index) => (
                        <tr key={index}>
                            <td>
                                <div className='content'>
                                    {event.title === "Loan" && Object.entries(event.content).map(([key, value]) => (
                                        <React.Fragment key={key}>
                                            <strong>{key}</strong> to "{value}"
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
        </>
    );
};

export default Event;