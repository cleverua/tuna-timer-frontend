import { Timer } from "../models/timer";

export function timersReducer(state: Timer[] = null, action: any) {
  switch (action.type) {
    case 'SET_TIMERS':
      console.log("timersReducer#SET_Timers");
      return action.timers;
    default:
      return state;
  }
}
