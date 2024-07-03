import React from 'react';
import { Link } from "react-router-dom";
import Style from "./../../../assets/scss/custom.module.scss";

const AccessPageAction = ({ 
    subheading, 
    alluser, 
    allUserTitle,
    createuser, 
    createUserTitle,
    deactivate, 
    deactivateTitle,
    deleteuser, 
    deleteUserTitle,
}) => {
    return (
        <>        
            <div className="row mb-2 mx-0">
                <div className="col-12 sales-page-title-wrap sub-heading-blog-wrap pb-2">
                    <div className="row box-heading">
                        <div className="col-md-4 d-flex flex-wrap align-items-center">
                            <h2>{subheading}</h2>
                        </div>
                        <div className="col-md-8">
                            <ul className={`${Style.searchOptionWrap} d-flex flex-wrap align-items-center justify-content-end`}>
                                {alluser &&
                                    <li className="my-1">
                                        <Link to={alluser} className="btn btn-blue">
                                            {allUserTitle}
                                        </Link>
                                    </li>
                                }
                                {createuser &&
                                    <li className="my-1">
                                        <Link
                                            to={createuser} className="btn btn-primary">
                                            {createUserTitle}
                                        </Link>
                                    </li>
                                }
                                {deactivate &&
                                    <li className="my-1">
                                        <Link to={deactivate} className="btn btn-warning">
                                            {deactivateTitle}
                                        </Link>
                                    </li>
                                }
                                {deleteuser &&
                                    <li className="my-1">
                                        <Link to={deleteuser} className="btn btn-danger">
                                            {deleteUserTitle}
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
};

export default AccessPageAction;