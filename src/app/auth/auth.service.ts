import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPayload, UserInfo } from '../shared/Model/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private currentUserSource = new BehaviorSubject<UserInfo | null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  login(payload: LoginPayload): void {
    this.http.post<UserInfo>(this.baseUrl + 'account/login', payload).pipe(map((user: UserInfo) => {
      if (user) {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      }

      return user;
    })).subscribe(res => {
      this.router.navigateByUrl('/admin/skill')
    });
  }

  logOut() : void {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/auth');
  }

  isAuthenticated() : boolean {
    return !!localStorage.getItem('token');
  }

  getToken() : string | null
  {
    return localStorage.getItem('token');

  }

  // loadCurrentUser(token:string)
  // {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', `Bearer ${token}`);
  //   return this.http.get(this.baseUrl+)

  // }

}
