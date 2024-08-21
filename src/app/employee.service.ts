import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  companyName: string;
  email: string;
  contact: string;
  designation: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();
  private employees: Employee[] = [];
  private nextId = 1;

  constructor() { }

  addEmployee(employee: Employee) {
    employee.id = this.nextId++;
    this.employees.push(employee);
    this.employeesSubject.next(this.employees);
  }

  editEmployee(id: number, updatedEmployee: Employee) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.employeesSubject.next(this.employees);
    }
  }

  getEmployee(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(emp => emp.id !== id);
    this.employeesSubject.next(this.employees);
  }

  searchEmployees(query: string): Employee[] {
    if (query.trim()) {
      return this.employees.filter(emp =>
        emp.name == query || emp.email == query
      );
    }
    else {
      return this.employees;
    }

  }

  filterEmployees(query: string): Employee[] {
    return this.employees.filter(emp =>
      emp.name.includes(query) || emp.email.includes(query)
    );
  }
}
