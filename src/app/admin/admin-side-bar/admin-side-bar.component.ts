import { Component, OnInit } from '@angular/core';
import {faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInfo } from 'src/app/shared/Model/Auth';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.scss']
})
export class AdminSideBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  faLock = faLock;
  userInfo : UserInfo | null = null;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (res:UserInfo|null) => {
        console.log(res);
       this.userInfo = res;
      }
    })
  }

  logout() {
    this.authService.logOut();
  }

}
