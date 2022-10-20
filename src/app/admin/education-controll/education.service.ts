import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dateFormatter } from 'src/app/shared/Helper/dateFormatter';
import { Education, EducationDataSourcePayload } from 'src/app/shared/Model/Education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private baseUrl = environment.baseUrl;
  private educationDataSource = new BehaviorSubject<EducationDataSourcePayload | null>(null);
  $eduData = this.educationDataSource.asObservable();

  constructor(private http: HttpClient) { }

  getEducationList() {
    return this.http.get<Education[]>(this.baseUrl + "education");
  }

  addEducation(data:any) {
    console.log(data);

    const formData = new FormData();
    formData.append("Institution", data.institution);
    formData.append("degree", data.degree );
    formData.append("major", data.major);
    formData.append("result", data.result.toString());
    formData.append("priority", data.priority.toString());
    formData.append("startDate",  dateFormatter(data.startDate).toJSON());

    if (data.PhotoFile)
      formData.append("PhotoFile", data.PhotoFile);

    if(data.endDate)
      formData.append("endDate", dateFormatter(data.endDate).toJSON());

    return this.http.post(this.baseUrl + "education", formData);

  }

  setSourceData(isEditMode = false, data: Education | null) {
    const payload : EducationDataSourcePayload = {isEditMode : isEditMode, data:data }
    this.educationDataSource.next({isEditMode : isEditMode, data:data });
  }

  clearDataPipeLine() {
    this.educationDataSource.next(null);
  }

}
