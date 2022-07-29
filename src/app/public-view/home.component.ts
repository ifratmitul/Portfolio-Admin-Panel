import { Component, OnInit } from '@angular/core';
import { PublicViewService } from './public-view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private publicViewService: PublicViewService) { }

  ngOnInit(): void {
    this.publicViewService.test();
  }

}
