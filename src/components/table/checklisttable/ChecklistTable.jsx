import React from "react";
import { Table } from 'reactstrap';
import TableStyle from "./../table.module.scss";
import styles from './../../../assets/scss/custom.module.scss';
import './checkliststyle.scss';

const ChecklistTable = () => {
    return (
        <>
            <Table className={`${TableStyle.commonCustomtable} checklist-table no-border`}>
                <tbody>
                    <tr>
                        <td>
                            Summary
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Credit Limit
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Funds Needed
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default ChecklistTable;