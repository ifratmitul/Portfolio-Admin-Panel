import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Admin/GetAllUser');
  }

  getEmployeeInfo(id: string) {
    return this.http.get(this.baseUrl + `Admin/GetUserInfo/${id}`);
  }
}
