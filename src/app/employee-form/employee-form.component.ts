import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  avatars = [
    { id: 'avatar1', url: 'assets/avatars/woman.png' },
    { id: 'avatar2', url: 'assets/avatars/boy.png' },
    { id: 'avatar3', url: 'assets/avatars/profile.png' },
    { id: 'avatar4', url: 'assets/avatars/man.png' },
  ];
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id:[0],
      name: ['', Validators.required],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      contact: [''],
      designation: ['', Validators.required],
      avatar: ['']
    });
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      const emp = this.employeeService.getEmployee(id);
      if (emp) {
        this.isEditMode = true;
        this.employeeForm.setValue({
          id:emp.id,
          name: emp.name,
          companyName: emp.companyName,
          email: emp.email,
          contact:emp.contact,
          designation: emp.designation,
          avatar: emp.avatar,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      if (this.isEditMode) {
        this.employeeService.editEmployee(employeeData.id, employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }
      // Handle the form submission logic here, such as saving the data to a server.
      
      // Navigate back to the employee list or another appropriate route after saving.
      this.router.navigate(['/employees']);
    } else {
      // Optionally, mark all fields as touched to show validation errors
      this.employeeForm.markAllAsTouched();
    }
    
   
  }
  

  onCancel(): void {
    // Logic for canceling the form submission, e.g., navigating back to the employee list
    this.router.navigate(['/employees']);
  }
}
