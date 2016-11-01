import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { AppState } from '../app.state';

@Injectable()
export class CurrentUserActions {
    static SET_TIMEZONE: string = 'SET_TIMEZONE';

    constructor(private ngRedux: NgRedux<AppState>) {}

    setTimezone(value: any) {
        console.log('CurrentUserActions#setTimezone:', value);
        this.ngRedux.dispatch(
            {type: CurrentUserActions.SET_TIMEZONE, payload: {timezone: value}}
        );
    }
}
