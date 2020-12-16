import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'app/core/services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ROUTES} from 'app/routes.constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    invalidLogin = false;

    formGroup: FormGroup;

    constructor(private router: Router,
                private loginService: AuthenticationService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.initFormGroup();
    }

    public checkLogin() {
        if (this.formGroup.valid) {
            const username = this.formGroup.get('username').value;
            const password = this.formGroup.get('password').value;

            this.loginService.authenticate(username, password).subscribe(
                data => {
                    this.router.navigate([ROUTES.USER_FORMS]);
                    this.invalidLogin = false;
                },
                error => {
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
