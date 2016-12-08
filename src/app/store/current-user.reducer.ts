import { CurrentUserActions } from '../actions/current-user.actions';
import { REHYDRATE } from 'redux-persist/constants';
import { User } from "../users/user";

export function currentUserReducer(state: User = null, action: any) {
  switch (action.type) {
    case REHYDRATE:
      console.log('currentUserReducer#REHYDRATE CURRENT USER');
      let user = action.payload.currentUser;
      return user ? Object.assign({}, user) : state;
    case CurrentUserActions.SET_TIMEZONE:
      console.log('currentUserReducer#SET_TIMEZONE');
      return Object.assign( {}, state, { timezone: action.payload.timezone } );
    case CurrentUserActions.SET_USER:
      console.log("currentUserReducer#SET_USER");
      return action.payload.currentUser;
    default:
      return state;
  }
}
