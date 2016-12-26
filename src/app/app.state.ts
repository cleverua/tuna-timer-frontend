import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { AppError } from "./models/app-error";
import { Timer } from "./models/timer";

export class AppState {

    currentUser: User;
    timers: Timer[];
    bootstrapItems: BootstrapItem[];
    appError: AppError;

    constructor() {
        console.log('AppState constructor');
    }
}
