import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IJwtResponse} from '../domain/JwtResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    apiUrl = 'http://localhost:8080/api/';

    constructor(
        private httpClient: HttpClient
    ) {
    }

    authenticate(login, password) {
        sessionStorage.clear();
        return this.httpClient.post<IJwtResponse>(this.apiUrl + 'auth/signin', {login, password}).pipe(
            map(
                userData => {
                    sessionStorage.setItem('username', userData.userName);
                    sessionStorage.setItem('jwt', userData.token);
                    sessionStorage.setItem('jwt-type', userData.type);
                    return userData;
                }
            )
        );
    }


    isUserLoggedIn() {
        const user = sessionStorage.getItem('username');
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt-type');
    }
}
