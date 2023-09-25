export class User {
    email: string;
    password: string;

    constructor (
        password: string,
        email: string
    ) {
        this.email = email;
        this.password = password;
    }
    
}

export interface IUserGridRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    age: number;
    gender: string;
    isAdmin: boolean;
}