import React, { useState, useRef } from 'react';
import { Table } from 'reactstrap';
import TableStyle from "./../table.module.scss";
import styles from './../../../assets/scss/custom.module.scss';
import { select_question } from "./../../../data/Data";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import './checkliststyle.scss';

const SelectqstTable = () => {
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [customQuestion, setCustomQuestion] = useState('');
    const [fileName, setFileName] = useState('');
    const fileInput = useRef(null);

    const handleQuestionClick = (questionId) => {
        setSelectedQuestionId(prevId => (prevId === questionId ? null : questionId));
    };

    const handleUploadButtonClick = () => {
        fileInput.current.click();
    };

    const handleFileChange = (event) => {
        setFileName(event.target.files[0].name);
    };

    const handleDeleteFile = () => {
        setFileName('');
        if (fileInput.current) {
            fileInput.current.value = null;
        }
    };

    const handleCustomQuestionChange = (event) => {
        setCustomQuestion(event.target.value);
    };

    const handleAddQuestion = () => {
        if (customQuestion.trim()) {
            setCustomQuestion('');
        }
    };

    return (
        <>
            <Table className={`${TableStyle.commonCustomtable} checklist-table no-border mb-5`}>
                <thead>
                    <tr>
                        <td>QUESTIONS:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="addquestions-wrap">
                                <p><strong>QUESTION:</strong> Can you please confirm if you are operating as a sole trader or under a company structure? If you use a company structure can you please confirm the full legal name of your business entity?</p>                                
                            </div>
                            <div className="question-wrap-area">
                                <label htmlFor="customer-response">CUSTOMER RESPONSE:</label>
                                <textarea id="customer-response" name="customer-response"></textarea>                                
                            </div>
                            <div className="upload-btn-wrap d-flex justify-content-end align-items-center">
                                {fileName && <p className='uploaded-file-name' style={{margin: "0 5px 0 0"}}>{fileName}</p>}
                                <ul className={`${styles.btngroupwrap} ${styles.btnWithmargin} d-flex justify-content-end align-items-center list-no-padding`}>
                                    {fileName && 
                                        <li>
                                            <button type='button' className={`${styles.btnPrimary} red-bg delete-btn added-icon`} onClick={handleDeleteFile}>
                                                <FaTrashAlt />
                                            </button>
                                        </li>
                                    }                                             
                                    <li>
                                        <button type='button' className={`${styles.btnPrimary} added-icon`} onClick={handleUploadButtonClick} aria-label="Upload File">
                                            <FaUpload />
                                        </button>
                                        <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} />
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table className={`${TableStyle.commonCustomtable} checklist-table select-question-table no-border`}>
                <thead>
                    <tr>
                        <td>SELECT QUESTIONS:</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="addquestion">                                
                                <div className={styles.comment_box_wrap}>
                                    <textarea value={customQuestion} onChange={handleCustomQuestionChange}></textarea>
                                </div>
                                <button className='btn btn-primary' onClick={handleAddQuestion}>
                                    ADD QUESTION
                                </button>
                            </div>
                            <div className="seclect-question-wrap mt-3 mb-3">
                                <ul>
                                    {select_question.map((qstData) => (
                                        <li key={qstData.id}>
                                            <div className="content-wrap">
                                                <input type="checkbox" id={`question-${qstData.id}`} />
                                                <label
                                                    htmlFor={`question-${qstData.id}`}
                                                    className={`fw-bold px-1 ${selectedQuestionId === qstData.id ? 'selected' : ''}`}
                                                    onClick={() => handleQuestionClick(qstData.id)}
                                                >
                                                    {qstData.name}:
                                                </label>
                                                <span
                                                    className={`sales-question-list ${selectedQuestionId === qstData.id ? 'd-none' : ''}`}
                                                    onClick={() => handleQuestionClick(qstData.id)}
                                                >
                                                    {qstData.content}
                                                </span>
                                            </div>
                                            <textarea
                                                name={`question-${qstData.id}`}
                                                className={`sales-question-list-dynamic ${selectedQuestionId === qstData.id ? '' : 'd-none'}`}
                                                defaultValue={qstData.content}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default SelectqstTable;
