package com.bridgelabz.employee.model;

import com.bridgelabz.employee.dto.EmployeeDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_tb")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "employee_id")
    private long id;
    private String name;
    private String profilePic;
    private String gender;

    @ElementCollection
    @CollectionTable(name = "departments_tb",
            joinColumns = @JoinColumn(name = "id")
    )
    @Column(name = "departments")
    private List<String> departments;
    private double  salary;
    private String startDate;
    private String note;

    public Employee(EmployeeDTO employeeDTO) {
        this.updateEmployeeData(employeeDTO);
    }

    public void updateEmployeeData(EmployeeDTO employeeDTO) {
        this.name = employeeDTO.getName();
        this.salary = employeeDTO.getSalary();
        this.gender = employeeDTO.getGender();
        this.startDate = employeeDTO.getStartDate();
        this.note = employeeDTO.getNote();
        this.profilePic = employeeDTO.getProfilePic();
        this.departments = employeeDTO.getDepartments();
    }
}