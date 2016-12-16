import { User } from "./models/user";
import { BootstrapItem } from "./models/bootstrap/bootstrap-item";

export class AppState {

    currentUser: User;
    articles: any;
    usersList: User[];
    bootstrapItems: BootstrapItem[];

    constructor() {
        console.log('AppState constructor');
    }
}
