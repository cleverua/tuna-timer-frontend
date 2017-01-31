import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { AppError } from "./models/app-error";
import { Timer } from "./models/timer";
import { Project } from "./models/project";
import * as moment from 'moment';

export class AppState {

    currentUser: User;
    timers: Timer[];
    bootstrapItems: BootstrapItem[];
    appError: AppError;
    currentDay: moment.Moment;
    projects: Project[];

    constructor() {
        console.log('AppState constructor');
    }
}
