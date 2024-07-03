import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInfoCircle, FaCheck } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import { associated_permissions_value } from "../../../data/Data";
import TablePagesTitle from "../../../components/table-pages-title/TablePagesTitle";
import AccessPageAction from "../page-action/AccessPageAction";
import { useBaseUrl } from '../../../route/BaseUrlContext';

const CreateUser = () => {
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const history = useNavigate();
  const { baseUrl } = useBaseUrl();

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const fetchActiveUsers = () => {
    axios
      .get("http://localhost:3030/activeUsers")
      .then((response) => {
        if (response.data && response.data.activeUsers) {
          setActiveUsers(response.data.activeUsers);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the active users!", error);
      });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password should be min 8 characters.");
    }
    if (!/\d/.test(password)) {
      errors.push("Password should contain at least one digit.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password should contain at least one capital letter.");
    }
    if (!/\W/.test(password)) {
      errors.push("Password should contain at least one special character.");
    }
    return errors;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    debugger;
    setNameError("");
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setPasswordError(errors);
    setPasswordValid(errors.length === 0);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordConfirmError("");
  };

  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleConfirmChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  const handleActiveEmailChange = (e) => {
    setIsEmail(e.target.checked);
  };

  const handleRolesChange = (e) => {
    const role = e.target.value;
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
    const checkedBoxes = document.querySelectorAll(
      'input[name="role"]:checked'
    );
    const labels = Array.from(checkedBoxes).map(
      (checkbox) => checkbox.labels[0].innerText
    );
    const rolesString = labels.join("\n");
    setRoles(rolesString + "\n");
  };

  // for submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!name) {
      setNameError("The Name field is required.");
      isValid = false;
    }

    if (!lastName) {
      setLastNameError("The Last field is required.");
      isValid = false;
    }

    if (!email) {
      setEmailError("The Email field is required.");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("The Email format is invalid.");
        isValid = false;
      } else if (
        activeUsers &&
        activeUsers.some((user) => user.email === email)
      ) {
        setEmailError("The email has already been taken.");
        isValid = false;
      }
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors);
      isValid = false;
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmError("Confirm Password do not match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Assuming you will send this data to your backend for storage
    // const fullName = `${name} ${middleName} ${lastName}`;
    const userData = {
      name,
      middleName,
      lastName,
      // fullName: fullName,
      email,
      password,
      status: isActive ? "1" : "0",
      active: isConfirmed ? "1" : "0",
      send_email: isEmail ? "1" : "0",
      deleteStatus: "no",
      roles,
      created: new Date().toISOString(),
      last_update: new Date().toISOString(),
    };
    console.log('12121', userData);
    localStorage.setItem('user',JSON.stringify(userData));
    // Example of POST request using Axios
    axios.post(`${baseUrl}/admin/users?status=active`, userData)
      .then((response) => {
        console.log("User created successfully:", response.data);
        fetchActiveUsers();
        setName("");
        setMiddleName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setIsActive(true);
        setIsConfirmed(true);
        setIsEmail(false);
        setRoles([]);
        setSelectedRoles([]);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });

    history("/access/user");
  };

  const handleCancel = () => {
    setName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError([]);
    setPasswordConfirmError("");
    setIsActive(true);
    setIsConfirmed(true);
    setIsEmail(false);
    setRoles([]);
    setSelectedRoles([]);

    history("/access/user");
  };

  return (
    <>
      <TablePagesTitle mainTitle="User Management" content="Create Users" />
      <AccessPageAction
        subheading="Create User"
        alluser="/access/user"
        allUserTitle="All Users"
        createuser="/access/user/create-user"
        createUserTitle="Create User"
        deactivate="/access/user/deactivated"
        deactivateTitle="Deactivated Users"
        deleteuser="/access/user/deleted"
        deleteUserTitle="Deleted Users"
      />
      <div className="row mb-3 mx-0">
        <div className="col-md-12 sale-leade-form mt-3">
          <form onSubmit={handleSubmit}>
            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Name</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleNameChange}
                    value={name}
                  />
                  {nameError && (
                    <div className="text-danger small">{nameError}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Middle Name</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Middle Name"
                    name="middle_name"
                    onChange={handleMiddleNameChange}
                    value={middleName}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Last Name</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    onChange={handleLastNameChange}
                    value={lastName}
                  />
                  {lastNameError && (
                    <div className="text-danger small">{lastNameError}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>E-mail Address</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="E-mail Address"
                    name="email"
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <div className="text-danger small">{emailError}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Password</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group-wrap">
                  <div className="input-group">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handlePasswordChange}
                      value={password}
                    />
                  </div>
                  {passwordError.length > 0
                    ? passwordError.map((error, index) => (
                        <div
                          key={index}
                          className="text-danger small"
                          style={{ display: "block", color: "#ff0000" }}
                        >
                          <FaInfoCircle /> {error}
                        </div>
                      ))
                    : passwordValid && (
                        <div className="small" style={{ color: "#14bc96" }}>
                          <FaCheck /> Password is okay
                        </div>
                      )}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Password Confirmation</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    name="password_confirm"
                    onChange={handlePasswordConfirmChange}
                    value={passwordConfirm}
                  />
                  {passwordConfirmError && (
                    <div className="text-danger small">
                      {passwordConfirmError}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label htmlFor="">Active</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="checkbox"
                    name="active"
                    checked={isActive}
                    onChange={handleActiveChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Confirmed</label>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="checkbox"
                    name="confirmed"
                    checked={isConfirmed}
                    onChange={handleConfirmChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Send Confirmation E-mail</label> <br />
                  <small>(If confirmed is off)</small>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="input-group">
                  <input
                    type="checkbox"
                    name="confirm_emil"
                    checked={isEmail}
                    onChange={handleActiveEmailChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-sm-4">
                <div className="input-title">
                  <label>Associated Roles</label>
                </div>
              </div>
              <div className="col-sm-8">
                {associated_permissions_value.map((data, index) => (
                  <div key={index} className="input-group element_gap mb-2">
                    <input
                      type="checkbox"
                      id={data.value}
                      name="role"
                      value={data.value}
                      onChange={handleRolesChange}
                      checked={selectedRoles.includes(data.value)}
                    />
                    <label htmlFor={data.value}>{data.label}</label>
                    <Link to="#">( Show Permissions )</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-sm-8 offset-sm-5 d-flex d-sm-block justify-content-center justify-content-sm-start">
                <button
                  type="button"
                  className="btn btn-red me-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
