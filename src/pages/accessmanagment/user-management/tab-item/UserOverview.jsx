import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useBaseUrl } from '../../../../route/BaseUrlContext';
import Gravatar from 'react-gravatar';
import "../../accessmanagement.scss";

export default function UserOverview() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { baseUrl } = useBaseUrl();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${baseUrl}/admin/users/${userId}`);
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                Swal.fire({
                    title: 'Error',
                    text: error,
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, baseUrl]);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (!user) {
      return <div>No user found.</div>;
   }
   const getStatusClass = (value) => ( value === true ? "bg-success" : "bg-danger");
   const getStatusText = (value) => ( value === true ? "Active" : "In Active");
   const getConfirmedText = (value) => (value === "true" || value === true ? "Yes" : "No");
   const getConfirmedPh = (value) => (value === "true" || value === true ? <FaCheckCircle /> : <FaInfoCircle />);
   const getConfirmedPhClass = (value) => (value === "true" || value === true ? "text-success" : "text-danger");
   
   const formatTimeDifference = (updatedDate) => {
        const currentDate = new Date();
        const updatedDateTime = new Date(updatedDate);
        const timeDiff = Math.abs(currentDate - updatedDateTime);

        const secondsDiff = Math.floor(timeDiff / 1000);
        const minutesDiff = Math.floor(secondsDiff / 60);
        const hoursDiff = Math.floor(minutesDiff / 60);
        const daysDiff = Math.floor(hoursDiff / 24);

        if (secondsDiff < 60) {
            return `(${secondsDiff} seconds ago)`;
        } else if (minutesDiff < 60) {
            return `(${minutesDiff} minutes ago)`;
        } else if (hoursDiff < 24) {
            return `(${hoursDiff} hours ago)`;
        } else {
            return `(${daysDiff} days ago)`;
        }
    };

    const formatDate = (value) => {
        const date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        const hours = date.toLocaleString('default', { hour: '2-digit', hour12: false });
        const minutes = date.toLocaleString('default', { minute: '2-digit' });
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    return (
        <div className="col-md-12 sale-leade-form Acces_mngmnt mt-3">
            <form>
                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Profile Picture</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            <Gravatar 
                                email={user.primaryEmail} 
                                size={100} rating="pg" 
                                default="monsterid" 
                                className="img-thumbnail" 
                            />
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Full Name</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">{user.firstName} {user.middleName} {user.lastName}</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Email Address</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            <Link to={`mailto:${user.primaryEmail}`}>{user.primaryEmail}</Link>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Email Confirmed</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            <span className={`${getStatusClass(user.isConfirmed)} badge rounded-pill`}>{getConfirmedText(user.isConfirmed)}</span>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Contact Number</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            <Link to={`tel:${user.primaryContactNumber}`}>{user.primaryContactNumber}</Link> &nbsp;
                            <span className={`${getConfirmedPhClass(user.isPrimaryContactValidated)}`}>{getConfirmedPh(user.isPrimaryContactValidated)}</span>                            
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Account Status</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            <span className={`${getStatusClass(user.isActive)} badge rounded-pill`}>{getStatusText(user.isActive)}</span>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Created At</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            {formatDate(user.createdAt)} {formatTimeDifference(user.createdAt)}
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-4">
                        <div className="input-title">
                            <label>Last Updated At</label>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="view_user">
                            {formatDate(user.updatedAt)} {formatTimeDifference(user.updatedAt)}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
