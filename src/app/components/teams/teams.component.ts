import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Router, ActivatedRoute } from '@angular/router';

import { AppState } from "../../app.state";
import { User } from "../../models/user";

@Component({
  selector: 'app-team',
  templateUrl: 'teams.component.html',
  styleUrls: ['teams.component.css']
})
export class TeamsComponent implements OnInit {
  currentUser: User;

  constructor(private ngRedux: NgRedux<AppState>, private router: Router) { }

  ngOnInit() {
    //TODO validate current user JWT on init
    //TODO load Users tasks after validation

    this.ngRedux.select('currentUser').forEach((user: User) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.ngRedux.dispatch({ type: 'BOOTSTRAP_ITEM_COMPLETED', itemName: 'load-user'});
      }
    });
  }
}
