import React, { useState } from 'react';
import { Table } from 'reactstrap';
import TableStyle from './../table.module.scss';
import styles from './../../../assets/scss/custom.module.scss';
import { select_question } from './../../../data/Data';
import './checkliststyle.scss';
import UploadFiles from './UploadFiles';

const SelectqstTable = () => {
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [customQuestion, setCustomQuestion] = useState('');
    const [questions, setQuestions] = useState(select_question);
    const [errorMessage, setErrorMessage] = useState('');

    const handleQuestionClick = (questionId) => {
        setSelectedQuestionId((prevId) => (prevId === questionId ? null : questionId));
    };


    const handleCustomQuestionChange = (event) => {
        setCustomQuestion(event.target.value);
        setErrorMessage('');
    };

    const handleAddQuestion = () => {
        if (customQuestion.trim()) {
            const newQuestion = {
            id: questions.length + 1,
            // name: `Custom Question ${questions.length + 1}`,
            content: customQuestion.trim(),
            };
            setQuestions([...questions, newQuestion]);
            setCustomQuestion('');
        } else {
            setErrorMessage('Please enter the question');
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
                            <p>
                                <strong>QUESTION:</strong> Can you please confirm if you are operating as a sole trader or under a company structure? If you use a company structure can you please confirm the full legal name of your business entity?
                            </p>
                        </div>
                        <div className="question-wrap-area">
                            <label htmlFor="customer-response">CUSTOMER RESPONSE:</label>
                            <textarea id="customer-response" name="customer-response"></textarea>
                        </div>                                  
                        <UploadFiles />
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
                                <textarea
                                value={customQuestion}
                                onChange={handleCustomQuestionChange}
                                placeholder="Type your custom question here"
                                ></textarea>
                            </div>
                            <button className="btn btn-primary" onClick={handleAddQuestion}>
                                ADD QUESTION
                            </button>
                            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                        </div>
                        <div className="seclect-question-wrap mt-3 mb-3">
                            <ul>
                                {questions.map((qstData) => (
                                    <li key={qstData.id}>
                                        <div className="row">
                                            <div className="col-sm-8">
                                                <div className="added-question-wrap">
                                                    <div className="content-wrap">
                                                        <input type="checkbox" id={`question-${qstData.id}`} />
                                                        <label
                                                            htmlFor={`question-${qstData.id}`}
                                                            className={`fw-bold px-1 ${selectedQuestionId === qstData.id ? 'selected' : ''}`}
                                                            onClick={() => handleQuestionClick(qstData.id)}
                                                        >
                                                            {qstData.name}
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
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="uploadfile">                                            
                                                    <UploadFiles />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="questbtn-group mt-3">
                                <button className="btn btn-primary rounded-2 m-2 ms-0">Send Question</button>
                                <button className="btn btn-primary rounded-2 m-2">Write Answer</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Table>
    </>
  );
};

export default SelectqstTable;
