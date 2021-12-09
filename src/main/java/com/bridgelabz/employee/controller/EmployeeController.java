package com.bridgelabz.employee.controller;

import com.bridgelabz.employee.dto.EmployeeDTO;
import com.bridgelabz.employee.dto.ResponseDTO;
import com.bridgelabz.employee.exceptions.ResourceNotFound;
import com.bridgelabz.employee.model.Employee;
import com.bridgelabz.employee.service.IEmployeeService;
import com.bridgelabz.employee.util.UToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;

    @Autowired
    private UToken uToken;

    @GetMapping("/getall")
    public ResponseEntity<ResponseDTO> fetchAllEmployeesData() throws ResourceNotFound {
        List<Employee> employeesDataList = employeeService.fetchAllEmployeesData();
        ResponseDTO responseDTO = new ResponseDTO((long) 200,
                "Fetched All Employees", employeesDataList);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @GetMapping("/getone")
    public ResponseEntity<ResponseDTO> fetchEmployeeDataById(@RequestHeader long id) throws ResourceNotFound {
        Employee employeeData = employeeService.fetchEmployeeDataById(id);
        ResponseDTO responseDTO = new ResponseDTO((long) 200,
                "Get Employee Payroll Data For ID Successful", employeeData);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> addEmployeeData(@Valid @RequestBody EmployeeDTO employeeDTO) {
        Employee employeeData = employeeService.addEmployeeData(employeeDTO);
        ResponseDTO responseDTO = new ResponseDTO((long) 200, "Added Employee Payroll Data Successful",
                employeeData, uToken.generateToken(employeeData.getId()));
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateEmployeeDataById(
            @RequestHeader long id, @Valid @RequestBody EmployeeDTO employeeDTO)
            throws ResourceNotFound {
        Employee employeeData = employeeService.updateEmployeeData(id, employeeDTO);
        ResponseDTO responseDTO = new ResponseDTO((long) 200,
                "Updated Employee Payroll Data Successful", employeeData);
        return ResponseEntity.status(HttpStatus.OK).body(responseDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteEmployeeDataById(@RequestHeader long id)
            throws ResourceNotFound {
        employeeService.deleteEmployeeDataById(id);
        return new ResponseEntity<String>("Deleted Employee Payroll Data Successful Deleted Id: "
                + id, HttpStatus.OK);
    }
}