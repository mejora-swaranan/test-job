import React from "react";
import { Table } from 'reactstrap';
import TableStyle from "./../table.module.scss";
import {testi_review_market, testi_review_others} from './../../../data/Data';
import styles from './../../../assets/scss/custom.module.scss';
import './testimonialtable.scss';

const TestimonialTable = () => {
    return (
        <>
            <Table className={`${TableStyle.commonCustomtable} testimonial-table`}>
                <thead>
                    <tr>
                        <th>
                            TESTIMONIAL TYPE
                        </th>
                        <th>
                            REVIEW
                        </th>
                        <th>
                            TESTIMONIAL URL
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Acc Marketplace
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <select className={`${styles.selectdropdown}`}>
                                    {testi_review_market.map((reviewMarketDetails, index) => (
                                        <option key={index} value={index + 1}>
                                            {reviewMarketDetails.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Google
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <select className={`${styles.selectdropdown}`}>
                                    {testi_review_others.map((reviewOthersDetails, index) => (
                                        <option key={index} value={index + 1}>
                                            {reviewOthersDetails.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Video
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <select className={`${styles.selectdropdown}`}>
                                    {testi_review_others.map((reviewOthersDetails, index) => (
                                        <option key={index} value={index + 1}>
                                            {reviewOthersDetails.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Case Study
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <select className={`${styles.selectdropdown}`}>
                                    {testi_review_others.map((reviewOthersDetails, index) => (
                                        <option key={index} value={index + 1}>
                                            {reviewOthersDetails.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <textarea></textarea>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Other
                        </td>
                        <td>
                            <div className={styles.tableinpuTWrap}>
                                <select className={`${styles.selectdropdown}`}>
                                    {testi_review_others.map((reviewOthersDetails, index) => (
                                        <option key={index} value={index + 1}>
                                            {reviewOthersDetails.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
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

export default TestimonialTable;