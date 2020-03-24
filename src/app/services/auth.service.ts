import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuth: boolean | string;
    userName: string;
    userEmail: string;

    constructor() {
    }
}
