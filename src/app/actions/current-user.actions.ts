import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { AppState } from '../app.state';

@Injectable()
export class CurrentUserActions {
    static SET_TIMEZONE: string = 'SET_TIMEZONE';
    static SET_USER: string = 'SET_USER';

    constructor(private ngRedux: NgRedux<AppState>) {}

    setTimezone(value: any) {
        console.log('CurrentUserActions#setTimezone:', value);
        this.ngRedux.dispatch(
            {type: CurrentUserActions.SET_TIMEZONE, payload: {timezone: value}}
        );
    }

    setUser(user: any) {
        console.log('CurrentUserActions#setUser:', user);
        this.ngRedux.dispatch(
            {type: CurrentUserActions.SET_USER, payload: {currentUser: user}}
        );
    }
}
