import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getSkills() {
    this.http.get(this.baseUrl+'skill').subscribe(
      {
        next: (res) => {
          console.log(res);

        },
        error: (err) => {

        }
      }
    )
  }

}
