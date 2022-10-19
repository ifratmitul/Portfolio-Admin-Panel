import { Component, OnInit } from '@angular/core';
import { Education } from 'src/app/shared/Model/Education';
import { EducationService } from './education.service';
import { addIcon, deleteIcon } from 'src/app/shared/Icons';

@Component({
  selector: 'app-education-controll',
  templateUrl: './education-controll.component.html',
  styleUrls: ['./education-controll.component.scss']
})
export class EducationControllComponent implements OnInit {

  schools: Education[] = [];
  deleteIcon = deleteIcon;
  addIcon = addIcon;
  constructor(private eduService: EducationService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.eduService.getEducationList().subscribe({
      next: (res: Education[]) => {
        this.schools = [...res];
      },
      error: err => {

      }
    })
  }



}
