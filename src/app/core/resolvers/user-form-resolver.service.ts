import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';

import {mergeMap} from 'rxjs/operators';
import {IUserForm} from 'app/core/domain/IUserForm';
import {HttpClientService} from 'app/core/services/httpclient.service';

@Injectable({providedIn: 'root'})
export class UserFormResolver implements Resolve<IUserForm[]> {

    constructor(private httpClientService: HttpClientService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserForm[]> | Promise<IUserForm[]> | IUserForm[] {
        return this.httpClientService.getUserFormsDesc()
            .pipe(mergeMap(userForm => {
                if (userForm) {
                    return of(userForm);
                } else {
                    return EMPTY;
                }
            }));
    }

}
