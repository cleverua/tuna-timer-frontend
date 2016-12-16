import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router } from "@angular/router";
import { AppState } from './app.state';

import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { BootstrapProgress } from "./models/bootstrap/bootstrap-progress";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ngRedux: NgRedux<AppState>, private router: Router) {}

  ngOnInit() {
    this.ngRedux.select('bootstrapItems').forEach(b => {
      let items = (b as BootstrapItem[]);
      let bootstrapProgress = new BootstrapProgress(items);
      let rehydrated = items.filter(i => { return i.name == "redux-store-rehydrated" })[0];

      if (window.location.pathname != "/activate_user" && rehydrated.isLoaded()) {
        this.ngRedux.select('currentUser').subscribe((user: User) => {
          if (user) {
            this.router.navigate(['/teams', user.teamId]);
          } else {
            this.router.navigate(['/errors', 400]);
          }
        });
      }

      if (bootstrapProgress.isCompleted()) {
        window.document.dispatchEvent(new Event('application-bootstrap-done'));
      }
    });
  }
}
