import React, { useState } from "react";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from '../../../components/datepicker/ModalDatePicker';
import closeIcon from './../../../assets/images/icons/icon13.png';
import addIcon from './../../../assets/images/icons/plus.png';
import editIcon from './../../../assets/images/icons/icon9.png';
import TableStyle from "./../table.module.scss";
import styles from "./../../../assets/scss/custom.module.scss"
import Modalstyle from "./../../../assets/scss/modal.module.scss";

const FeeTable = (args) => {
    const [addFeeModal, setAddFeeModal] = useState(false);
    const addmodalfee = () => setAddFeeModal(!addFeeModal);
    const [editFeeModal, setEditFeeModal] = useState(false);
    const editmodalfee = () => setEditFeeModal(!editFeeModal);
    return (
        <>
            <Table className={TableStyle.commonCustomtable}>
                <thead>
                    <tr>
                        <th>
                            FEE ADJUST REPAY
                        </th>
                        <th>
                            FEE ADJUST TODAY
                        </th>
                        <th>
                            DATE
                        </th>
                        <th>
                            COMMENT
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            $123,456.00
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            09 Feb, 2024
                        </td>
                        <td>
                            <p>Hello, For testing</p>
                        </td>
                        <td>
                            <ul className={`${styles.btngroupwrap} d-flex justify-content-end align-items-center`}>
                                <li>
                                    <button className={`${styles.btnPrimary} added-icon`} onClick={editmodalfee}>
                                        <img src={editIcon} alt="editicon" width="20" height="20" />
                                    </button>
                                </li>
                                <li>
                                    <button className={`${styles.btnPrimary} added-icon`}>
                                        <img src={closeIcon} alt="closeicon" width="20" height="20" />
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            <ul className={`${styles.btngroupwrap} d-flex justify-content-end align-items-center`}>
                                <li>
                                    <button className={styles.btnPrimary} onClick={addmodalfee}>
                                        <img src={addIcon} alt="addicon" width="15" height="15" />
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tfoot>
            </Table>


            {/* for add fee modal */}
            <Modal isOpen={addFeeModal} toggle={addmodalfee} {...args}>
                <ModalHeader toggle={addmodalfee}>
                    FEE ADJUSTMENT
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    DATE:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <DatePicker />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    FEE ADJUSTMENT AMOUNT:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <input type="text" name="payment_amount" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    COMMENT:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <textarea></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={addmodalfee} className="btn btn-secondary radius-5">
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary radius-5">
                        Submit
                    </button>
                </ModalFooter>
            </Modal>
            
            {/* for edit fee modal */}
            <Modal isOpen={editFeeModal} toggle={editmodalfee} {...args}>
                <ModalHeader toggle={editmodalfee}>
                    UPDATE FEE ADJUSTMENT
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    FEE ADJUSTMENT AMOUNT:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <DatePicker />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    DATE:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <input type="text" name="payment_amount" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    COMMENT:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <textarea></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={editmodalfee} className="btn btn-secondary radius-5">
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary radius-5">
                        Submit
                    </button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default FeeTable;