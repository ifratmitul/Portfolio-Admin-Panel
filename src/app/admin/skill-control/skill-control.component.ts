import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/shared/Model/Skill';
import { addIcon, deleteIcon } from 'src/app/shared/Icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillService } from './skill.service';

@Component({
  selector: 'app-skill-control',
  templateUrl: './skill-control.component.html',
  styleUrls: ['./skill-control.component.scss']
})
export class SkillControlComponent implements OnInit {

  constructor(private skillService: SkillService, private toastrService: ToastrService) { }
  skillList: Skill[] = [];
  modalFlag: boolean = false;
  skillForm: FormGroup = new FormGroup({
    skillName: new FormControl(null, Validators.required),
    photoFile: new FormControl(null, Validators.required),
    fileSource: new FormControl(null, Validators.required)
  });
  deleteIcon = deleteIcon;
  addIcon = addIcon;

  ngOnInit(): void {
    this.getSkill();
  }

  private getSkill(): void {
    this.skillService.getSkills().subscribe({
      next: (res: any) => {
        console.log(res);
        this.skillList = [...res];
      },
      error: (err) => {
        this.toastrService.error("Failed to fetch skills");
      }
    })
  }

  onFileChange(event: any): void {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      this.skillForm.patchValue({
        photoFile: file
      });
    }
  }

  addSkill() {
    if (this.skillForm.invalid) {
      this.toastrService.error("Form is Invalid");
      return;
    }

    console.log(this.skillForm.value);
    this.skillService.addSkill(this.skillForm.value).subscribe({
      next: (res:any) => {
        this.getSkill();
        this.toastrService.success(`Successfully added skill : ${this.skillForm?.controls['skillName']?.value}`);
        this.skillForm.reset();
        this.closeModal();
      },
      error: (err:any) => {
        console.log(err);
      }
    })

  }

  deleteSkill(id: string) {
    this.skillService.deleteSkill(id).subscribe({
      next: (res: any) => {
        this.getSkill();
      },
      error: (err) => {
        this.toastrService.error("Failed to delete skills");
      }
    })
  }

  openModal(): void {
      this.modalFlag = true;
  }

  closeModal(): void {
    this.modalFlag = false;
  }

}

