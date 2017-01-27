import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  host: { id: 'sidebar' }

})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
