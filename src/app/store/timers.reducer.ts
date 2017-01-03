import { Timer } from "../models/timer";

export function timersReducer(state: Timer[] = null, action: any) {
  switch (action.type) {
    case 'SET_TIMERS':
      console.log("timersReducer#SET_Timers");
      return action.timers;
    case 'UPDATE_TIMER':
      console.log("timersReducer#UPDATE_Timer");
      let timer = action.timer;
      let timerIndex = state.findIndex(t => t.id === timer.id);

      if (timerIndex < 0) {
        return state;
      } else {
        return [...state.slice(0, timerIndex), timer, ...state.slice(timerIndex + 1)]
      }
    default:
      return state;
  }
}
