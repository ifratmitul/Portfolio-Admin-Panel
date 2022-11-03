import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableSettings , IDataTableSettings} from './data-table-settings';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() settings : DataTableSettings = new DataTableSettings();

  constructor() {
   }

  ngOnInit(): void {
  }

}
