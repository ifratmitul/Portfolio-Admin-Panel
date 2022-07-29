import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicViewService {

  private url = "http://localhost:5000/api/project/08da34a8-57a5-4e41-8f9b-9729b844c"
  constructor(private http: HttpClient) { }

  test(){
    this.http.get(this.url).subscribe(res => {
      console.log(res);
    }, err => {
      // console.log(err);

    })
  }
}
