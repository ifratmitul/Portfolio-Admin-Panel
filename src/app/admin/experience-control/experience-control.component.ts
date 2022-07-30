import { Component, OnInit } from '@angular/core';
import { ExperienceService } from './experience.service';
import { addIcon, deleteIcon } from 'src/app/shared/Icons';
import { Experience } from 'src/app/shared/Model/Experience';

@Component({
  selector: 'app-experience-control',
  templateUrl: './experience-control.component.html',
  styleUrls: ['./experience-control.component.scss']
})
export class ExperienceControlComponent implements OnInit {

  constructor( private expService: ExperienceService) { }
  modalFlag: boolean = false;
  deleteIcon = deleteIcon;
  addIcon = addIcon;
  experienceList : Experience[] = [];

  ngOnInit(): void {
    this.getExperience();
  }

  private getExperience() {
    this.expService.getExperienceList().subscribe({
      next: (res:any) => {
        this.experienceList = [...res];
      },
      error: (err:any) => {

      }
    })
  }

  openModal() {

  }

}
