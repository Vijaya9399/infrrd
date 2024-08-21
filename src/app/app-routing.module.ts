import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/new', component: EmployeeFormComponent },
  { path: 'employee/:id/edit', component: EmployeeFormComponent },
  { path: 'employee/:id/view', component: EmployeeDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
