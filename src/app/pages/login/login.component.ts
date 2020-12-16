import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'app/core/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ROUTES} from 'app/routes.constants';
import {SERVICE_CONSTANTS} from 'app/core/services/service.constants';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    invalidLogin = false;

    formGroup: FormGroup;

    private destroy$ = new Subject<void>();

    constructor(private router: Router,
                private loginService: AuthenticationService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initFormGroup();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public checkLogin() {
        if (this.formGroup.valid) {
            const username = this.formGroup.get(SERVICE_CONSTANTS.USER_NAME).value;
            const password = this.formGroup.get(SERVICE_CONSTANTS.PASSWORD).value;

            this.loginService.authenticate(username, password)
                .pipe(
                    takeUntil(this.destroy$))
                .subscribe(
                    () => {
                        this.invalidLogin = false;
                        this.router.navigate([ROUTES.USER_FORMS]);
                    },
                    () => {
                        this.invalidLogin = true;
                    }
                );
        }
    }

    private initFormGroup() {
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}
