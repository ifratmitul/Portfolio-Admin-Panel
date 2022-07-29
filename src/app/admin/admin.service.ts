import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill, SkillPayload } from '../shared/Model/Skill';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getSkills() : Observable<Skill> {
    return this.http.get<any>(this.baseUrl+'skill');
  }

  addSkill(payload:SkillPayload) {
    const formData = new FormData();
    formData.append("SkillName", payload.skillName);
    formData.append("PhotoFile", payload.photoFile);

    return this.http.post<any>(this.baseUrl+'skill', formData);
  }

  deleteSkill(id:string) : Observable<any> {
    return this.http.delete<any>(this.baseUrl+`skill/${id}`);
  }

}
