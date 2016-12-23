import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";
import { AppError } from "./models/app-error";

export class AppState {

    currentUser: User;
    articles: any;
    usersList: User[];
    bootstrapItems: BootstrapItem[];
    appError: AppError;

    constructor() {
        console.log('AppState constructor');
    }
}
