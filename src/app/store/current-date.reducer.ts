import * as moment from 'moment';
import { REHYDRATE } from 'redux-persist/constants';

export function currentDateReducer(state: moment.Moment = moment(), action: any) {
  switch (action.type) {
    case REHYDRATE:
      return state;
    case 'SET_YEAR':
      let newDate = state.clone();
      newDate.year(action.year);
      console.log(newDate);
      return newDate;
    case 'SET_CURRENT_DAY':
      console.log(state);
      return state;
      // this.ngRedux.select('SET_YEAR').subscribe((data: string) => this.currentDay = moment(data, 'YYYY'));
      // return
      // let user = action.payload.currentUser;
      // return user ? Object.assign({}, user) : state;
    // case UserActions.SET_TIMEZONE:
    //   console.log('currentUserReducer#SET_TIMEZONE');
    //   return Object.assign( {}, state, { timezone: action.payload.timezone } );
    // case UserActions.SET_USER:
    //   console.log("currentUserReducer#SET_USER");
    //   return action.payload.currentUser;
    default:
      return state;
  }
}
