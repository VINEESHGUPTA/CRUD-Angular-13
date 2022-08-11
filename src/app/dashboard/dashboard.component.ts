import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeData } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('closebutton') closebutton :any ;
  formValue!: FormGroup;
  employeeModelObj: EmployeeData = new EmployeeData();
  allEmployeeData : any;
  showAdd!:boolean;
  showEdit!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });

    this.getAlldata();
  }


  clickAddEmployee()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit= false;
  }
  addEmployee() {

    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      this.closebutton.nativeElement.click();
      alert("Data added successfully");
      this.formValue.reset();
      this.getAlldata();
    })
  }


  getAlldata()
  {
    this.api.getEmployee().subscribe(res=>{
        this.allEmployeeData = res;
    })
  }

  deleteEmployee(data:any)
  {
    this.api.deleteEmployee(data.id).subscribe(res=>{
      alert("Data deleted successfully");
      this.getAlldata();
  })
  }

  onEditEmployee(data:any)
  {
    this.showAdd = false;
    this.showEdit= true;
    this.employeeModelObj.id = data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['salary'].setValue(data.salary);
  }

  updateEmployee()
  {
    
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      this.closebutton.nativeElement.click();
      alert("Data Updated successfully");
      this.formValue.reset();
      this.getAlldata();
    })

  }
}
