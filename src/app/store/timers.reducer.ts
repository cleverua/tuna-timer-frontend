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
      return timerIndex < 0 ? state : [...state.slice(0, timerIndex), timer, ...state.slice(timerIndex + 1)];
    case 'ADD_TIMER':
      console.log("timersReducer#ADD_TIMER");
      return [...state, action.timer];
    case 'DELETE_TIMER':
      console.log("timersReducer#DELETE_TIMER");
      let index = state.findIndex(t => t.id === action.timer.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
