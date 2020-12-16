import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUserForm} from '../domain/IUserForm';
import {Observable} from 'rxjs';
import {SERVICE_CONSTANTS} from 'app/core/services/service.constants';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    jwtType = sessionStorage.getItem(SERVICE_CONSTANTS.JWT_TYPE);
    jwt = sessionStorage.getItem(SERVICE_CONSTANTS.JWT);

    constructor(
        private httpClient: HttpClient
    ) {
    }

    getUserFormsDesc(): Observable<IUserForm[]> {
        const headers = new HttpHeaders({Authorization: this.jwtType + ' ' + this.jwt});
        return this.httpClient.get<IUserForm[]>(SERVICE_CONSTANTS.API_URL + SERVICE_CONSTANTS.USER_FORMS, {headers});
    }

    createUserForms(userForm: IUserForm): Observable<IUserForm> {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.post<IUserForm>(SERVICE_CONSTANTS.API_URL + SERVICE_CONSTANTS.USER_FORMS, JSON.stringify(userForm), {headers});
    }

    uploadImage(file: File) {
        const formData: FormData = new FormData();
        formData.append(SERVICE_CONSTANTS.PARAM_NAME_FILE_UPLOAD, file);

        return this.httpClient.post<any>(SERVICE_CONSTANTS.API_URL + SERVICE_CONSTANTS.UPLOAD, formData);
    }
}
