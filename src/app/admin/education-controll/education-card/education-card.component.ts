import { Component, Input, OnInit } from '@angular/core';
import { deleteIcon, editIcon } from 'src/app/shared/Icons';
import { Education } from 'src/app/shared/Model/Education';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent implements OnInit {

  @Input() eduDetails:Education|null = null;
  editIcon = editIcon;
  deleteIcon = deleteIcon;
  constructor() { }

  ngOnInit(): void {
  }

  detailsEmitter() {

  }

  deleteExperience(id:string) {

  }

}
