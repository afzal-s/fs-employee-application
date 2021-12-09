import axios from "axios";

const EMPLOYEE_BASE_URL = "http://localhost:8081/employee";

class EmployeeService {
  fetchAllEmployees() {
    return axios.get(`${EMPLOYEE_BASE_URL}/getall`);
  }

  fetchEmployeeById(id) {
    return axios.get(`${EMPLOYEE_BASE_URL}/getone`, {
      headers: {
        "Content-Type": "application/json",
        id: id,
      },
    });
  }

  createEmployee(employee) {
    return axios.post(`${EMPLOYEE_BASE_URL}/create`, employee);
  }

  deleteEmployee(id) {
    return axios.delete(`${EMPLOYEE_BASE_URL}/delete`, {
      headers: {
        "Content-Type": "application/json",
        id: id,
      },
    });
  }

  updateEmployee(newEmployee, id) {
    return axios.put(`${EMPLOYEE_BASE_URL}/update`, newEmployee, {
      headers: {
        "Content-Type": "application/json",
        id: id,
      },
    });
  }
}

export default new EmployeeService();
