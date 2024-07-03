import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useBaseUrl } from '../../../../route/BaseUrlContext';

const UserManagementTableTest = () => {

    const [users, setUsers] = useState([]);
    // const { baseUrl } = useBaseUrl();

    useEffect(() => {
        // axios.get(`${baseUrl}/admin/users`)
        axios.get('http://43.204.210.62:9092/api/v1/admin/users')
            .then(response => {
                setUsers(response.data.data);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 
  
    return (
      <>
          <h1>User Management Table</h1>
          <table>
              <thead>
                  <tr>
                      <th>Display Name</th>
                  </tr>
              </thead>
              <tbody>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.displayName} - {user.primaryEmail} - {user.secondaryEmail}
                        </li>
                    ))}
              </tbody>
          </table>
      </>
    );
  };

export default UserManagementTableTest;