import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experience } from 'src/app/shared/Model/Experience';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private baseUrl = environment.baseUrl;
  private experienceDataSource = new BehaviorSubject<any> (null);
  $experienceData = this.experienceDataSource.asObservable();

  constructor(private http: HttpClient) { }

  getExperienceList() : Observable<any> {
    return this.http.get<any>(this.baseUrl+"experience");
  }

  setExperienceDataSource(experience: Experience) {
    this.experienceDataSource.next({ flag: true, data: experience})
  };

  clearExperienceDataSource() {
    this.experienceDataSource.next(null);
  }
}
