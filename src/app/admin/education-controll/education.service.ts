import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from 'src/app/shared/Model/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getEducationList() {
    return this.http.get<Education[]>(this.baseUrl+"education");
  }
}
