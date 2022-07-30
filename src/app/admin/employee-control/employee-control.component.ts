import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { addIcon, deleteIcon } from 'src/app/shared/Icons';
@Component({
  selector: 'app-employee-control',
  templateUrl: './employee-control.component.html',
  styleUrls: ['./employee-control.component.scss']
})
export class EmployeeControlComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  employees: any[] = [];
  deleteIcon = deleteIcon;
  addIcon = addIcon;

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployeeList().subscribe(
      {
        next: (res: any[]) => {
          console.log(res);

          this.employees = [...res];
        },
        error: (err: any) => {

        }
      }

    )
  }

  openModal()
  {

  }

  deleteSkill(id:string){

  }

}
