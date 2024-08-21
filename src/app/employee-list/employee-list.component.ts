import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employeeService.employees$.subscribe(data => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }

  navigateToAddEmployee() {
    this.router.navigate(['/employee/new']);
  }

  search() {
    this.employees = this.employeeService.searchEmployees(this.searchQuery);
  }
  clear() {
    this.searchQuery = "";
    this.employees = this.employeeService.searchEmployees("");
  }

  filter() {
    this.employees = this.employeeService.filterEmployees(this.searchQuery);
  }
}
