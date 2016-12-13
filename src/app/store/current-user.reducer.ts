import { UserActions } from '../actions/user.actions';
import { REHYDRATE } from 'redux-persist/constants';
import { User } from "../models/user";

export function currentUserReducer(state: User = null, action: any) {
  switch (action.type) {
    case REHYDRATE:
      let user = action.payload.currentUser;
      return user ? Object.assign({}, user) : state;
    case UserActions.SET_TIMEZONE:
      console.log('currentUserReducer#SET_TIMEZONE');
      return Object.assign( {}, state, { timezone: action.payload.timezone } );
    case UserActions.SET_USER:
      console.log("currentUserReducer#SET_USER");
      return action.payload.currentUser;
    default:
      return state;
  }
}
