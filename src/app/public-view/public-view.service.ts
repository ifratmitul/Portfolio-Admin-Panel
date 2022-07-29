import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicViewService {

  private url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  test(){
    this.http.get(this.url+"skill").subscribe(res => {
      console.log(res);
    }, err => {
      // console.log(err);

    })
  }
}
