import React, { useEffect, useState } from "react";
import EmployeeService from "../service/EmployeeService";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { BsPlusLg } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = () => {
    EmployeeService.fetchAllEmployees()
      .then((response) => {
        setEmployees(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
      .then((response) => {
        fetchAllEmployees();
        console.log(response);
      })
      .catch((error) => {
        toast.error("Something Went Wrong!");
        console.log(error);
      });
  };

  return (
    <>
      <div className="main-wrapper">
        <p className="emp-title">Employee Details</p>
        <div className="wrapper">
          <FiSearch className="search-icon" />
          <Link className="add-btn" to="/form">
            <BsPlusLg className="plus-icon" /> Add User
          </Link>
        </div>
      </div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td className="name-container">
                    <img src={employee.profilePic} className="profile-img left-margin" alt="profile" />
                    {employee.name}
                  </td>
                  <td>{employee.gender}</td>
                  <td>{`${employee.departments}`}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.startDate}</td>
                  <td>
                    <Link to={`/form/${employee.id}`}>
                      <MdOutlineEdit className="icon" title="Edit" />
                    </Link>
                    <MdOutlineDeleteOutline className="icon red-color"
                      onClick={() => deleteEmployee(employee.id)}
                      title="Delete"
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">
                <strong>Data Nahi Hain</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeDashboard;
