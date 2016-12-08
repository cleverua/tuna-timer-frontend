import { User } from "./users/user";
export class AppState {

    currentUser: User;
    articles: any;

    constructor() {
        console.log('AppState constructor');
    }
}
