import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { AppState } from '../app.state';
import { User } from "../models/user";

@Injectable()
export class UserActions {
  static SET_TIMEZONE: string = 'SET_TIMEZONE';
  static SET_USER: string = 'SET_USER';

  constructor(private ngRedux: NgRedux<AppState>) {}

  setTimezone(value: any) {
    console.log('UserActions#setTimezone:', value);
    this.ngRedux.dispatch(
        {type: UserActions.SET_TIMEZONE, payload: {timezone: value}}
    );
  }

  setCurrentUser(user: User) {
    this.ngRedux.dispatch(
        {type: UserActions.SET_USER, payload: {currentUser: user}}
    );
  }
}
