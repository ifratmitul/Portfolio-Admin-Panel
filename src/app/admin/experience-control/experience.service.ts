import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { dateFormatter } from 'src/app/shared/Helper/dateFormatter';
import { Experience, ExperiencePayload } from 'src/app/shared/Model/Experience';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private baseUrl = environment.baseUrl;

  private experienceDataSource = new BehaviorSubject<any>(null);
  $experienceData = this.experienceDataSource.asObservable();

  constructor(private http: HttpClient) { }

  setExperienceDataSource(experience: Experience | null) {
    this.experienceDataSource.next({ flag: true, data: experience })
  };

  clearExperienceDataSource() {
    this.experienceDataSource.next(null);
  }

  getExperienceList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "experience");
  }

  addNewExperience(payload: ExperiencePayload): Observable<any> {
    const formData = new FormData();
    formData.append("company", payload.company);
    formData.append("position", payload.position);
    formData.append("responsibilities", payload.responsibilities);
    formData.append("startDate", dateFormatter(payload.startDate).toJSON());

    if (payload.PhotoFile)
      formData.append("PhotoFile", payload.PhotoFile);

    if(payload.endDate)
      formData.append("endDate", dateFormatter(payload.endDate).toJSON());

    return this.http.post(this.baseUrl + "experience", formData);
  }

  updateExperience(id: string, payload: any): Observable<any> {

    const formData = new FormData();
    formData.append("company", payload.company);
    formData.append("position", payload.position);
    formData.append("responsibilities", payload.responsibilities);
    formData.append("startDate", dateFormatter(payload.startDate).toJSON());

    if (payload.PhotoFile)
      formData.append("PhotoFile", payload.PhotoFile);

    if(payload.endDate)
      formData.append("endDate", dateFormatter(payload.endDate).toJSON());

    return this.http.put(this.baseUrl + `experience/${id}`, formData);
  }

  deleteExperience(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `experience/${id}`);
  }
}
