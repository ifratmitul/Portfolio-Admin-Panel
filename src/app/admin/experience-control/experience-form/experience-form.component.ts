import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Experience, ExperiencePayload } from 'src/app/shared/Model/Experience';
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
  isEditMode: boolean = false;
  experienceData : any = null;
  @Output() refreshEmitter = new EventEmitter<boolean>();
  constructor(private expService: ExperienceService) { }


  ngOnInit(): void {
    this.dataObserver = this.expService.$experienceData.subscribe({
      next: (res: any) => {
        if (res?.flag) {
          this.isEditMode = !!res?.data;
          this.experienceData = res.data;
          this.initializeForm(res?.data);
        }
      }
    })
  }

  private initializeForm(experienceData: Experience | null = null) {
    this.experienceForm = new FormGroup({
      company: new FormControl(experienceData?.company ?? null, Validators.required),
      position: new FormControl(experienceData?.position ?? null, Validators.required),
      responsibilities: new FormControl(experienceData?.responsibilities ?? null),
      startDate: new FormControl(experienceData ? new Date(experienceData.startDate) : null, Validators.required),
      endDate: new FormControl(experienceData?.endDate ? new Date(experienceData.endDate) : null),
      PhotoFile: new FormControl(null),
      PhotoSource: new FormControl(null)
    });

    this.setValidation()
    this.openDialog();
  }

  setValidation() {
    if (this.isEditMode) {
      this.experienceForm?.get("PhotoFile")?.setValidators(null);
      this.experienceForm?.get("PhotoSource")?.setValidators(null);
    }
    else {
      this.experienceForm?.get("PhotoFile")?.setValidators(Validators.required);
      this.experienceForm?.get("PhotoSource")?.setValidators(Validators.required);
    }

    this.experienceForm?.updateValueAndValidity();
  }

  onFiledSourceChange(event: any) {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      this.experienceForm?.patchValue({
        PhotoFile: file
      });
    }
  }

  private openDialog() {
    this.dialogFlag = true;
  }

  closeDialog() {
    this.dialogFlag = false;
    this.expService.clearExperienceDataSource();
    this.experienceForm?.reset();
    // this.initializeForm();
    this.isEditMode = false;
    this.experienceData = null;
  }

  onSubmit() {
    this.expService.addNewExperience(this.experienceForm?.value).subscribe({
      next: res => {
        this.refreshEmitter.emit(true);
      },
      error: err => {

      }
    })
  }

  saveChanges() {
    this.expService.updateExperience(this.experienceData.id, this.experienceForm?.value).subscribe({
      next: res => {
        this.refreshEmitter.emit();
      },
      error : err => {

      }
    })
  }

  ngOnDestroy(): void {
    this.dataObserver?.unsubscribe();
  }

}
