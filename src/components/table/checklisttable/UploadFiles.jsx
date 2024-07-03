import React, { useState, useRef } from 'react';
import Swal from "sweetalert2";
import { FaUpload, FaTrashAlt } from 'react-icons/fa';
import styles from './../../../assets/scss/custom.module.scss';

const UploadFiles = () => {
    const [fileName, setFileName] = useState('');
    const fileInput = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "success",
                text: "File uploaded successfully.",
                showConfirmButton: true,
                confirmButtonText: "Ok"
            });
        }
    };

    const handleDeleteFile = () => {
        setFileName('');
        if (fileInput.current) {
            fileInput.current.value = null;
        }
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Delete",
            text: "File removed successfully.",
            showConfirmButton: true,
            confirmButtonText: "Ok"
        });
    };

    const handleUploadButtonClick = () => {
        fileInput.current.click();
    };

    return (
        <div className="upload-btn-wrap d-flex justify-content-end align-items-center">
            {fileName && (
                <p className="uploaded-file-name" style={{ margin: '0 5px 0 0' }}>{fileName}</p>
            )}
            <ul className={`${styles.btngroupwrap} ${styles.btnWithmargin} d-flex justify-content-end align-items-center list-no-padding`}>
                {fileName && (
                    <li>
                        <button
                            type="button"
                            className={`${styles.btnPrimary} red-bg delete-btn added-icon`}
                            onClick={handleDeleteFile}
                        >
                            <FaTrashAlt />
                        </button>
                    </li>
                )}
                <li>
                    <button
                        type="button"
                        className={`${styles.btnPrimary} added-icon`}
                        onClick={handleUploadButtonClick}
                        aria-label="Upload File"
                    >
                        <FaUpload />
                    </button>
                    <input
                        type="file"
                        ref={fileInput}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </li>
            </ul>
        </div>
    );
};

export default UploadFiles;
