import React, { useState } from "react";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from '../../../components/datepicker/ModalDatePicker';
import { payment_status } from "../../../data/Data";
import addIcon from './../../../assets/images/icons/plus.png';
import editIcon from './../../../assets/images/icons/icon9.png';
import closeIcon from './../../../assets/images/icons/icon13.png';
import TableStyle from "./../table.module.scss";
import styles from "./../../../assets/scss/custom.module.scss"
import Modalstyle from "./../../../assets/scss/modal.module.scss";

const PaymentsTable = (args) => {
    const [addPayModal, setAddPayModal] = useState(false);
    const addmodalpay = () => setAddPayModal(!addPayModal);
    const [editPayModal, setEditPayModal] = useState(false);
    const editmodalpay = () => setEditPayModal(!editPayModal);
    return (
        <>
            <Table className={`${TableStyle.commonCustomtable} header-bg-primary`}>
                <thead>
                    <tr>
                        <th>
                            DATE
                        </th>
                        <th>
                            AMOUNT
                        </th>
                        <th>
                            TYPE
                        </th>
                        <th>
                            XERO STATUS
                        </th>
                        <th>
                            GOCARDLESS STATUS
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            14 Feb, 2024
                        </td>
                        <td>
                            $466.00
                        </td>
                        <td>
                            Entered
                        </td>
                        <td>
                            FT ENTERED - Pending
                        </td>
                        <td>
                            FT ENTERED - Pending
                        </td>
                        <td>
                            <ul className={`${styles.btngroupwrap} d-flex justify-content-end align-items-center`}>
                                <li>
                                    <button className={`${styles.btnPrimary} added-icon`} onClick={editmodalpay}>
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
                        <td colSpan={3}>
                            <strong>Total Payment</strong> $466.00
                        </td>
                        <td colSpan={3}>
                            <ul className={`${styles.btngroupwrap} d-flex justify-content-end align-items-center`}>
                                <li>
                                    <button className={`${styles.btnPrimary} added-icon`} onClick={addmodalpay}>
                                        <img src={addIcon} alt="addicon" width="15" height="15" />
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tfoot>
            </Table>


            
            {/* for add payment modal */}
            <Modal isOpen={addPayModal} toggle={addmodalpay} {...args}>
                <ModalHeader toggle={addmodalpay}>
                    ADD PAYMENT
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    Payment Date:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <DatePicker />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    Payment Amount:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <input type="text" name="payment_amount" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    Payment Status:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <select name="payment_status">
                                        {payment_status && payment_status.map((element) => (
                                            <option key={element.id} value={element.value}>{element.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={addmodalpay} className="btn btn-secondary radius-5">
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary radius-5">
                        Submit
                    </button>
                </ModalFooter>
            </Modal>

            {/* for edit payment modal */}
            <Modal isOpen={editPayModal} toggle={editmodalpay} {...args}>
                <ModalHeader toggle={editmodalpay}>
                    UPDATE PAYMENT
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    Payment Date:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <DatePicker />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    Payment Amount:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <input type="text" name="payment_amount" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className={Modalstyle.modalInputwrap}>
                                <label htmlFor="" className="form-label">
                                    Payment Status:
                                </label>
                                <div className={Modalstyle.formInput}>
                                    <select name="payment_status">
                                        {payment_status && payment_status.map((element) => (
                                            <option key={element.id} value={element.value}>{element.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button type="button" onClick={editmodalpay} className="btn btn-secondary radius-5">
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

export default PaymentsTable;