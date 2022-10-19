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
  private refreshTokenTimeout:any =  null;

  private currentUserSource = new BehaviorSubject<UserInfo | null>(null);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  login(payload: LoginPayload): void {
    this.http.post<UserInfo>(this.baseUrl + 'account/login', payload).pipe(map((user: UserInfo) => {
      if (user) {
        localStorage.setItem('token', user.token);
        this.startRefreshTokenTimer();
        this.currentUserSource.next(user);
      }

      return user;
    })).subscribe(res => {
      this.router.navigateByUrl('/admin/skill')
    });
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.stopRefreshTokenTimer();
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/auth');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshToken() {
     return this.http.post<UserInfo>(this.baseUrl + "account/refreshToken", {}) .pipe(map((user) => {
      this.currentUserSource.next(user);
      this.startRefreshTokenTimer();
      return user;
  }));
  }

  get getUserValue() : UserInfo | null {
    return this.currentUserSource.value;
  }

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const jwtToken = JSON.parse(atob(this.getUserValue?.token?.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(9 * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
}

private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
}

}
