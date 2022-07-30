import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/app/shared/Model/Experience';
import { editIcon, deleteIcon } from 'src/app/shared/Icons';
import { ExperienceService } from '../experience.service';
@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss']
})
export class ExperienceCardComponent implements OnInit {

  @Input() experienceDetails: Experience | null = null;
  editIcon = editIcon;
  deleteIcon = deleteIcon;

  constructor(private expService: ExperienceService) { }

  ngOnInit(): void {
  }

  detailsEmitter()  {
    console.log("gello");

    if(this.experienceDetails)
      this.expService.setExperienceDataSource(this.experienceDetails);
  }

}
