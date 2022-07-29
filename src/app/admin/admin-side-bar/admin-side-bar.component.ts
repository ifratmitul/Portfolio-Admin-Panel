import { Component, OnInit } from '@angular/core';
import {faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.scss']
})
export class AdminSideBarComponent implements OnInit {

  constructor() { }

  faLock = faLock;

  ngOnInit(): void {
  }

}
