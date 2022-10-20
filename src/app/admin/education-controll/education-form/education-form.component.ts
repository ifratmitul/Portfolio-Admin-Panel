import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { whiteSpaceValidation } from 'src/app/core/validators/customValidators';
import { Education, EducationDataSourcePayload } from 'src/app/shared/Model/Education';
import { EducationService } from '../education.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit, OnDestroy {

  educationForm: FormGroup | null = null;
  dialogFlag: boolean = false;
  isEditMode: boolean = false;
  subscribers : Subscription [] = [];
  editData : Education | null = null;
  @Output() refreshEmitter = new EventEmitter<boolean>();

  constructor(private eduService: EducationService) { }

  ngOnInit(): void {
    const subscriber = this.eduService.$eduData.subscribe({
      next: (res:EducationDataSourcePayload|null) => {
        console.log(res);

        if(res) {
          this.isEditMode = res.isEditMode;
          this.initializeForm(res.data);
        }
      },
      error: (err) => {

      }
    });

    this.subscribers.push(subscriber);
  }

  private initializeForm(data: Education | null = null) {
    this.educationForm = new FormGroup({
      institution: new FormControl(data?.institution??null, [Validators.required, whiteSpaceValidation]),
      startDate: new FormControl(data?.startDate ? new Date(data.startDate) : null , [Validators.required]),
      endDate: new FormControl(data?.endDate ? new Date(data.endDate) : null, [Validators.required]),
      degree: new FormControl(data?.degree??null, [Validators.required, whiteSpaceValidation]),
      major: new FormControl(data?.major??null, [Validators.required, whiteSpaceValidation]),
      PhotoFile: new FormControl(null),
      PhotoSource: new FormControl(null),
      result: new FormControl(data?.priority??1, [Validators.required, Validators.min(1)]),
      priority: new FormControl(data?.priority??1, [Validators.required, Validators.min(1)])
    })

    this.setValidation()
    this.openDialog();
  }

  setValidation() {
    if (this.isEditMode) {
      this.educationForm?.get("PhotoFile")?.setValidators(null);
      this.educationForm?.get("PhotoSource")?.setValidators(null);
    }
    else {
      this.educationForm?.get("PhotoFile")?.setValidators(Validators.required);
      this.educationForm?.get("PhotoSource")?.setValidators(Validators.required);
    }

    this.educationForm?.updateValueAndValidity();
  }

  onFiledSourceChange(event: any) {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      this.educationForm?.patchValue({
        PhotoFile: file
      });
    }
  }

  openDialog() {
    this.dialogFlag = true;
  }

  saveChanges() {
      console.log(this.educationForm?.value);
  }

  onSubmit() {
    console.log(this.educationForm?.value);
    this.eduService.addEducation(this.educationForm?.value).subscribe({
      next: (res:any) => {
        console.log(res);
        this.closeDialog();
      },
      error: (err) => {

      }
    })
  }

  closeDialog() {
    this.dialogFlag = false;
    this.educationForm?.reset();
    this.eduService.clearDataPipeLine();
    this.refreshEmitter.emit(true);
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(item => {
      item.unsubscribe();
    })
  }

}
