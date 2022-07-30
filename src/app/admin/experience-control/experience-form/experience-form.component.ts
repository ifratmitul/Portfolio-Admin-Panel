import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/shared/Model/Experience';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit, OnDestroy {

  experienceForm: FormGroup | null = null;
  dataObserver: Subscription | null = null;
  dialogFlag: boolean = false;


  constructor(private expService: ExperienceService) { }


  ngOnInit(): void {
    this.dataObserver = this.expService.$experienceData.subscribe({
      next: (res: any) => {
        if (res?.flag)
          this.initializeForm(res);
      }
    })
  }

  private initializeForm(experienceData: Experience | null = null) {
    this.experienceForm = new FormGroup({
      company: new FormControl(experienceData?.company ?? null, Validators.required),
      position: new FormControl(experienceData?.position ?? null, Validators.required),
      responsibilities: new FormControl(experienceData?.responsibilities ?? null, Validators.required),
      startDate: new FormControl(experienceData ? new Date(experienceData.startDate) : null, Validators.required),
      endDate: new FormControl(experienceData?.endDate ? new Date(experienceData.endDate) : null),
      PhotoFile: new FormControl(null, Validators.required)
    });
    this.openDialog();
  }

  private openDialog() {
    this.dialogFlag = true;
  }

  closeDialog() {
    this.dialogFlag = false;
    this.expService.clearExperienceDataSource();
    this.experienceForm?.reset();
  }

  ngOnDestroy(): void {
    this.dataObserver?.unsubscribe();
  }

}
