import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IJwtResponse} from '../domain/JwtResponse';
import {SERVICE_CONSTANTS} from 'app/core/services/service.constants';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor(
        private httpClient: HttpClient
    ) {
    }

    authenticate(login, password) {
        sessionStorage.clear();
        return this.httpClient.post<IJwtResponse>(SERVICE_CONSTANTS.API_URL + 'auth/signin', {login, password}).pipe(
            map(
                userData => {
                    sessionStorage.setItem(SERVICE_CONSTANTS.USER_NAME, userData.userName);
                    sessionStorage.setItem(SERVICE_CONSTANTS.JWT, userData.token);
                    sessionStorage.setItem(SERVICE_CONSTANTS.JWT_TYPE, userData.type);
                    return userData;
                }
            )
        );
    }

    isUserLoggedIn() {
        const user = sessionStorage.getItem(SERVICE_CONSTANTS.USER_NAME);
        return !(user === null);
    }

    logOut() {
        sessionStorage.removeItem(SERVICE_CONSTANTS.USER_NAME);
        sessionStorage.removeItem(SERVICE_CONSTANTS.JWT);
        sessionStorage.removeItem(SERVICE_CONSTANTS.JWT_TYPE);
    }
}
