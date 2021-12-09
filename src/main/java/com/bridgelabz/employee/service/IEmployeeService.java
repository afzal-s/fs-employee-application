package com.bridgelabz.employee.service;

import com.bridgelabz.employee.dto.EmployeeDTO;
import com.bridgelabz.employee.exceptions.ResourceNotFound;
import com.bridgelabz.employee.model.Employee;

import java.util.List;

public interface IEmployeeService {
    Employee fetchEmployeeDataById(long id) throws ResourceNotFound;
    List<Employee> fetchAllEmployeesData() throws ResourceNotFound;
    Employee addEmployeeData(EmployeeDTO employeeDTO);
    Employee updateEmployeeData(long id, EmployeeDTO employeeDTO) throws ResourceNotFound;
    void deleteEmployeeDataById(long id) throws ResourceNotFound;
}
