import * as moment from 'moment';
import { REHYDRATE } from 'redux-persist/constants';

export function currentDateReducer(state: moment.Moment = moment(), action: any) {
  switch (action.type) {
    case 'SET_YEAR':
      let newYear = state.clone();
      newYear.year(action.year);
      return newYear;
    case 'SET_MONTH':
      let newMonth = state.clone();
      newMonth.month(action.month);
      return newMonth;
    case 'SET_DATE':
      let newDate = moment(action.date, 'DD-MM-YY');
      return newDate;
    case 'SET_CURRENT_DAY':
      return state;
    default:
      return state;
  }
}
