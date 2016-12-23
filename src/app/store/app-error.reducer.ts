import { AppError } from "../models/app-error";

export function appErrorReducer(state: AppError = null, action: any) {
  switch (action.type) {
    case 'SET_APP_ERROR':
      return action.appError;
    default:
      return state;
  }
}
