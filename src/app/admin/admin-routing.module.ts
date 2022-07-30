import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EducationControllComponent } from './education-controll/education-controll.component';
import { EmployeeControlComponent } from './employee-control/employee-control.component';
import { ExperienceControlComponent } from './experience-control/experience-control.component';
import { SkillControlComponent } from './skill-control/skill-control.component';

const routes: Routes = [
  {path: '', component: AdminComponent,
    children: [
      {path: '', component: SkillControlComponent},
      {path: 'skill', component: SkillControlComponent},
      {path: 'education', component: EducationControllComponent},
      {path: 'experience', component: ExperienceControlComponent},
      {path: 'employee', component: EmployeeControlComponent},
      {path: '**', component: SkillControlComponent}
    ]
}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
