import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from "ng2-redux";
import { ActivatedRoute, Router } from '@angular/router';

import { AppState } from "../../../app.state";
import { ApiService } from "../../../services/api.service";
import { UserActions } from "../../../actions/user.actions";
import { BootstrapItem } from "../../../models/bootstrap/bootstrap-item";
import { User } from "../../../models/user";
import { Subscription } from "rxjs";
import { AppError } from "../../../models/app-error";

@Component({
  selector: 'app-activate',
  templateUrl: 'activate.component.html',
  styleUrls: ['activate.component.css']
})
export class ActivateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authService: ApiService,
    private userActions: UserActions) {}

  ngOnInit() {
    this.ngRedux.dispatch({ type: 'BOOTSTRAP_ITEM_LOADING', itemName: 'load-user'});

    this.subscription = this.ngRedux.select(state=>state.bootstrapItems.filter(i => i.name == "redux-store-rehydrated")[0])
      .subscribe((rehydrated: BootstrapItem) => {
        if (rehydrated.isLoaded()) {
          let pid = this.activateRoute.snapshot.queryParams['pid'];
          this.authService.getToken(pid).subscribe(response => this.setUserByPid(response));
        }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private setUserByPid(response) {
    let jwt: string = response.data.jwt;
    if (jwt) {
      let user = new User(jwt);
      this.userActions.setCurrentUser(user);
      this.router.navigate(['/teams', user.teamId]);
    } else {
      let error = new AppError(response.errors.status, response.errors.userMessage);
      this.ngRedux.dispatch({type: 'SET_APP_ERROR', appError: error});
    }
  }
}
