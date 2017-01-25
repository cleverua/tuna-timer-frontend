import * as moment from 'moment';
import { REHYDRATE } from 'redux-persist/constants';

export function currentDateReducer(state: moment.Moment = moment(), action: any) {
  switch (action.type) {
    case 'SET_YEAR':
      let newYear = state.clone();
      newYear.year(action.year);
      return checkDate(newYear);
    case 'SET_MONTH':
      let newMonth = state.clone();
      newMonth.month(action.month);
      return checkDate(newMonth);
    case 'SET_DATE':
      let newDate = moment(action.date, 'DD-MM-YY');
      return checkDate(newDate);
    case 'SET_CURRENT_DAY':
      return state;
    default:
      return state;
  }
}

function checkDate(input: moment.Moment) {
  let today = moment();
  return input <= today ? input : today;
}
