import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //TODO clear storage depends on errors type.
    window.document.dispatchEvent(new Event('application-bootstrap-done'));
  }
}
