import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { AppState } from '../app.state';
import { User } from "../models/user";

@Injectable()
export class UserActions {
  static SET_TIMEZONE: string = 'SET_TIMEZONE';
  static SET_USER: string = 'SET_USER';
  static ADD_NEW_USER: string = 'ADD_NEW_USER';

  constructor(private ngRedux: NgRedux<AppState>) {}

  setTimezone(value: any) {
    console.log('UserActions#setTimezone:', value);
    this.ngRedux.dispatch(
        {type: UserActions.SET_TIMEZONE, payload: {timezone: value}}
    );
  }

  setCurrentUser(jwt: string) {
    let user = new User(jwt);
    this.ngRedux.dispatch(
        {type: UserActions.SET_USER, payload: {currentUser: user}}
    );
  }

  addNewUser(jwt) {
    let user = new User(jwt);
    this.ngRedux.dispatch(
        {type: UserActions.ADD_NEW_USER, payload: {user: user}}
    )
  }
}
