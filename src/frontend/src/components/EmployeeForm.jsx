import React, { useEffect, useState } from "react";
import EmployeeService from "../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

import profile1 from "../assets/images/womanOne.png";
import profile2 from "../assets/images/man.png";
import profile3 from "../assets/images/woman.png";
import profile4 from "../assets/images/programmer.png";
import { Link } from "react-router-dom";
import "../styles/Form.css";
import { toast } from "react-toastify";

const EmployeeForm = () => {
  const params = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    profilePic: "",
    gender: "",
    departments: [],
    salary: "",
    startDate: "",
    note: "",
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (params.id) {
      EmployeeService.fetchEmployeeById(params.id)
        .then((response) => {
          console.log(response);
          setEmployee({
            name: response.data.data.name,
            profilePic: response.data.data.profilePic,
            gender: response.data.data.gender,
            departments: response.data.data.departments,
            salary: response.data.data.salary,
            startDate: response.data.data.startDate,
            note: response.data.data.note,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setEmployee({ ...employee, [name]: value });
    console.log(value);
  };

  const navigate = useNavigate();
  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (params.id) {
      EmployeeService.updateEmployee(employee, params.id)
        .then((response) => {
          toast.success("Employee updated successfully");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      EmployeeService.createEmployee(employee)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        handleReset();
        navigate("/");
      }, 2000);
    }
  };

  const handleDepartment = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      departments.push(value);
      setDepartments(departments);
    } else {
      for (var i = 0; i < departments.length; i++) {
        if (departments[i] === value) {
          departments.splice(i, 1);
          i--;
        }
      }
      setDepartments([...departments]);
    }
    setEmployee({ ...employee, departments: [...departments] });
  };

  const handleReset = () => {
    setEmployee({
      id: "",
      name: "",
      profilePic: "",
      gender: "",
      departments: [],
      salary: "",
      startDate: "",
      note: "",
    });
    setDepartments([]);
    document.getElementById("employee-form").reset();
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <div className="form-heading">Employee Payroll Form</div>

        <form
          action="#"
          id="employee-form"
          onSubmit={handleOnSubmit}
          className="form"
        >
          <div className="row-content">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="form-input"
              value={employee.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>

          <div className="row-content">
            <label htmlFor="profilePic" className="form-label">
              Profile
            </label>
            <div className="radio-wrapper">
              <input
                type="radio"
                name="profilePic"
                className="radio"
                value={profile1}
                checked={employee.profilePic === profile1}
                onChange={handleOnChange}
              />
              <img src={profile1} className="profile-img" alt="profile" />

              <input
                type="radio"
                name="profilePic"
                className="radio"
                value={profile2}
                checked={employee.profilePic === profile2}
                onChange={handleOnChange}
              />
              <img src={profile2} className="profile-img" alt="profile" />

              <input
                type="radio"
                name="profilePic"
                className="radio"
                value={profile3}
                checked={employee.profilePic === profile3}
                onChange={handleOnChange}
              />
              <img src={profile3} className="profile-img" alt="profile" />

              <input
                type="radio"
                name="profilePic"
                value={profile4}
                className="radio"
                checked={employee.profilePic === profile4}
                onChange={handleOnChange}
              />
              <img src={profile4} className="profile-img" alt="profile" />
            </div>
          </div>

          <div className="row-content">
            <div className="radio-wrapper">
              <label htmlFor="gender" className="form-gender-label">
                Gender
              </label>

              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                className="radio"
                checked={employee.gender === "male"}
                onChange={handleOnChange}
              />
              <label htmlFor="male" className="gender-label">
                Male
              </label>

              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                className="radio"
                checked={employee.gender === "female"}
                onChange={handleOnChange}
              />
              <label htmlFor="female" className="gender-label">
                Female
              </label>
            </div>
          </div>

          <div className="row-content">
            <div className="radio-wrapper">
              <label htmlFor="departments" className="form-dept-label">
                Department
              </label>
              <input
                type="checkbox"
                name="departments"
                id="hr"
                value="HR"
                className="radio"
                checked={employee.departments.includes("HR")}
                onChange={handleDepartment}
              />
              <label className="gender-label" htmlFor="hr">
                HR
              </label>
              <input
                type="checkbox"
                name="departments"
                id="sales"
                value="Sales"
                className="radio"
                checked={employee.departments.includes("Sales")}
                onChange={handleDepartment}
              />
              <label className="gender-label" htmlFor="sales">
                Sales
              </label>
              <input
                type="checkbox"
                name="departments"
                id="finance"
                value="Finance"
                className="radio"
                checked={employee.departments.includes("Finance")}
                onChange={handleDepartment}
              />
              <label className="gender-label" htmlFor="finance">
                Finance
              </label>
              <input
                type="checkbox"
                name="departments"
                id="engineer"
                value="Engineer"
                className="radio"
                checked={employee.departments.includes("Engineer")}
                onChange={handleDepartment}
              />
              <label className="gender-label" htmlFor="engineer">
                Engineer
              </label>
              <input
                type="checkbox"
                name="departments"
                id="others"
                value="Others"
                className="radio"
                checked={employee.departments.includes("Others")}
                onChange={handleDepartment}
              />
              <label className="gender-label" htmlFor="others">
                Others
              </label>
            </div>
          </div>

          <div className="row-content">
            <label className="form-label" htmlFor="salary">
              Salary
            </label>
            <input
              name="salary"
              id="salary"
              type="number"
              className="form-input salary"
              placeholder="Enter Salary"
              value={employee.salary}
              onChange={handleOnChange}
            />
          </div>

          <div className="row-content">
            <label htmlFor="startDate" className="form-label-date">
              Start Date
            </label>
            <input
              name="startDate"
              type="date"
              id="startDate"
              className="form-input date"
              value={employee.startDate}
              onChange={handleOnChange}
            />
          </div>

          <div className="row-content">
            <label htmlFor="note" className="form-label label">
              Note
            </label>
            <textarea
              name="note"
              id="note"
              rows="3"
              value={employee.note}
              className="form-input"
              onChange={handleOnChange}
            ></textarea>
          </div>

          <div className="btn-container">
            <input className="btn" type="submit" value="Submit" />
            {params.id ? (
              ""
            ) : (
              <input className="btn" type="reset" value="Reset" onClick={handleReset} />
            )}
            <Link to="/" className="btn">Dashboard</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
