package com.bridgelabz.employee.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public @ToString class EmployeeDTO {

    @Pattern(regexp = "^[A-Z]{1}[a-zA-Z\\s]{2,}$", message = "Employee Name Invalid")
    @NotEmpty(message = "Employee Name Cannot Be Null")
    private String name;

//    @NotBlank(message = "Profile Pic Cannot Be Empty")
    private String profilePic;

    @Pattern(regexp = "male|female", message = "Gender Should Be Male Or Female")
    private String gender;

    @NotNull(message = "Department Should Not Be Empty")
    private List<String> departments;

    @Min(value = 10000, message = "Minimum Wage Should Be More Than 10 Thousand")
    private long salary;

    @JsonFormat(pattern = "dd-mm-yyyy")
    @NotNull(message = "Start Date Should Not Be Empty")
    @PastOrPresent(message = "Start Date Should Be Past Or Today")
    private String startDate;

    @NotBlank(message = "Note Cannot Be Empty")
    private String note;

}