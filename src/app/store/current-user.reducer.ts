import { CurrentUserActions } from '../actions/current-user.actions';

export class CurrentUserState {
    public timezone: string;

    constructor(public id: string, public isAdmin: boolean) {
      this.timezone = '[unknown]';
    }
}

const initialState = new CurrentUserState('0987654321', false);

export function currentUserReducer(state: CurrentUserState = initialState, action: any) {
  switch (action.type) {
    case CurrentUserActions.SET_TIMEZONE:
      console.log('currentUserReducer#SET_TIMEZONE');
      return Object.assign( {}, state, { timezone: action.payload.timezone } );
    default:
      return state;
  }
}
