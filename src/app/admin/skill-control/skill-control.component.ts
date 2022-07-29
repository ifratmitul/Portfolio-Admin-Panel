import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/shared/Model/Skill';
import { AdminService } from '../admin.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-control',
  templateUrl: './skill-control.component.html',
  styleUrls: ['./skill-control.component.scss']
})
export class SkillControlComponent implements OnInit {

  constructor(private adminService: AdminService, private toastrService: ToastrService) { }
  skillList: Skill[] = [];
  modalFlag: boolean = false;
  skillForm: FormGroup = new FormGroup({
    skillName: new FormControl(null, Validators.required),
    photoFile: new FormControl(null, Validators.required),
    fileSource: new FormControl(null, Validators.required)
  });
  deleteIcon = faTrashCan;
  addIcon = faPlusCircle;

  ngOnInit(): void {
    this.getSkill();
  }

  private getSkill(): void {
    this.adminService.getSkills().subscribe({
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
    this.adminService.addSkill(this.skillForm.value).subscribe({
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
    this.adminService.deleteSkill(id).subscribe({
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

