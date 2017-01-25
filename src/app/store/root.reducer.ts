import { combineReducers } from 'redux';

import { AppState } from '../app.state';
import { currentUserReducer } from './current-user.reducer';
import { bootstrapItemsReducer } from "./bootstrap-items.reducer";
import { appErrorReducer } from "./app-error.reducer";
import { timersReducer } from "./timers.reducer";
import {currentDateReducer} from "./current-date.reducer";

export const rootReducer = combineReducers<AppState>({
    currentUser: currentUserReducer,
    bootstrapItems: bootstrapItemsReducer,
    appError: appErrorReducer,
    timers: timersReducer,
    currentDate: currentDateReducer
});
