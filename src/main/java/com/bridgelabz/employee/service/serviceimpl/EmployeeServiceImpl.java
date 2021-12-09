package com.bridgelabz.employee.service.serviceimpl;

import com.bridgelabz.employee.dto.EmployeeDTO;
import com.bridgelabz.employee.exceptions.ResourceNotFound;
import com.bridgelabz.employee.model.Employee;
import com.bridgelabz.employee.repository.IEmployeeRepository;
import com.bridgelabz.employee.service.IEmployeeService;
import com.bridgelabz.employee.util.UToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Validated
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private IEmployeeRepository employeeRepository;

    @Autowired
    UToken uToken;

    @Override
    public List<Employee> fetchAllEmployeesData() throws ResourceNotFound {
        List<Employee> employeesDataList = new ArrayList<>();

        employeeRepository.findAll().forEach(employeesDataList::add);
        if( employeesDataList.isEmpty() ) {
            throw new ResourceNotFound("No Employees Data Found");
        }

        System.out.println(employeesDataList);
        return employeesDataList;
    }


    @Override
    public Employee fetchEmployeeDataById(long id) throws ResourceNotFound {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Employee With employeeId: "
                        + id + " does not exists"));
    }

    @Override
    public Employee addEmployeeData(EmployeeDTO employeeDTO) {
        Employee employeeData = new Employee(employeeDTO);
        return employeeRepository.save(employeeData);
    }

    @Override
    public Employee updateEmployeeData(long id, EmployeeDTO employeeDTO) throws ResourceNotFound {
        Employee employeeData = this.fetchEmployeeDataById(id);

        if (employeeData != null) {
            employeeData.updateEmployeeData(employeeDTO);
            return employeeRepository.save(employeeData);
        } else {
            throw new ResourceNotFound("Employee With employeeId: "
                    + id + " does not exists for updating the values");
        }
    }

    @Override
    public void deleteEmployeeDataById(long id) throws ResourceNotFound {
        Optional<Employee> employeeData = employeeRepository
                .findById(id);

        if (employeeData.isPresent()) {
            employeeRepository.deleteById(id);
        } else {
            throw new ResourceNotFound(id + " Given Id Is Not Present");
        }
    }

}
