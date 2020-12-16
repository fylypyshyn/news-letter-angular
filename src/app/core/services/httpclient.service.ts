import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUserForm} from '../domain/IUserForm';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    jwtType = sessionStorage.getItem('jwt-type');
    jwt = sessionStorage.getItem('jwt');

    apiUrl = 'http://localhost:8080/api/userForms';

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getUserFormsDesc(): Observable<IUserForm[]> {
        const headers = new HttpHeaders({Authorization: this.jwtType + ' ' + this.jwt});
        return this.httpClient.get<IUserForm[]>(this.apiUrl, {headers});
    }

    createUserForms(userForm: IUserForm): Observable<IUserForm> {
        const headers = new HttpHeaders({Authorization: this.jwtType + ' ' + this.jwt, 'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.post<IUserForm>(this.apiUrl, JSON.stringify(userForm), {headers});
    }
}
