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

    apiUrl = 'http://localhost:8080/api/';

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getUserFormsDesc(): Observable<IUserForm[]> {
        const headers = new HttpHeaders({Authorization: this.jwtType + ' ' + this.jwt});
        return this.httpClient.get<IUserForm[]>(this.apiUrl + 'userForms', {headers});
    }

    createUserForms(userForm: IUserForm): Observable<IUserForm> {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.post<IUserForm>(this.apiUrl + 'userForms', JSON.stringify(userForm), {headers});
    }

    uploadImage(file: File) {

        const formData: FormData = new FormData();

        formData.append('image', file);
        const uploadData = new FormData();
        uploadData.append('myFile', file, file.name);
        return this.httpClient.post<any>(this.apiUrl + 'upload', formData);
    }
}
