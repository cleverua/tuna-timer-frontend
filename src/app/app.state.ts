import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { AppError } from "./models/app-error";
import { Timer } from "./models/timer";
import * as moment from 'moment';
// import {Dates} from "./models/date";

export class AppState {

    currentUser: User;
    timers: Timer[];
    bootstrapItems: BootstrapItem[];
    appError: AppError;
    currentDay: moment.Moment;

    constructor() {
        console.log('AppState constructor');
    }
}
