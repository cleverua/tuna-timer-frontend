import { User } from "./models/user";

export class AppState {

    currentUser: User;
    articles: any;
    usersList: User[];

    constructor() {
        console.log('AppState constructor');
    }
}
