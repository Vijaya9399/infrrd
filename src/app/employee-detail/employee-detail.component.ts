import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.employee = this.employeeService.getEmployee(id);
  }
}
