import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AuthModule } from '../auth/auth.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { SkillControlComponent } from './skill-control/skill-control.component';
import { EducationControllComponent } from './education-controll/education-controll.component';
import { ExperienceControlComponent } from './experience-control/experience-control.component';
import { SharedModule } from '../shared/shared.module';
import { ExternalComponentModule } from '../external-component/external-component.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminSideBarComponent,
    SkillControlComponent,
    EducationControllComponent,
    ExperienceControlComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    AdminRoutingModule,
    SharedModule,
    ExternalComponentModule
  ]
})
export class AdminModule { }
